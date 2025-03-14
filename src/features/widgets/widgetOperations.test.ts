import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  removeWidget, 
  updateWidgetContent, 
  updateWidgetSize,
  updateWidgetPosition,
  addWidget
} from './widgetOperations';
import { WidgetModel } from '@/types/widget';

// Mock uuid to return predictable values
vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mocked-uuid')
}));

describe('widgetOperations', () => {
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
  const widget1 = createMockWidget('1', 'Widget 1');
  const widget2 = createMockWidget('2', 'Widget 2');
  const widget3 = createMockWidget('3', 'Widget 3');
  
  describe('addWidget', () => {
    it('should add a new widget to the array with default values', () => {
      const widgets = [widget1, widget2];
      const result = addWidget(widgets, 'TEXT');
      
      expect(result).toHaveLength(3);
      expect(result[2]).toEqual({
        id: 'mocked-uuid',
        type: 'TEXT',
        content: '',
        positionX: 100,
        positionY: 100,
        width: 320,
        height: 200
      });
    });
    
    it('should add a new widget with custom content', () => {
      const widgets = [widget1];
      const result = addWidget(widgets, 'TEXT', 'Custom Content');
      
      expect(result).toHaveLength(2);
      expect(result[1].content).toBe('Custom Content');
    });
    
    it('should add a new widget with custom position', () => {
      const widgets = [widget1];
      const result = addWidget(widgets, 'TEXT', '', { x: 200, y: 300 });
      
      expect(result).toHaveLength(2);
      expect(result[1].positionX).toBe(200);
      expect(result[1].positionY).toBe(300);
    });
    
    it('should add a new widget with custom size', () => {
      const widgets = [widget1];
      const result = addWidget(widgets, 'TEXT', '', { x: 100, y: 100 }, { width: 400, height: 250 });
      
      expect(result).toHaveLength(2);
      expect(result[1].width).toBe(400);
      expect(result[1].height).toBe(250);
    });
    
    it('should work with an empty array', () => {
      const widgets: WidgetModel[] = [];
      const result = addWidget(widgets, 'TEXT');
      
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('TEXT');
    });
    
    it('should not mutate the original array', () => {
      const widgets = [widget1, widget2];
      const originalWidgets = [...widgets];
      
      addWidget(widgets, 'TEXT');
      
      expect(widgets).toEqual(originalWidgets);
      expect(widgets).toHaveLength(2);
    });
  });
  
  describe('removeWidget', () => {
    it('should remove a widget with the specified ID', () => {
      const widgets = [widget1, widget2, widget3];
      const result = removeWidget(widgets, '2');
      
      expect(result).toHaveLength(2);
      expect(result).toEqual([widget1, widget3]);
      expect(result.find(w => w.id === '2')).toBeUndefined();
    });
    
    it('should return the original array if the ID is not found', () => {
      const widgets = [widget1, widget2];
      const result = removeWidget(widgets, '999');
      
      expect(result).toHaveLength(2);
      expect(result).toEqual([widget1, widget2]);
    });
    
    it('should handle an empty array', () => {
      const widgets: WidgetModel[] = [];
      const result = removeWidget(widgets, '1');
      
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
    
    it('should not mutate the original array', () => {
      const widgets = [widget1, widget2, widget3];
      const originalWidgets = [...widgets];
      
      removeWidget(widgets, '2');
      
      expect(widgets).toEqual(originalWidgets);
      expect(widgets).toHaveLength(3);
    });
  });
  
  describe('updateWidgetContent', () => {
    it('should update the content of a widget with the specified ID', () => {
      const widgets = [widget1, widget2, widget3];
      const newContent = 'Updated Widget 2';
      const result = updateWidgetContent(widgets, '2', newContent);
      
      expect(result).toHaveLength(3);
      expect(result[1].content).toBe(newContent);
      expect(result[0].content).toBe('Widget 1'); // Other widgets unchanged
      expect(result[2].content).toBe('Widget 3'); // Other widgets unchanged
    });
    
    it('should return the original array if the ID is not found', () => {
      const widgets = [widget1, widget2];
      const result = updateWidgetContent(widgets, '999', 'New Content');
      
      expect(result).toHaveLength(2);
      expect(result).toEqual(widgets);
    });
    
    it('should handle an empty array', () => {
      const widgets: WidgetModel[] = [];
      const result = updateWidgetContent(widgets, '1', 'New Content');
      
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
    
    it('should not mutate the original array', () => {
      const widgets = [widget1, widget2, widget3];
      const originalWidgets = [...widgets];
      
      updateWidgetContent(widgets, '2', 'Updated Content');
      
      expect(widgets).toEqual(originalWidgets);
      expect(widgets[1].content).toBe('Widget 2'); // Original content unchanged
    });
    
    it('should handle empty content', () => {
      const widgets = [widget1, widget2, widget3];
      const result = updateWidgetContent(widgets, '2', '');
      
      expect(result[1].content).toBe('');
    });
  });
  
  describe('updateWidgetSize', () => {
    it('should update the size of a widget with the specified ID', () => {
      const widgets = [widget1, widget2, widget3];
      const newWidth = 500;
      const newHeight = 300;
      const result = updateWidgetSize(widgets, '2', newWidth, newHeight);
      
      expect(result).toHaveLength(3);
      expect(result[1].width).toBe(newWidth);
      expect(result[1].height).toBe(newHeight);
      expect(result[0].width).toBe(300); // Other widgets unchanged
      expect(result[0].height).toBe(150); // Other widgets unchanged
      expect(result[2].width).toBe(300); // Other widgets unchanged
      expect(result[2].height).toBe(150); // Other widgets unchanged
    });
    
    it('should return the original array if the ID is not found', () => {
      const widgets = [widget1, widget2];
      const result = updateWidgetSize(widgets, '999', 500, 300);
      
      expect(result).toHaveLength(2);
      expect(result).toEqual(widgets);
    });
    
    it('should handle an empty array', () => {
      const widgets: WidgetModel[] = [];
      const result = updateWidgetSize(widgets, '1', 500, 300);
      
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
    
    it('should not mutate the original array', () => {
      const widgets = [widget1, widget2, widget3];
      const originalWidgets = [...widgets];
      
      updateWidgetSize(widgets, '2', 500, 300);
      
      expect(widgets).toEqual(originalWidgets);
      expect(widgets[1].width).toBe(300); // Original size unchanged
      expect(widgets[1].height).toBe(150); // Original size unchanged
    });
    
    it('should handle zero values for width and height', () => {
      const widgets = [widget1, widget2, widget3];
      const result = updateWidgetSize(widgets, '2', 0, 0);
      
      expect(result[1].width).toBe(0);
      expect(result[1].height).toBe(0);
    });
  });
  
  describe('updateWidgetPosition', () => {
    it('should update the position of a widget with the specified ID', () => {
      const widgets = [widget1, widget2, widget3];
      const newX = 500;
      const newY = 300;
      const result = updateWidgetPosition(widgets, '2', newX, newY);
      
      expect(result).toHaveLength(3);
      expect(result[1].positionX).toBe(newX);
      expect(result[1].positionY).toBe(newY);
      expect(result[0].positionX).toBe(100); // Other widgets unchanged
      expect(result[0].positionY).toBe(200); // Other widgets unchanged
      expect(result[2].positionX).toBe(100); // Other widgets unchanged
      expect(result[2].positionY).toBe(200); // Other widgets unchanged
    });
    
    it('should return the original array if the ID is not found', () => {
      const widgets = [widget1, widget2];
      const result = updateWidgetPosition(widgets, '999', 500, 300);
      
      expect(result).toHaveLength(2);
      expect(result).toEqual(widgets);
    });
    
    it('should handle an empty array', () => {
      const widgets: WidgetModel[] = [];
      const result = updateWidgetPosition(widgets, '1', 500, 300);
      
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
    
    it('should not mutate the original array', () => {
      const widgets = [widget1, widget2, widget3];
      const originalWidgets = [...widgets];
      
      updateWidgetPosition(widgets, '2', 500, 300);
      
      expect(widgets).toEqual(originalWidgets);
      expect(widgets[1].positionX).toBe(100); // Original position unchanged
      expect(widgets[1].positionY).toBe(200); // Original position unchanged
    });
    
    it('should handle negative values for position', () => {
      const widgets = [widget1, widget2, widget3];
      const result = updateWidgetPosition(widgets, '2', -50, -100);
      
      expect(result[1].positionX).toBe(-50);
      expect(result[1].positionY).toBe(-100);
    });
  });
}); 