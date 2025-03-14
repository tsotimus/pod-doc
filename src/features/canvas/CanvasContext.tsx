"use client"

import React, { createContext, useContext, useState, PropsWithChildren } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WidgetModel, SupportedWidgetTypes } from '@/types/widget';
import { useHotkeys } from 'react-hotkeys-hook'
import axios from 'axios';
import { toast } from 'sonner';

interface CanvasContextType {
  blocks: WidgetModel[];
  addBlock: (type: SupportedWidgetTypes, content: string) => void;
  updateBlockPosition: (id: string, x: number, y: number) => void;
  updateBlockSize: (id: string, width: number, height: number) => void;
  updateBlockContent: (id: string, content: string) => void;
  removeBlock: (id: string) => void;
  handleSave: () => void;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

interface CanvasProviderProps {
    podId: string
    defaultBlocks?: WidgetModel[]
}

export const CanvasProvider = ({ podId, children, defaultBlocks }: PropsWithChildren<CanvasProviderProps>) => {
  const [blocks, setBlocks] = useState<WidgetModel[]>(defaultBlocks ?? []);

  useHotkeys('ctrl+s', () => {
    handleSave();
  });

  const onSave = () => {
    return axios.patch(`/api/v1/pods/${podId}`, {
      blocks: blocks
    });
  };
  
  const handleSave = () => {
    toast.promise(onSave(), {
      loading: 'Saving...',
      success: 'Pod saved',
      error: 'Failed to save pod'
    });
  };


  const addBlock = (type: SupportedWidgetTypes, content = '') => {
    const newBlock: WidgetModel = {
      id: uuidv4(),
      type: type,
      content,
      positionX: 100,
      positionY: 100,
      width: 320,
      height: 200,
    };
    
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  };

  const updateBlockPosition = (id: string, x: number, y: number) => {
    setBlocks((prevBlocks) => 
      prevBlocks.map((block) => 
        block.id === id 
          ? { ...block, positionX: x, positionY: y } 
          : block
      )
    );
  };

  const updateBlockSize = (id: string, width: number, height: number) => {
    setBlocks((prevBlocks) => 
      prevBlocks.map((block) => 
        block.id === id 
          ? { ...block, width, height } 
          : block
      )
    );
  };

  const updateBlockContent = (id: string, content: string) => {
    setBlocks((prevBlocks) => 
      prevBlocks.map((block) => 
        block.id === id 
          ? { ...block, content } 
          : block
      )
    );
  };

  const removeBlock = (id: string) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };

  return (
    <CanvasContext.Provider 
      value={{ 
        blocks, 
        addBlock, 
        updateBlockPosition, 
        updateBlockSize, 
        updateBlockContent, 
        removeBlock,
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