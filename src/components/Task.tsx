import { Card, Col, Container, Row } from "react-bootstrap";
import "./Task.css";

type Props = {
  title: string;
};

const STATUS = "PLANNED";
const Task = (props: Props) => {
  const { title } = props;
  return (
    <Container fluid>
      <Card className="text-left">
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <Row className="justify-content-between align-items-start">
            <Col>{STATUS}</Col>
            <Col>{STATUS}</Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Task;
