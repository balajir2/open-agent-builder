'use client';

import { FileUp } from 'lucide-react';
import { toast } from 'sonner';
import { useRef } from 'react';

interface ImportMarkdownButtonProps {
  onImportSuccess?: (workflowId: string) => void;
}

export function ImportMarkdownButton({ onImportSuccess }: ImportMarkdownButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown')) {
      toast.error('Please select a markdown file (.md or .markdown)');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/workflows/import-markdown', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Import failed');
      }

      const result = await response.json();

      toast.success(`Workflow "${result.name}" imported successfully`);

      // Call success callback
      if (onImportSuccess && result.workflowId) {
        onImportSuccess(result.workflowId);
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to import workflow');

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        className="inline-flex items-center gap-2 px-16 py-8 text-sm font-medium text-white bg-heat-100 rounded-8 hover:bg-heat-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-heat-100 transition-all active:scale-[0.98]"
        title="Import workflow from Markdown"
      >
        <FileUp className="w-16 h-16" />
        Import from Markdown
      </button>
    </>
  );
}
