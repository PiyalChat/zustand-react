import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import "./Column.css";
import Task from "./Task";
import { useStore } from "../store";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";
import classNames from "classnames";

type Props = {
  state: string;
};

const Column = (props: Props) => {
  const { state } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskContent, setTaskContent] = useState<string>("");
  const [onDrop, setOnDrop] = useState<boolean>(false);

  const tasks = useStore(
    useShallow((store) => store.tasks.filter((task) => task.state === state))
  );
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const addTask = useStore((store) => store.addTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);
  return (
    <Container
      fluid
      className={classNames("column", { drop: onDrop })}
      onDragOver={(e) => {
        setOnDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setOnDrop(false);
        e.preventDefault();
      }}
      onDrop={() => {
        setOnDrop(false);
        moveTask(draggedTask.title, draggedTask.content, state);
        setDraggedTask({ title: "", content: "" });
      }}
    >
      <Stack gap={3}>
        <Row>
          <Col className="text-center">{state}</Col>
        </Row>
        <Row>
          <Col xs className="text-end">
            <Button variant="outline-success" onClick={() => setOpen(true)}>
              <i className="bi bi-plus-lg"></i>
              Add
            </Button>
          </Col>
        </Row>
        {tasks.map((task, index) => (
          <Row key={index}>
            <Task title={task.title} />
          </Row>
        ))}
      </Stack>
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Task for {state}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title of task"
                value={taskTitle}
                onChange={(e) => {
                  e.preventDefault();
                  setTaskTitle(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content of the task"
                value={taskContent}
                onChange={(e) => {
                  e.preventDefault();
                  setTaskContent(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addTask(taskTitle, taskContent, state);
              setOpen(false);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Column;
