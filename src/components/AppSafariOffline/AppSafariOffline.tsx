import { FC } from "react";

const AppSafariOffline: FC<Record<string, never>> = () => {
  return (
    <div className="w-full h-full bg-neutral-100 flex flex-col justify-center items-center">
      <div className="w-1/2 text-center">
        <p className="text-[1.75rem] text-neutral-500 leading-tight font-bold mb-3">
          You Are Not Connected to the Internet
        </p>
        <p className="text-[0.8rem] text-neutral-500 tracking-wide mb-3">
          This page can't be displayed because your computer is currently
          offline.
        </p>
      </div>
    </div>
  );
};

export default AppSafariOffline;
