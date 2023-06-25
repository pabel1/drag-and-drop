import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ItemList from "./Components/ListDragDrop";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <ItemList />
      </div>
    </DndProvider>
  );
};

export default App;
