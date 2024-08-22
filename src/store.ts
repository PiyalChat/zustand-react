import { create } from "zustand";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = (set: any) => ({
  tasks: [
    { title: "Test", content: "testing zustand", state: "PLANNED" },
    { title: "Run", content: "running zustand", state: "ONGOING" },
    { title: "Creation", content: "creating zustand", state: "DONE" },
  ],
  addTask: (title: string, content: string, state: string) =>
    set(
      (store: {
        tasks: { title: string; content: string; state: string }[];
      }) => ({
        tasks: [...store.tasks, { title, content, state }],
      })
    ),
  deleteTask: (title: string) =>
    set(
      (store: {
        tasks: { title: string; content: string; state: string }[];
      }) => ({
        tasks: store.tasks.filter((task) => task.title !== title),
      })
    ),
});

export const useStore = create(store);
