import { Loader } from "lucide-react";

const DashboardLoading = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-y-4">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default DashboardLoading;
