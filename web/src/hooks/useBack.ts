import { useContext, useEffect } from "react";
import { UNSAFE_NavigationContext } from "react-router-dom";
export const useBack = (callback: any) => {
  const navigator = useContext(UNSAFE_NavigationContext).navigator as any;
  useEffect(() => {
    const listener = ({ location, action }: any) => {
      console.log("listener", { location, action });
      if (action === "POP") {
        callback({ location, action });
      }
    };
    const unlisten = navigator.listen(listener);
    return unlisten;
  }, [callback, navigator]);
};
