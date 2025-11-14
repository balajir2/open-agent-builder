// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useDraggable } from "@dnd-kit/core";
// import { UIComponent } from "./UIBuilderCanvas";
// import { X, Settings, Play, Move } from "lucide-react";

// interface DraggableComponentProps {
//   component: UIComponent;
//   onUpdate: (id: string, props: Record<string, any>) => void;
//   onMove: (id: string, position: { x: number; y: number }) => void;
//   onDelete: (id: string) => void;
//   onExecute: (componentId: string, workflowId: string) => void;
//   selectedWorkflowId: string;
//   isExecuting: boolean;
  
// }

// export default function DraggableComponent({
//   component,
//   onUpdate,
//   onMove,
//   onDelete,
//   onExecute,
//   selectedWorkflowId,
//   isExecuting,

  
// }: DraggableComponentProps) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [localProps, setLocalProps] = useState(component.props);
//   const [isDragging, setIsDragging] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [showVarMenu, setShowVarMenu] = useState(false);
//   const [availableVariables, setAvailableVariables] = useState<any[]>([]);
//   const [inputVariables, setInputVariables] = useState<{ name: string; type: string }[]>([]);
//   const [newVariable, setNewVariable] = useState("");
//   const handleSaveVariable = (newVarName: string) => {
//     if (!newVarName.trim()) return;
//     // Avoid duplicates
//     if (inputVariables.some((v) => v.name === newVarName.trim())) return;

//     setInputVariables((prev) => [
//       ...prev,
//       { name: newVarName.trim(), type: "string" },
//     ]);
//   };
// // Load available variables from Start node when editing
// useEffect(() => {
//   const fetchVars = async () => {
//     try {
//       if (!selectedWorkflowId) {
//         setAvailableVariables([]); // always reset cleanly
//         return;
//       }

//       const res = await fetch(`/api/workflows/${selectedWorkflowId}`);
//       if (!res.ok) throw new Error("Failed to fetch workflow");

//       const wf = await res.json();
//       const nodes = wf?.workflow?.nodes || wf?.nodes || [];
//       if (!nodes.length) {
//         console.warn("⚠️ No nodes found in workflow JSON", wf);
//         setAvailableVariables([]);
//         return;
//       }

//       // Support flexible detection for Start node
//       const startNode = nodes.find(
//         (n: any) =>
//           n?.data?.nodeType?.toLowerCase?.() === "start" ||
//           n?.type?.toLowerCase?.() === "start" ||
//           n?.data?.title?.toLowerCase?.() === "start"
//       );

//       const vars = startNode?.data?.inputVariables || [];
//       console.log("Loaded input variables from Start Node:", vars);
//       setAvailableVariables(vars);
//     } catch (err) {
//       console.warn("Could not load input variables:", err);
//       setAvailableVariables([]);
//     }
//   };

//   fetchVars();
// }, [selectedWorkflowId ?? ""]); //  always stable dependency


// useEffect(() => {
//   if (Array.isArray(localProps.inputVariables)) {
//     // merge current availableVariables with new input variables without duplicates
//     const merged = [
//       ...availableVariables,
//       ...localProps.inputVariables.filter(
//         (v) => !availableVariables.some((av) => av.name === v.name)
//       ),
//     ];
//     setAvailableVariables(merged);
//   }
// }, [localProps.inputVariables]);




// // 🧠 Insert {{variable}} at cursor position in instruction text
// const handleInsertVariable = (varName: string) => {
//   const current = localProps.instructions || "";
//   const newText = current.trim() + `{{input.${varName}}}`;
//   setLocalProps({ ...localProps, instructions: newText });
//   setShowVarMenu(false);
// };

//   // ---------------- Drag logic ----------------
//  const handleMouseDown = (e: React.MouseEvent) => {
//   // Only start dragging if clicking on the move handle
//   if (!(e.target as HTMLElement).closest(".move-handle")) return;

//   e.preventDefault();
//   setIsDragging(true);

//   const container = containerRef.current;
//   const parent = container?.offsetParent as HTMLElement;
//   if (!container || !parent) return;

//   const parentRect = parent.getBoundingClientRect();
//   const startMouse = { x: e.clientX, y: e.clientY };
//   const startPosition = { ...component.position };

//   // Disable text selection while dragging
//   document.body.style.userSelect = "none";

//   const handleMouseMove = (e: MouseEvent) => {
//     const deltaX = e.clientX - startMouse.x;
//     const deltaY = e.clientY - startMouse.y;

