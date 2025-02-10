import Link from "next/link";
import Image from "next/image";
import DottedSeparator from "./common/dotted-separator";
import Navigation from "./navigation";
import WorkspaceSwitcher from "@/features/workspaces/components/workspace-switcher";

const Sidebar = () => {
  return (
    <aside className="h-full w-full bg-neutral-100 p-4">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={152} height={40} />
      </Link>
      <DottedSeparator className="py-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="py-4" />
      <Navigation />
    </aside>
  );
};

export default Sidebar;
