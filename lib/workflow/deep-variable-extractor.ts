/**
 * Deep Variable Extractor
 * 
 * This utility aggressively searches for true variable names in workflow definitions
 * by examining all possible locations where variables might be referenced.
 */

/**
 * Extract actual variable names from a workflow definition
 * These are the variables that will be used in the actual workflow execution
 */
export function extractTrueVariableNames(workflow: any): string[] {
  if (!workflow) return [];
  
  const variableNames = new Set<string>();
  
  // Debug the workflow structure to understand what we're working with
  console.log('Extracting variables from workflow:', workflow.name || 'Unnamed workflow');
  
  // STRATEGY 1: Look for variables in prompts/templates with {{varName}} pattern
  // This is most reliable as these are the actual variables being used
  extractVariablesFromPrompts(workflow, variableNames);
  
  // STRATEGY 2: Look for start node output variables which often define workflow inputs
  extractVariablesFromStartNode(workflow, variableNames);
  
  // STRATEGY 3: Look for direct input definitions in node configurations
  extractVariablesFromNodeData(workflow, variableNames);
  
  // STRATEGY 4: Look for mapping references in edge configurations
  extractVariablesFromEdges(workflow, variableNames);
  
  // Filter out system variables and clean up names
  const cleanedVars = Array.from(variableNames).filter(name => {
    // Exclude names that look like system variables or node references
    return !name.startsWith('xy-') && 
           !name.startsWith('node_') &&
           !name.includes('__node') &&
           !name.includes('-node_') && 
           !name.includes('edge__') && 
           !name.includes('-input') &&
           !name.includes('-output') && 
           !name.includes('Handle') &&
           name.length > 0;
  });
  
  console.log('Extracted cleaned variable names:', cleanedVars);
  return cleanedVars;
}

/**
 * Look for variables referenced in templates and prompts
 * These are typically actual variables used in the workflow
 */
function extractVariablesFromPrompts(workflow: any, variables: Set<string>): void {
  if (!workflow.nodes || !Array.isArray(workflow.nodes)) return;
  
  workflow.nodes.forEach((node: any) => {
    if (!node.data) return;
    
    // Examine various fields that might contain template text with variable references
    const templateFields = [
      'prompt', 'template', 'systemMessage', 'userMessage',
      'text', 'content', 'description', 'message'
    ];
    
    for (const field of templateFields) {
      if (typeof node.data[field] === 'string') {
        extractVariablesFromTemplateString(node.data[field], variables);
      } else if (node.data[field] && typeof node.data[field] === 'object') {
        // Handle nested objects that might contain template strings
        const jsonStr = JSON.stringify(node.data[field]);
        extractVariablesFromTemplateString(jsonStr, variables);
      }
    }
    
    // Look in any configuration objects
    if (node.data.config && typeof node.data.config === 'object') {
      const jsonStr = JSON.stringify(node.data.config);
      extractVariablesFromTemplateString(jsonStr, variables);
    }
  });
}

/**
 * Extract variable names from a template string
 * Looks for patterns like {{varName}}, {varName}, or $varName
 */
function extractVariablesFromTemplateString(text: string, variables: Set<string>): void {
  if (!text) return;
  
  // Look for {{variable}} pattern (most common)
  const curlyMatches = text.match(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g) || [];
  for (const match of curlyMatches) {
    const varName = match.replace(/\{\{\s*|\s*\}\}/g, '').trim();
    if (varName) {
      console.log(`Found variable in template: ${varName}`);
      variables.add(varName);
    }
  }
  
  // Look for {variable} pattern (also common)
  const singleCurlyMatches = text.match(/\{\s*([a-zA-Z0-9_]+)\s*\}/g) || [];
  for (const match of singleCurlyMatches) {
    const varName = match.replace(/\{\s*|\s*\}/g, '').trim();
    if (varName && !varName.includes('"') && !varName.includes("'")) {
      console.log(`Found variable with single curly braces: ${varName}`);
      variables.add(varName);
    }
  }
  
  // Look for $variable pattern
  const dollarMatches = text.match(/\$([a-zA-Z0-9_]+)/g) || [];
  for (const match of dollarMatches) {
    const varName = match.replace(/^\$/, '').trim();
    if (varName) {
      console.log(`Found variable with dollar sign: ${varName}`);
      variables.add(varName);
    }
  }
}

/**
 * Extract variables from the start node definition
 * These often define the input variables expected by the workflow
 */
