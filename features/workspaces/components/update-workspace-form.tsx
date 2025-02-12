"use client";

import DottedSeparator from "@/components/common/dotted-separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateWorkspace } from "../api/use-update-wordspace";
import { updateWorkspaceSchema } from "../schemas";
import { Workspace } from "../types";
import { useDeleteWorkspace } from "../api/use-delete-wordspace";

interface UpdateWorkspaceFormProps {
  onCancel?: () => void;
  initialValues: Workspace;
}

const UpdateWorkspaceForm = ({
  onCancel,
  initialValues,
}: UpdateWorkspaceFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeleting } =
    useDeleteWorkspace();

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Workspace",
    "Are you sure you want to delete this workspace?",
    "destructive"
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl || "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    deleteWorkspace(
      { param: { workspaceId: initialValues.$id } },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
    mutate(
      {
        form: {
          ...values,
          image:
            values.image instanceof File ? values.image : values.image || "",
        },
        param: { workspaceId: initialValues.$id },
      },
      {
        onSuccess: ({ data }) => {
          form.reset();
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
          <Button
            variant="secondary"
            size="sm"
            onClick={
              onCancel
                ? onCancel
                : () => router.push(`/workspaces/${initialValues.$id}`)
            }
          >
            <ArrowLeftIcon className="size-4" />
            Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter workspace name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="image"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              alt="Workspace image"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Workspace Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG, SVG or JPEG, max 1MB
                          </p>
                          <input
                            className="hidden"
                            ref={inputRef}
                            type="file"
                            accept=".jpg, .png, .svg, .jpeg"
                            onChange={handleImageChange}
                            disabled={isPending}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                              className="w-fit mt-2"
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant="secondary"
                              size="sm"
                              onClick={() => inputRef.current?.click()}
                              className="w-fit mt-2"
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <DottedSeparator className="py-7" />
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isPending}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button type="submit" size="lg" disabled={isPending}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is irreversible. All data will be lost.
            </p>
            <Button
              size="sm"
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending || isDeleting}
              className="mt-6 w-fit ml-auto"
            >
              Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateWorkspaceForm;
