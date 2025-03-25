import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";
import AnalyticsCard from "./analytics-card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
  return (
    <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Total tasks"
            value={data.taskCount}
            variant={data.tasksDifference > 0 ? "up" : "down"}
            increaseValue={data.tasksDifference}
          />
          <Separator orientation="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Assigned tasks"
            value={data.assignTasksCount}
            variant={data.assignTasksDifference > 0 ? "up" : "down"}
            increaseValue={data.assignTasksDifference}
          />
          <Separator orientation="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Completed tasks"
            value={data.completedTasksCount}
            variant={data.completeTasksDifference > 0 ? "up" : "down"}
            increaseValue={data.completeTasksDifference}
          />
          <Separator orientation="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Overdue tasks"
            value={data.overdueTasksCount}
            variant={data.overdueTasksDifference > 0 ? "up" : "down"}
            increaseValue={data.overdueTasksDifference}
          />
          <Separator orientation="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Incomplete tasks"
            value={data.incompleteTasksCount}
            variant={data.incompleteTasksDifference > 0 ? "up" : "down"}
            increaseValue={data.incompleteTasksDifference}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Analytics;
