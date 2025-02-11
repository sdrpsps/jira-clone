import { getCurrent } from "@/features/auth/actions";
import { getWorkspace } from "@/features/workspaces/actions";
import UpdateWorkspaceForm from "@/features/workspaces/components/update-workspace-form";
import { redirect } from "next/navigation";

interface WorkspaceIdSettingPageProps {
  params: Promise<{ workspaceId: string }>;
}

const WorkspaceIdSettingPage = async ({
  params,
}: WorkspaceIdSettingPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const { workspaceId } = await params;
  const workspace = await getWorkspace({ workspaceId });

  if (!workspace) redirect(`/workspaces/${workspaceId}`);

  return (
    <div className="w-full lg:max-w-xl">
      <UpdateWorkspaceForm initialValues={workspace} />
    </div>
  );
};

export default WorkspaceIdSettingPage;
