/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useStore } from "./store";
import { render } from "@testing-library/react";

vi.mock("zustand");
const TestComponent = ({ selector, effect }: any) => {
  const items = useStore(selector);

  useEffect(() => effect(items), [items]);
  return null;
};

test("should return default values first", () => {
  const selector = (store: any) => store.tasks;

  const effect = vi.fn();
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toBeCalledWith([]);
});

test("should add item to store and rerun the effect", () => {
  const selector = (store: any) => ({
    tasks: store.tasks,
    addTask: store.addTask,
    deleteTask: store.deleteTask,
  });
  let createdTask = false;
  let currentItems;
  const effect = vi.fn().mockImplementation((items) => {
    currentItems = items;
    if (!createdTask) {
      items.addTask("new task", "new content", "PLANNED");
      createdTask = true;
    } else if (items.tasks.length === 1) {
      items.deleteTask("new task");
    }
  });
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toBeCalledTimes(3);
  expect(effect).toBeCalledWith(
    expect.objectContaining({
      tasks: [
        {
          title: "new task",
          content: "new content",
          state: "PLANNED",
        },
      ],
    })
  );
  expect(currentItems!.tasks).toEqual([]);
});
