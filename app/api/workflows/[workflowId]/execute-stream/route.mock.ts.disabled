import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Simplified mock streaming workflow execution with real-time updates
 * Uses Server-Sent Events (SSE) to simulate workflow execution
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { workflowId: string } }
) {
  const { workflowId } = params;

  // Create SSE stream
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (event: string, data: any) => {
        try {
          const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(message));
        } catch (error) {
          console.error('Failed to send SSE event:', error);
        }
      };

      try {
        // Get inputs from request body
        let inputs = {};
        try {
          const body = await request.json();
          inputs = body || {};
        } catch (e) {
          console.error('Error parsing request body:', e);
          // Continue with empty inputs
        }

        // Get workflow name from ID
        const workflowName = workflowId.includes('-') 
          ? workflowId.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
          : `Workflow ${workflowId}`;

        // Send start event
        sendEvent('workflow_started', {
          workflowId,
          workflowName,
          totalNodes: 3,
          timestamp: new Date().toISOString(),
        });

        // Generate appropriate mock results based on inputs and workflow ID
        let finalResult = '';
        let nodeResults = {};

        // Small delay for the first node
        await new Promise(resolve => setTimeout(resolve, 1000));

        // First node - input processing
        const inputNode = {
          nodeId: 'node_input',
          nodeName: 'Process Inputs',
        };

        sendEvent('node_started', {
          ...inputNode,
          nodeType: 'input_processor',
          timestamp: new Date().toISOString(),
        });

        await new Promise(resolve => setTimeout(resolve, 800));

        sendEvent('node_completed', {
          ...inputNode,
          result: {
            status: 'completed',
            output: `Processed ${Object.keys(inputs).length} input fields.`
          },
          timestamp: new Date().toISOString(),
        });

        // Set up node results
        nodeResults = {
          [inputNode.nodeId]: {
            nodeName: inputNode.nodeName,
            status: 'completed',
            output: `Processed inputs: ${JSON.stringify(inputs)}`,
          }
        };

        // Second node - main processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mainNode = {
          nodeId: 'node_main',
          nodeName: 'Main Processing',
        };

        sendEvent('node_started', {
          ...mainNode,
          nodeType: 'processor',
          timestamp: new Date().toISOString(),
        });

        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate a result based on the workflowId and inputs
        const idLower = workflowId.toLowerCase();
        
        if (idLower.includes('company') || idLower.includes('compare')) {
          // Company comparison workflow
          const company1 = inputs['company_1'] || inputs['company_name_1'] || Object.values(inputs)[0] || 'Company A';
          const company2 = inputs['company_2'] || inputs['company_name_2'] || Object.values(inputs)[1] || 'Company B';
          
          finalResult = `Comparison Results: ${company1} vs ${company2}

Industry: 
${company1} operates in the technology sector, focusing on software development and cloud services.
${company2} operates in the technology sector, with a primary focus on hardware and consumer electronics.

Market Cap:
${company1}: $1.2 trillion
${company2}: $2.4 trillion

Revenue (2023):
${company1}: $168.5 billion
${company2}: $394.3 billion

Growth Rate:
${company1}: 17% YoY
${company2}: 8% YoY

Key Products:
${company1}:
- Cloud computing platforms
- Office productivity software
- Enterprise solutions

${company2}:
- Smartphones and tablets
- Personal computers
- Wearable technology

Competitive Advantages:
${company1} has strong recurring revenue from subscription services and enterprise contracts.
${company2} has superior brand recognition and customer loyalty in the consumer market.

Future Outlook:
Both companies are well-positioned for future growth, with ${company1} having stronger positions in cloud services while ${company2} continues to dominate consumer hardware.`;
        } else if (idLower.includes('analyze') || idLower.includes('text')) {
          // Text analysis
          const text = inputs['text'] || Object.values(inputs)[0] || 'Sample text';
          finalResult = `Text Analysis Results

Input Text: ${text.slice(0, 50)}${text.length > 50 ? '...' : ''}

Sentiment: Positive (0.78)
Key Entities: [Company, Product, Location]
Main Topics: Technology, Innovation, Business
Language: English
Word Count: ${text.split(/\\s+/).length}

Summary:
The provided text discusses technological innovations and business strategies with a positive sentiment. The content primarily focuses on company developments and product features in the technology sector.`;
        } else if (idLower.includes('search') || idLower.includes('find')) {
          // Search results
          const query = inputs['query'] || Object.values(inputs)[0] || 'search query';
          finalResult = `Search Results for: "${query}"

Found 5 relevant results:

1. "Understanding ${query}: A Comprehensive Guide" (Score: 0.95)
   Source: example.com/guide
   Published: 2023-05-15

2. "The Impact of ${query} on Modern Business" (Score: 0.87)
   Source: businessjournal.com/impact
   Published: 2023-08-22

3. "${query} Implementation Strategies" (Score: 0.82)
   Source: techblog.org/strategies
   Published: 2023-10-05

4. "How ${query} is Changing the Industry" (Score: 0.78)
   Source: industryreview.net/changing
   Published: 2023-04-18

5. "${query}: Future Trends and Predictions" (Score: 0.75)
   Source: futureinsights.com/trends
   Published: 2023-11-30`;
        } else {
          // Generic result for other workflow types
          finalResult = `Workflow Results for ${workflowName}

Inputs:
${Object.entries(inputs).map(([key, value]) => `${key}: ${value}`).join('\n')}

Execution Time: 2.3 seconds
Status: Completed Successfully

Results:
The workflow executed successfully and processed all input parameters.
Analysis shows positive outcomes with a 98% confidence score.

Key Findings:
- Input validation passed all checks
- Processing completed within expected parameters
- Output formatting applied successfully
- All quality checks passed without errors

Conclusion:
The ${workflowName} workflow has produced results that match expected quality standards.
`;
        }

        // Update node results
        nodeResults[mainNode.nodeId] = {
          nodeName: mainNode.nodeName,
          status: 'completed',
          output: finalResult,
        };

        sendEvent('node_completed', {
          ...mainNode,
          result: {
            status: 'completed',
            output: finalResult
          },
          timestamp: new Date().toISOString(),
        });

        // State update
        sendEvent('state_update', {
          nodeResults,
          currentNodeId: mainNode.nodeId,
          timestamp: new Date().toISOString(),
        });

        // Third node - output formatting
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const outputNode = {
          nodeId: 'node_output',
          nodeName: 'Format Output',
        };

        sendEvent('node_started', {
          ...outputNode,
          nodeType: 'output_formatter',
          timestamp: new Date().toISOString(),
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        // Update node results
        nodeResults[outputNode.nodeId] = {
          nodeName: outputNode.nodeName,
          status: 'completed',
          output: 'Output formatted successfully.',
        };

        sendEvent('node_completed', {
          ...outputNode,
          result: {
            status: 'completed',
            output: 'Output formatted successfully.'
          },
          timestamp: new Date().toISOString(),
        });

        // Final state update
        sendEvent('state_update', {
          nodeResults,
          currentNodeId: null,
          timestamp: new Date().toISOString(),
        });

        // Send completion event with all results
        sendEvent('workflow_completed', {
          workflowId,
          results: {
            [inputNode.nodeId]: nodeResults[inputNode.nodeId],
            [mainNode.nodeId]: nodeResults[mainNode.nodeId],
            [outputNode.nodeId]: nodeResults[outputNode.nodeId],
            'final_output': {
              nodeName: 'Final Output',
              status: 'completed',
              output: finalResult,
            }
          },
          status: 'completed',
          timestamp: new Date().toISOString(),
        });

        controller.close();
      } catch (error) {
        sendEvent('error', {
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
        });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable nginx buffering
    },
  });
}