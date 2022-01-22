import { BsX } from "react-icons/bs";
import { FC, useEffect, useMemo, useRef, useState } from "react";

import Button, { ButtonAppearance } from "base-components/Button";
import {
  ApplicationKeys,
  updateApplicationStatus,
} from "reducers/applicationSlice";
import { useAppDispatch } from "hooks";

const AppSiri: FC<Record<string, never>> = () => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFirstSpeech, setIsFirstSpeech] = useState<boolean>(true);
  const [isHelperShown, setIsHelperShown] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const SpeechRecognition =
    (window as any).webkitSpeechRecognition ||
    (window as any).SpeechRecognition;
  const recognition = useMemo(() => {
    return SpeechRecognition ? new SpeechRecognition() : null;
  }, [SpeechRecognition]);

  useEffect(() => {
    const { current: results } = resultsRef;
    const { current: preview } = previewRef;

    if (recognition && preview && results) {
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        const isFinal = event.results[0].isFinal;

        preview.textContent = speechResult;
        isFirstSpeech && setIsFirstSpeech(false);

        if (isFinal) {
          const p = document.createElement("p");

          p.textContent = speechResult;
          results.appendChild(p);

          preview.textContent = "";
        }
      };

      recognition.onspeechend = () => {
        recognition.stop();
      };

      recognition.onerror = (event: any) => {
        if (isFirstSpeech && event.error === "no-speech") {
          setIsFirstSpeech(false);
          setIsHelperShown(true);
        }
      };

      recognition.start();
    }
  }, [recognition]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCloseClick = () => {
    dispatch(
      updateApplicationStatus({
        appKey: ApplicationKeys.SIRI,
        status: { isOpen: false },
      })
    );
  };

  const handleActivateClick = () => {
    recognition && recognition.start();
  };

  return (
    <div
      className="absolute z-40 top-12 right-4 w-[21.5rem] min-h-[6.5rem] max-h-[70%] border border-red-900 bg-neutral-800 rounded-lg text-neutral-200"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <Button
          appearance={ButtonAppearance.DEFAULT}
          ariaLabel="close siri"
          className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-gray-300 border border-gray-300 rounded-full dark:bg-neutral-800 dark:border-gray-500"
          onClick={handleCloseClick}
        >
          <BsX className="w-full h-full text-gray-900 dark:text-neutral-200" />
        </Button>
      )}

      <div className="flex flex-col items-center p-2.5">
        {isFirstSpeech && <p className="text-xs">What can I help you with?</p>}
        {isHelperShown && (
          <ul className="w-full">
            <li>"Open Notes"</li>
            <li>"Launch Safari"</li>
            <li>"Play/Pause Music"</li>
          </ul>
        )}
        <div ref={resultsRef} className="w-full"></div>
        <div ref={previewRef} className="w-full"></div>
        <Button
          appearance={ButtonAppearance.DEFAULT}
          ariaLabel="activate siri"
          className="p-4 bg-red-500"
          onClick={handleActivateClick}
        >
          Click
        </Button>
      </div>
    </div>
  );
};

export default AppSiri;
