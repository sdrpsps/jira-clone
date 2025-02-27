import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectAvatarProps {
  image?: string;
  name: string;
  className?: string;
}

const ProjectAvatar = ({ image, name, className }: ProjectAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn("size-6 relative rounded-md overflow-hidden", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-5 rounded-md", className)}>
      <AvatarFallback className="text-white bg-blue-600 font-semibold text-sm uppercase rounded-md">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProjectAvatar;
