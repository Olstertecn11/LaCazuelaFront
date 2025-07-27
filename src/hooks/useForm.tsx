import { useState } from "react";

export function useForm<T extends object>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  // Sobrecarga: firma 1 (field, value)
  function handleChange(field: keyof T, value: string | number): void;
  // Sobrecarga: firma 2 (event)
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void;

  // Implementación común
  function handleChange(
    arg1: any,
    arg2?: any
  ): void {
    if (typeof arg1 === 'string') {
      // llamada: handleChange('campo', valor)
      setValues((prev) => ({
        ...prev,
        [arg1]: arg2,
      }));
    } else if (arg1?.target?.name) {
      // llamada: handleChange(event)
      const { name, value } = arg1.target;
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  const reset = () => setValues(initialValues);

  return { values, handleChange, reset, setValues };
}
