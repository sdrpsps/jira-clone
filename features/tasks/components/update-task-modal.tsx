"use client";

import ResponsiveModal from "@/components/common/responsive-modal";
import { useUpdateTaskModal } from "../hooks/use-update-task-modal";
import UpdateTaskFormWrapper from "./update-task-form-wrapper";

const UpdateTaskModal = () => {
  const { taskId, close } = useUpdateTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <UpdateTaskFormWrapper id={taskId} onCancel={close} />}
    </ResponsiveModal>
  );
};

export default UpdateTaskModal;
