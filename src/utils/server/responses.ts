import { ApiErrors } from "@/types/api";
import { ZodError } from "zod";

interface ApiResponseParams<T> {
  data: T;
  errors?: ApiErrors;
}

export const createApiResponse = <T>({ data, errors = [] }: ApiResponseParams<T>) => ({
  data,
  errors
});

export const createErrorResponse = (errors: ApiErrors) => createApiResponse({
  data: null,
  errors
})

// Convert Zod validation errors to string array for API responses
export const createZodErrorResponse = (errors: ZodError) => {
  const errorMessages = Object.values(errors.flatten().fieldErrors)
    .flat()
    .filter(Boolean) as string[];
  
  return createErrorResponse(errorMessages);
}