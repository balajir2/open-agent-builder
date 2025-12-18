// WorkflowRunnerUI.pdf-only.tsx
// Updated: improved clone sanitization + width/font preservation for html2canvas,
// and improved text-only fallback using jsPDF.splitTextToSize

"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import DOMPurify from 'dompurify'; // SECURITY FIX: XSS protection
import { marked } from "marked";
import {
  Search, X, Save, Check, Download, ChevronDown,
  FileText, FileDown, Loader, CheckCircle,
  Play, AlertCircle
} from "lucide-react";
import { getDocumentSaveLocation } from '@/utils/document-export';
import { FileLocationModal } from '@/components/ui/FileLocationModal';
import { useRouter, useSearchParams } from "next/navigation";
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle, HeadingLevel, AlignmentType } from "docx";
import { saveAs } from 'file-saver';

// Type definitions for input requirements and validation
interface InputRequirement {
  name: string;
  description: string;
  type: string;
  required: boolean;
  defaultValue?: any;
  options?: string[];
}

interface InputValidation {
  isValid: boolean;
  message: string;
}

// File metadata returned by upload endpoint
interface FileMeta {
  storageId?: string;        // Convex storage id
  fileUrl?: string;          // optional public URL (if you generate a signed URL)
  originalFilename?: string;
  size?: number;
  contentType?: string;
}

/* ===========================
   Utility: color/style helpers
   =========================== */

/*
 * Patterns we try to neutralize prior to rendering to canvas.
 * We deliberately match 'color(' and CSS variable usage which html2canvas often fails on.
 */
const problematicColorPattern = /\b(?:color|color-mix|lab|lch|device-cmyk)\([^\)]*\)|var\([^\)]+\)/i;
const problematicColorPatternGlobal = new RegExp(problematicColorPattern.source, "gi");
const explicitColorFunctionGlobal = /color\([^\)]+\)/gi;
const gradientPattern = /(linear-gradient|radial-gradient|conic-gradient|repeating-linear-gradient)\([^\)]*\)/i;

function getResolvedColorOrFallback(el: Element | null): string {
  let node: Element | null = el;
  while (node) {
    try {
      const cs = window.getComputedStyle(node);
      const color = cs && (cs.color || cs.fill || cs.backgroundColor);
      if (color && !problematicColorPattern.test(color)) return color;
    } catch (e) {
      // ignore and continue up the tree
    }
    node = node.parentElement;
  }
  // prefer a known CSS color format html2canvas supports
  return "rgb(0, 0, 0)";
}

function safeSetStyle(el: HTMLElement, prop: string, value: string) {
  try {
    el.style.setProperty(prop, value, "important");
  } catch (e) {
    try {
      // fallback
      // @ts-ignore
      el.style[prop] = value;
    } catch { /* ignore */ }
  }
}

function inlineBasicComputedStyles(origEl: Element, cloneEl: HTMLElement) {
  try {
    const cs = window.getComputedStyle(origEl as Element);
    if (!cs) return;

    // expanded list includes wrapping / width / box sizing / font shorthand
    const safeProps = [
      "color",
      "background-color",
      "border-color",
      "outline-color",
      "text-decoration-color",
      "column-rule-color",
      "font-family",
      "font-size",
      "font-weight",
      "line-height",
      "text-decoration",
      "letter-spacing",
      "text-align",
      "padding",
      "margin",
      "border-radius",
      "white-space",
      "word-break",
      "overflow-wrap",
      "word-wrap",
      "width",
      "max-width",
      "box-sizing",
      "display",
      "font-style",
      "font-variant",
    ];

    // Also build a font shorthand for better fidelity
    try {
      const fontShorthand = `${cs.fontStyle} ${cs.fontVariant} ${cs.fontWeight} ${cs.fontSize}/${cs.lineHeight} ${cs.fontFamily}`;
      if (fontShorthand && typeof fontShorthand === "string") {
        safeSetStyle(cloneEl, "font", fontShorthand);
      }
    } catch { /* ignore shorthand building errors */ }

    for (const p of safeProps) {
      let v = (cs as any).getPropertyValue(p);
      if (v && typeof v === "string") {
        // If the computed value uses a problematic function (color(...), var(...), etc.)
        if (problematicColorPattern.test(v) || explicitColorFunctionGlobal.test(v)) {
          v = getResolvedColorOrFallback(origEl);
        }
        // Remove gradients for properties that don't support them in canvas
        if (gradientPattern.test(v)) {
          if (p === "background-color") {
            // prefer backgroundColor fallback instead of gradient
            const fallback = cs.backgroundColor || getResolvedColorOrFallback(origEl);
            v = fallback;
          } else {
            v = v.replace(gradientPattern, "none");
          }
        }
        // Ensure we replace any remaining problematic color function occurrences globally
        if (problematicColorPatternGlobal.test(v)) {
          v = v.replace(problematicColorPatternGlobal, getResolvedColorOrFallback(origEl));
        }
        // also remove explicit color(...) invocations
        if (explicitColorFunctionGlobal.test(v)) {
          v = v.replace(explicitColorFunctionGlobal, getResolvedColorOrFallback(origEl));
        }

        // Trim and set
        safeSetStyle(cloneEl, p, v.trim());
      }
    }
  } catch (e) {
    // ignore errors for individual elements
  }
}

function inlineSvgColorsForPair(orig: Element, clone: Element) {
  try {
    const svgElements = [clone, ...Array.from(clone.querySelectorAll("[fill], [stroke], svg *"))];
    const origBase = orig;
    svgElements.forEach((cEl) => {
      let resolvedFill = getResolvedColorOrFallback(origBase);
      let resolvedStroke = resolvedFill;
      try {
        const cs = window.getComputedStyle(origBase as Element);
        if (cs) {
          if (cs.fill && !problematicColorPattern.test(cs.fill)) resolvedFill = cs.fill;
          if (cs.stroke && !problematicColorPattern.test(cs.stroke)) resolvedStroke = cs.stroke;
        }
      } catch { }
      // Replace any problematic color occurrences in attribute values
      try {
        if ((cEl as Element).getAttribute) {
          const fillAttr = (cEl as Element).getAttribute("fill");
          if (fillAttr && (problematicColorPattern.test(fillAttr) || explicitColorFunctionGlobal.test(fillAttr))) {
            (cEl as Element).setAttribute("fill", getResolvedColorOrFallback(origBase));
          } else if (!fillAttr) {
            try { (cEl as Element).setAttribute("fill", resolvedFill); } catch { }
          }
        }
      } catch { }
      try {
        if ((cEl as Element).getAttribute) {
          const strokeAttr = (cEl as Element).getAttribute("stroke");
          if (strokeAttr && (problematicColorPattern.test(strokeAttr) || explicitColorFunctionGlobal.test(strokeAttr))) {
            (cEl as Element).setAttribute("stroke", getResolvedColorOrFallback(origBase));
          } else if (!strokeAttr) {
            try { (cEl as Element).setAttribute("stroke", resolvedStroke); } catch { }
          }
        }
      } catch { }
      try {
        // Also set inline styles for svg subelements where possible
        (cEl as HTMLElement).style && safeSetStyle(cEl as HTMLElement, "fill", resolvedFill);
        (cEl as HTMLElement).style && safeSetStyle(cEl as HTMLElement, "stroke", resolvedStroke);
        // Ensure no problematic functions remain in style attribute
        const styleAttr = (cEl as Element).getAttribute && (cEl as Element).getAttribute("style");
        if (styleAttr && problematicColorPatternGlobal.test(styleAttr)) {
          const replaced = styleAttr.replace(problematicColorPatternGlobal, getResolvedColorOrFallback(origBase));
          try { (cEl as Element).setAttribute("style", replaced); } catch { }
        }
        if (styleAttr && explicitColorFunctionGlobal.test(styleAttr)) {
          const replaced = styleAttr.replace(explicitColorFunctionGlobal, getResolvedColorOrFallback(origBase));
          try { (cEl as Element).setAttribute("style", replaced); } catch { }
        }
      } catch { }
    });
  } catch (e) {
    // ignore
  }
}

