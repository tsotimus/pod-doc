import { createApiResponse, createErrorResponse, createZodErrorResponse } from './responses';
import { z } from 'zod';
import { describe, it, expect } from 'vitest';

describe('API Response Utilities', () => {
  describe('createApiResponse', () => {
    it('should create a response with data and no errors', () => {
      const data = { id: 1, name: 'Test' };
      const response = createApiResponse({ data });
      
      expect(response).toEqual({
        data,
        errors: []
      });
    });

    it('should create a response with data and errors', () => {
      const data = { id: 1, name: 'Test' };
      const errors = ['Error 1', 'Error 2'];
      const response = createApiResponse({ data, errors });
      
      expect(response).toEqual({
        data,
        errors
      });
    });
  });

  describe('createErrorResponse', () => {
    it('should create a response with null data and errors', () => {
      const errors = ['Error 1', 'Error 2'];
      const response = createErrorResponse(errors);
      
      expect(response).toEqual({
        data: null,
        errors
      });
    });

    it('should create a response with an empty error array', () => {
      const response = createErrorResponse([]);
      
      expect(response).toEqual({
        data: null,
        errors: []
      });
    });
  });

  describe('createZodErrorResponse', () => {
    it('should convert Zod validation errors to a string array', () => {
      // Create a schema for testing
      const testSchema = z.object({
        name: z.string().min(3, 'Name must be at least 3 characters'),
        email: z.string().email('Invalid email format'),
        age: z.number().min(18, 'Must be at least 18 years old')
      });
      
      // Create invalid data to generate Zod errors
      const result = testSchema.safeParse({
        name: 'Jo',
        email: 'not-an-email',
        age: 16
      });
      
      // Ensure the parse failed and we have errors
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const response = createZodErrorResponse(result.error);
        
        expect(response).toEqual({
          data: null,
          errors: [
            'Name must be at least 3 characters',
            'Invalid email format',
            'Must be at least 18 years old'
          ]
        });
      }
    });

    it('should handle Zod errors with empty field errors', () => {
      // Mock a Zod error with no field errors
      const mockZodError = {
        flatten: () => ({
          fieldErrors: {}
        })
      } as unknown as z.ZodError;
      
      const response = createZodErrorResponse(mockZodError);
      
      expect(response).toEqual({
        data: null,
        errors: []
      });
    });
  });
});
