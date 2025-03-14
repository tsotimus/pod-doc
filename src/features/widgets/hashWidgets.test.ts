import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { hashWidgets } from './hashWidgets';
import { WidgetModel } from '@/types/widget';

describe('hashWidgets', () => {
  // Store the original digest method
  let originalDigest: typeof crypto.subtle.digest;
  
  // Centralized mock data
  const createMockWidget = (id: string, content: string, position = { x: 100, y: 200 }, size = { width: 300, height: 150 }): WidgetModel => ({
    id,
    type: 'TEXT',
    content,
    positionX: position.x,
    positionY: position.y,
    width: size.width,
    height: size.height
  });
  
  // Common test widgets
  const testWidget = createMockWidget('1', 'Test Widget');
  const modifiedTestWidget = createMockWidget('1', 'Test Widget Modified');
  const firstWidget = createMockWidget('1', 'First Widget');
  const secondWidget = createMockWidget('2', 'Second Widget', { x: 400, y: 500 }, { width: 200, height: 100 });
  
  beforeEach(() => {
    // Save original digest method with proper binding
    originalDigest = crypto.subtle.digest.bind(crypto.subtle);
    
    // Mock TextEncoder
    global.TextEncoder = class MockTextEncoder {
      encode(input: string): Uint8Array {
        return new Uint8Array([...input].map(char => char.charCodeAt(0)));
      }
    } as unknown as typeof TextEncoder;
  });
  
  afterEach(() => {
    // Restore original digest method
    crypto.subtle.digest = originalDigest;
  });
  
  it('should generate a consistent hash for the same input', async () => {
    const widgets: WidgetModel[] = [testWidget];
    
    const hash1 = await hashWidgets(widgets);
    const hash2 = await hashWidgets(widgets);
    
    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64); // SHA-256 produces a 64-character hex string
  });
  
  it('should generate different hashes for different inputs', async () => {
    const widgets1: WidgetModel[] = [testWidget];
    const widgets2: WidgetModel[] = [modifiedTestWidget];
    
    const hash1 = await hashWidgets(widgets1);
    const hash2 = await hashWidgets(widgets2);
    
    expect(hash1).not.toBe(hash2);
  });
  
  it('should generate different hashes when widget order changes', async () => {
    const widgets1: WidgetModel[] = [firstWidget, secondWidget];
    const widgets2: WidgetModel[] = [secondWidget, firstWidget];
    
    const hash1 = await hashWidgets(widgets1);
    const hash2 = await hashWidgets(widgets2);
    
    expect(hash1).not.toBe(hash2);
  });
  
  it('should handle empty array input', async () => {
    const emptyWidgets: WidgetModel[] = [];
    const hash = await hashWidgets(emptyWidgets);
    
    expect(hash).toBeDefined();
    expect(hash).toHaveLength(64);
  });
  
  it('should use the crypto.subtle.digest with SHA-256 algorithm', async () => {
    // Create a mock digest function that returns a fixed ArrayBuffer
    const mockDigest = vi.fn().mockResolvedValue(new ArrayBuffer(32));
    
    // Spy on and mock the crypto.subtle.digest method
    crypto.subtle.digest = mockDigest;
    
    const widgets: WidgetModel[] = [testWidget];
    
    await hashWidgets(widgets);
    
    expect(mockDigest).toHaveBeenCalledTimes(1);
    expect(mockDigest.mock.calls[0][0]).toBe('SHA-256');
  });
});