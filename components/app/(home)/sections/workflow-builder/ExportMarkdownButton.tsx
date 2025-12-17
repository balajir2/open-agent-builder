'use client';

import { FileDown } from 'lucide-react';
import { toast } from 'sonner';

interface ExportMarkdownButtonProps {
  workflowId: string;
  workflowName: string;
}

export function ExportMarkdownButton({ workflowId, workflowName }: ExportMarkdownButtonProps) {
  const handleExport = async () => {
    try {
      const response = await fetch(`/api/workflows/${workflowId}/export-markdown`);

      if (!response.ok) {
        throw new Error('Export failed');
      }

      // Download the markdown file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${workflowName.replace(/\s+/g, '_')}.md`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Workflow exported as Markdown');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export workflow');
    }
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      title="Export as Markdown"
    >
      <FileDown className="w-4 h-4" />
      Export MD
    </button>
  );
}
