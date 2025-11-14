/**
 * Utility functions for exporting workflow results to document format
 */
import htmlDocx from 'html-docx-js/dist/html-docx';
import { marked } from "marked";
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
const finalOutput = Object.values(nodeResults).find(n => n.nodeName === "End")?.output.finalOutput || "";

const finalOutputHTML = marked(finalOutput);

  // Create HTML content for the document
  const htmlContent = `
   <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${workflowName.split('_').pop()} - Results</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h3 { color: #2563eb; margin-bottom: 20px; }
    .output-box {
      white-space: pre-wrap;
      font-family: nunito-sans;
      
      padding: 15px;
      font-size: 1em;
    }
  </style>
</head>

<body>
  <h3>${workflowName}</h3>

  <div class="output-box">
  Results:
    ${finalOutputHTML}
  </div>
</body>
</html>

`

  return htmlContent;
}

/**
 * Converts workflow execution results to HTML document format.
 * Returns a Blob object that can be used to create a downloadable file.
 * 
 * @param workflowId - The ID of the workflow
 * @param workflowName - The name of the workflow
 * @param nodeResults - The execution results of workflow nodes
 * @param variables - The workflow variables
 * @returns Blob - An HTML document blob that can be downloaded
 */
export function generateHtmlFromResults(
  workflowId: string,
  workflowName: string,
  nodeResults: Record<string, any>,
  variables: Record<string, any>
): Blob {
  const htmlContent = createResultsHtml(workflowId, workflowName, nodeResults, variables);
  // Convert HTML to a Blob
  return new Blob([htmlContent], { type: 'text/html' });
}

/**
 * Converts workflow execution results to Word document format.
 * Returns a Blob object that can be used to create a downloadable file.
 * 
 * @param workflowId - The ID of the workflow
 * @param workflowName - The name of the workflow
 * @param nodeResults - The execution results of workflow nodes
 * @param variables - The workflow variables
 * @returns Blob - A Word document blob that can be downloaded
 */
export function generateDocxFromResults(
  workflowId: string,
  workflowName: string,
  nodeResults: Record<string, any>,
  variables: Record<string, any>
): Blob {
  const htmlContent = createResultsHtml(workflowId, workflowName, nodeResults, variables);
  // Convert HTML to Word document format
  return htmlDocx.asBlob(htmlContent, { orientation: 'portrait', margins: { top: 720, bottom: 720, left: 720, right: 720 } });
}

/**
 * Generate PowerPoint presentation from workflow results using Gamma API
 * 
 * @param workflowId - The ID of the workflow
 * @param workflowName - The name of the workflow
 * @param nodeResults - The execution results of workflow nodes
 * @param variables - The workflow variables
 * @returns Promise<Blob> - A PowerPoint document blob that can be downloaded
 */
// export async function generatePptFromResults(
//   workflowId: string,
//   workflowName: string,
//   nodeResults: Record<string, any>,
//   variables: Record<string, any>
// ): Promise<Blob> {
//   try {
//     // Create a structured content object for the Gamma API
//     const presentationContent = {
//       title: `Workflow Execution Results: ${workflowName}`,
//       slides: [
//         // Title slide
//         {
//           type: 'title',
//           title: `Workflow Execution Results`,
//           subtitle: workflowName,
//           footer: `Generated on ${new Date().toLocaleString()}`
//         },
//         // Overview slide
//         {
//           type: 'section',
//           title: 'Workflow Overview',
//           content: [
//             { text: `Workflow ID: ${workflowId}` },
//             { text: `Total Nodes: ${Object.keys(nodeResults).length}` },
//             { text: `Execution Date: ${new Date().toLocaleString()}` }
//           ]
//         }
//       ]
//     };

//     // Add one slide per node result
//     Object.entries(nodeResults).forEach(([nodeId, result]) => {
//       const nodeName = result.nodeName || nodeId;
//       const status = result.status;
//       const isCompleted = status === 'completed';
      
//       // Node result slide
//       const nodeSlide = {
//         type: 'content',
//         title: nodeName,
//         subtitle: `Status: ${status}`,
//         content: []
//       };

//       // Add timing information
//       if (result.startedAt || result.completedAt) {
//         nodeSlide.content.push({
//           text: `Started: ${result.startedAt ? new Date(result.startedAt).toLocaleString() : 'N/A'}`
//         });
        
