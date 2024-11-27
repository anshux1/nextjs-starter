// You can use this hook to execute an action and handle its state in a client component.

import { useState, useCallback } from "react";
import { ActionState, FieldErrors } from "@/lib/create-action";

type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>;

interface useActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onCompleted?: () => void;
};

export function useAction<TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: useActionOptions<TOutput> = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);

  const execute = useCallback(async (input: TInput) => {
    setIsLoading(true);
    try {
      const result = await action(input);
      if (!result) return;
      setFieldErrors(result.FieldErrors);
      if (result.error) {
        setError(result.error);
        if (options.onError) options.onError(result.error);
      }
      if (result.data) {
        setData(result.data);
        if (options.onSuccess) options.onSuccess(result.data);
      }
    } finally {
      setIsLoading(false);
      if (options.onCompleted) options.onCompleted();
    }
  }, [action, options]);

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
    setFieldErrors
  }
};
