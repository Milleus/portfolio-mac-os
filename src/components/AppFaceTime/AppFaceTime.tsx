import { FC, useEffect, useRef } from "react";
import { IoIosLink } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";

import { ApplicationKeys } from "reducers/applicationSlice";
import Button, { ButtonAppearance } from "base-components/Button";
import Window, { DRAG_HANDLE_CLASS } from "components/Window";
import WindowControls from "components/WindowControls";

const AppFaceTime: FC<Record<string, never>> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const streamCameraToVideo = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error(error);
      }
    };

    streamCameraToVideo();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <Window
      appKey={ApplicationKeys.FACETIME}
      defaultWidth={976}
      defaultHeight={480}
      minWidth={976}
      minHeight={480}
      isAspectRatioLocked={true}
      className="border border-gray-500"
    >
      <div className={`w-full h-full flex bg-neutral-900 ${DRAG_HANDLE_CLASS}`}>
        <div className="w-80 shrink-0 px-1.5 py-5">
          <div className="flex mb-5">
            <WindowControls appKey={ApplicationKeys.FACETIME} isActive={true} />
          </div>

          <div className="flex ml-3 mr-4">
            <Button
              appearance={ButtonAppearance.DEFAULT}
              className="w-full flex justify-center items-center bg-neutral-600 rounded-md text-sm tracking-tight text-gray-50 py-1 mr-2.5"
            >
              <IoIosLink className="w-3.5 h-3.5 mr-0.5" />
              Create Link
            </Button>
            <Button
              appearance={ButtonAppearance.DEFAULT}
              className="w-full flex justify-center items-center bg-green-600 rounded-md text-sm tracking-tight text-gray-50 py-1"
            >
              <IoVideocam className="w-3.5 h-3.5 mr-0.5" />
              New FaceTime
            </Button>
          </div>
        </div>

        <div className="grow bg-black">
          <video
            ref={videoRef}
            autoPlay={true}
            className="w-full h-full object-cover"
            style={{ transform: "rotateY(180deg)" }}
          ></video>
        </div>
      </div>
    </Window>
  );
};

export default AppFaceTime;
