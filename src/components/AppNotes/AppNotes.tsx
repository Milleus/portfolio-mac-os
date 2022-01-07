import { FC } from "react";

import { ApplicationKeys } from "reducers/applicationSlice";
import Window from "components/Window";
import WindowBar from "components/WindowBar";
import WindowControls from "components/WindowControls";

const AppNotes: FC<Record<string, never>> = () => {
  return (
    <Window
      appKey={ApplicationKeys.NOTES}
      defaultWidth={1024}
      defaultHeight={576}
      minWidth={651}
      minHeight={226}
    >
      <WindowBar className="h-[3.25rem] flex items-stretch bg-gray-50 border-b border-gray-300 py-3 pl-2 pr-3">
        <div className="flex">
          <WindowControls appKey={ApplicationKeys.NOTES} />
        </div>
      </WindowBar>

      <div className="w-full bg-gray-200">content</div>
    </Window>
  );
};

export default AppNotes;
