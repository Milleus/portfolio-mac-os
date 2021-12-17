import { FC } from "react";

import MenuBar from "components/MenuBar";
import WallpaperMonterey from "./images/wallpaper-monterey.jpeg";

const Desktop: FC<Record<string, never>> = () => {
  return (
    <div
      className="w-full h-full overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: `url(${WallpaperMonterey})` }}
    >
      <MenuBar />
    </div>
  );
};

export default Desktop;
