import { SidebarItem } from "./sidebarItam";
import { TwitterIcon } from "../icon/TwitterIcon";
import { YoutubeIcon } from "../icon/YoutubeIcon";
import { Logo } from "../icon/Logo";

export function Sidebar(){
  return <div className="h-screen bg-white border-r w-72 flexed absolute left-0 top-0 pl-6">
    <div className="flex text-2xl pt-8 items-center">
      <div className="pr-2 text-purple-600">
        < Logo />
      </div>
      Brainly
    </div>
    <div className="pt-8 pl-4">

      <SidebarItem text="Twittwe" icon={<TwitterIcon />} />
      <SidebarItem text="YouTube" icon={<YoutubeIcon />} />

    </div>
  </div>
}