import React, { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storevalue, setStorevalue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  const setValue = (Value) => {
    try {
      localStorage.setItem(key, JSON.stringify(Value));
      setStorevalue(Value);
    } catch (error) {
      console.error(error);
    }
  };
  return [storevalue, setValue];
};

export default useLocalStorage;