//     // Use the initial component position + delta
//     const newX = startPosition.x + deltaX;
//     const newY = startPosition.y + deltaY;

//     // Update in real-time
//     onMove(component.id, { x: newX, y: newY });
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     document.body.style.userSelect = "auto";
//     document.removeEventListener("mousemove", handleMouseMove);
//     document.removeEventListener("mouseup", handleMouseUp);
//   };

//   document.addEventListener("mousemove", handleMouseMove);
//   document.addEventListener("mouseup", handleMouseUp);
// };

//   // ---------------- Save + update ----------------
//   const handleSave = () => {
//     onUpdate(component.id, {
//       ...localProps,
//       instructions: localProps.instructions || localProps.value || "",
//     });
//     setIsEditing(false);
//   };

//   const handlePropChange = (key: string, value: any) => {
//     const newProps = { ...localProps, [key]: value };
//     setLocalProps(newProps);
//     onUpdate(component.id, newProps);
//   };



//   // ---------------- Renderer ----------------
//   const renderComponent = () => {
//     switch (component.type) {
//       case "button":
//         return (
//           <button
//             className={`px-4 py-2 rounded-lg font-medium transition-all active:scale-[0.98] ${
//               component.props.variant === "primary"
//                 ? "bg-blue-500 hover:bg-blue-600 text-white"
//                 : "bg-gray-200 hover:bg-gray-300 border border-gray-400"
//             }`}
//             onClick={() => onExecute(component.id, selectedWorkflowId)}
//             disabled={isExecuting}
//           >
//             {isExecuting ? (
//               <span className="flex items-center gap-2">
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Executing...
//               </span>
//             ) : (
//               component.props.label
//             )}
//           </button>
//         );

// case "input":
//   return (
//     <div className="space-y-4">
//       {/* Workflow Variable Info */}
//       {/* {component.props._inputName && (
//         <div className="bg-blue-50 border border-blue-100 rounded-md p-2 mb-2">
//           <p className="text-sm font-medium text-blue-700">Workflow Variable:</p>
//           <p className="text-sm font-bold text-blue-800">{component.props._inputName}</p>
//           {component.props.trueVariable && (
//             <p className="text-xs text-green-700 mt-1">
//               ✓ This is a true variable used in the workflow code
//             </p>
//           )}
//         </div>
//       )} */}

//       {/* Label + Placeholder */}
//       {/* <div>
//         <label className="block text-sm font-medium mb-1">Label</label>
//         <input
//           type="text"
//           value={localProps.label || ""}
//           onChange={(e) => setLocalProps({ ...localProps, label: e.target.value })}
//           className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
//         />
//       </div> */}
//       <div>
//         {/* <label className="block text-sm font-medium mb-1">Placeholder</label> */}
//         {/* <input
//           type="text"
//           value={localProps.placeholder || ""}
//           onChange={(e) => setLocalProps({ ...localProps, placeholder: e.target.value })}
//           className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
//         /> */}
//       </div>

//       {/* 🧩 Input Variables Editor */}
//       <div className="mt-4">
//         <label className="block text-sm font-semibold mb-2">Input Variables</label>

//         {(localProps.inputVariables || []).map((iv: any, idx: number) => (
//           <div key={idx} className="border rounded-lg p-3 mb-2 bg-gray-50">
//             <div className="flex gap-2 mb-2">
//               <input
//                 type="text"
//                 value={iv.name || ""}
//                 onChange={(e) => {
//                   const newVars = [...(localProps.inputVariables || [])];
//                   newVars[idx].name = e.target.value;
//                   handlePropChange("inputVariables", newVars);
//                 }}
//                 placeholder="Variable name"
//                 className="w-1/2 px-2 py-1 border rounded"
//               />
//               <select
//                 value={iv.type || "string"}
//                 onChange={(e) => {
//                   const newVars = [...(localProps.inputVariables || [])];
//                   newVars[idx].type = e.target.value;
//                   handlePropChange("inputVariables", newVars);
//                 }}
//                 className="w-1/3 px-2 py-1 border rounded"
//               >
//                 <option value="string">string</option>
//                 <option value="number">number</option>
//                 <option value="boolean">boolean</option>
//               </select>
//             </div>

//             <input
//               type="text"
//               value={iv.description || ""}
//               onChange={(e) => {
//                 const newVars = [...(localProps.inputVariables || [])];
//                 newVars[idx].description = e.target.value;
//                 handlePropChange("inputVariables", newVars);
//               }}
//               placeholder="Description"
//               className="w-full px-2 py-1 border rounded mb-2"
//             />

