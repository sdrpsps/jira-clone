"use client";

import Analytics from "@/components/analytics";
import PageError from "@/components/common/page-error";
import PageLoader from "@/components/common/page-loader";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";
import MemberList from "@/features/workspaces/components/member-list";
import ProjectList from "@/features/workspaces/components/project-list";
import TaskList from "@/features/workspaces/components/task-list";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const WorkspaceIdPageClient = () => {
  const workspaceId = useWorkspaceId();

  const { data: analytics, isLoading: isLoadingAnalytics } =
    useGetWorkspaceAnalytics({
      workspaceId,
    });
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
  });
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });


  const isLoading =
    isLoadingAnalytics ||
    isLoadingTasks ||
    isLoadingProjects ||
    isLoadingMembers;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!analytics || !tasks || !projects || !members) {
    return <PageError message="Failed to load workspace data" />;
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <Analytics data={analytics} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TaskList tasks={tasks.documents} total={tasks.total} />
        <ProjectList projects={projects.documents} total={projects.total} />
        <MemberList members={members.documents} total={members.total} />
      </div>
    </div>
  );
};

export default WorkspaceIdPageClient;
