import { useEffect } from "react";

function useKeydown(key, callback) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === key) {
        callback(e);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback, key]);
}

export default useKeydown;
