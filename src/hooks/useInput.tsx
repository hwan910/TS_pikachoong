import { useState } from 'react';

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("")
  };

  return [value, onChange, reset] as const
};

export default useInput;
