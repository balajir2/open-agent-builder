/**
 * Basic variable extractor
 * 
 * This module provides functions to extract variable names from workflow definitions
 * It's used alongside the deep-variable-extractor for maximum coverage
 */

/**
 * Extract variable names from a workflow definition by examining nodes and edges
 */
export function extractVariableNames(workflow: any): string[] {
  if (!workflow || !workflow.nodes) return [];
  
  const variables = new Set<string>();
  
  // Look through start node outputs
  const startNode = workflow.nodes.find((node: any) => 
    node.type === 'start' || node.id === 'start'
  );
  
  if (startNode) {
    // Check outputs array
    if (Array.isArray(startNode.outputs)) {
      startNode.outputs.forEach((output: any) => {
        if (typeof output === 'string') {
          variables.add(output);
        } else if (output && output.name) {
          variables.add(output.name);
        }
      });
    }
    
    // Check data.inputs
    if (startNode.data && Array.isArray(startNode.data.inputs)) {
      startNode.data.inputs.forEach((input: any) => {
        if (typeof input === 'string') {
          variables.add(input);
        } else if (input && input.name) {
          variables.add(input.name);
        }
      });
    }
  }
  
  // Filter out system variables
  return Array.from(variables).filter(name => 
    !name.includes('node_') && 
    !name.startsWith('xy-') && 
    !name.includes('__')
  );
}

/**
 * Find variables used in template strings within the workflow
 * Looks for patterns like {{variableName}}
 */
export function findVariablesInTemplates(workflow: any): string[] {
  if (!workflow || !workflow.nodes) return [];
  
  const variables = new Set<string>();
  
  // Search through all nodes for template strings
  workflow.nodes.forEach((node: any) => {
    if (!node.data) return;
    
    // Check fields that might contain templates
    const templateFields = [
      'prompt', 'template', 'systemMessage', 'userMessage', 
      'text', 'content', 'description'
    ];
    
    templateFields.forEach(field => {
      if (typeof node.data[field] === 'string') {
        const matches = node.data[field].match(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g) || [];
        
        matches.forEach(match => {
          // Extract variable name without {{ }}
          const varName = match.replace(/\{\{\s*|\s*\}\}/g, '');
          variables.add(varName);
        });
      }
    });
  });
  
  // Filter out system variables
  return Array.from(variables).filter(name => 
    !name.includes('node_') && 
    !name.startsWith('xy-') && 
    !name.includes('__')
  );
}