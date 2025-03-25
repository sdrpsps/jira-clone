import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import ProjectIdSettingsClient from "./client";

const ProjectSettingsPage = async () => {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }

  return <ProjectIdSettingsClient />;
};

export default ProjectSettingsPage;
