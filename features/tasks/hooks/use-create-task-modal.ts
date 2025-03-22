import { parseAsBoolean, parseAsStringEnum, useQueryState } from "nuqs";
import { TaskStatus } from "../types";

export const useCreateTaskModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-task",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  const [initialStatus, setInitialStatus] = useQueryState(
    "create-task-status",
    parseAsStringEnum(Object.values(TaskStatus)).withOptions({
      clearOnDefault: true,
    })
  );

  const open = (initialStatus?: TaskStatus) => {
    if (initialStatus) setInitialStatus(initialStatus);
    setIsOpen(true);
  };
  const close = () => {
    setInitialStatus(null);
    setIsOpen(false);
  };

  return {
    isOpen,
    open,
    close,
    setIsOpen,
    initialStatus,
    setInitialStatus,
  };
};