function sanitizeCloneForCanvas(cloneRoot: HTMLElement, origRoot: Element) {
  const walker = document.createTreeWalker(cloneRoot, NodeFilter.SHOW_ELEMENT, null);
  const nodes: Element[] = [];
  let cur: Element | null = walker.currentNode as Element | null;
  if (cur) nodes.push(cur);
  while (walker.nextNode()) {
    cur = walker.currentNode as Element | null;
    if (cur) nodes.push(cur);
  }

  for (const el of nodes) {
    try {
      const origEquivalent = findBestMatchInOriginal(el, origRoot) || origRoot;
      inlineBasicComputedStyles(origEquivalent, el as HTMLElement);

      safeSetStyle(el as HTMLElement, "background-image", "none");
      safeSetStyle(el as HTMLElement, "box-shadow", "none");
      safeSetStyle(el as HTMLElement, "text-shadow", "none");
      safeSetStyle(el as HTMLElement, "border-image", "none");
      safeSetStyle(el as HTMLElement, "filter", "none");
      safeSetStyle(el as HTMLElement, "-webkit-filter", "none");
      safeSetStyle(el as HTMLElement, "backdrop-filter", "none");
      safeSetStyle(el as HTMLElement, "-webkit-backdrop-filter", "none");
      safeSetStyle(el as HTMLElement, "clip-path", "none");
      safeSetStyle(el as HTMLElement, "mask", "none");
      safeSetStyle(el as HTMLElement, "mask-image", "none");
      safeSetStyle(el as HTMLElement, "mix-blend-mode", "normal");

      // Replace problematic color functions in inline style attribute (global replace)
      const styleAttr = el.getAttribute("style");
      if (styleAttr && (problematicColorPatternGlobal.test(styleAttr) || explicitColorFunctionGlobal.test(styleAttr))) {
        const resolved = getResolvedColorOrFallback(origEquivalent);
        let replaced = styleAttr.replace(problematicColorPatternGlobal, resolved);
        replaced = replaced.replace(explicitColorFunctionGlobal, resolved);
        try {
          el.setAttribute("style", replaced);
        } catch { }
      }

      // Try to replace problematic color usages in computed background values
      try {
        const origCS = window.getComputedStyle(origEquivalent);
        const bg = origCS && (origCS.backgroundImage || origCS.background);
        if (bg && gradientPattern.test(bg)) {
          const bgColor = origCS.backgroundColor;
          const safe = bgColor && !problematicColorPattern.test(bgColor) ? bgColor : getResolvedColorOrFallback(origEquivalent);
          safeSetStyle(el as HTMLElement, "background", safe);
        } else if (bg && (problematicColorPattern.test(String(bg)) || explicitColorFunctionGlobal.test(String(bg)))) {
          const safe = getResolvedColorOrFallback(origEquivalent);
          safeSetStyle(el as HTMLElement, "background", safe);
        }
      } catch (e) { }

      const tag = el.tagName?.toLowerCase?.() ?? "";
      if (tag === "svg" || el.querySelectorAll && el.querySelectorAll("svg, [fill], [stroke]").length) {
        inlineSvgColorsForPair(origEquivalent, el);
      }
    } catch (e) {
      // ignore per-element errors
    }
  }
}

function findBestMatchInOriginal(cloneEl: Element, origRoot: Element): Element | null {
  const id = cloneEl.getAttribute && cloneEl.getAttribute("id");
  if (id) {
    try {
      const found = origRoot.querySelector(`#${CSS.escape(id)}`);
      if (found) return found;
    } catch { }
  }

  const path: Array<{ tag: string; idx: number }> = [];
  let cur: Element | null = cloneEl;
  const maxDepth = 30;
  let depth = 0;

  while (cur && depth < maxDepth) {
    const parent: Element | null = cur.parentElement;
    if (!parent) break;

    const siblings = Array.from(parent.children as HTMLCollectionOf<Element>).filter(
      (ch: Element) => ch.tagName === cur!.tagName
    );

    const idx = siblings.indexOf(cur);
    path.push({ tag: cur.tagName.toLowerCase(), idx: idx >= 0 ? idx : 0 });
    cur = parent;
    depth++;
  }

  path.reverse();

  let node: Element | null = origRoot;
  for (const step of path) {
    if (!node) break;
    const candidates: Element[] = Array.from(node.children as HTMLCollectionOf<Element>).filter(
      (c: Element) => c.tagName.toLowerCase() === step.tag
    );
    if (candidates.length === 0) {
      node = null;
      break;
    }
    node = candidates[step.idx] || candidates[0];
  }

  return node;
}

/* ===========================
   Main component
   =========================== */