//             <input
//               type="text"
//               value={iv.defaultValue || ""}
//               onChange={(e) => {
//                 const newVars = [...(localProps.inputVariables || [])];
//                 newVars[idx].defaultValue = e.target.value;
//                 handlePropChange("inputVariables", newVars);
//               }}
//               placeholder="Default value"
//               className="w-full px-2 py-1 border rounded mb-2"
//             />

//             <div className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={iv.required || false}
//                 onChange={(e) => {
//                   const newVars = [...(localProps.inputVariables || [])];
//                   newVars[idx].required = e.target.checked;
//                   handlePropChange("inputVariables", newVars);
//                 }}
//               />
//               <label className="text-sm">Required</label>
//             </div>

//             <button
//               onClick={() => {
//                 const newVars = [...(localProps.inputVariables || [])];
//                 newVars.splice(idx, 1);
//                 handlePropChange("inputVariables", newVars);
//                 // setAvailableVariables(newVars)
//               }}
//               className="mt-2 text-xs text-red-500 hover:underline"
//             >
//               Remove Variable
//             </button>
//           </div>
//         ))}

//         {/* ➕ Add New Variable */}
//         <button
//           onClick={() => {
//             const newVars = [
//               ...(localProps.inputVariables || []),
//               {
//                 name: "",
//                 description: "",
//                 type: "string",
//                 required: false,
//                 defaultValue: "",
//               },
//             ];
//             handlePropChange("inputVariables", newVars);
//             console.log(newVars);
//             setAvailableVariables((prev) => [
//       ...prev,
//       ...newVars.filter((nv) => !prev.some((p) => p.name === nv.name)),
//     ]);
//           }}
//           className="mt-2 text-sm text-blue-600 hover:underline"
//         >
//           + Add Input Variable
//         </button>

//       </div>
//     </div>
//   );


// case "textarea":
  
//   return (
//     <div className="w-full relative">
//       {component.props.label && (
//         <label className="block text-sm font-medium mb-1 text-gray-700">
//           {component.props.label}
//         </label>
//       )}
//       <textarea
//         placeholder={component.props.placeholder || "Enter instructions..."}
//         value={component.props.value || ""}
//         onChange={(e) => handlePropChange("value", e.target.value)}
//         rows={component.props.rows || 5}
//         className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
//       />
//       <div className="flex justify-center mt-2">
//         <button
//           onClick={() => setShowVarMenu((prev) => !prev)}
//           className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
//         >
//           ➕ Add Variable
//         </button>
        
//       </div>


//       {/* Variable Dropdown */}
      
//       {showVarMenu && (
//         <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//           {availableVariables.length > 0 ? (
//             availableVariables.map((v, i) => (
//               <button
//                 key={i}
//                 onClick={() => {
                  
//                   handlePropChange(
//                     "value",
//                     `${component.props.value || ""} {{input.${v.name}}}`
//                   );
//                   setShowVarMenu(false);
                  
//                 }}
//                 className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50"
//               >
//                 {v.name}
//               </button>
//             ))
            
//           ) : (
//             <p className="text-sm text-gray-500 text-center py-2">
//               No input variables found
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );  
      
  
  
//   // case "textarea":
//       //   return (
//       //     <div className="w-full">
//       //       {component.props.label && (
//       //         <label className="block text-sm font-medium mb-1 text-gray-700">
//       //           {component.props.label}
//       //         </label>
//       //       )}
//       //       <textarea
//       //         placeholder={component.props.placeholder}
//       //         value={component.props.value || ""}
//       //         onChange={(e) => handlePropChange("value", e.target.value)}
//       //         rows={component.props.rows || 4}
//       //         className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
//       //       />
//       //     </div>
//       //   );

// case "textarea":



//   return (
//     <div className="space-y-2">
//       {/* Display workflow variable info */}
//       {component.props._inputName && (
//         <div className="bg-blue-50 border border-blue-100 rounded-md p-2 mb-2">
//           <p className="text-sm font-medium text-blue-700">Workflow Variable:</p>
//           <p className="text-sm font-bold text-blue-800">
//             {component.props._inputName}
//           </p>
//         </div>
//       )}

