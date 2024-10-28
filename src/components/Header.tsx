import { auth } from "@/auth";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Switch,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { FiChevronDown, FiUserPlus } from "react-icons/fi";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { PiAtom, PiGearSix, PiSelectionBackgroundLight } from "react-icons/pi";
import SignOut from "./SignOut";

const Header = async () => {
  const session = await auth();
  return (
    <div className="flex items-center justify-between m-2.5 h-10 pl-2 pr-12 absolute w-full top-0 left-0">
      <Menu>
        <MenuButton className="flex items-center gap-1 bg-[#2F2F2F] hover:bg-primaryGray/50 px-3 py-2 rounded-lg text-primary-foreground/80 font-semibold tracking-wide">
          ChatGPT
          <FiChevronDown className="text-lg" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom start"
          className="p-2 origin-top-right mt-2 rounded-xl border border-primary-foreground/20 bg-[#2F2F2F] text-primary-foreground"
        >
          <MenuItem>
            <div className="group flex w-full items-center justify-between gap-3 rounded-lg p-3 cursor-pointer data-[focus]:bg-white/10">
              <div className="w-7 h-7 bg-[#B4B4B440] rounded-full flex items-center justify-center">
                <BsStars className="text-base rotate-90" />
              </div>
              <div className="text-sm">
                <p className="bold-semibold tracking-wide">ChatGPT Plus</p>
                <p className="text-xs text-primary-foreground/80">
                  Our smartest model & more
                </p>
              </div>
              <button className="text-xs font-semibold tracking-wide border border-white/20 px-4 py-1.5 ml-2 rounded-full text-primary-foreground">
                Upgrade
              </button>
            </div>
          </MenuItem>
          <MenuItem>
            <div className="group flex w-full items-center  gap-3 rounded-lg p-3 cursor-pointer data-[focus]:bg-white/10">
              <div className="w-7 h-7 bg-[#B4B4B440] rounded-full flex items-center justify-center">
                <PiAtom className="text-base rotate-90" />
              </div>
              <div className="text-sm">
                <p className="bold-semibold tracking-wide">ChatGPT</p>
                <p className="text-xs text-[#B4B4B4]">
                  Great for everyday task
                </p>
              </div>
              <div className="flex flex-1 justify-end">
                <IoCheckmarkCircleSharp className="text-xl" />
              </div>
            </div>
          </MenuItem>

          <div className="my-1 h-px bg-primary-foreground/10" />
          <MenuItem>
            <div className="group flex w-full items-center  gap-3 rounded-lg p-3 cursor-pointer data-[focus]:bg-white/10">
              <div className="w-7 h-7 bg-[#B4B4B440] rounded-full flex items-center justify-center">
                <PiSelectionBackgroundLight className="text-lg" />
              </div>

              <p className="text-sm bold-semibold tracking-wide">
                Temporary chat
              </p>

              <div className="flex flex-1 justify-end">
                <Switch className="group relative flex h-6.5 w-10 cursor-pointer rounded-full bg-transparent border border-white/30 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-primaryGreen">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-4"
                  />
                </Switch>
              </div>
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>

      <div className="flex items-center gap-3">
        {/* <ModeToggle /> */}
        <Menu>
          {session?.user ? (
            <MenuButton className="w-8 h-8 rounded-full ring-4 ring-white/10 hover:ring-white/50 font-semibold tracking-wide mr-2 duration-300">
              <Image
                src={session?.user?.image as string}
                alt="userImage"
                width={400}
                height={400}
                priority
                className="w-full h-full rounded-full object-cover"
              />
            </MenuButton>
          ) : (
            <Link
              href={"/signin"}
              className="text-sm font-semibold hover:text-white duration-300"
            >
              Sign in
            </Link>
          )}

          <MenuItems
            transition
            anchor="bottom end"
            className="p-2 origin-top-right mt-2 rounded-xl border border-primary-foreground/20 bg-[#2F2F2F] text-primary-foreground"
          >
            <MenuItem>
              <div className="group flex w-full items-center gap-3 rounded-lg p-3 cursor-pointer data-[focus]:bg-white/10">
                <div className="w-7 h-7 bg-[#B4B4B440] rounded-full flex items-center justify-center">
                  <FiUserPlus className="text-base" />
                </div>
                <p className="text-sm font-medium tracking-wide">My GPTs</p>
              </div>
            </MenuItem>
            <MenuItem>
              <div className="group flex w-full items-center gap-3 rounded-lg p-3 cursor-pointer data-[focus]:bg-white/10">
                <div className="w-7 h-7 bg-[#B4B4B440] rounded-full flex items-center justify-center">
                  <MdOutlineDashboardCustomize className="text-base" />
                </div>
                <p className="text-sm font-medium tracking-wide">
                  Customize ChatGPT
                </p>
              </div>
            </MenuItem>
            <MenuItem>
              <div className="group flex w-full items-center gap-3 rounded-lg p-3 cursor-pointer data-[focus]:bg-white/10">
                <div className="w-7 h-7 bg-[#B4B4B440] rounded-full flex items-center justify-center">
                  <PiGearSix className="text-base" />
                </div>
                <p className="text-sm font-medium tracking-wide">Settings</p>
              </div>
            </MenuItem>

            <div className="my-1 h-px bg-primary-foreground/20" />
            <MenuItem>
              <SignOut />
              {/* <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
                className="group flex w-full items-center gap-3 rounded-lg p-3 cursor-pointer data-[focus]:bg-white/10"
              >
                <div className="w-7 h-7 bg-[#B4B4B440] rounded-full flex items-center justify-center">
                  <PiSignOut className="text-base" />
                </div>

                <button type="submit">Sign Out</button>
              </form> */}
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
