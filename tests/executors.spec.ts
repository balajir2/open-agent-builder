import { test, expect } from '@playwright/test';
import * as mcpUtils from '@/lib/workflow/executors/mcp-utils';
import * as mcpServers from '@/convex/mcpServers';
import { createMockContext } from './utils/mocks';

// Unit Tests for Executors and Utility Functions

test.describe('MCP Utilities', () => {
    test('unwrapMCPResponse should extract text from content array', () => {
        const response = {
            content: [
                { type: 'text', text: 'Hello World' }
            ]
        };
        const result = mcpUtils.unwrapMCPResponse(response);
        expect(result).toBe('Hello World');
    });

    test('unwrapMCPResponse should handle direct result property', () => {
        const response = {
            result: {
                content: [
                    { type: 'text', text: 'Nested Result' }
                ]
            }
        };
        const result = mcpUtils.unwrapMCPResponse(response);
        expect(result).toBe('Nested Result');
    });

    test('convertMcpToOpenAiTool should convert schema correctly', () => {
        const mcpTool = {
            name: 'test_tool',
            description: 'A test tool',
            input_schema: {
                type: 'object',
                properties: {
                    arg1: { type: 'string' }
                },
                required: ['arg1']
            }
        };
        const openAiTool = mcpUtils.convertMcpToOpenAiTool(mcpTool);
        expect(openAiTool.type).toBe('function');
        expect(openAiTool.function.name).toBe('test_tool');
        expect(openAiTool.function.parameters.properties.arg1.type).toBe('string');
        expect(openAiTool.function.parameters.required).toContain('arg1');
    });
});

test.describe('Convex MCP Mutations', () => {
    // Access internal handler for testing to bypass "dontCallDirectly" check and type restrictions
    const getHandler = (func: any) => func._handler;

    test('addMCPServer should insert a new server', async () => {
        const mockDbData: any = { mcpServers: [] };
        const ctx = createMockContext(mockDbData, 'user1');
        
        const args = {
            userId: 'user1',
            name: 'New Server',
            url: 'https://example.com',
            category: 'test',
            authType: 'none'
        };

        const handler = getHandler(mcpServers.addMCPServer);
        const id = await handler(ctx as any, args);
        
        expect(id).toBeDefined();
        expect(mockDbData.mcpServers.length).toBe(1);
        expect(mockDbData.mcpServers[0].name).toBe('New Server');
        expect(mockDbData.mcpServers[0].enabled).toBe(true);
    });

    test('updateMCPServer should update own server', async () => {
        const mockDbData: any = { 
            mcpServers: [
                { _id: 'server1', userId: 'user1', name: 'Old Name' }
            ] 
        };
        const ctx = createMockContext(mockDbData, 'user1');
        
        const handler = getHandler(mcpServers.updateMCPServer);
        await handler(ctx as any, {
            id: 'server1' as any,
            name: 'New Name'
        });
        
        expect(mockDbData.mcpServers[0].name).toBe('New Name');
    });

    test('updateMCPServer should fail for other users server', async () => {
        const mockDbData: any = { 
            mcpServers: [
                { _id: 'server1', userId: 'user2', name: 'User2 Server' }
            ] 
        };
        const ctx = createMockContext(mockDbData, 'user1');
        
        const handler = getHandler(mcpServers.updateMCPServer);
        await expect(handler(ctx as any, {
            id: 'server1' as any,
            name: 'Hacked Name'
        })).rejects.toThrow('Unauthorized');
    });

    test('deleteMCPServer should remove own server', async () => {
         const mockDbData: any = { 
            mcpServers: [
                { _id: 'server1', userId: 'user1', name: 'My Server' }
            ] 
        };
        const ctx = createMockContext(mockDbData, 'user1');
        
        const handler = getHandler(mcpServers.deleteMCPServer);
        await handler(ctx as any, {
            id: 'server1' as any
        });
        
        expect(mockDbData.mcpServers.length).toBe(0);
    });
});
