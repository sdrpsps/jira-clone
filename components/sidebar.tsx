import WorkspaceSwitcher from "@/features/workspaces/components/workspace-switcher";
import Image from "next/image";
import Link from "next/link";
import DottedSeparator from "./common/dotted-separator";
import Navigation from "./navigation";
import Projects from "./projects";

const Sidebar = () => {
  return (
    <aside className="h-full w-full bg-neutral-100 p-4">
      <Link href="/">
        <div className="relative h-[46px] w-full">
          <Image src="/logo.svg" alt="logo" fill priority  />
        </div>
      </Link>
      <DottedSeparator className="py-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="py-4" />
      <Navigation />
      <DottedSeparator className="py-4" />
      <Projects />
    </aside>
  );
};

export default Sidebar;
