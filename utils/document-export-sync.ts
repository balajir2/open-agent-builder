/**
 * Synchronous utilities for exporting workflow results to document format
 * Use this version if the async export functions are causing issues
 */
import { NodeExecutionResult } from '@/lib/workflow/types';
import htmlDocx from 'html-docx-js/dist/html-docx';

/**
 * Creates HTML content from workflow execution results
 * 
 * @param workflowId - The ID of the workflow
 * @param workflowName - The name of the workflow
 * @param nodeResults - The execution results of workflow nodes
 * @param variables - The workflow variables
 * @returns string - HTML content
 */
function createResultsHtml(
  workflowId: string,
  workflowName: string,
  nodeResults: Record<string, any>,
  variables: Record<string, any>
): string {
  // Create HTML content for the document
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Workflow Execution Results - ${workflowName}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #2563eb; }
        h2 { color: #4b5563; margin-top: 20px; }
        .section { margin-bottom: 25px; }
        .node-result { 
          margin-bottom: 15px; 
          padding: 10px; 
          border: 1px solid #e5e7eb; 
          border-radius: 5px;
        }
        .completed { background-color: #ecfdf5; }
        .failed { background-color: #fef2f2; }
        .node-name { 
          font-weight: bold; 
          margin-bottom: 5px;
        }
        .node-status { 
          display: inline-block;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 0.8em;
          margin-left: 5px;
        }
        .status-completed { background-color: #d1fae5; color: #065f46; }
        .status-failed { background-color: #fee2e2; color: #b91c1c; }
        .output-label { font-weight: bold; margin-top: 10px; }
        .output-content { 
          background-color: #f9fafb; 
          padding: 8px; 
          border-radius: 3px;
          white-space: pre-wrap;
          font-family: monospace;
          font-size: 0.9em;
          overflow-x: auto;
        }
        .error-message {
          background-color: #fee2e2;
          color: #b91c1c;
          padding: 8px;
          border-radius: 3px;
          margin-top: 10px;
        }
        .timing-info {
          font-size: 0.8em;
          color: #6b7280;
          margin-top: 10px;
        }
        .variables-section {
          background-color: #f3f4f6;
          padding: 10px;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <h1>Workflow Execution Results</h1>
      <div class="section">
        <p><strong>Workflow:</strong> ${workflowName} (${workflowId})</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      </div>
      
      <h2>Execution Results</h2>
      <div class="section">
        ${Object.entries(nodeResults)
          .map(([nodeId, result]) => {
            const status = result.status;
            const className = status === 'completed' ? 'completed' : 
                            status === 'failed' ? 'failed' : '';
            
            return `
              <div class="node-result ${className}">
                <div class="node-name">
                  ${result.nodeName || nodeId}
                  <span class="node-status status-${status}">${status}</span>
                </div>
                
                ${result.output ? `
                  <div class="output-label">Output:</div>
                  <div class="output-content">${
                    typeof result.output === 'string' 
                      ? result.output 
                      : JSON.stringify(result.output, null, 2)
                  }</div>
                ` : ''}
                
                ${result.error ? `
                  <div class="error-message">${result.error}</div>
                ` : ''}
                
                <div class="timing-info">
                  ${result.startedAt ? `Started: ${new Date(result.startedAt).toLocaleString()}` : ''}
                  ${result.startedAt && result.completedAt ? ' | ' : ''}
                  ${result.completedAt ? `Completed: ${new Date(result.completedAt).toLocaleString()}` : ''}
                </div>
              </div>
            `;
          })
          .join('')}
      </div>
      
      <h2>Workflow Variables</h2>
      <div class="variables-section">
        <pre>${JSON.stringify(variables, null, 2)}</pre>
      </div>
    </body>
    </html>
  `;

  return htmlContent;
}

/**
 * Generates an HTML document from workflow results
 * 
 * @param workflowId - The ID of the workflow
 * @param workflowName - The name of the workflow
 * @param nodeResults - The execution results of workflow nodes
 * @param variables - The workflow variables
 * @returns Blob - An HTML document blob
 */
export function generateHtml(
  workflowId: string,
  workflowName: string,
  nodeResults: Record<string, any>,
  variables: Record<string, any>
): Blob {
  const htmlContent = createResultsHtml(workflowId, workflowName, nodeResults, variables);
  return new Blob([htmlContent], { type: 'text/html' });
}

/**
 * Generates a Word document from workflow results
 * 
 * @param workflowId - The ID of the workflow
 * @param workflowName - The name of the workflow
 * @param nodeResults - The execution results of workflow nodes
 * @param variables - The workflow variables
 * @returns Blob - A Word document blob
 */
export function generateDocx(
  workflowId: string,
  workflowName: string,
  nodeResults: Record<string, any>,
  variables: Record<string, any>
): Blob {
  const htmlContent = createResultsHtml(workflowId, workflowName, nodeResults, variables);
  return htmlDocx.asBlob(htmlContent, { 
    orientation: 'portrait', 
    margins: { top: 720, bottom: 720, left: 720, right: 720 } 
  });
}

/**
 * Generates a document in the requested format
 * 
 * @param format - The format to generate ('html' or 'docx')
 * @param workflowId - The ID of the workflow
 * @param workflowName - The name of the workflow
 * @param nodeResults - The execution results of workflow nodes
 * @param variables - The workflow variables
 * @returns Blob - A document blob
 */
export function generateDocument(
  format: 'html' | 'docx' |'ppt', workflowId: string, workflowName: string, nodeResults: Record<string, any>, variables: Record<string, any>): Blob {
  if (format === 'docx') {
    return generateDocx(workflowId, workflowName, nodeResults, variables);
  } else {
    return generateHtml(workflowId, workflowName, nodeResults, variables);
  }
}

/**
 * Triggers a download of the document
 * 
 * @param blob - The document blob to download
 * @param filename - The name of the file
 */
export function downloadDocument(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Gets the document save location based on the browser type
 * 
 * @returns string - The description of where documents are typically saved
 */
export function getSaveLocation(): string {
  const isChrome = navigator.userAgent.indexOf('Chrome') !== -1;
  const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
  const isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
  const isEdge = navigator.userAgent.indexOf('Edg') !== -1;
  
  if (isChrome || isEdge) {
    return 'Downloads folder (unless you changed the default download location in your browser settings)';
  } else if (isFirefox) {
    return 'Downloads folder (you may be prompted to select a location)';
  } else if (isSafari) {
    return 'Downloads folder (or your selected location if prompted)';
  } else {
    return 'Downloads folder (or a location specified in your browser settings)';
  }
}