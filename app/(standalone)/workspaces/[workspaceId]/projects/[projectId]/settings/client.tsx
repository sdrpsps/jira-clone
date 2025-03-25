"use client";

import PageError from "@/components/common/page-error";
import PageLoader from "@/components/common/page-loader";
import { useGetProject } from "@/features/projects/api/use-get-project";
import UpdateProjectForm from "@/features/projects/components/update-project-form";
import { useProjectId } from "@/features/projects/hooks/use-project-id";

const ProjectIdSettingsClient = () => {
  const projectId = useProjectId();
  const { data: initialValues, isLoading } = useGetProject({ projectId });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!initialValues) {
    return <PageError message="Project not found" />;
  }

  return (
    <div className="w-full lg:max-w-xl">
      <UpdateProjectForm initialValues={initialValues} />
    </div>
  );
};

export default ProjectIdSettingsClient;
