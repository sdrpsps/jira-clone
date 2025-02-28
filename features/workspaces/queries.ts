import { createSessionClient } from "@/lib/appwrite";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/lib/config";
import { Query } from "node-appwrite";
import { getMember } from "../members/utils";
import { GetWorkspaceProps, Workspace } from "./types";

export const getWorkspace = async ({ workspaceId }: GetWorkspaceProps) => {
  const { databases, account } = await createSessionClient();

  const user = await account.get();
  const member = await getMember({
    databases,
    workspaceId,
    userId: user.$id,
  });

  if (!member) {
    throw new Error("Unauthorized");
  }

  const workspace = await databases.getDocument<Workspace>(
    DATABASE_ID,
    WORKSPACES_ID,
    workspaceId
  );

  return workspace;
};

export const getWorkspaces = async () => {
  const { databases, account } = await createSessionClient();

  const user = await account.get();
  const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
    Query.equal("userId", user.$id),
  ]);

  if (members.total === 0) {
    return { documents: [], total: 0 };
  }

  const workspaceIds = members.documents.map((member) => member.workspaceId);

  const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACES_ID, [
    Query.contains("$id", workspaceIds),
    Query.orderDesc("$createdAt"),
  ]);

  return workspaces;
};

export const getWorkspaceInfo = async ({ workspaceId }: GetWorkspaceProps) => {
  const { databases } = await createSessionClient();

  const workspace = await databases.getDocument<Workspace>(
    DATABASE_ID,
    WORKSPACES_ID,
    workspaceId
  );

  return {
    name: workspace.name,
  };
};