//         if (result.completedAt) {
//           nodeSlide.content.push({
//             text: `Completed: ${new Date(result.completedAt).toLocaleString()}`
//           });
//         }
//       }

//       // Add output or error
//       if (isCompleted && result.output) {
//         nodeSlide.content.push({
//           title: 'Output:',
//           text: typeof result.output === 'string' 
//             ? result.output 
//             : JSON.stringify(result.output, null, 2)
//         });
//       } else if (result.error) {
//         nodeSlide.content.push({
//           title: 'Error:',
//           text: result.error
//         });
//       }

//       presentationContent.slides.push(nodeSlide);
//     });

//     // Add a summary slide
//     const completedNodes = Object.values(nodeResults).filter(node => node.status === 'completed').length;
//     const failedNodes = Object.values(nodeResults).filter(node => node.status === 'failed').length;
    
//     presentationContent.slides.push({
//       type: 'chart',
//       title: 'Execution Summary',
//       chartType: 'pie',
//       data: [
//         { label: 'Completed', value: completedNodes },
//         { label: 'Failed', value: failedNodes }
//       ]
//     });

//     // Add a variables slide if there are variables
//     if (Object.keys(variables).length > 0) {
//       presentationContent.slides.push({
//         type: 'content',
//         title: 'Workflow Variables',
//         content: [
//           {
//             text: JSON.stringify(variables, null, 2),
//             format: 'code'
//           }
//         ]
//       });
//     }

