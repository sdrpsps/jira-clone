import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

interface WorkspaceIdPageProps {
  params: Promise<{ workspaceId: string }>;
}

const WorkspaceIdPage = async ({ params }: WorkspaceIdPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const { workspaceId } = await params;

  return (
    <div>
      <h1>Workspace ID Page</h1>
      <p>Current Workspace ID: {workspaceId}</p>
    </div>
  );
};

export default WorkspaceIdPage;
