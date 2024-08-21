import { Col, Container, Row, Stack } from "react-bootstrap";
import "./Column.css";
import Task from "./Task";

type Props = {
  state: string;
};

const Column = (props: Props) => {
  const { state } = props;
  return (
    <Container fluid className="column">
      <Stack gap={3}>
        <Row>
          <Col className="text-center">{state}</Col>
        </Row>
        <Row>
          <Task title="Todo" />
        </Row>
      </Stack>
    </Container>
  );
};

export default Column;