//     // Call the Gamma API to generate the presentation
//     const response = await fetch('/api/gamma/create-presentation', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         content: presentationContent
//       })
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to generate PPT: ${response.statusText}`);
//     }

//     // Get the presentation blob from the response
//     return await response.blob();
//   } catch (error) {
//     console.error('Error generating PowerPoint:', error);
//     // Create a simple error slide as fallback
//     const errorHtml = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>PowerPoint Generation Error</title>
//         <style>
//           body { font-family: Arial, sans-serif; padding: 20px; }
//           .error { color: #e53e3e; margin-top: 20px; }
//         </style>
//       </head>
//       <body>
//         <h1>PowerPoint Generation Failed</h1>
//         <p>There was an error generating your PowerPoint presentation:</p>
//         <div class="error">${error instanceof Error ? error.message : String(error)}</div>
//         <p>Please try downloading in HTML or Word format instead.</p>
//       </body>
//       </html>
//     `;
//     return new Blob([errorHtml], { type: 'text/html' });
//   }
// }
export async function generatePptFromResults(
  workflowId: string,
  workflowName: string,
  nodeResults: Record<string, any>,
  variables: Record<string, any>
): Promise<Blob> {
  try {
    // 👇 Define a slide content type
    interface SlideContentItem {
      text?: string;
      title?: string;
      format?: string;
    }

    interface Slide {
      type: string;
      title: string;
      subtitle?: string;
      footer?: string;
      chartType?: string;
      data?: { label: string; value: number }[];
      content?: SlideContentItem[];
    }

    interface Presentation {
      title: string;
      slides: Slide[];
    }

    // ✅ Initialize with explicit type
    const presentationContent: Presentation = {
      title: `Workflow Execution Results: ${workflowName}`,
      slides: [
        {
          type: "title",
          title: `Workflow Execution Results`,
          subtitle: workflowName,
          footer: `Generated on ${new Date().toLocaleString()}`,
        },
        {
          type: "section",
          title: "Workflow Overview",
          content: [
            { text: `Workflow ID: ${workflowId}` },
            { text: `Total Nodes: ${Object.keys(nodeResults).length}` },
            { text: `Execution Date: ${new Date().toLocaleString()}` },
          ],
        },
      ],
    };

    // ✅ Add one slide per node result
    Object.entries(nodeResults).forEach(([nodeId, result]) => {
      const nodeName = result.nodeName || nodeId;
      const status = result.status;
      const isCompleted = status === "completed";

      const nodeSlide: Slide = {
        type: "content",
        title: nodeName,
        subtitle: `Status: ${status}`,
        content: [],
      };

      // Add timing information
      if (result.startedAt || result.completedAt) {
        nodeSlide.content?.push({
          text: `Started: ${
            result.startedAt ? new Date(result.startedAt).toLocaleString() : "N/A"
          }`,
        });

        if (result.completedAt) {
          nodeSlide.content?.push({
            text: `Completed: ${new Date(result.completedAt).toLocaleString()}`,
          });
        }
      }

      // Add output or error
      if (isCompleted && result.output) {
        nodeSlide.content?.push({
          title: "Output:",
          text:
            typeof result.output === "string"
              ? result.output
              : JSON.stringify(result.output, null, 2),
        });
      } else if (result.error) {
        nodeSlide.content?.push({
          title: "Error:",
          text: result.error,
        });
      }

      presentationContent.slides.push(nodeSlide);
    });

    // ✅ Add a summary slide
    const completedNodes = Object.values(nodeResults).filter(
      (node: any) => node.status === "completed"
    ).length;
    const failedNodes = Object.values(nodeResults).filter(
      (node: any) => node.status === "failed"
    ).length;

    presentationContent.slides.push({
      type: "chart",
      title: "Execution Summary",
      chartType: "pie",
      data: [
        { label: "Completed", value: completedNodes },
        { label: "Failed", value: failedNodes },
      ],
    });

    // ✅ Add a variables slide if present
    if (Object.keys(variables).length > 0) {
      presentationContent.slides.push({
        type: "content",
        title: "Workflow Variables",
        content: [
          {
            text: JSON.stringify(variables, null, 2),
            format: "code",
          },
        ],
      });
    }

    // ✅ Generate the PowerPoint via your API
    const response = await fetch("/api/gamma/create-presentation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: presentationContent }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate PPT: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("Error generating PowerPoint:", error);

    const errorHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>PowerPoint Generation Error</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .error { color: #e53e3e; margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>PowerPoint Generation Failed</h1>
        <p>There was an error generating your PowerPoint presentation:</p>
        <div class="error">${error instanceof Error ? error.message : String(error)}</div>
        <p>Please try downloading in HTML or Word format instead.</p>
      </body>
      </html>
    `;

    return new Blob([errorHtml], { type: "text/html" });
  }
}


/**
 * Main function for generating document results in the specified format
 * 
 * @param format - The format of the document ('html', 'docx', or 'ppt')
 * @param workflowId - The ID of the workflow
 * @param workflowName - The name of the workflow
 * @param nodeResults - The execution results of workflow nodes
 * @param variables - The workflow variables
 * @returns Promise<Blob> - A document blob that can be downloaded
 */
export async function generateDocumentFromResults(
  format: 'html' | 'docx' | 'ppt',
  workflowId: string,
  workflowName: string,
  nodeResults: Record<string, any>,
  variables: Record<string, any>
): Promise<Blob> {
  if (format === 'ppt') {
    return await generatePptFromResults(workflowId, workflowName, nodeResults, variables);
    // return new Blob;
  } else if (format === 'docx') {
    return generateDocxFromResults(workflowId, workflowName, nodeResults, variables);
    // throw new Error("PowerPoint export not implemented yet")
  } else {
    return generateHtmlFromResults(workflowId, workflowName, nodeResults, variables);
  }
}

/**
 * Trigger a download of the document
 * 
 * @param blob - The document blob to download
 * @param filename - The name of the file
 * @param showSaveDialog - Whether to show the save dialog
 */
export function downloadDocument(blob: Blob, filename: string, showSaveDialog: boolean = false): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  
  // If showSaveDialog is true, we don't set download attribute to let browser show file dialog
  if (showSaveDialog) {
    a.target = '_blank';
  }
  
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Get the document save location based on the browser type
 * 
 * @returns string - The description of where documents are typically saved
 */
export function getDocumentSaveLocation(): string {
  const isChrome = navigator.userAgent.indexOf('Chrome') !== -1;
  const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
  const isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
  const isEdge = navigator.userAgent.indexOf('Edg') !== -1;
  
  if (isChrome || isEdge) {
    // return 'Downloads folder (unless you changed the default download location in your browser settings)';
    return ''
  } else if (isFirefox) {
    return 'Downloads folder (you may be prompted to select a location)';
  } else if (isSafari) {
    return 'Downloads folder (or your selected location if prompted)';
  } else {
    return 'Downloads folder (or a location specified in your browser settings)';
  }
}