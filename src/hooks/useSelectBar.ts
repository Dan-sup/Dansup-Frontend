import { useState } from 'react';

export const useSelectBar = () => {
  const [selectBarItem, setSelectBarItem] = useState<string>('수업');

  const handleChangeSelectBarItem = (e: any) => {
    setSelectBarItem(e.target.textContent);
  };

  return { selectBarItem, handleChangeSelectBarItem };
};