function extractVariablesFromStartNode(workflow: any, variables: Set<string>): void {
  if (!workflow.nodes || !Array.isArray(workflow.nodes)) return;
  
  // Find the start node(s)
  const startNodes = workflow.nodes.filter((n: any) => 
    n.type === 'start' || n.id === 'start' || n.name === 'start'
  );
  
  for (const startNode of startNodes) {
    // Check outputs field
    if (startNode.outputs) {
      if (Array.isArray(startNode.outputs)) {
        startNode.outputs.forEach((output: any) => {
          if (typeof output === 'string') {
            console.log(`Found variable in start node outputs: ${output}`);
            variables.add(output);
          } else if (output && output.name) {
            console.log(`Found variable in start node output object: ${output.name}`);
            variables.add(output.name);
          }
        });
      } else if (typeof startNode.outputs === 'object') {
        Object.keys(startNode.outputs).forEach(key => {
          console.log(`Found variable in start node outputs object: ${key}`);
          variables.add(key);
        });
      }
    }
    
    // Check data object for variables
    if (startNode.data) {
      if (Array.isArray(startNode.data.inputs)) {
        startNode.data.inputs.forEach((input: any) => {
          if (typeof input === 'string') {
            console.log(`Found variable in start node data.inputs: ${input}`);
            variables.add(input);
          } else if (input && input.name) {
            console.log(`Found variable in start node data.inputs object: ${input.name}`);
            variables.add(input.name);
          }
        });
      }
      
      if (Array.isArray(startNode.data.outputs)) {
        startNode.data.outputs.forEach((output: any) => {
          if (typeof output === 'string') {
            console.log(`Found variable in start node data.outputs: ${output}`);
            variables.add(output);
          } else if (output && output.name) {
            console.log(`Found variable in start node data.outputs object: ${output.name}`);
            variables.add(output.name);
          }
        });
      }
      
      // Check for outputMappings
      if (startNode.data.outputMappings && typeof startNode.data.outputMappings === 'object') {
        Object.values(startNode.data.outputMappings).forEach((mapping: any) => {
          if (typeof mapping === 'string') {
            console.log(`Found variable in start node outputMappings: ${mapping}`);
            variables.add(mapping);
          } else if (mapping && mapping.name) {
            console.log(`Found variable in start node outputMappings object: ${mapping.name}`);
            variables.add(mapping.name);
          }
        });
      }
    }
  }
}

/**
 * Extract variables from node data definitions
 * This examines nodes for input and parameter definitions
 */
function extractVariablesFromNodeData(workflow: any, variables: Set<string>): void {
  if (!workflow.nodes || !Array.isArray(workflow.nodes)) return;
  
  workflow.nodes.forEach((node: any) => {
    if (!node.data) return;
    
    // Look for parameters definitions (common in agent and tool nodes)
    if (Array.isArray(node.data.parameters)) {
      node.data.parameters.forEach((param: any) => {
        if (param && param.name) {
          console.log(`Found variable in node parameters: ${param.name}`);
          variables.add(param.name);
        }
      });
    }
    
    // Look for inputs definitions
    if (Array.isArray(node.data.inputs)) {
      node.data.inputs.forEach((input: any) => {
        if (typeof input === 'string') {
          console.log(`Found variable in node inputs: ${input}`);
          variables.add(input);
        } else if (input && input.name) {
          console.log(`Found variable in node inputs object: ${input.name}`);
          variables.add(input.name);
        }
      });
    }
    
    // Look for input fields directly on data
    Object.keys(node.data).forEach(key => {
      if (key.toLowerCase().includes('input') && typeof node.data[key] === 'string' && !node.data[key].includes('node_')) {
        console.log(`Found variable in node data.${key}: ${node.data[key]}`);
        variables.add(node.data[key]);
      }
    });
  });
}

/**
 * Extract variables from edge data
 * This looks for variable references in edge data and mapping configurations
 */
function extractVariablesFromEdges(workflow: any, variables: Set<string>): void {
  if (!workflow.edges || !Array.isArray(workflow.edges)) return;
  
  workflow.edges.forEach((edge: any) => {
    // Check for direct variable references
    if (edge.data && edge.data.variable) {
      console.log(`Found variable in edge data: ${edge.data.variable}`);
      variables.add(edge.data.variable);
    }
    
    // Check for variable mappings
    if (edge.data && edge.data.mapping && typeof edge.data.mapping === 'object') {
      Object.entries(edge.data.mapping).forEach(([key, value]) => {
        console.log(`Found source variable in edge mapping: ${key}`);
        variables.add(key);
        
        // Also check the target value if it's a string (might be another variable name)
        if (typeof value === 'string' && !value.includes('node_') && !value.startsWith('xy-')) {
          console.log(`Found target variable in edge mapping: ${value}`);
          variables.add(value as string);
        }
      });
    }
    
    // Check label - sometimes it contains the variable name
    if (edge.label && typeof edge.label === 'string' && 
        !edge.label.includes('node_') && 
        !edge.label.startsWith('xy-')) {
      console.log(`Found potential variable in edge label: ${edge.label}`);
      variables.add(edge.label);
    }
    
    // Handle sourceHandle and targetHandle which might contain variable names
    if (edge.sourceHandle && typeof edge.sourceHandle === 'string') {
      // Extract variable name from source handle by removing system prefixes
      const sourceVar = cleanHandleId(edge.sourceHandle);
      if (sourceVar) {
        console.log(`Found variable in sourceHandle: ${sourceVar}`);
        variables.add(sourceVar);
      }
    }
    
    if (edge.targetHandle && typeof edge.targetHandle === 'string') {
      // Extract variable name from target handle by removing system prefixes
      const targetVar = cleanHandleId(edge.targetHandle);
      if (targetVar) {
        console.log(`Found variable in targetHandle: ${targetVar}`);
        variables.add(targetVar);
      }
    }
  });
}

/**
 * Clean up handle IDs to extract the actual variable name
 */
function cleanHandleId(handleId: string): string | null {
  if (!handleId) return null;
  
  // Skip obvious system handles
  if (handleId.startsWith('node_') || handleId.startsWith('xy-') || handleId.includes('__node')) {
    return null;
  }
  
  // Try to extract variable name from handle ID
  // Pattern: often something like "output-varName" or "varName-input"
  let cleaned = handleId
    .replace(/^output-/, '')
    .replace(/-input$/, '')
    .replace(/^input-/, '')
    .replace(/-output$/, '');
  
  // If it still has node references, it's probably not a clean variable
  if (cleaned.includes('node_') || cleaned.includes('edge__')) {
    return null;
  }
  
  return cleaned;
}