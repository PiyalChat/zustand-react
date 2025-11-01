import "./App.css";
import Column from "./components/Column";
import { FlexGrid } from "@carbon/react";

function App() {
  return (
    <FlexGrid className="App">
      <Column state="PLANNED" />
      <Column state="ONGOING" />
      <Column state="DONE" />
    </FlexGrid>
  );
}

export default App;
