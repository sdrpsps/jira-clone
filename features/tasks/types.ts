import { Models } from "node-appwrite";

export type Task = Models.Document & {
  name: string;
  status: TaskStatus;
  workspaceId: string;
  projectId: string;
  assigneeId: string;
  dueDate: string;
  description?: string;
  position: number;
};

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}
