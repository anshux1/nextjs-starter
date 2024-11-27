import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  FieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export function createAction<TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (input: TInput) => Promise<ActionState<TInput, TOutput>>
) {
  return async (input: TInput) => {
    const validationResult = schema.safeParse(input);
    if (!validationResult.success) {
      return {
        FieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>,
      };
    }
    return handler(input);
  };
};

