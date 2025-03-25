"use client";

import DottedSeparator from "@/components/common/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";
import { ArrowLeftIcon, ChevronDownIcon, Loader } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { useDeleteMember } from "../api/use-delete-member";
import { useGetMembers } from "../api/use-get-members";
import { useUpdateMember } from "../api/use-update-member";
import { MemberRole } from "../types";
import MemberAvatar from "./member-avatar";

const MemberList = () => {
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetMembers({ workspaceId });
  const { mutate: updateMember, isPending: isUpdating } = useUpdateMember();
  const { mutate: deleteMember, isPending: isDeleting } = useDeleteMember();

  const [UpdateConfirm, confirmUpdate] = useConfirm(
    "Update Member Role",
    "Are you sure you want to update this member's role?",
    "destructive"
  );
  const [RemoveConfirm, confirmRemove] = useConfirm(
    "Remove Member",
    "Are you sure you want to remove this member?",
    "destructive"
  );

  const handleUpdateMember = async (memberId: string, role: MemberRole) => {
    const ok = await confirmUpdate();
    if (!ok) return;

    updateMember({ json: { role }, param: { memberId } });
  };

  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirmRemove();
    if (!ok) return;

    deleteMember({ param: { memberId } });
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <UpdateConfirm />
      <RemoveConfirm />
      <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
        <Button asChild variant="secondary" size="sm">
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeftIcon className="size-4" />
            Back
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Members List</CardTitle>
        <div className="px-7">
          <DottedSeparator />
        </div>
      </CardHeader>
      {isLoading ? (
        <div className="flex items-center justify-center p-7">
          <Loader className="size-4 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <CardContent className="p-7">
          {data?.documents.map((member, index) => (
            <Fragment key={member.$id}>
              <div className="flex items-center gap-2">
                <MemberAvatar
                  className="size-10"
                  fallbackClassName="text-lg"
                  name={member.name}
                />
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {member.email}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="ml-auto">
                      <ChevronDownIcon className="size-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuItem
                      className="font-medium"
                      onClick={() =>
                        handleUpdateMember(
                          member.$id,
                          member.role === MemberRole.ADMIN
                            ? MemberRole.MEMBER
                            : MemberRole.ADMIN
                        )
                      }
                      disabled={isUpdating}
                    >
                      Set as{" "}
                      {member.role === MemberRole.ADMIN
                        ? "Member"
                        : "Administrator"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-medium text-amber-700"
                      onClick={() => handleDeleteMember(member.$id)}
                      disabled={isDeleting}
                    >
                      Remove {member.name}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {index < data.documents.length - 1 && (
                <Separator className="my-2.5" />
              )}
            </Fragment>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default MemberList;
