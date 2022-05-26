import logo from "./logo.svg";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import Formulario from "./components/Formulario.jsx";
import { Button } from "bootstrap";
import Tabela from "./components/Tabela";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Crud Firebase</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Formulario />
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabela />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
