import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
// import { userEvent, within, waitFor, expect } from '@storybook/test';
import CanvasHeader from '@/features/canvas/CanvasHeader';
import { WidgetModel } from '@/types/widget'; 
// import CanvasDisplay from '@/features/canvas/CanvasDisplay';
import { PodDisplay } from '@/types/pod';
import CanvasDisplay from '@/features/canvas/CanvasDisplay';

// Mock data for the stories
const mockWidgets: WidgetModel[] = [
  {
    id: '1',
    type: 'TEXT',
    content: 'This is a sample text block',
    positionX: 100,
    positionY: 100,
    width: 320,
    height: 200,
  },
  {
    id: '2',
    type: 'TEXT',
    content: 'This is another text block that can be moved and resized',
    positionX: 500,
    positionY: 150,
    width: 350,
    height: 220,
  },
];

// Create a mock pod for the stories
const createMockPod = (widgets: WidgetModel[] = mockWidgets): PodDisplay => ({
  id: 'story-pod-id',
  name: 'Story Pod',
  createdAt: '2021-01-01',
  updatedAt: '2021-01-01',
  widgets,
});

const meta = {
  title: 'Canvas/Canvas',
  component: CanvasDisplay,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '2em', height: '80vh', display: 'flex', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    podId: { control: 'text' },
    defaultWidgets: { control: 'object' },
    disableSave: { control: 'boolean' },
  },
} satisfies Meta<typeof CanvasDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with mock widgets
export const Default: Story = {
  args: {
    podId: 'story-pod-id',
    header: <CanvasHeader pod={createMockPod()} />,
    defaultWidgets: mockWidgets,
    disableSave: true,
  },
};

// Empty canvas story
export const EmptyCanvas: Story = {
  args: {
    podId: 'story-pod-id',
    header: <CanvasHeader pod={createMockPod([])} />,
    defaultWidgets: [],
    disableSave: true,
  },
};

// Canvas with many widgets
export const ManyWidgets: Story = {
  args: {
    podId: 'story-pod-id',
    header: <CanvasHeader pod={createMockPod([
      ...mockWidgets,
      {
        id: '3',
        type: 'TEXT',
        content: 'Block 3',
        positionX: 200,
        positionY: 400,
        width: 300,
        height: 180,
      },
      {
        id: '4',
        type: 'TEXT',
        content: 'Block 4',
        positionX: 600,
        positionY: 450,
        width: 280,
        height: 150,
      },
      {
        id: '5',
        type: 'TEXT',
        content: 'Block 5',
        positionX: 350,
        positionY: 250,
        width: 320,
        height: 200,
      },
    ])} />,
    defaultWidgets: [
      ...mockWidgets,
      {
        id: '3',
        type: 'TEXT',
        content: 'Block 3',
        positionX: 200,
        positionY: 400,
        width: 300,
        height: 180,
      },
      {
        id: '4',
        type: 'TEXT',
        content: 'Block 4',
        positionX: 600,
        positionY: 450,
        width: 280,
        height: 150,
      },
      {
        id: '5',
        type: 'TEXT',
        content: 'Block 5',
        positionX: 350,
        positionY: 250,
        width: 320,
        height: 200,
      },
    ],
    disableSave: true,
  },
};

// Interactive test for editing widgets
export const EditWidgets: Story = {
  args: {
    podId: 'story-pod-id',
    header: <CanvasHeader pod={createMockPod([{
      id: 'test-block',
      type: 'TEXT',
      content: 'Edit this text',
      positionX: 200,
      positionY: 200,
      width: 300,
      height: 150,
    }])} />,
    defaultWidgets: [
      {
        id: 'test-block',
        type: 'TEXT',
        content: 'Edit this text',
        positionX: 200,
        positionY: 200,
        width: 300,
        height: 150,
      }
    ],
    disableSave: true,
  },
  // play: async ({ canvasElement }) => {
    
  // }
};

// Interactive test for creating a new block via BlockMenu
export const CreateNewWidget: Story = {
  args: {
    podId: 'story-pod-id',
    header: <CanvasHeader pod={createMockPod([])} />,
    defaultWidgets: [],
    disableSave: true,
  },
  // play: async ({ canvasElement }) => {

  // }
}; 