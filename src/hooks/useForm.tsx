import { useState } from 'react';

export function useForm<T extends object>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (field: keyof T, value: string | number) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const reset = () => setValues(initialValues);

  return { values, handleChange, reset, setValues };
}
