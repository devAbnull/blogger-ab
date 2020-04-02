import React, { useEffect, useCallback, useState } from 'react';

//Ref: https://reactjs.org/docs/concurrent-mode-patterns.html
//React is also working on this under experimental feature useTransition for stateUpdate/rendering
const useTransition = delay => {
  const [show, setShow] = useState(false);
  const updateShow = useCallback(() => {
    setShow(prevShow => !prevShow);
  }, []);

  useEffect(() => {
    const animationTaskId = requestAnimationFrame(() => requestAnimationFrame(updateShow));
    return () => cancelAnimationFrame(animationTaskId);
  }, []);
  return show;
};

export default useTransition;
