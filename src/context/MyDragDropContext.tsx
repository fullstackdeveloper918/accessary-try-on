import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IDragDropContext {
  currentDragging: string;
  setCurrentDragging: Dispatch<SetStateAction<string>>;
}

const MyDragDropContext = createContext<IDragDropContext | null>(null);
const MyDragDropContextProvider = ({ children }: PropsWithChildren) => {
  const [currentDragging, setCurrentDragging] = useState("");
  return (
    <MyDragDropContext.Provider value={{ currentDragging, setCurrentDragging }}>
      {children}
    </MyDragDropContext.Provider>
  );
};
export default MyDragDropContextProvider;
// eslint-disable-next-line react-refresh/only-export-components
export const useMyDragDropContext = () => {
  const context = useContext(MyDragDropContext);

  if (!context)
    throw new Error("You need to use this hook inside a context provider");

  return context;
};
