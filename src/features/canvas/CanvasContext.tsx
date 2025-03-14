"use client"

import React, { createContext, useContext, useState, PropsWithChildren, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WidgetModel, SupportedWidgetTypes } from '@/types/widget';
import { useHotkeys } from 'react-hotkeys-hook'
import axios from 'axios';
import { toast } from 'sonner';
import { hashWidgets } from '@/features/widgets/hashWidgets';
import { 
  removeWidget as removeWidgetOperation,
  updateWidgetContent as updateWidgetContentOperation,
  updateWidgetSize as updateWidgetSizeOperation,
  updateWidgetPosition as updateWidgetPositionOperation,
  addWidget as addWidgetOperation
} from '@/features/widgets/widgetOperations';

interface CanvasContextType {
  widgets: WidgetModel[];
  addWidget: (type: SupportedWidgetTypes, content: string) => void;
  updateWidgetPosition: (id: string, x: number, y: number) => void;
  updateWidgetSize: (id: string, width: number, height: number) => void;
  updateWidgetContent: (id: string, content: string) => void;
  removeWidget: (id: string) => void;
  handleSave: (force?: boolean) => void;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

interface CanvasProviderProps {
    podId: string
    defaultWidgets?: WidgetModel[]
    disableSave?: boolean
}

export const CanvasProvider = ({ podId, children, defaultWidgets, disableSave }: PropsWithChildren<CanvasProviderProps>) => {
  const [widgets, setWidgets] = useState<WidgetModel[]>(defaultWidgets ?? []);
  const lastSavedHashRef = useRef<string | null>(null);

  useHotkeys('meta+p', (e) => {
    e.preventDefault();
    void handleSave(true);
  }, {
    enableOnFormTags: false,
    preventDefault: true,
    description: 'Save the current canvas'
  });

  useHotkeys('meta+i', (e) => {
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
  
  const handleSave = useCallback(async (force = false) => {
    const currentHash = await hashWidgets(widgets);
    
    if (force || lastSavedHashRef.current !== currentHash) {
      if (disableSave) {
        // Fake save with the same toast behavior
        toast.promise(Promise.resolve(), {
          loading: 'Saving...',
          success: () => {
            lastSavedHashRef.current = currentHash;
            return 'Pod saved';
          },
          error: 'Failed to save pod'
        });
      } else {
        toast.promise(onSave(), {
          loading: 'Saving...',
          success: () => {
            // Update the hash reference after successful save
            lastSavedHashRef.current = currentHash;
            return 'Pod saved';
          },
          error: 'Failed to save pod'
        });
      }
    }
  }, [widgets, podId, disableSave]);

  useEffect(() => {
    // Initialize the hash when the component mounts
    void hashWidgets(widgets).then(hash => {
      lastSavedHashRef.current = hash;
    }).catch(err => {
      console.error('Failed to hash widgets:', err);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    // Polling every 1 minute
    const intervalId = setInterval(() => {
      void handleSave();
    }, 60000); 
    
    return () => clearInterval(intervalId);
  }, [handleSave]);

  const addWidget = (type: SupportedWidgetTypes, content = '') => {
    setWidgets((prevWidgets) => addWidgetOperation(prevWidgets, type, content));
  };

  const updateWidgetPosition = (id: string, x: number, y: number) => {
    setWidgets((prevWidgets) => updateWidgetPositionOperation(prevWidgets, id, x, y));
  };

  const updateWidgetSize = (id: string, width: number, height: number) => {
    setWidgets((prevWidgets) => updateWidgetSizeOperation(prevWidgets, id, width, height));
  };

  const updateWidgetContent = (id: string, content: string) => {
    setWidgets((prevWidgets) => updateWidgetContentOperation(prevWidgets, id, content));
  };

  const removeWidget = (id: string) => {
    setWidgets((prevWidgets) => removeWidgetOperation(prevWidgets, id));
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
        handleSave: (force = false) => { void handleSave(force); }
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