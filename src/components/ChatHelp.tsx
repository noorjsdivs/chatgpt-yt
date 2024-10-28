import { GiGraduateCap } from "react-icons/gi";
import { MdEditNote } from "react-icons/md";
import { PiLightbulb } from "react-icons/pi";
import { VscVscodeInsiders } from "react-icons/vsc";

const chatData = [
  {
    title: "Create image",
    icon: <PiLightbulb />,
    iconColor: "#e2c541",
  },
  {
    title: "Get advice",
    icon: <MdEditNote />,
    iconColor: "#c285c7",
  },
  {
    title: "Summarize text",
    icon: <VscVscodeInsiders />,
    iconColor: "#e86060",
  },
  {
    title: "Code",
    icon: <GiGraduateCap />,
    iconColor: "#76d0eb",
  },
  {
    title: "Help",
    icon: <GiGraduateCap />,
    iconColor: "#76d0eb",
  },
  {
    title: "More",
  },
];

const ChatHelp = () => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center gap-3">
      {chatData?.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2 border border-primary-foreground/10 px-4 py-2 rounded-full hover:bg-primary-foreground/10 cursor-pointer duration-300 ease-in-out"
        >
          {item?.icon && (
            <span style={{ color: item?.iconColor }} className="text-xl">
              {item?.icon}
            </span>
          )}
          <p className="text-sm font-medium tracking-wide">{item?.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatHelp;
