import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import "./Task.css";
import classNames from "classnames";
import { useStore } from "../store";
import { useShallow } from "zustand/react/shallow";

type Props = {
  title: string;
};

const Task = (props: Props) => {
  const { title } = props;
  const task = useStore(
    useShallow(
      (store) =>
        store.tasks.find((task) => task.title === title) || {
          title: "",
          content: "",
          state: "",
        }
    )
  );
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);
  return (
    <Container fluid>
      <Card
        className="text-start"
        draggable
        onDragStart={() => {
          setDraggedTask({ title: task.title, content: task.content });
        }}
      >
        <Card.Header className="card-title-draggable">
          <Container fluid>
            <Row>
              <Col>{task?.title}</Col>
              <Col xs="auto">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deleteTask(task.title)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body>
          <Container fluid>
            <Row className="justify-content-between align-items-start">
              <Col>{task.content}</Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer className="status-content">
          <Container fluid>
            <Stack gap={3}>
              <Row className="d-flex justify-content-end align-items-end">
                <Col xs className="text-end">
                  <span className={classNames("status", task?.state)}>
                    {task?.state}
                  </span>
                </Col>
              </Row>
            </Stack>
          </Container>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Task;
