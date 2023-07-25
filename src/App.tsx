import "./App.css";
import MyDragDropContextProvider from "./context/MyDragDropContext";
import View from "./components/View";

function App() {
  return (
    <>
      <MyDragDropContextProvider>
        <View />
      </MyDragDropContextProvider>
    </>
  );
}

export default App;
