
export interface ToolConfigField {
    name: string;
    label: string;
    type: 'string' | 'number' | 'boolean' | 'select' | 'secret';
    required?: boolean;
    placeholder?: string;
    options?: { label: string; value: string }[];
    defaultValue?: any;
    description?: string;
    global?: boolean; // If true, this field is configured globally in Settings
}

export interface ToolDefinition {
    id: string;
    name: string;
    label: string;
    description: string;
    category: 'web-search' | 'scraping' | 'extraction' | 'other';
    icon?: any; // Lucide icon component or string URL
    fields: ToolConfigField[];
    defaultConfig?: Record<string, any>;
}

export interface ToolConfig {
    toolId: string;
    enabled: boolean;
    config: Record<string, any>;
}
