/**
 * Utility functions for analyzing workflow definitions
 */

export interface InputRequirement {
  name: string;
  description: string;
  type: string;
  required: boolean;
  defaultValue?: any;
  options?: string[];
}

/**
 * Extract input requirements from a workflow definition
 * 
 * @param workflow The workflow object
 * @returns Array of input requirements
 */
export function extractInputRequirements(workflow: any): InputRequirement[] {
  const inputRequirements: InputRequirement[] = [];
  const processedInputs = new Set<string>(); // To avoid duplicates

  if (!workflow?.nodes || !Array.isArray(workflow.nodes)) {
    return inputRequirements;
  }

  // First pass: extract explicit input nodes
  workflow.nodes.forEach((node: any) => {
    // Handle explicit input nodes
    if (node.type === "input" || node.type === "input_text" || node.type === "text_input") {
      const inputName = node.data?.name || node.id;
      if (processedInputs.has(inputName)) return;
      
      inputRequirements.push({
        name: inputName,
        description: node.data?.description || `Enter value for ${inputName}`,
        type: "text",
        required: node.data?.required !== false, // Default to true if not specified
        defaultValue: node.data?.defaultValue || "",
      });
      processedInputs.add(inputName);
    } 
    // Handle select nodes
    else if (node.type === "input_select" || node.type === "select") {
      const inputName = node.data?.name || node.id;
      if (processedInputs.has(inputName)) return;
      
      inputRequirements.push({
        name: inputName,
        description: node.data?.description || `Select an option for ${inputName}`,
        type: "select",
        required: node.data?.required !== false,
        options: node.data?.options || [],
        defaultValue: node.data?.defaultValue || "",
      });
      processedInputs.add(inputName);
    } 
    // Handle number input nodes
    else if (node.type === "input_number" || node.type === "number") {
      const inputName = node.data?.name || node.id;
      if (processedInputs.has(inputName)) return;
      
      inputRequirements.push({
        name: inputName,
        description: node.data?.description || `Enter number for ${inputName}`,
        type: "number",
        required: node.data?.required !== false,
        defaultValue: node.data?.defaultValue || 0,
      });
      processedInputs.add(inputName);
    }
  });

  // Second pass: look for template variables in other nodes
  workflow.nodes.forEach((node: any) => {
    // Look for template variables in node parameters
    if (node.data?.parameters && typeof node.data.parameters === 'object') {
      Object.entries(node.data.parameters).forEach(([key, value]) => {
        const paramValue = value as any;
        if (typeof paramValue === 'string') {
          // Common patterns for template variables: {{variable}}, $input.variable, $(variable)
          const patterns = [
            /\{\{([^}]+)\}\}/g,    // {{variable}}
            /\$input\.([a-zA-Z0-9_]+)/g,  // $input.variable
            /\$\(([^)]+)\)/g       // $(variable)
          ];
          
          for (const pattern of patterns) {
            let match;
            while ((match = pattern.exec(paramValue)) !== null) {
              const varName = match[1].trim();
              if (!processedInputs.has(varName)) {
                inputRequirements.push({
                  name: varName,
                  description: `Value for ${varName}`,
                  type: 'text',  // Default to text for template variables
                  required: true,
                  defaultValue: '',
                });
                processedInputs.add(varName);
              }
            }
          }
        }
      });
    }
    
    // Look for input references in node code (for code/function nodes)
    if (node.data?.code && typeof node.data.code === 'string') {
      const codeStr = node.data.code;
      // Look for patterns like input.varName or inputs["varName"]
      const inputPatterns = [
        /input\.([a-zA-Z0-9_]+)/g,  // input.varName
        /inputs\[["']([^"']+)["']\]/g,  // inputs["varName"]
        /inputs\.([a-zA-Z0-9_]+)/g   // inputs.varName
      ];
      
      for (const pattern of inputPatterns) {
        let match;
        while ((match = pattern.exec(codeStr)) !== null) {
          const varName = match[1].trim();
          if (!processedInputs.has(varName)) {
            inputRequirements.push({
              name: varName,
              description: `Value for ${varName}`,
              type: 'text',  // Default to text for code variables
              required: true,
              defaultValue: '',
            });
            processedInputs.add(varName);
          }
        }
      }
    }
  });

  // If we found no inputs but the workflow expects them, add some default ones
  if (inputRequirements.length === 0 && workflow.inputSchema) {
    try {
      // Try to parse input schema if available
      const schema = typeof workflow.inputSchema === 'string' 
        ? JSON.parse(workflow.inputSchema)
        : workflow.inputSchema;
      
      if (schema.properties) {
        Object.entries(schema.properties).forEach(([propName, propDef]: [string, any]) => {
          inputRequirements.push({
            name: propName,
            description: propDef.description || `Value for ${propName}`,
            type: mapJsonSchemaTypeToInputType(propDef.type),
            required: schema.required?.includes(propName) || false,
            defaultValue: propDef.default || '',
            options: propDef.enum || undefined
          });
        });
      }
    } catch (error) {
      console.error('Error parsing inputSchema:', error);
    }
  }

  return inputRequirements;
}

/**
 * Map JSON Schema types to input field types
 */
function mapJsonSchemaTypeToInputType(schemaType: string): string {
  switch (schemaType) {
    case 'number':
    case 'integer':
      return 'number';
    case 'boolean':
      return 'checkbox';
    default:
      return 'text';
  }
}