export default function WorkflowRunnerUI() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Core state
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>("");
  const [workflowResponses, setWorkflowResponses] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const [inputFields, setInputFields] = useState<Record<string, any>>({});
  const [workflowDetails, setWorkflowDetails] = useState<any>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);


  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [downloadLocation, setDownloadLocation] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [downloadFileType, setDownloadFileType] = useState("PDF document");
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [inputValidation, setInputValidation] = useState<Record<string, InputValidation>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [savedInputPresets, setSavedInputPresets] = useState<Record<string, Record<string, string>>>({});
  const [currentPresetName, setCurrentPresetName] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const formatDropdownRef = useRef<HTMLDivElement>(null);
  const downloadButtonRef = useRef<HTMLButtonElement>(null);
  const [downloadMenuPosition, setDownloadMenuPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (showDownloadMenu && downloadButtonRef.current) {
      const rect = downloadButtonRef.current.getBoundingClientRect();
      setDownloadMenuPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.right + window.scrollX - 200
      });
    }
  }, [showDownloadMenu]);

  // Upload state per document variable
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({});
  const [uploadErrors, setUploadErrors] = useState<Record<string, string | null>>({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const uploadXhrs = useRef<Record<string, XMLHttpRequest | null>>({});

  // ref for capturing the right panel content (for PDF)
  const resultRef = useRef<HTMLDivElement | null>(null);

  // UI config
  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
  // Allow PDF and DOCX
  const ACCEPTED_MIME_TYPES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/markdown", "text/x-markdown"];



  useEffect(() => {
    try {
      const paramId = searchParams?.get("workflowid");
      if (paramId) {
        setSelectedWorkflowId(paramId);
      } else {
        setSelectedWorkflowId("");
      }
    } catch (e) {
      console.warn("Failed to read workflowid from URL", e);
    }
  }, [searchParams]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formatDropdownRef.current && !formatDropdownRef.current.contains(event.target as Node)) {
        // keep dropdown closed when clicking outside
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // reserved for future
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDownloading]);

  useEffect(() => {
    const savedPresets = localStorage.getItem('workflowInputPresets');
    if (savedPresets) {
      try {
        setSavedInputPresets(JSON.parse(savedPresets));
      } catch (error) {
        console.error('Failed to parse saved presets:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (!selectedWorkflowId) return;

    const fetchWorkflowDetails = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/workflows/${selectedWorkflowId}/getWorkflowDetails`);

        if (res.status === 403) {
          setPermissionDenied(true);
          setWorkflowDetails(null);
          return;
        }

        if (!res.ok) throw new Error(`Failed to fetch workflow details: ${res.status}`);
        const data = await res.json();

        if (data) {
          setWorkflowDetails(data);
          setPermissionDenied(false);

          const inputs = Array.isArray(data.requiredInputs) ? data.requiredInputs : [];
          const initialInputs: Record<string, any> = {};
          inputs.forEach((i: InputRequirement) => {
            if (i.type === "document") {
              initialInputs[i.name] = null;
            } else {
              initialInputs[i.name] = i.defaultValue ?? "";
            }
          });
          setInputFields(initialInputs);
        }
      } catch (err) {
        console.error("Failed to load workflow details:", err);
        setWorkflowDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkflowDetails();
  }, [selectedWorkflowId]);

  useEffect(() => {
    if (!workflowDetails || !Array.isArray(workflowDetails.requiredInputs)) return;

    setInputFields(prev => {
      const next: Record<string, any> = {};
      const seen = new Set<string>();

      for (const input of workflowDetails.requiredInputs) {
        seen.add(input.name);
        if (prev && Object.prototype.hasOwnProperty.call(prev, input.name)) {
          next[input.name] = prev[input.name];
        } else {
          next[input.name] = input.type === 'document' ? null : (input.defaultValue ?? "");
        }
      }

      return next;
    });

    setTimeout(() => {
      validateAllFields();
    }, 0);
  }, [workflowDetails?.requiredInputs]);

  const formatBytes = (b = 0) => {
    if (b === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(b) / Math.log(k));
    return parseFloat((b / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleInputChange = (field: string, value: any) => {
    setInputFields(prev => ({
      ...prev,
      [field]: value
    }));
    validateField(field, value);
  };

  const validateField = (field: string, value: any) => {
    if (!workflowDetails?.requiredInputs || !Array.isArray(workflowDetails.requiredInputs)) return;

    const inputRequirement = workflowDetails.requiredInputs.find(
      (input: InputRequirement) => input.name === field
    );

    if (!inputRequirement) return;

    let isValid = true;
    let message = "";

    if (inputRequirement.required) {
      if (inputRequirement.type === "document") {
        if (!value || typeof value !== "object" || !(value.storageId || value.fileUrl)) {
          isValid = false;
          message = "Required document not uploaded";
        }
      } else {
        if (String(value || "").trim() === "") {
          isValid = false;
          message = "This field is required";
        }
      }
    }

    if (isValid && inputRequirement.type === "number" && value !== undefined && value !== null && String(value).trim() !== "") {
      const num = Number(value);
      if (isNaN(num)) {
        isValid = false;
        message = "Please enter a valid number";
      }
    }

    if (isValid && inputRequirement.type === "select" && inputRequirement.options) {
      if (value && !inputRequirement.options.includes(value)) {
        isValid = false;
        message = "Please select a valid option";
      }
    }

    setInputValidation(prev => ({
      ...prev,
      [field]: { isValid, message }
    }));
  };

  const validateAllFields = (): boolean => {
    if (!workflowDetails?.requiredInputs || !Array.isArray(workflowDetails.requiredInputs)) return true;

    let allValid = true;
    const newValidation: Record<string, InputValidation> = {};

    workflowDetails.requiredInputs.forEach((input: InputRequirement) => {
      const value = inputFields[input.name];

      let isValid = true;
      let message = "";

      if (input.required) {
        if (input.type === "document") {
          if (!value || typeof value !== "object" || !(value.storageId || value.fileUrl)) {
            isValid = false;
            message = "Required document not uploaded";
            allValid = false;
          }
        } else if (String(value || "").trim() === "") {
          isValid = false;
          message = "This field is required";
          allValid = false;
        }
      }

      if (isValid && input.type === "number" && value) {
        const num = Number(value);
        if (isNaN(num)) {
          isValid = false;
          message = "Please enter a valid number";
          allValid = false;
        }
      } else if (isValid && input.type === "select" && input.options && value) {
        if (!input.options.includes(value)) {
          isValid = false;
          message = "Please select a valid option";
          allValid = false;
        }
      }

      newValidation[input.name] = { isValid, message };
    });

    setInputValidation(newValidation);
    return allValid;
  };

  const loadPreset = (presetName: string) => {
    if (selectedWorkflowId && savedInputPresets && typeof savedInputPresets === 'object' && savedInputPresets[selectedWorkflowId]) {
      const presets = savedInputPresets[selectedWorkflowId];
      if (presetName in presets) {
        const preset = presets[presetName];
        if (preset && typeof preset === 'object' && !Array.isArray(preset) && preset !== null) {
          setInputFields(preset);
          setCurrentPresetName(presetName);
          setTimeout(() => {
            validateAllFields();
          }, 0);
        } else {
          console.error("Invalid preset format:", preset);
        }
      } else {
        console.error("Preset not found:", presetName);
      }
    } else {
      console.error("Cannot load preset - workflow or preset data missing");
    }
  };

  const saveCurrentInputs = (presetName: string) => {
    if (!presetName.trim() || !selectedWorkflowId) return;

    try {
      const currentInputs = { ...inputFields };
      const currentPresets = savedInputPresets || {};
      const workflowPresets = currentPresets[selectedWorkflowId] || {};

      const updatedPresets = {
        ...currentPresets,
        [selectedWorkflowId]: {
          ...workflowPresets,
          [presetName]: currentInputs
        }
      };

      setSavedInputPresets(updatedPresets as Record<string, Record<string, string>>);
      localStorage.setItem('workflowInputPresets', JSON.stringify(updatedPresets));
      setCurrentPresetName(presetName);
    } catch (error) {
      console.error('Error saving preset:', error);
    }
  };

  const deletePreset = (presetName: string) => {
    if (!selectedWorkflowId || !savedInputPresets[selectedWorkflowId]) return;

    const workflowPresets = { ...savedInputPresets[selectedWorkflowId] };
    delete workflowPresets[presetName];

    const updatedPresets = {
      ...savedInputPresets,
      [selectedWorkflowId]: workflowPresets
    };

    setSavedInputPresets(updatedPresets);
    localStorage.setItem('workflowInputPresets', JSON.stringify(updatedPresets));

    if (currentPresetName === presetName) {
      setCurrentPresetName("");
    }
  };

  // Upload file using XMLHttpRequest to track progress and POST to Convex HTTP action
  const uploadDocumentForVariable = (variableName: string, file: File) => {
    if (!file) return;

    // Client-side validation
    if (ACCEPTED_MIME_TYPES && !ACCEPTED_MIME_TYPES.includes(file.type)) {
      // For .md, file.type might be empty or plain text depending on OS/Browser
      const isMd = file.name.toLowerCase().endsWith('.md');
      if (!isMd) {
        setUploadErrors(prev => ({ ...prev, [variableName]: "Only PDF, Word or Markdown documents are accepted" }));
        return;
      }
    }
    if (MAX_FILE_SIZE_BYTES && file.size > MAX_FILE_SIZE_BYTES) {
      setUploadErrors(prev => ({ ...prev, [variableName]: `File is too large (max ${formatBytes(MAX_FILE_SIZE_BYTES)})` }));
      return;
    }

    setUploadErrors(prev => ({ ...prev, [variableName]: null }));
    setUploadingFiles(prev => ({ ...prev, [variableName]: true }));
    setUploadProgress(prev => ({ ...prev, [variableName]: 0 }));

    const xhr = new XMLHttpRequest();
    uploadXhrs.current[variableName] = xhr;

    xhr.upload.onprogress = (ev) => {
      if (ev.lengthComputable) {
        const percent = Math.round((ev.loaded / ev.total) * 100);
        setUploadProgress(prev => ({ ...prev, [variableName]: percent }));
      } else {
        setUploadProgress(prev => ({ ...prev, [variableName]: 50 })); // indeterminate-ish
      }
    };

    xhr.onerror = () => {
      setUploadingFiles(prev => ({ ...prev, [variableName]: false }));
      setUploadErrors(prev => ({ ...prev, [variableName]: "Upload failed — network error" }));
      setUploadProgress(prev => ({ ...prev, [variableName]: 0 }));
      uploadXhrs.current[variableName] = null;
    };

    xhr.onload = () => {
      setUploadingFiles(prev => ({ ...prev, [variableName]: false }));
      uploadXhrs.current[variableName] = null;
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (data.error) {
            setUploadErrors(prev => ({ ...prev, [variableName]: data.error }));
            return;
          }

          const fileMeta: FileMeta = {
            storageId: data.storageId,
            originalFilename: data.originalFilename ?? file.name,
            size: data.size ?? file.size,
            contentType: data.contentType ?? file.type,
          };

          setInputFields(prev => ({ ...prev, [variableName]: fileMeta }));
          setUploadProgress(prev => ({ ...prev, [variableName]: 100 }));
          setTimeout(() => setUploadProgress(prev => ({ ...prev, [variableName]: 0 })), 800);
          validateField(variableName, fileMeta);
        } catch (e) {
          setUploadErrors(prev => ({ ...prev, [variableName]: "Upload succeeded but response invalid" }));
        }
      } else {
        const text = xhr.responseText || `${xhr.status}`;
        setUploadErrors(prev => ({ ...prev, [variableName]: `Upload failed: ${text}` }));
      }
    };

    const form = new FormData();
    form.append("file", file);
    form.append("filename", file.name);
    form.append("variableName", variableName);
    form.append("workflowId", selectedWorkflowId || "");

    xhr.open("POST", "/api/upload");
    xhr.send(form);
  };

  const cancelUpload = (variableName: string) => {
    const xhr = uploadXhrs.current[variableName];
    if (xhr) {
      try { xhr.abort(); } catch (e) { /* ignore */ }
      uploadXhrs.current[variableName] = null;
    }
    setUploadingFiles(prev => ({ ...prev, [variableName]: false }));
    setUploadProgress(prev => ({ ...prev, [variableName]: 0 }));
    setUploadErrors(prev => ({ ...prev, [variableName]: "Upload cancelled" }));
  };

  const removeUploadedFile = (variableName: string) => {
    cancelUpload(variableName);
    setInputFields(prev => ({ ...prev, [variableName]: null }));
    setUploadProgress(prev => ({ ...prev, [variableName]: 0 }));
    setUploadErrors(prev => ({ ...prev, [variableName]: null }));
  };

  const handleRunWorkflow = async () => {
    if (!selectedWorkflowId) {
      alert("Please provide a workflow id in the URL (workflowid query param).");
      return;
    }

    if (!validateAllFields()) {
      alert("Please fix the validation errors before running the workflow");
      return;
    }

    setIsExecuting(true);
    setWorkflowResponses([]);

    try {
      const response = await fetch(`/api/workflows/${selectedWorkflowId}/execute-stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputFields),
      });

      if (!response.ok) {
        let errorText = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData?.error) errorText = errorData.error;
        } catch (e) {
          try {
            const errorDetail = await response.text();
            if (errorDetail) errorText += `: ${errorDetail}`;
          } catch { }
        }
        throw new Error(errorText);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n\n');

        // Keep the last part in the buffer as it might be incomplete
        buffer = parts.pop() || '';

        for (const part of parts) {
          const lines = part.split('\n');
          let event = 'message';
          let data = '';

          for (const line of lines) {
            if (line.startsWith('event:')) {
              event = line.substring(6).trim();
            } else if (line.startsWith('data:')) {
              data = line.substring(5).trim();
            }
          }

          if (data) {
            try {
              const parsedData = JSON.parse(data);
              const responseData = {
                event,
                data: parsedData,
                timestamp: parsedData.timestamp || new Date().toISOString(),
              };

              setWorkflowResponses((prev) => [...prev, responseData]);
            } catch (parseError) {
              console.error('Error parsing SSE data:', parseError, 'Raw data:', data);
              // Only show error if it's not just an empty keep-alive or similar
              if (data.length > 0) {
                setWorkflowResponses((prev) => [...prev, {
                  event: 'error',
                  data: { error: 'Failed to parse server response' },
                  timestamp: new Date().toISOString(),
                }]);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Workflow execution error:", error);
      setWorkflowResponses((prev) => [
        ...prev,
        {
          event: "error",
          data: { error: error instanceof Error ? error.message : "Unknown error" },
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsExecuting(false);
    }
  };

  const getWorkflowData = () => {
    let workflowId = selectedWorkflowId || "workflow";
    let workflowName = workflowDetails?.name || "Workflow Execution";
    let nodeResults: Record<string, any> = {};
    let variables: Record<string, any> = {};

    const workflowStarted = workflowResponses.find(r => r.event === "workflow_started");
    if (workflowStarted) {
      workflowId = workflowStarted.data.workflowId || workflowId;
      workflowName = workflowStarted.data.workflowName || workflowName;
    }

    workflowResponses.forEach(response => {
      if (response.event === "node_completed" || response.event === "node_failed") {
        const nodeId = response.data.nodeId;
        const nodeName = response.data.nodeName;
        nodeResults[nodeId] = {
          nodeName,
          status: response.event === "node_completed" ? "completed" : "failed",
          output: response.data.result?.output || null,
          error: response.data.error || null,
          startedAt: response.data.startedAt || response.timestamp,
          completedAt: response.timestamp
        };
      }
    });

    const stateUpdates = workflowResponses.filter(r => r.event === "state_update");
    if (stateUpdates.length > 0) {
      const latestState = stateUpdates[stateUpdates.length - 1];
      variables = latestState.data.variables || {};
    }

    return { workflowId, workflowName, nodeResults, variables };
  };

  /**
   * Fallback: creates a plain-text PDF from visible text
   * This uses jsPDF.splitTextToSize to properly wrap paragraphs to page width.
   */
  function fallbackPdfFromPlainText(text: string, filename = "workflow-output.pdf") {
    try {
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 40;
      const contentWidth = pageWidth - margin * 2;
      const fontSize = 12;
      pdf.setFontSize(fontSize);

      const paragraphs = String(text).replace(/\r/g, "").split(/\n{2,}/).map(p => p.trim());

      let y = margin;
      for (const p of paragraphs) {
        if (!p) { y += fontSize + 6; continue; }
        const lines = pdf.splitTextToSize(p, contentWidth);
        for (const line of lines) {
          if (y + fontSize + 8 > pageHeight - margin) {
            pdf.addPage();
            y = margin;
            pdf.setFontSize(fontSize);
          }
          pdf.text(line, margin, y);
          y += fontSize + 6;
        }
        // paragraph gap
        y += fontSize;
      }

      pdf.save(filename);
    } catch (err) {
      console.error("Fallback PDF creation also failed:", err);
      throw err;
    }
  }

  /**
   * downloadResultAsPDF
   * - preserves HTML formatting including tables, headers, bold text
   * - uses direct DOM parsing and jsPDF native rendering
   * - maintains visual fidelity with proper structure
   */
  async function downloadResultAsPDF(filename = "workflow-output.pdf") {
    if (!resultRef.current) {
      alert("Nothing to download");
      return;
    }

    try {
      setIsDownloading(true);

      const element = resultRef.current;

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm for A4
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm for A4
      const margin = 20; // Increased from 15mm
      const contentWidth = 160; // Very conservative: 210 - 50 (extra safety margin)
      let yPosition = margin;

      console.log('PDF dimensions:', { pageWidth, pageHeight, margin, contentWidth });

      // Debug: log a sample of the HTML
      console.log('HTML structure:', element.children.length, 'top-level elements');
      if (element.children[0]) {
        console.log('First element:', element.children[0].tagName, element.children[0].textContent?.substring(0, 100));
      }

      // Helper function to clean text for PDF rendering
      const cleanText = (text: string): string => {
        return text.replace(/[\u2018\u2019]/g, "'")      // Replace smart quotes
          .replace(/[\u201C\u201D]/g, '"')       // Replace smart double quotes
          .replace(/[\u2192\u2794\u27A1]/g, '->') // Replace arrows with ->
          .replace(/[\u2022\u2023\u25E6\u2043]/g, '*') // Replace bullets with *
          .replace(/[\u2013\u2014]/g, '-')       // Replace em/en dashes
          .replace(/[\u2026]/g, '...')           // Replace ellipsis
          .replace(/[^\x00-\x7F]/g, (char) => {
            // Keep common symbols if possible, or replace with space to avoid mangling
            return ' ';
          })
          .trim();
      };

      // Helper function to add new page if needed
      const checkPageBreak = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      };

      // Helper function to render table
      const renderTable = (table: HTMLTableElement) => {
        const rows: string[][] = [];
        const headerRows: string[][] = [];

        // Extract table data
        const thead = table.querySelector('thead');
        const tbody = table.querySelector('tbody');

        if (thead) {
          thead.querySelectorAll('tr').forEach(tr => {
            const rowData: string[] = [];
            tr.querySelectorAll('th, td').forEach(cell => {
              rowData.push((cell.textContent || '').trim());
            });
            headerRows.push(rowData);
          });
        }

        if (tbody) {
          tbody.querySelectorAll('tr').forEach(tr => {
            const rowData: string[] = [];
            tr.querySelectorAll('td').forEach(cell => {
              rowData.push((cell.textContent || '').trim());
            });
            rows.push(rowData);
          });
        } else {
          // No tbody, get all rows
          table.querySelectorAll('tr').forEach((tr, index) => {
            const rowData: string[] = [];
            const cells = tr.querySelectorAll('th, td');
            cells.forEach(cell => {
              rowData.push((cell.textContent || '').trim());
            });

            if (index === 0 && tr.querySelector('th')) {
              headerRows.push(rowData);
            } else {
              rows.push(rowData);
            }
          });
        }

        // Use autoTable for proper table rendering
        if (typeof (pdf as any).autoTable === 'function') {
          (pdf as any).autoTable({
            startY: yPosition,
            head: headerRows.length > 0 ? headerRows : undefined,
            body: rows,
            margin: { left: margin, right: margin, top: margin, bottom: margin },
            styles: {
              fontSize: 8,
              cellPadding: 2,
              overflow: 'linebreak',
              cellWidth: 'wrap',
              halign: 'left',
              valign: 'top',
            },
            headStyles: {
              fillColor: [240, 240, 240],
              textColor: [0, 0, 0],
              fontStyle: 'bold',
              fontSize: 9,
            },
            theme: 'grid',
            tableWidth: 'wrap',
            pageBreak: 'auto',
          });
          yPosition = (pdf as any).lastAutoTable.finalY + 5;
        } else {
          // Fallback: simple table rendering with word wrap
          const colCount = Math.max(
            ...headerRows.map(r => r.length),
            ...rows.map(r => r.length)
          );
          const colWidth = contentWidth / colCount;

          // Render headers with word wrap
          headerRows.forEach(row => {
            let maxHeight = 0;
            const cellHeights: number[] = [];

            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'bold');

            // Calculate heights for all cells in row
            row.forEach((cell, i) => {
              const lines = pdf.splitTextToSize(cell, colWidth - 4);
              const height = Math.max(lines.length * 4 + 4, 8);
              cellHeights.push(height);
              maxHeight = Math.max(maxHeight, height);
            });

            checkPageBreak(maxHeight);

            // Draw cells with calculated height
            row.forEach((cell, i) => {
              const x = margin + (i * colWidth);
              pdf.rect(x, yPosition, colWidth, maxHeight);
              const lines = pdf.splitTextToSize(cell, colWidth - 4);
              lines.forEach((line: string, lineIdx: number) => {
                pdf.text(line, x + 2, yPosition + 4 + (lineIdx * 4));
              });
            });

            yPosition += maxHeight;
          });

          // Render body rows with word wrap
          pdf.setFont('helvetica', 'normal');
          rows.forEach(row => {
            let maxHeight = 0;
            const cellHeights: number[] = [];

            pdf.setFontSize(8);

            // Calculate heights for all cells in row
            row.forEach((cell, i) => {
              const lines = pdf.splitTextToSize(cell, colWidth - 4);
              const height = Math.max(lines.length * 4 + 4, 8);
              cellHeights.push(height);
              maxHeight = Math.max(maxHeight, height);
            });

            checkPageBreak(maxHeight);

            // Draw cells with calculated height
            row.forEach((cell, i) => {
              const x = margin + (i * colWidth);
              pdf.rect(x, yPosition, colWidth, maxHeight);
              const lines = pdf.splitTextToSize(cell, colWidth - 4);
              lines.forEach((line: string, lineIdx: number) => {
                pdf.text(line, x + 2, yPosition + 4 + (lineIdx * 4));
              });
            });

            yPosition += maxHeight;
          });

          yPosition += 5;
        }
      };

      // Helper to process text nodes with inline formatting
      const processTextWithFormatting = (el: Element, fontSize = 10) => {
        // Use innerText to preserve some formatting like line breaks from <br>
        const text = cleanText((el as HTMLElement).innerText || el.textContent || '');
        if (!text) return;

        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', 'normal');

        const paragraphs = text.split('\n');
        const lineHeight = fontSize * 0.6;

        paragraphs.forEach((paragraph) => {
          if (!paragraph.trim()) {
            yPosition += 2; // small gap for empty lines
            return;
          }

          const lines = pdf.splitTextToSize(paragraph, contentWidth);

          lines.forEach((line: string) => {
            checkPageBreak(lineHeight + 2);
            pdf.setFontSize(fontSize);
            pdf.setFont('helvetica', 'normal');
            pdf.text(line, margin, yPosition);
            yPosition += lineHeight;
          });
        });

        yPosition += 2; // Small spacing after processed text block
      };

      // Process each child element
      const processElement = (el: Element, depth = 0) => {
        const tagName = el.tagName;
        const text = cleanText(el.textContent || '');

        if (!text && tagName !== 'TABLE' && tagName !== 'BR' && tagName !== 'HR') return;

        switch (tagName) {
          case 'H1':
            checkPageBreak(15);
            pdf.setFontSize(18);
            pdf.setFont('helvetica', 'bold');
            const h1Lines = pdf.splitTextToSize(text, contentWidth);
            h1Lines.forEach((line: string) => {
              checkPageBreak(10);
              pdf.setFontSize(18);
              pdf.setFont('helvetica', 'bold');
              pdf.text(line, margin, yPosition);
              yPosition += 10;
            });
            yPosition += 4;
            break;

          case 'H2':
            checkPageBreak(12);
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            const h2Lines = pdf.splitTextToSize(text, contentWidth);
            h2Lines.forEach((line: string) => {
              checkPageBreak(8);
              pdf.setFontSize(14);
              pdf.setFont('helvetica', 'bold');
              pdf.text(line, margin, yPosition);
              yPosition += 8;
            });
            yPosition += 3;
            break;

          case 'H3':
            checkPageBreak(10);
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            const h3Lines = pdf.splitTextToSize(text, contentWidth);
            h3Lines.forEach((line: string) => {
              checkPageBreak(7);
              pdf.setFontSize(12);
              pdf.setFont('helvetica', 'bold');
              pdf.text(line, margin, yPosition);
              yPosition += 7;
            });
            yPosition += 2;
            break;

          case 'TABLE':
            checkPageBreak(20);
            renderTable(el as HTMLTableElement);
            yPosition += 5;
            break;

          case 'UL':
          case 'OL':
            // Use only direct LI children to prevent double processing in recursive calls
            const listItems = Array.from(el.children).filter(child => child.tagName === 'LI');
            listItems.forEach((li, index) => {
              pdf.setFontSize(10);
              pdf.setFont('helvetica', 'normal');
              const bullet = tagName === 'UL' ? '•' : `${index + 1}.`;

              // Process LI content - if it has nested paragraphs or lists, we might need more complexity
              // but for now, innerText handles basic nested formatting better than textContent
              const itemText = cleanText((li as HTMLElement).innerText || li.textContent || '');
              const lines = pdf.splitTextToSize(`${bullet} ${itemText}`, contentWidth - 5);

              lines.forEach((line: string, i: number) => {
                checkPageBreak(6);
                pdf.setFontSize(10);
                pdf.setFont('helvetica', 'normal');
                pdf.text(line, margin + (i > 0 ? 5 : 0), yPosition);
                yPosition += 6;
              });
            });
            yPosition += 3;
            break;

          case 'P':
          case 'SPAN':
          case 'BLOCKQUOTE':
            checkPageBreak(10);
            processTextWithFormatting(el, 10);
            break;

          case 'PRE':
          case 'CODE':
            checkPageBreak(10);
            pdf.setFontSize(9);
            pdf.setFont('courier', 'normal');
            const codeLines = text.split('\n');
            codeLines.forEach(line => {
              const wrappedLines = pdf.splitTextToSize(line || ' ', contentWidth - 4);
              wrappedLines.forEach((wrappedLine: string) => {
                checkPageBreak(6);
                pdf.text(wrappedLine, margin + 2, yPosition);
                yPosition += 6;
              });
            });
            yPosition += 3;
            break;

          case 'HR':
            checkPageBreak(5);
            pdf.setDrawColor(200, 200, 200);
            pdf.line(margin, yPosition, pageWidth - margin, yPosition);
            yPosition += 5;
            break;

          case 'BR':
            yPosition += 5;
            break;

          case 'DIV':
          case 'SECTION':
          case 'ARTICLE':
            // Process children recursively for container elements
            Array.from(el.children).forEach(child => processElement(child, depth + 1));
            break;

          default:
            // For unknown elements, try to process children if they exist, 
            // otherwise treat as a text block
            if (el.children.length > 0) {
              Array.from(el.children).forEach(child => processElement(child, depth + 1));
            } else if (text) {
              checkPageBreak(10);
              processTextWithFormatting(el, 10);
            }
        }
      };

      // Process all child elements
      Array.from(element.children).forEach(child => processElement(child));

      // Add timestamp to filename to avoid caching
      const timestamp = new Date().getTime();
      const finalFilename = filename.replace('.pdf', `-${timestamp}.pdf`);
      pdf.save(finalFilename);

    } catch (err: any) {
      console.error("Error creating PDF:", err);

      // Fallback to text-based PDF
      console.log("Falling back to text-based PDF");
      try {
        const element = resultRef.current;
        const innerText = element?.innerText || element?.textContent || "";
        await fallbackPdfFromPlainText(innerText, filename);
      } catch (fallbackErr) {
        console.error("Fallback PDF creation failed:", fallbackErr);
        alert("Failed to create PDF: " + (err instanceof Error ? err.message : String(err)));
      }
    } finally {
      setIsDownloading(false);
    }
  }

  async function downloadResultAsDOCX(filename = "workflow-output.docx") {
    if (!resultRef.current) {
      alert("Nothing to download");
      return;
    }
    try {
      setIsDownloading(true);
      const element = resultRef.current;

      const { workflowName } = getWorkflowData();
      const timestamp = new Date().getTime();
      const finalFilename = filename.replace('.docx', `-${timestamp}.docx`);

      // We'll build a standard DOCX using the 'docx' library
      // This is much more compatible with mammoth and other parsers than html-docx-js

      const children: any[] = [];

      // Title
      children.push(new Paragraph({
        text: workflowName || "Workflow Result",
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 400 },
      }));

      // Recursive function to process DOM elements into docx components
      const processNode = (node: Node, depth = 0) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent; // Don't trim here to preserve spaces
          if (text && text.replace(/\s/g, '').length > 0) {
            return [new TextRun(text)];
          }
          return [];
        }

        if (node.nodeType !== Node.ELEMENT_NODE) return [];
        const el = node as HTMLElement;
        const tagName = el.tagName.toUpperCase();

        // BLOCK ELEMENTS
        if (tagName === 'P' || tagName === 'DIV' || tagName === 'SECTION' || tagName === 'ARTICLE') {
          const paragraphChildren: any[] = [];
          Array.from(el.childNodes).forEach(child => {
            paragraphChildren.push(...processNode(child, depth + 1));
          });
          if (paragraphChildren.length > 0) {
            children.push(new Paragraph({ children: paragraphChildren, spacing: { after: 200 } }));
          }
          return [];
        }

        if (tagName === 'H1' || tagName === 'H2' || tagName === 'H3' || tagName === 'H4' || tagName === 'H5' || tagName === 'H6') {
          const level = tagName === 'H1' ? HeadingLevel.HEADING_1 :
            tagName === 'H2' ? HeadingLevel.HEADING_2 :
              tagName === 'H3' ? HeadingLevel.HEADING_3 :
                tagName === 'H4' ? HeadingLevel.HEADING_4 :
                  tagName === 'H5' ? HeadingLevel.HEADING_5 :
                    HeadingLevel.HEADING_6;

          children.push(new Paragraph({
            text: el.innerText,
            heading: level,
            spacing: { before: 400, after: 200 },
          }));
          return [];
        }

        if (tagName === 'BLOCKQUOTE') {
          const quoteChildren: any[] = [];
          Array.from(el.childNodes).forEach(child => {
            quoteChildren.push(...processNode(child, depth + 1));
          });
          if (quoteChildren.length > 0) {
            children.push(new Paragraph({
              children: quoteChildren,
              indent: { left: 720 }, // roughly 0.5 inch
              spacing: { before: 200, after: 200 }
            }));
          }
          return [];
        }

        if (tagName === 'UL' || tagName === 'OL') {
          const isOrdered = tagName === 'OL';
          const listItems = Array.from(el.children).filter(child => child.tagName === 'LI');

          listItems.forEach((li, index) => {
            const liChildren: any[] = [];
            Array.from(li.childNodes).forEach(child => {
              liChildren.push(...processNode(child, depth + 1));
            });

            if (liChildren.length > 0) {
              children.push(new Paragraph({
                children: liChildren,
                bullet: isOrdered ? undefined : { level: 0 },
                numbering: isOrdered ? { reference: "default-numbering", level: 0 } : undefined,
                spacing: { after: 120 }
              }));
            }
          });
          return [];
        }

        if (tagName === 'PRE' || tagName === 'CODE') {
          const codeText = el.innerText || el.textContent || "";
          if (codeText) {
            children.push(new Paragraph({
              children: [new TextRun({ text: codeText, font: "Courier New" })],
              spacing: { before: 200, after: 200 },
              // Standard docx doesn't easily support shading in a simple Paragraph call here without more setup
            }));
          }
          return [];
        }

        if (tagName === 'TABLE') {
          const rows = Array.from(el.querySelectorAll('tr')).map(tr => {
            return new TableRow({
              children: Array.from(tr.querySelectorAll('td, th')).map(cell => {
                return new TableCell({
                  children: [new Paragraph((cell as HTMLElement).innerText)],
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1 },
                    bottom: { style: BorderStyle.SINGLE, size: 1 },
                    left: { style: BorderStyle.SINGLE, size: 1 },
                    right: { style: BorderStyle.SINGLE, size: 1 },
                  }
                });
              })
            });
          });

          if (rows.length > 0) {
            children.push(new Table({
              rows,
              width: { size: 100, type: "pct" as any },
            }));
            children.push(new Paragraph({ text: "", spacing: { after: 200 } }));
          }
          return [];
        }

        if (tagName === 'HR') {
          children.push(new Paragraph({
            border: {
              bottom: { color: "auto", space: 1, style: BorderStyle.SINGLE, size: 6 }
            },
            spacing: { before: 200, after: 200 }
          }));
          return [];
        }

        if (tagName === 'BR') {
          return [new TextRun({ break: 1 })];
        }

        // INLINE ELEMENTS
        const runs: any[] = [];
        const isBold = tagName === 'STRONG' || tagName === 'B' || tagName === 'TH';
        const isItalic = tagName === 'EM' || tagName === 'I';
        const isUnderline = tagName === 'U';

        Array.from(el.childNodes).forEach(child => {
          const subRuns = processNode(child, depth + 1);
          subRuns.forEach((run: any) => {
            if (run instanceof TextRun) {
              if (isBold) (run as any).bold = true;
              if (isItalic) (run as any).italics = true;
              if (isUnderline) (run as any).underline = { type: "single" };
            }
            runs.push(run);
          });
        });
        return runs;
      };

      // Process the result element
      Array.from(element.childNodes).forEach(node => processNode(node));

      const doc = new Document({
        numbering: {
          config: [
            {
              reference: "default-numbering",
              levels: [
                {
                  level: 0,
                  format: "decimal",
                  text: "%1.",
                  alignment: AlignmentType.LEFT,
                },
              ],
            },
          ],
        },
        sections: [{
          properties: {},
          children: children,
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, finalFilename);

    } catch (error) {
      console.error("Error generating DOCX:", error);
      throw error;
    } finally {
      setIsDownloading(false);
    }
  }

  async function downloadResultAsMarkdown(filename = "workflow-output.md") {
    if (workflowResponses.length === 0) {
      alert("Nothing to download");
      return;
    }
    try {
      setIsDownloading(true);

      // Use the raw final output and displayAsText helper to get high-fidelity markdown
      const rawOutput = getRawFinalOutput(workflowResponses, workflowDetails);
      const textContent = displayAsText(rawOutput);

      if (!textContent) {
        alert("No visible result to download");
        return;
      }

      const { workflowName } = getWorkflowData();
      const timestamp = new Date().getTime();
      const finalFilename = filename.replace('.md', `-${timestamp}.md`);

      const blob = new Blob([textContent], { type: 'text/markdown;charset=utf-8' });
      saveAs(blob, finalFilename);

      setDownloadLocation(getDocumentSaveLocation());
      setShowDownloadSuccess(true);
      setTimeout(() => setShowDownloadSuccess(false), 5000);
    } catch (error) {
      console.error("Error generating Markdown:", error);
      throw error;
    } finally {
      setIsDownloading(false);
    }
  }

  const handleDownloadResults = async (format: 'pdf' | 'docx' | 'markdown' = 'pdf') => {
    if (workflowResponses.length === 0) return;

    setIsDownloading(true);
    setShowDownloadSuccess(false);

    const { workflowId, workflowName, nodeResults, variables } = getWorkflowData();

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const safeName = (workflowName || 'workflow').replace(/\s+/g, '-').toLowerCase();

    try {
      if (format === 'docx') {
        setDownloadFileType("Word document");
        await downloadResultAsDOCX(`workflow-results-${safeName}.docx`);
      } else if (format === 'markdown') {
        setDownloadFileType("Markdown document");
        await downloadResultAsMarkdown(`workflow-results-${safeName}.md`);
      } else {
        setDownloadFileType("PDF document");
        await downloadResultAsPDF(`workflow-results-${safeName}.pdf`);
      }
      setDownloadLocation(getDocumentSaveLocation());
      setShowDownloadSuccess(true);
      setTimeout(() => setShowDownloadSuccess(false), 5000);
    } catch (error) {
      console.error(`Error generating ${format.toUpperCase()}:`, error);
      alert(`Failed to generate ${format.toUpperCase()}: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsDownloading(false);
      setShowLocationModal(true);
    }
  };

  useEffect(() => {
    console.log('Current workflow details:', workflowDetails);
    console.log('Current input fields:', inputFields);
  }, [workflowDetails, inputFields]);

  if (permissionDenied) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="bg-red-50 p-6 rounded-2xl mb-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-500 max-w-md">
          You do not have permission to access this workflow.
        </p>
      </div>
    );
  }

  if (!selectedWorkflowId) {
    return (
      <div className="flex items-center justify-center h-screen p-6">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No workflow selected</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            This page expects a workflow id in the URL. Please open this page with a valid query param like:
            <div className="mt-3 p-3 bg-gray-50 rounded text-xs text-gray-600">
              <code>/workflow-runner?workflowid=workflow_1762276839721</code>
            </div>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 px-32 sm:px-64 lg:px-128"
      style={{
        backgroundImage: `url('/wave-blue.svg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="flex-1 w-full h-full py-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
          <div className="col-span-1 lg:col-span-2 relative rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl border border-indigo-100">
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(180deg, rgba(238,242,255,0.9) 0%, rgba(241,238,255,0.75) 50%, rgba(249,250,255,0.6) 100%)",
              }}
            ></div>

            <div className="relative z-10 flex flex-col h-full backdrop-blur-sm">
              <div className="p-6 border-b border-gray-200 
                              bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-200
                              flex items-center justify-between rounded-t-lg shadow-sm px-13 py-13">
                <h2 className="text-xl font-semibold tracking-tight text-slate-800 flex items-center drop-shadow-sm">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                    Flow Executor
                  </span>
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    {workflowDetails?.name?.split?.("_")?.pop?.() || selectedWorkflowId}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Provide the required inputs below and click{" "}
                    <strong>Run Workflow</strong> to execute.
                  </p>
                </div>

                {workflowDetails && (
                  <div className="mb-6 bg-white/90 rounded-lg border border-gray-200 p-4 shadow-sm">
                    <h3 className="text-md font-medium mb-4 text-gray-700 flex items-center">
                      <span className="mr-2">Required Inputs</span>
                    </h3>

                    {isLoading ? (
                      <div className="text-center py-8">
                        <div className="inline-block animate-spin h-6 w-6 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
                        <p className="mt-2 text-sm text-gray-500">Loading input fields...</p>
                      </div>
                    ) : workflowDetails.requiredInputs &&
                      Array.isArray(workflowDetails.requiredInputs) &&
                      workflowDetails.requiredInputs.length > 0 ? (
                      <div className="space-y-6">
                        {workflowDetails.requiredInputs.map((input: InputRequirement) => (
                          <div
                            key={input.name}
                            className="bg-gray-50/70 p-4 rounded-md border border-gray-200"
                          >
                            <div className="flex justify-between mb-2">
                              <label className="block text-sm font-medium text-gray-700">
                                {input.name}{" "}
                                {input.required && <span className="text-red-500">*</span>}
                              </label>
                              {inputValidation[input.name] &&
                                !inputValidation[input.name].isValid && (
                                  <span className="text-xs text-red-500">
                                    {inputValidation[input.name].message}
                                  </span>
                                )}
                            </div>

                            {input.type === "select" && input.options ? (
                              <select
                                value={inputFields[input.name] || ""}
                                onChange={(e) =>
                                  handleInputChange(input.name, e.target.value)
                                }
                                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputValidation[input.name] &&
                                  !inputValidation[input.name].isValid
                                  ? "border-red-300 bg-red-50"
                                  : "border-gray-300"
                                  }`}>


                                <option value="">-- Select an option --</option>
                                {input.options.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            ) : input.type === "number" ? (
                              <input
                                type="number"
                                value={inputFields[input.name] ?? ""}
                                onChange={(e) =>
                                  handleInputChange(input.name, e.target.value)
                                }
                                placeholder={input.description}
                                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputValidation[input.name] &&
                                  !inputValidation[input.name].isValid
                                  ? "border-red-300 bg-red-50"
                                  : "border-gray-300"
                                  }`} />
                            ) : input.type === "textarea" ? (
                              <textarea
                                value={inputFields[input.name] ?? ""}
                                onChange={(e) =>
                                  handleInputChange(input.name, e.target.value)
                                }
                                placeholder={input.description}
                                rows={4}
                                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputValidation[input.name] &&
                                  !inputValidation[input.name].isValid
                                  ? "border-red-300 bg-red-50"
                                  : "border-gray-300"
                                  }`} />
                            ) : input.type === "document" ? (
                              <div className="space-y-3">
                                <div
                                  className={`relative border-2 rounded-lg p-4 transition-colors duration-150 ${uploadingFiles[input.name] ? "border-indigo-400 bg-indigo-50/40" : "border-dashed border-gray-200 bg-white"}`}
                                  onDragOver={(e) => { e.preventDefault(); (e.currentTarget as HTMLElement).classList.add("border-indigo-400"); }}
                                  onDragLeave={(e) => { (e.currentTarget as HTMLElement).classList.remove("border-indigo-400"); }}
                                  onDrop={(e) => {
                                    e.preventDefault();
                                    (e.currentTarget as HTMLElement).classList.remove("border-indigo-400");
                                    const file = e.dataTransfer.files[0];
                                    if (file) uploadDocumentForVariable(input.name, file);
                                  }}
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="flex items-center gap-3">
                                        {/* <svg className="w-15 h-15 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 2h6l4 4v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 2v6h6" />
                                        </svg> */}
                                        <div>
                                          <div className="text-sm font-medium">{input.description || (input as any).documentName || "Upload Document"}</div>
                                          <div className="text-xs text-gray-500">Drag & drop a PDF, Word or Markdown doc here, or click to select. Max: {formatBytes(MAX_FILE_SIZE_BYTES)}</div>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <label className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white text-xs font-medium rounded shadow cursor-pointer hover:brightness-110">
                                        <input
                                          type="file"
                                          accept={ACCEPTED_MIME_TYPES.join(",") + ",.md,.docx,.pdf"}
                                          className="hidden"
                                          onChange={(e) => {
                                            const f = e.target.files?.[0] ?? null;
                                            if (!f) return;
                                            uploadDocumentForVariable(input.name, f);
                                            (e.target as HTMLInputElement).value = "";
                                          }}
                                        />
                                        {uploadingFiles[input.name] ? "Uploading…" : "Choose file"}
                                      </label>
                                    </div>
                                  </div>

                                  <div className="mt-4">
                                    {inputFields[input.name] && (inputFields[input.name] as FileMeta).originalFilename ? (
                                      <div className="flex items-center justify-between gap-4 p-3 bg-gray-50 rounded">
                                        <div className="flex items-center gap-3">
                                          {/* <div className="w-12 h-12 flex items-center justify-center bg-white rounded border">
                                            <svg className="w-12 h-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 2h6l4 4v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 2v6h6" />
                                            </svg>
                                          </div> */}
                                          <div>
                                            <div className="text-sm font-medium">{(inputFields[input.name] as FileMeta).originalFilename}</div>
                                            <div className="text-xs text-gray-500">{formatBytes((inputFields[input.name] as FileMeta).size)}</div>
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                          {(inputFields[input.name] as FileMeta).fileUrl ? (
                                            <a href={(inputFields[input.name] as FileMeta).fileUrl} target="_blank" rel="noreferrer" className="text-sm underline">View</a>
                                          ) : ((inputFields[input.name] as FileMeta).storageId ? (
                                            <span className="text-sm inline-flex items-center gap-2 px-2 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">Uploaded</span>
                                          ) : null)}

                                          {uploadingFiles[input.name] ? (
                                            <button onClick={() => cancelUpload(input.name)} className="text-sm px-3 py-1 border rounded">Cancel</button>
                                          ) : (
                                            <button onClick={() => removeUploadedFile(input.name)} className="text-sm px-3 py-1 border rounded">Remove</button>
                                          )}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="text-xs text-gray-500">No file uploaded yet</div>
                                    )}

                                    {uploadingFiles[input.name] || (uploadProgress[input.name] && uploadProgress[input.name] > 0) ? (
                                      <div className="mt-3">
                                        <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
                                          <div
                                            style={{ width: `${uploadProgress[input.name] ?? 0}%` }}
                                            className={`h-2 bg-indigo-600 transition-all duration-200 ${uploadProgress[input.name] ? "" : "animate-pulse"}`}
                                          />
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                          {uploadProgress[input.name] ? `${uploadProgress[input.name]}%` : "Uploading…"}
                                        </div>
                                      </div>
                                    ) : null}

                                    {uploadErrors[input.name] && (
                                      <div className="mt-2 text-xs text-red-500">
                                        {uploadErrors[input.name]}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <input
                                type="text"
                                value={inputFields[input.name] ?? ""}
                                onChange={(e) =>
                                  handleInputChange(input.name, e.target.value)
                                }
                                placeholder={input.description}
                                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputValidation[input.name] &&
                                  !inputValidation[input.name].isValid
                                  ? "border-red-300 bg-red-50"
                                  : "border-gray-300"
                                  }`} />
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 bg-yellow-50 rounded-md border border-yellow-200">
                        <AlertCircle className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                        <p className="text-sm text-yellow-700">
                          This workflow doesn’t define specific inputs.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={handleRunWorkflow}
                  disabled={isExecuting || !selectedWorkflowId}
                  className={`mt-16 w-full py-6 px-8 rounded-lg font-semibold tracking-wide transition-all text-center flex items-center justify-center gap-2 duration-300
                    ${selectedWorkflowId
                      ? 'bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_25px_rgba(139,92,246,0.5)] hover:brightness-110 active:scale-95'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
                    relative overflow-hidden`}
                >
                  {isExecuting ? (
                    <>
                      <Loader className="w-15 h-15 animate-spin" />
                      <span>Running Workflow...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-15 h-15" />
                      <span>Run Workflow</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-3 relative rounded-lg transition-all duration-300 ease-in-out hover:shadow-2xl border border-indigo-100">
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(180deg, rgba(237,237,255,0.85) 0%, rgba(241,238,255,0.75) 60%, rgba(250,249,255,0.7) 100%)",
              }}
            ></div>

            <div className="relative z-10 flex flex-col h-full backdrop-blur-sm">
              <div className="p-6 border-b border-gray-200
                              bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-200
                              flex items-center justify-between rounded-t-lg shadow-sm">
                <h2 className="text-xl font-semibold tracking-tight text-slate-800 flex items-center drop-shadow-sm">
                  <CheckCircle className="w-15 h-15 mr-3 text-indigo-600" />
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                    Results
                  </span>
                </h2>


                <div className="flex items-center gap-2 px-5 py-5 relative">
                  <button
                    ref={downloadButtonRef}
                    onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                    disabled={workflowResponses.length === 0 || isDownloading}
                    title={workflowResponses.length === 0 ? "No results to download" : "Download results"}
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    ${workflowResponses.length > 0 && !isDownloading
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-indigo-800 active:scale-95'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  >
                    {isDownloading ? (
                      <>
                        <Loader className="w-15 h-15 animate-spin" />
                        <span>Downloading...</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="w-15 h-15" />
                        <span>Download</span>
                        <ChevronDown className={`w-15 h-15 transition-transform duration-200 ${showDownloadMenu ? 'rotate-180' : ''}`} />
                      </>
                    )}
                  </button>


                  {showDownloadMenu && workflowResponses.length > 0 && !isDownloading && createPortal(
                    <div className="relative z-[9999]">
                      <div
                        className="fixed inset-0 bg-transparent"
                        onClick={() => setShowDownloadMenu(false)}
                      />
                      <div
                        className="fixed bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                        style={{
                          top: downloadMenuPosition.top,
                          left: downloadMenuPosition.left,
                          width: 200
                        }}
                      >
                        <div className="bg-gray-50/80 backdrop-blur-sm px-4 py-3 border-b border-gray-100">
                          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                            Download Format
                          </h3>
                        </div>

                        <div className="p-2 space-y-1">
                          <button
                            onClick={() => {
                              handleDownloadResults('pdf');
                              setShowDownloadMenu(false);
                            }}
                            className="w-full text-left px-3 py-3 hover:bg-slate-50 transition-colors duration-150 flex items-center gap-3 group rounded-lg"
                          >
                            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center transition-colors group-hover:bg-red-100 flex-shrink-0">
                              <FileDown className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm whitespace-nowrap">PDF Document</div>
                              <div className="text-xs text-gray-500">Best for sharing</div>
                            </div>
                          </button>

                          <button
                            onClick={() => {
                              handleDownloadResults('docx');
                              setShowDownloadMenu(false);
                            }}
                            className="w-full text-left px-3 py-3 hover:bg-slate-50 transition-colors duration-150 flex items-center gap-3 group rounded-lg"
                          >
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center transition-colors group-hover:bg-blue-100 flex-shrink-0">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm whitespace-nowrap">Word Document</div>
                              <div className="text-xs text-gray-500">Editable format</div>
                            </div>
                          </button>
                          <button
                            onClick={() => {
                              handleDownloadResults('markdown');
                              setShowDownloadMenu(false);
                            }}
                            className="w-full text-left px-3 py-3 hover:bg-slate-50 transition-colors duration-150 flex items-center gap-3 group rounded-lg"
                          >
                            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center transition-colors group-hover:bg-orange-100 flex-shrink-0">
                              <FileText className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm whitespace-nowrap">Markdown Document</div>
                              <div className="text-xs text-gray-500">Fast, plain-text format</div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>,
                    document.body
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {showDownloadSuccess && (
                  <div className="flex items-start gap-2 p-3 mb-4 bg-green-50 rounded-md border border-green-200">
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        PDF downloaded successfully!
                      </p>
                    </div>
                  </div>
                )}

                {workflowResponses.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
                    <div className="p-8 rounded-full bg-indigo-50 mb-6">
                      <AlertCircle className="w-14 h-14 text-indigo-400" />
                    </div>
                    <p className="text-xl font-medium mb-3 text-gray-700">No Results Yet</p>
                    <p className="text-sm text-center max-w-md text-gray-500">
                      Provide inputs and click "Run Workflow" to see the final result here.
                    </p>
                  </div>
                ) : (
                  <div>
                    {isExecuting ? (
                      <div className="flex items-center justify-center h-full py-10 text-indigo-600">
                        <div className="flex flex-col items-center bg-indigo-50 p-8 rounded-lg shadow-inner">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-indigo-200 opacity-30 animate-ping"></div>
                            <Loader className="w-16 h-16 animate-spin relative z-10 text-indigo-600" />
                          </div>
                          <p className="text-xl font-medium mt-6 text-indigo-700">Executing Workflow...</p>
                          <p className="text-sm text-indigo-600 mt-2">Please wait while your workflow is running</p>
                        </div>
                      </div>
                    ) : (
                      <div ref={resultRef as any}>
                        {getFinalWorkflowResult(workflowResponses, workflowDetails)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FileLocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        fileType={downloadFileType}
        location={downloadLocation}
      />
    </div>
  );
}

/* ===========================
   Helpers: rendering results
   (kept from your original)
   =========================== */

const getRawFinalOutput = (responses: any[], workflowDetails: any): any => {
  const errorEvent = responses.find(r => r.event === "error" || r.event === "node_failed");
  if (errorEvent) return null;

  // 1. Check for explicit "End" node output
  if (workflowDetails && workflowDetails.nodes) {
    const endNode = workflowDetails.nodes.find((n: any) => n.type === 'end');
    if (endNode) {
      const endNodeEvent = responses.find(
        r => r.event === 'node_completed' && r.data.nodeId === endNode.id
      );
      if (endNodeEvent && endNodeEvent.data.result?.output) {
        return endNodeEvent.data.result.output;
      }
    }
  }

  // 2. Prioritize the last completed node that has output
  const nodeCompletedEvents = responses.filter(r => r.event === "node_completed");
  for (let i = nodeCompletedEvents.length - 1; i >= 0; i--) {
    const node = nodeCompletedEvents[i];
    if (node.data.result?.output) {
      return node.data.result.output;
    }
  }

  // Fallback: Check for workflow_completed variables
  const completedEvent = responses.find(r => r.event === "workflow_completed");
  if (completedEvent && completedEvent.data.variables) {
    const variables = completedEvent.data.variables;
    const outputVarName = Object.keys(variables).find(name =>
      name.toLowerCase().includes('output') ||
      name.toLowerCase().includes('result') ||
      name.toLowerCase().includes('final')
    );
    if (outputVarName && variables[outputVarName]) {
      return variables[outputVarName];
    }
    return variables;
  }

  return null;
};

const displayAsText = (content: any): string => {
  if (content === null || content === undefined) return "";

  if (typeof content === 'string') {
    try {
      if (content.trim().startsWith('{') && content.trim().endsWith('}')) {
        const parsed = JSON.parse(content);
        if (parsed.finalOutput) return displayAsText(parsed.finalOutput);
        if (parsed.message && parsed.finalOutput) return parsed.finalOutput;
      }
    } catch (e) { }
    return content;
  }

  if (typeof content === 'object') {
    if (content.finalOutput) return displayAsText(content.finalOutput);
    if (content.__agentValue) return displayAsText(content.__agentValue);
    if (content.text) return String(content.text);
    if (content.output) return displayAsText(content.output);
    if (content.result) return displayAsText(content.result);
    if (content.content) return displayAsText(content.content);
    if (content.message) return displayAsText(content.message);

    if (Array.isArray(content)) {
      return content.map(item => displayAsText(item)).join('\n\n');
    }

    try {
      return JSON.stringify(content, null, 2);
    } catch (e) {
      console.warn("[Display] Failed to stringify object:", e);
      return `[Object: ${Object.keys(content).join(', ')}]`;
    }
  }
  return String(content);
};

const getFinalWorkflowResult = (responses: any[], workflowDetails: any) => {
  const errorEvent = responses.find(r => r.event === "error" || r.event === "node_failed");

  if (errorEvent) {
    return (
      <div className="p-6 border border-red-200 rounded-lg bg-red-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-500 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-red-800 mb-2">Workflow Error</h3>
            <p className="text-sm text-red-700">
              {errorEvent.data.error || "An error occurred during workflow execution"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const rawOutput = getRawFinalOutput(responses, workflowDetails);

  if (rawOutput !== null) {
    // Check if it was just variables object (fallback case in getRawFinalOutput)
    const completedEvent = responses.find(r => r.event === "workflow_completed");
    if (completedEvent && rawOutput === completedEvent.data.variables) {
      // Check if there was NO explicit output var found
      const variables = completedEvent.data.variables;
      const outputVarName = Object.keys(variables).find(name =>
        name.toLowerCase().includes('output') ||
        name.toLowerCase().includes('result') ||
        name.toLowerCase().includes('final')
      );
      if (!outputVarName) {
        return (
          <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-blue-500 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Workflow Complete</h3>
                <div className="bg-white rounded-md p-4 border border-blue-100 overflow-auto">
                  <pre className="text-sm">{JSON.stringify(variables, null, 2)}</pre>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    return formatOutput(rawOutput);
  }

  // If workflow is completed but no output found
  const completedEvent = responses.find(r => r.event === "workflow_completed");
  if (completedEvent) {
    return (
      <div className="p-6 border border-green-200 rounded-lg bg-green-50">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-green-800 mb-2">Workflow Completed Successfully</h3>
            <p className="text-sm text-green-700">
              The workflow has completed, but no specific output format was detected.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If still running or no result yet
  return (
    <div className="p-6 border border-yellow-200 rounded-lg bg-yellow-50">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-yellow-500 mt-1" />
        <div>
          <h3 className="text-lg font-medium text-yellow-800 mb-2">No Final Result</h3>
          <p className="text-sm text-yellow-700">
            The workflow ran but did not produce a final output.
          </p>
        </div>
      </div>
    </div>
  );
};

const formatOutput = (output: any) => {
  if (output === null || output === undefined) {
    return (
      <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 text-center">
        <p className="text-gray-500">No output data</p>
      </div>
    );
  }

  if (typeof output === 'string' && output.trim().startsWith('<') && output.includes('</')) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex flex-col gap-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-blue-500 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-blue-800 mb-2">HTML Result</h3>
            <div className="bg-white rounded-md p-4 border border-blue-100 overflow-auto">
              <iframe
                srcDoc={output}
                className="w-full h-[400px] border-0"
                title="Result Preview"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const resultText = displayAsText(output);

  /**
   * SECURITY FIX: Sanitize and format text to HTML using DOMPurify
   * Prevents XSS attacks by sanitizing HTML content before rendering
   */
  function formatTextToHTML(text: string): string {
    if (!text) return "";

    // Convert markdown to HTML using marked
    const html = marked.parse(text);

    // SECURITY FIX: Sanitize the final HTML with DOMPurify
    return DOMPurify.sanitize(html as string, {
      ALLOWED_TAGS: [
        'b', 'strong', 'i', 'em', 'u', 'p', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'pre', 'code', 'hr', 'blockquote', 'span', 'div'
      ],
      ALLOWED_ATTR: ['class', 'style'],
      KEEP_CONTENT: true,
    });
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex flex-col gap-6">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="bg-white p-5 rounded-md border border-blue-100 h-[calc(100vh-80px)] overflow-y-auto">
            <div
              className="prose max-w-none text-gray-800 leading-relaxed [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 
                      [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-3 [&_h2]:mb-2 
                      [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-2 [&_h3]:mb-1"
              dangerouslySetInnerHTML={{ __html: formatTextToHTML(resultText || "") }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===========================
   Small helpers (icons, formatting)
   =========================== */

function getEventIcon(event: string) {
  switch (event) {
    case "workflow_started":
      return <Loader className="w-5 h-5 text-blue-500" />;
    case "node_started":
      return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
    case "node_completed":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "node_failed":
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    case "workflow_completed":
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case "error":
      return <AlertCircle className="w-5 h-5 text-red-600" />;
    default:
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
  }
}

function getResponseCardStyle(event: string) {
  switch (event) {
    case "workflow_started":
      return "bg-blue-50 border-blue-200";
    case "node_started":
      return "bg-blue-50 border-blue-200";
    case "node_completed":
      return "bg-green-50 border-green-200";
    case "node_failed":
      return "bg-red-50 border-red-200";
    case "workflow_completed":
      return "bg-green-50 border-green-200";
    case "error":
      return "bg-red-50 border-red-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
}

function formatResponseData(event: string, data: any) {
  switch (event) {
    case "workflow_started":
      return (
        <div>
          <p className="font-medium">{data.workflowName}</p>
          <p className="text-xs text-gray-500 mt-1 italic">
            {data.totalNodes} nodes to execute
          </p>
        </div>
      );

    case "node_started":
      return (
        <div>
          <p className="font-medium">{data.nodeName}</p>
          <p className="text-xs text-gray-500 mt-1">Type: {data.nodeType}</p>
        </div>
      );

    case "node_completed":
      return (
        <div>
          <p className="font-medium">{data.nodeName}</p>
          {data.result?.output && (
            <p className="text-xs mt-2 bg-white rounded-md p-3 max-h-40 overflow-auto border border-gray-100">
              {typeof data.result.output === "string"
                ? data.result.output
                : JSON.stringify(data.result.output, null, 2)}
            </p>
          )}
        </div>
      );

    case "node_failed":
      return (
        <div>
          <p className="font-medium">{data.nodeName}</p>
          <p className="text-xs text-red-500 mt-1">{data.error}</p>
        </div>
      );

    case "workflow_completed":
      return (
        <div>
          <p className="font-medium">Workflow Completed</p>
          <p className="text-xs text-gray-500 mt-1">Status: {data.status}</p>
          {data.results && Object.keys(data.results).length > 0 && (
            <details className="mt-2">
              <summary className="text-xs cursor-pointer hover:text-blue-600">
                View all results ({Object.keys(data.results).length} nodes)
              </summary>
              <pre className="text-xs mt-2 bg-gray-50 rounded-md p-3 max-h-60 overflow-auto border border-gray-100">
                {JSON.stringify(data.results, null, 2)}
              </pre>
            </details>
          )}
        </div>
      );

    case "error":
      return (
        <div>
          <p className="font-medium text-red-500">Error Occurred</p>
          <p className="text-xs mt-1">{data.error}</p>
        </div>
      );

    default:
      return (
        <pre className="text-xs bg-gray-50 rounded-md p-3 max-h-40 overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      );
  }
}
