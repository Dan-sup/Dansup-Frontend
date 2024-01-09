import { useState } from 'react';

export const useSelectBar = () => {
  const [isClassBtnClicked, setIsClassBtnClicked] = useState<boolean>(true);
  const [isDancerBtnClicked, setIsDancerBtnClicked] = useState<boolean>(false);

  const handleChangeSelectBar = () => {
    setIsClassBtnClicked(!isClassBtnClicked);
    setIsDancerBtnClicked(!isDancerBtnClicked);
  };

  return { isClassBtnClicked, isDancerBtnClicked, handleChangeSelectBar };
};