//       {/* 🧠 Instruction Editor */}
//       <div>
//         <label className="block text-sm font-medium mb-1">
//           Instructions
//         </label>
//         <div className="flex gap-2">
//           <textarea
//             value={localProps.instructions || ""}
//             onChange={(e) =>
//               setLocalProps({
//                 ...localProps,
//                 instructions: e.target.value,
//               })
//             }
//             placeholder="Write your instruction here (you can insert variables)"
//             rows={5}
//             className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
//           />
//           {/* +Variable Button */}
//           <div className="relative">
//             <button
//               type="button"
//               className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
//               onClick={() => setShowVarMenu(!showVarMenu)}
//             >
//               + Var
//             </button>
//             {showVarMenu && (
//               <div className="absolute z-50 bg-white border rounded shadow-md mt-1 w-40">
//                 {(availableVariables || []).map((v) => (
//                   <button
//                     key={v.name}
//                     onClick={() => handleInsertVariable(v.name)}
//                     className="block w-full text-left px-3 py-1 hover:bg-gray-100 text-sm"
//                   >
//                     {v.name}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Optional Label or Placeholder */}
//       {/* <div>
//         <label className="block text-sm font-medium mb-1">Label</label>
//         <input
//           type="text"
//           value={localProps.label || ""}
//           onChange={(e) =>
//             setLocalProps({ ...localProps, label: e.target.value })
//           }
//           className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
//         />
//       </div> */}
//     </div>
//   );

//       case "card":
//         return (
//           <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
//             <h3 className="font-semibold text-lg mb-2">{component.props.title}</h3>
//             <p className="text-gray-600">{component.props.content}</p>
//           </div>
//         );

//       case "heading":
//         const HeadingTag = component.props.level || "h2";
//         return (
//           <HeadingTag
//             className={`font-bold text-gray-800 ${
//               HeadingTag === "h1"
//                 ? "text-3xl"
//                 : HeadingTag === "h2"
//                 ? "text-2xl"
//                 : "text-xl"
//             }`}
//           >
//             {component.props.text}
//           </HeadingTag>
//         );

//       case "text":
//         return <p className="text-gray-700">{component.props.text}</p>;

//       default:
//         return <div>Unknown component type: {component.type}</div>;
//     }
//   };
  

//   // ---------------- Editor ----------------
//   const renderEditor = () => {
//     // ✅ NEW: Input variables editor for “start” or “input” types
//     if (component.type === "start" || component.type === "input") {
//       return (
//         <div className="space-y-3">
//           <div>
//             <label className="block text-sm font-medium mb-1">Label</label>
//             <input
//               type="text"
//               value={localProps.label || ""}
//               onChange={(e) => setLocalProps({ ...localProps, label: e.target.value })}
//               className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
//             />
//           </div>

//           <div>
//             <h4 className="text-sm font-semibold mb-1">Input Variables</h4>
//             {(localProps.inputVariables || []).map((variable: any, index: number) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 mb-2 border border-gray-200 p-2 rounded bg-gray-50"
//               >
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={variable.name || ""}
//                   onChange={(e) => {
//                     const updated = [...(localProps.inputVariables || [])];
//                     updated[index].name = e.target.value;
//                     setLocalProps({ ...localProps, inputVariables: updated });
//                   }}
//                   className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Description"
//                   value={variable.description || ""}
//                   onChange={(e) => {
//                     const updated = [...(localProps.inputVariables || [])];
//                     updated[index].description = e.target.value;
//                     setLocalProps({ ...localProps, inputVariables: updated });
//                   }}
//                   className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
//                 />
//                 <button
//                   onClick={() => {
//                     const updated = [...(localProps.inputVariables || [])];
//                     updated.splice(index, 1);
//                     setLocalProps({ ...localProps, inputVariables: updated });
//                   }}
//                   className="text-red-600 text-xs hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}

//             <button
//               onClick={() => {
//                 const updated = [
//                   ...(localProps.inputVariables || []),
//                   {
//                     name: "",
//                     description: "",
//                     type: "string",
//                     required: false,
//                     defaultValue: "",
//                   },
//                 ];
//                 setLocalProps({ ...localProps, inputVariables: updated });
//                 // setAvailableVariables(updated);
//               }}
//               className="mt-2 text-xs text-blue-600 hover:underline"
//             >
//               + Add Input Variable
//             </button>
//           </div>
//         </div>
//       );
//     }

//     // ✅ Your existing editors remain unchanged
//     switch (component.type) {
//       case "button":
//         return (
//           <div className="space-y-2">
//             <label className="block text-sm font-medium mb-1">Label</label>
//             <input
//               type="text"
//               value={localProps.label}
//               onChange={(e) => setLocalProps({ ...localProps, label: e.target.value })}
//               className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
//             />
//           </div>
//         );

