"use client"

import React, { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WidgetModel, SupportedWidgetTypes } from '@/types/widget';
import { useHotkeys } from 'react-hotkeys-hook'
import axios from 'axios';
import { toast } from 'sonner';

interface CanvasContextType {
  widgets: WidgetModel[];
  addWidget: (type: SupportedWidgetTypes, content: string) => void;
  updateWidgetPosition: (id: string, x: number, y: number) => void;
  updateWidgetSize: (id: string, width: number, height: number) => void;
  updateWidgetContent: (id: string, content: string) => void;
  removeWidget: (id: string) => void;
  handleSave: () => void;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

interface CanvasProviderProps {
    podId: string
    defaultWidgets?: WidgetModel[]
}

export const CanvasProvider = ({ podId, children, defaultWidgets }: PropsWithChildren<CanvasProviderProps>) => {
  const [widgets, setWidgets] = useState<WidgetModel[]>(defaultWidgets ?? []);

  useHotkeys('ctrl+s', () => {
    handleSave();
  });

  useHotkeys('alt+s', (e) => {
    e.preventDefault();
    handleSave();
  }, {
    enableOnFormTags: false,
    preventDefault: true,
    description: 'Save the current canvas'
  });

  useHotkeys('alt+t', (e) => {
    e.preventDefault();
    addWidget("TEXT", "");
  }, {
    enableOnFormTags: false,
    preventDefault: true,
    description: 'Add a new text block'
  });

  const onSave = () => {
    return axios.patch(`/api/v1/pods/${podId}`, {
      widgets: widgets
    });
  };
  
  const handleSave = () => {

    //TODO: Check if we have made any changes to the widgets via hashing

    toast.promise(onSave(), {
      loading: 'Saving...',
      success: 'Pod saved',
      error: 'Failed to save pod'
    });
  };

  useEffect(() => {
    //Polling every 10 seconds
    const intervalId = setInterval(() => {
      handleSave();
    }, 10000); 
    
    return () => clearInterval(intervalId);
  }, []);


  const addWidget = (type: SupportedWidgetTypes, content = '') => {
    const newWidget: WidgetModel = {
      id: uuidv4(),
      type: type,
      content,
      positionX: 100,
      positionY: 100,
      width: 320,
      height: 200,
    };
    
    setWidgets((prevWidgets) => [...prevWidgets, newWidget]);
  };

  const updateWidgetPosition = (id: string, x: number, y: number) => {
    setWidgets((prevWidgets) => 
      prevWidgets.map((widget) => 
        widget.id === id 
          ? { ...widget, positionX: x, positionY: y } 
          : widget
      )
    );
  };

  const updateWidgetSize = (id: string, width: number, height: number) => {
    setWidgets((prevWidgets) => 
      prevWidgets.map((widget) => 
        widget.id === id 
          ? { ...widget, width, height } 
          : widget
      )
    );
  };

  const updateWidgetContent = (id: string, content: string) => {
    setWidgets((prevWidgets) => 
      prevWidgets.map((widget) => 
        widget.id === id 
          ? { ...widget, content } 
          : widget
      )
    );
  };

  const removeWidget = (id: string) => {
    setWidgets((prevWidgets) => prevWidgets.filter((widget) => widget.id !== id));
  };

  return (
    <CanvasContext.Provider 
      value={{ 
        widgets, 
        addWidget, 
        updateWidgetPosition, 
        updateWidgetSize, 
        updateWidgetContent, 
        removeWidget,
        handleSave
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

// Custom hook to use the canvas context
export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
}; 