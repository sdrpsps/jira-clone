import { getCurrent } from "@/features/auth/queries";
import UpdateProjectForm from "@/features/projects/components/update-project-form";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

interface ProjectSettingsPageProps {
  params: Promise<{ projectId: string }>;
}

const ProjectSettingsPage = async ({ params }: ProjectSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }

  const { projectId } = await params;
  const initialValues = await getProject({ projectId });

  return (
    <div className="w-full lg:max-w-xl">
      <UpdateProjectForm initialValues={initialValues} />
    </div>
  );
};

export default ProjectSettingsPage;
