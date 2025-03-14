import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, waitFor, expect } from '@storybook/test';
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

// Delete Widget Test
export const DeleteWidget: Story = {
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    
    for (let i = 0; i < 5; i++) {
      // Get all text areas - after each deletion, there will be one fewer
      const textAreas = await canvas.findAllByPlaceholderText('Enter text here...', { exact: true });
      
      // Always target the first text area
      const textArea = textAreas[0];
      
      // Right-click on the text area to open the context menu
      await userEvent.pointer({ keys: '[MouseRight]', target: textArea });
      
      // Click the Delete menu item
      await userEvent.click(await canvas.findByRole('menuitem', { name: 'Delete' }));
      
      // Add a small delay to allow the deletion to complete
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
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
  play: async ({ canvasElement }) => {
    const body = canvasElement.ownerDocument.body;
    const canvas = within(body);
    
    // Find and click the text area
    const textArea = await canvas.findByPlaceholderText('Enter text here...', { exact: true });
    await userEvent.click(textArea);
    
    // Type "Hi!" in the text area
    await userEvent.type(textArea, 'Hi!');
    
    // Wait for the border element to appear
    await waitFor(() => expect(body.querySelector('.border div:nth-of-type(2)')).toBeInTheDocument());
    
    // Click on the border element
    await userEvent.click(body.querySelector('.border div:nth-of-type(2)')!);
    
    // Find the text area again and click it
    const textAreaAgain = await canvas.findByPlaceholderText('Enter text here...', { exact: true });
    await userEvent.click(textAreaAgain);
    
    // Type more text
    await userEvent.type(textAreaAgain, 'Hi! What is this?');
    
    // Click the text area again
    await userEvent.click(textAreaAgain);
    
    // Wait for the overflow-hidden element to appear
    await waitFor(() => expect(body.querySelector('.overflow-hidden')).toBeInTheDocument());
    
    // Click on the overflow-hidden element
    await userEvent.click(body.querySelector('.overflow-hidden')!);
  }
};

// Interactive test for creating a new block via WidgetMenu
export const CreateNewWidget: Story = {
  args: {
    podId: 'story-pod-id',
    header: <CanvasHeader pod={createMockPod([])} />,
    defaultWidgets: [],
    disableSave: true,
  },
  play: async ({ canvasElement }) => {
    const body = canvasElement.ownerDocument.body;
    const canvas = within(body);
    
    // Click the Add Widget button to open the dropdown
    await userEvent.click(await canvas.findByRole('button', { name: 'Add Widget' }));
    
    // Wait for the dropdown to appear and click the Text Block menu item
    // Note: In a dropdown menu, we need to use the correct role
    await userEvent.click(await canvas.findByText('Text Block'));
    
    // Wait for the new text area to appear
    await waitFor(() => canvas.findByPlaceholderText('Enter text here...', { exact: true }));
    
    // Type in the new text area
    const textArea = await canvas.findByPlaceholderText('Enter text here...', { exact: true });
    await userEvent.click(textArea);
    await userEvent.type(textArea, 'Hello');
    
    // Verify the widget was created
    await waitFor(() => expect(body.querySelector('.relative')).toBeInTheDocument());
  }
}; 



// Interactive test for hotkeys
export const Hotkeys: Story = {
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
    //TODO: Add some tests for hotkeys
  // }
};