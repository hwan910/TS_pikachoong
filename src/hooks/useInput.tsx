import { useState } from 'react';

// 내용 변경 커스텀훅
const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return [value, onChange, reset] as const;
};

export default useInput;
