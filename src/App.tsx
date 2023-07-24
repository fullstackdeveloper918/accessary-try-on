import "./App.css";
import MyDragDropContextProvider from "./context/MyDragDropContext";
import Field from "./custom/Field";

function App() {
  return (
    <>
      <MyDragDropContextProvider>
        <Field />
      </MyDragDropContextProvider>
    </>
  );
}

export default App;
