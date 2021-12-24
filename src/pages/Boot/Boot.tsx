import { useAppSelector } from "hooks";
import { FC } from "react";
import { BsApple } from "react-icons/bs";
import { Page } from "reducers/systemSlice";

const Boot: FC<Record<string, never>> = () => {
  const { activePage } = useAppSelector((state) => state.system);

  if (activePage === Page.BOOT_SLEEP) {
    return <div>sleep</div>;
  }

  if (activePage === Page.BOOT_RESTART) {
    return <div>restart</div>;
  }
  if (activePage === Page.BOOT_SHUT_DOWN) {
    return <div>shutdown</div>;
  }

  return (
    <div className="w-full h-full bg-black">
      <BsApple size={40} className="text-white" />
    </div>
  );
};

export default Boot;
