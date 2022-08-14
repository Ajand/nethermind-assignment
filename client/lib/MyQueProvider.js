import { createContext, useState, useEffect, useCallback } from "react";

export const MyQueContext = createContext({
  add: (input) => {},
  remove: () => {},
  que: new Set(),
});

export const MyQueProvider = ({ children }) => {
  const [que, setQue] = useState(new Set());

  useEffect(() => {
    // Load your requests from the local storage
    const cachedItems = JSON.parse(localStorage.getItem("myQue"));
    setQue(new Set(cachedItems));
  }, []);

  // add to my que
  const add = useCallback(async (input) => {
    const nQue = new Set(que);
    nQue.add(input);
    setQue(nQue);
    localStorage.setItem("myQue", JSON.stringify([...nQue]));
  });

  // remove from my que
  const remove = useCallback(async () => {
    const nQue = new Set(que);
    nQue.delete(input);
    setQue(nQue);
    localStorage.setItem("myQue", JSON.stringify([...nQue]));
  });

  return (
    <MyQueContext.Provider value={{ que, add, remove }}>
      {children}
    </MyQueContext.Provider>
  );
};
