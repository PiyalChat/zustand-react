import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type IDraggedTask = {
  title: string;
  content: string;
};

type ITask = {
  title: string;
  content: string;
  state: string;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = (set: any) => ({
  tasks: [] as ITask[],
  draggedTask: { title: "", content: "" } as IDraggedTask,
  addTask: (title: string, content: string, state: string) =>
    set(
      (store: {
        tasks: { title: string; content: string; state: string }[];
      }) => ({
        tasks: [...store.tasks, { title, content, state }],
      }),
      false,
      "addTask"
    ),
  deleteTask: (title: string) =>
    set(
      (store: {
        tasks: { title: string; content: string; state: string }[];
      }) => ({
        tasks: store.tasks.filter((task) => task.title !== title),
      }),
      false,
      "deleteTask"
    ),
  setDraggedTask: (props: { title: string; content: string }) =>
    set({ draggedTask: props }, false, "setDraggedTask"),
  moveTask: (title: string, content: string, state: string) => {
    set(
      (store: {
        tasks: { title: string; content: string; state: string }[];
      }) => ({
        tasks: store.tasks.map((task) =>
          task.title === title ? { title, content, state } : task
        ),
      }),
      false,
      "moveTask"
    );
  },
});

export const useStore = create(persist(devtools(store), { name: "store" }));