// //         case "textarea":
// //           <div className="flex gap-2 items-start relative">
// //   <textarea
// //     value={localProps.instructions || ""}
// //     onChange={(e) =>
// //       setLocalProps({ ...localProps, instructions: e.target.value })
// //     }
// //     placeholder="Write your instruction here..."
// //     rows={5}
// //     className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
// //   />
// //   <div className="relative">
// //     <button
// //       type="button"
// //       onClick={() => setShowVarMenu((prev) => !prev)}
// //       onBlur={() => setTimeout(() => setShowVarMenu(false), 200)} // prevent flicker
// //       className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
// //     >
// //       + Var
// //     </button>
// //     {showVarMenu && (
// //       <div className="absolute right-0 mt-1 bg-white border rounded shadow-md z-50 w-44 max-h-40 overflow-y-auto">
// //         {availableVariables.length === 0 && (
// //           <p className="text-xs px-3 py-2 text-gray-500">No variables found</p>
// //         )}
// //         {availableVariables.map((v) => (
// //           <button
// //             key={v.name}
// //             onClick={() => handleInsertVariable(v.name)}
// //             className="block w-full text-left px-3 py-1 hover:bg-gray-100 text-sm"
// //           >
// //             {v.name}
// //           </button>
// //         ))}
// //       </div>
// //     )}
// //   </div>


// // </div>


      
//         default:
//         return <div>No editor available</div>;
//     }
//   };

//   // ---------------- Render ----------------
//   return (
//     <div
//       ref={containerRef}
//       className={`absolute bg-white border-2 rounded-lg p-4 group ${
//         isDragging
//           ? "border-blue-500 shadow-2xl z-50"
//           : "border-gray-200 hover:border-gray-400 shadow-md"
//       } ${isEditing ? "z-40" : ""}`}
//       style={{
//         left: `${component.position.x}px`,
//         top: `${component.position.y}px`,
//         minWidth: "200px",
//         cursor: isDragging ? "move" : "default",
//       }}
//       onMouseDown={handleMouseDown}
//     >
//       {/* Controls */}
//       <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
//         <button
//           className="move-handle p-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md cursor-move"
//           title="Move"
//         >
//           <Move className="w-4 h-4" />
//         </button>
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className="p-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md"
//           title="Edit"
//         >
//           <Settings className="w-4 h-4" />
//         </button>
//         <button
//           onClick={() => onDelete(component.id)}
//           className="p-1.5 bg-gray-100 hover:bg-red-500 hover:text-white border border-gray-300 rounded-md"
//           title="Delete"
//         >
//           <X className="w-4 h-4" />
//         </button>
//       </div>

//       {/* Component Type Badge */}
//       <div className="flex justify-between items-center mb-2">
//         <div className="text-xs text-gray-500 uppercase tracking-wider">{component.type}</div>
//         {component.props.nodeId && (
//           <span className="text-[10px] bg-gray-200 text-gray-700 px-1 py-0.5 rounded">
//             {component.props.nodeId}
//           </span>
//         )}
//       </div>

//       {/* Render Component or Editor */}
//       {isEditing ? (
//         <div className="space-y-3">
//           {renderEditor()}
//           <button
//             onClick={handleSave}
//             className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
//           >
//             Save Changes
//           </button>
//         </div>
//       ) : (
//         renderComponent()
//       )}
//     </div>
//   );
// }



"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Settings, Move } from "lucide-react";
import { UIComponent } from "./UIBuilderCanvas";

/**
 * Single-file global + event bridge approach.
 * - globalAvailableVariables: file-level cache
 * - notifyVariablesUpdated: dispatches CustomEvent("variablesUpdated", { detail: [...] })
 *
 * Each component subscribes once to "variablesUpdated" and updates its local state.
 * When any input node updates its inputVariables (typed or added), we merge and notify.
 */

// file-level cache
let globalAvailableVariables: Array<{ name: string; type?: string; description?: string }> = [];

const notifyVariablesUpdated = (vars: any[]) => {
  // ensure deduped by name
  const deduped: any[] = [];
  for (const v of vars) {
    if (!v || !v.name) continue;
    if (!deduped.some((d) => d.name === v.name)) deduped.push(v);
  }
  globalAvailableVariables = deduped;
  try {
    window.dispatchEvent(new CustomEvent("variablesUpdated", { detail: deduped }));
  } catch (err) {
    // fallback
    const evt = document.createEvent("CustomEvent");
    // @ts-ignore
    evt.initCustomEvent("variablesUpdated", false, false, deduped);
    window.dispatchEvent(evt);
  }
};

