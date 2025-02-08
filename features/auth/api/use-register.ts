import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequestType = InferRequestType<
  (typeof client.api.auth.register)["$post"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.auth.register)["$post"]
>;

export const useRegister = () => {
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.register["$post"]({ json });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Registered successfully");
      router.replace("/");
    },
    onError: () => {
      toast.error("Failed to register");
    },
  });

  return mutation;
};
