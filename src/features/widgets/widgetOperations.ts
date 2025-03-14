import { WidgetModel, SupportedWidgetTypes } from "@/types/widget";
import { v4 as uuidv4 } from 'uuid';

/**
 * Creates a new widget and adds it to the widgets array
 * @param widgets - The current array of widgets
 * @param type - The type of widget to create
 * @param content - The content for the new widget
 * @param position - The position for the new widget (default: {x: 100, y: 100})
 * @param size - The size for the new widget (default: {width: 320, height: 200})
 * @returns A new array of widgets including the new widget
 */
export const addWidget = (
  widgets: WidgetModel[], 
  type: SupportedWidgetTypes, 
  content = '',
  position = { x: 100, y: 100 },
  size = { width: 320, height: 200 }
): WidgetModel[] => {
  const newWidget: WidgetModel = {
    id: uuidv4(),
    type,
    content,
    positionX: position.x,
    positionY: position.y,
    width: size.width,
    height: size.height,
  };
  
  return [...widgets, newWidget];
};

/**
 * Removes a widget from the widgets array by its ID
 * @param widgets - The current array of widgets
 * @param id - The ID of the widget to remove
 * @returns A new array of widgets with the specified widget removed
 */
export const removeWidget = (widgets: WidgetModel[], id: string): WidgetModel[] => {
  return widgets.filter((widget) => widget.id !== id);
};

/**
 * Updates the content of a widget with the specified ID
 * @param widgets - The current array of widgets
 * @param id - The ID of the widget to update
 * @param content - The new content for the widget
 * @returns A new array of widgets with the updated content
 */
export const updateWidgetContent = (widgets: WidgetModel[], id: string, content: string): WidgetModel[] => {
  return widgets.map((widget) => 
    widget.id === id 
      ? { ...widget, content } 
      : widget
  );
};

/**
 * Updates the size of a widget with the specified ID
 * @param widgets - The current array of widgets
 * @param id - The ID of the widget to update
 * @param width - The new width for the widget
 * @param height - The new height for the widget
 * @returns A new array of widgets with the updated size
 */
export const updateWidgetSize = (widgets: WidgetModel[], id: string, width: number, height: number): WidgetModel[] => {
  return widgets.map((widget) => 
    widget.id === id 
      ? { ...widget, width, height } 
      : widget
  );
};

/**
 * Updates the position of a widget with the specified ID
 * @param widgets - The current array of widgets
 * @param id - The ID of the widget to update
 * @param x - The new x position for the widget
 * @param y - The new y position for the widget
 * @returns A new array of widgets with the updated position
 */
export const updateWidgetPosition = (widgets: WidgetModel[], id: string, x: number, y: number): WidgetModel[] => {
  return widgets.map((widget) => 
    widget.id === id 
      ? { ...widget, positionX: x, positionY: y } 
      : widget
  );
}; 