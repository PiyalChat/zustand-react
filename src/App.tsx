import { Container } from "react-bootstrap";
import "./App.css";
import Column from "./components/Column";

function App() {
  return (
    <Container fluid className="App">
      <Column state="PLANNED" />
      <Column state="ONGOING" />
      <Column state="DONE" />
    </Container>
  );
}

export default App;