interface DraggableComponentProps {
  component: UIComponent;
  onUpdate: (id: string, props: Record<string, any>) => void;
  onMove: (id: string, position: { x: number; y: number }) => void;
  onDelete: (id: string) => void;
  onExecute: (componentId: string, workflowId: string) => void;
  selectedWorkflowId: string;
  isExecuting: boolean;
}

export default function DraggableComponent({
  component,
  onUpdate,
  onMove,
  onDelete,
  onExecute,
  selectedWorkflowId,
  isExecuting,
}: DraggableComponentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localProps, setLocalProps] = useState(component.props || {});
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showVarMenu, setShowVarMenu] = useState(false);

  // local view of available variables (keeps UI reactive)
  const [availableVariables, setAvailableVariables] = useState<any[]>(globalAvailableVariables);

  // initialize localProps from incoming component.props when it changes
  useEffect(() => {
    setLocalProps(component.props || {});
  }, [component.props]);

  // Subscribe once to global variable updates
  useEffect(() => {
    const handler = (e: Event) => {
      // @ts-ignore
      const detail = (e as CustomEvent).detail;
      if (Array.isArray(detail)) {
        setAvailableVariables([...detail]);
      }
    };
    window.addEventListener("variablesUpdated", handler as EventListener);

    // ensure local sync with current global cache on mount
    setAvailableVariables([...globalAvailableVariables]);

    return () => {
      window.removeEventListener("variablesUpdated", handler as EventListener);
    };
  }, []); // stable, empty deps

  // When the selected workflow changes, re-fetch start node variables (keeps existing logic)
  useEffect(() => {
    const fetchVars = async () => {
      try {
        if (!selectedWorkflowId) {
          notifyVariablesUpdated([]); // clear global
          setAvailableVariables([]);
          return;
        }

        const res = await fetch(`/api/workflows/${selectedWorkflowId}`);
        if (!res.ok) throw new Error("Failed to fetch workflow");

        const wf = await res.json();
        const nodes = wf?.workflow?.nodes || wf?.nodes || [];
        const startNode = nodes.find(
          (n: any) =>
            n?.data?.nodeType?.toLowerCase?.() === "start" ||
            n?.type?.toLowerCase?.() === "start" ||
            n?.data?.title?.toLowerCase?.() === "start"
        );

        const vars = startNode?.data?.inputVariables || [];
        // ensure all have name property and dedupe via notify
        notifyVariablesUpdated(vars);
        setAvailableVariables([...globalAvailableVariables]);
      } catch (err) {
        console.warn("Could not load workflow variables:", err);
        notifyVariablesUpdated([]);
        setAvailableVariables([]);
      }
    };

    fetchVars();
  }, [selectedWorkflowId]); // stable single dependency

  // Merge any localProps.inputVariables into the global list when they change.
  // This triggers when the user types a name (we call setLocalProps elsewhere) or when added/removed.
  useEffect(() => {
    if (!Array.isArray(localProps.inputVariables)) return;

    // Only include named variables from localProps
    const named = localProps.inputVariables.filter((v: any) => v && v.name && v.name.trim());
    if (named.length === 0) return;

    const merged = [
      ...globalAvailableVariables,
      ...named.filter((nv: any) => !globalAvailableVariables.some((g) => g.name === nv.name)),
    ];
    notifyVariablesUpdated(merged);
    // local availableVariables will be updated by the event listener above
    // no need to setAvailableVariables here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localProps.inputVariables]);

  // helper to update component props and bubble to parent
  const handlePropChange = (key: string, value: any) => {
    const newProps = { ...(localProps || {}), [key]: value };
    setLocalProps(newProps);
    onUpdate(component.id, newProps);
  };

  // insert variable token into localProps.instructions at end (keeps simple)
  const handleInsertVariable = (varName: string) => {
    const current = localProps.instructions || "";
    const newText = (current ? current + " " : "") + `{{input.${varName}}}`;
    setLocalProps({ ...localProps, instructions: newText });
    onUpdate(component.id, { ...localProps, instructions: newText });
    setShowVarMenu(false);
  };

  // Drag logic (kept from your original)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest(".move-handle")) return;
    e.preventDefault();
    setIsDragging(true);

    const container = containerRef.current;
    const parent = container?.offsetParent as HTMLElement;
    if (!container || !parent) return;

    const startMouse = { x: e.clientX, y: e.clientY };
    const startPosition = { ...component.position };

    document.body.style.userSelect = "none";

    const handleMouseMove = (ev: MouseEvent) => {
      const deltaX = ev.clientX - startMouse.x;
      const deltaY = ev.clientY - startMouse.y;
      const newX = startPosition.x + deltaX;
      const newY = startPosition.y + deltaY;
      onMove(component.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = "auto";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // ---------------- Render component UI ----------------
  const renderComponent = () => {
    switch (component.type) {
      case "button":
        return (
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              component.props.variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => onExecute(component.id, selectedWorkflowId)}
            disabled={isExecuting}
          >
            {component.props.label || "Button"}
          </button>
        );

      case "input":
        return (
          <div className="space-y-4">
            {/* Input variables editor */}
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">Input Variables</label>

              {(localProps.inputVariables || []).map((iv: any, idx: number) => (
                <div key={idx} className="border rounded-lg p-3 mb-2 bg-gray-50">
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={iv.name || ""}
                      onChange={(e) => {
                        const newVars = [...(localProps.inputVariables || [])];
                        newVars[idx].name = e.target.value;
                        // update local + parent
                        handlePropChange("inputVariables", newVars);
                        // as user types a name, merge named ones into global immediately
                        const namedNow = newVars.filter((v) => v && v.name && v.name.trim());
                        if (namedNow.length > 0) {
                          const merged = [
                            ...globalAvailableVariables,
                            ...namedNow.filter((nv) => !globalAvailableVariables.some((g) => g.name === nv.name)),
                          ];
                          notifyVariablesUpdated(merged);
                        }
                      }}
                      placeholder="Variable name"
                      className="w-1/2 px-2 py-1 border rounded"
                    />
                    <select
                      value={iv.type || "string"}
                      onChange={(e) => {
                        const newVars = [...(localProps.inputVariables || [])];
                        newVars[idx].type = e.target.value;
                        handlePropChange("inputVariables", newVars);
                      }}
                      className="w-1/3 px-2 py-1 border rounded"
                    >
                      <option value="string">string</option>
                      <option value="number">number</option>
                      <option value="boolean">boolean</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    value={iv.description || ""}
                    onChange={(e) => {
                      const newVars = [...(localProps.inputVariables || [])];
                      newVars[idx].description = e.target.value;
                      handlePropChange("inputVariables", newVars);
                    }}
                    placeholder="Description"
                    className="w-full px-2 py-1 border rounded mb-2"
                  />

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={iv.required || false}
                      onChange={(e) => {
                        const newVars = [...(localProps.inputVariables || [])];
                        newVars[idx].required = e.target.checked;
                        handlePropChange("inputVariables", newVars);
                      }}
                    />
                    <label className="text-sm">Required</label>
                  </div>

                  <button
                    onClick={() => {
                      const newVars = [...(localProps.inputVariables || [])];
                      const removed = newVars.splice(idx, 1);
                      handlePropChange("inputVariables", newVars);
                      // Remove from global if we removed a named var
                      if (removed[0] && removed[0].name) {
                        const after = globalAvailableVariables.filter((g) => g.name !== removed[0].name);
                        notifyVariablesUpdated(after);
                      }
                    }}
                    className="mt-2 text-xs text-red-500 hover:underline"
                  >
                    Remove Variable
                  </button>
                </div>
              ))}

              <button
                onClick={() => {
                  const newVars = [
                    ...(localProps.inputVariables || []),
                    { name: "", description: "", type: "string", required: false },
                  ];
                  handlePropChange("inputVariables", newVars);
                  // no immediate global merge because name is empty; user will type name and merge occurs
                }}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                + Add Input Variable
              </button>
            </div>
          </div>
        );

      case "textarea":
        return (
          <div className="w-full relative">
            {component.props.label && (
              <label className="block text-sm font-medium mb-1 text-gray-700">
                {component.props.label}
              </label>
            )}
            <textarea
              placeholder={component.props.placeholder || "Enter instructions..."}
              value={component.props.value || ""}
              onChange={(e) => handlePropChange("value", e.target.value)}
              rows={component.props.rows || 5}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
            <div className="flex justify-center mt-2">
              <button
                onClick={() => setShowVarMenu((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium shadow-md hover:shadow-lg"
              >
                ➕ Add Variable
              </button>
            </div>

            {showVarMenu && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {availableVariables.length > 0 ? (
                  availableVariables.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        handlePropChange("value", `${component.props.value || ""} {{input.${v.name}}}`);
                        setShowVarMenu(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      {v.name}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-2">No input variables found</p>
                )}
              </div>
            )}
          </div>
        );

      // fallback for other types
      default:
        return <div>Unknown component type: {component.type}</div>;
    }
  };

  // ---------------- Editor (when isEditing) ----------------
  const renderEditor = () => {
    if (component.type === "start" || component.type === "input") {
      return (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Label</label>
            <input
              type="text"
              value={localProps.label || ""}
              onChange={(e) => setLocalProps({ ...localProps, label: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-1">Input Variables</h4>
            {(localProps.inputVariables || []).map((variable: any, index: number) => (
              <div key={index} className="flex items-center gap-2 mb-2 border border-gray-200 p-2 rounded bg-gray-50">
                <input
                  type="text"
                  placeholder="Name"
                  value={variable.name || ""}
                  onChange={(e) => {
                    const updated = [...(localProps.inputVariables || [])];
                    updated[index].name = e.target.value;
                    setLocalProps({ ...localProps, inputVariables: updated });
                    // merge named ones into global as they type
                    const namedNow = updated.filter((v) => v && v.name && v.name.trim());
                    if (namedNow.length > 0) {
                      const merged = [
                        ...globalAvailableVariables,
                        ...namedNow.filter((nv) => !globalAvailableVariables.some((g) => g.name === nv.name)),
                      ];
                      notifyVariablesUpdated(merged);
                    }
                  }}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={variable.description || ""}
                  onChange={(e) => {
                    const updated = [...(localProps.inputVariables || [])];
                    updated[index].description = e.target.value;
                    setLocalProps({ ...localProps, inputVariables: updated });
                  }}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                />
                <button
                  onClick={() => {
                    const updated = [...(localProps.inputVariables || [])];
                    const removed = updated.splice(index, 1);
                    setLocalProps({ ...localProps, inputVariables: updated });
                    // remove from global if named
                    if (removed[0] && removed[0].name) {
                      const after = globalAvailableVariables.filter((g) => g.name !== removed[0].name);
                      notifyVariablesUpdated(after);
                    }
                  }}
                  className="text-red-600 text-xs hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}

            <button
              onClick={() => {
                const updated = [
                  ...(localProps.inputVariables || []),
                  { name: "", description: "", type: "string", required: false, defaultValue: "" },
                ];
                setLocalProps({ ...localProps, inputVariables: updated });
              }}
              className="mt-2 text-xs text-blue-600 hover:underline"
            >
              + Add Input Variable
            </button>
          </div>
        </div>
      );
    }

    // basic fallback editor
    switch (component.type) {
      case "button":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Label</label>
            <input
              type="text"
              value={localProps.label || ""}
              onChange={(e) => setLocalProps({ ...localProps, label: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
            />
          </div>
        );

      default:
        return <div>No editor available</div>;
    }
  };

  // ---------------- Render ----------------
  return (
    <div
      ref={containerRef}
      className={`absolute bg-white border-2 rounded-lg p-4 group ${isDragging ? "border-blue-500 shadow-2xl z-50" : "border-gray-200 hover:border-gray-400 shadow-md"} ${isEditing ? "z-40" : ""}`}
      style={{
        left: `${component.position?.x || 0}px`,
        top: `${component.position?.y || 0}px`,
        minWidth: "200px",
        cursor: isDragging ? "move" : "default",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Controls */}
      <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button className="move-handle p-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md cursor-move" title="Move">
          <Move className="w-4 h-4" />
        </button>
        <button onClick={() => setIsEditing(!isEditing)} className="p-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md" title="Edit">
          <Settings className="w-4 h-4" />
        </button>
        <button onClick={() => onDelete(component.id)} className="p-1.5 bg-gray-100 hover:bg-red-500 hover:text-white border border-gray-300 rounded-md" title="Delete">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Type badge */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs text-gray-500 uppercase tracking-wider">{component.type}</div>
        {component.props?.nodeId && <span className="text-[10px] bg-gray-200 text-gray-700 px-1 py-0.5 rounded">{component.props.nodeId}</span>}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          {renderEditor()}
          <button onClick={() => { onUpdate(component.id, localProps); setIsEditing(false); }} className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium">Save Changes</button>
        </div>
      ) : (
        renderComponent()
      )}
    </div>
  );
}
