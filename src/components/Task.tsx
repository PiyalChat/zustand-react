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
      <Card className="text-start">
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <Row className="justify-content-between align-items-start">
            <Col>Content</Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Row className="d-flex justify-content-end align-items-end">
            <Col xs className="text-end">
              <span className="status">{STATUS}</span>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Task;
