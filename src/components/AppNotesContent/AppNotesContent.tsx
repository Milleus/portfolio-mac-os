import {
  CSSProperties,
  FC,
  MouseEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { format } from "date-fns";
import { IoFolderOutline } from "react-icons/io5";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Button, { ButtonAppearance } from "base-components/Button";

enum FolderId {
  ICLOUD = "All iCloud",
  PROFILE = "Profile",
  PROJECT = "Projects",
}

type NoteItem = {
  id: FolderId;
  label: string;
  date: string;
  mdSrc: string;
  preview?: string;
};

const noteItems: Array<NoteItem> = [
  {
    id: FolderId.PROFILE,
    label: "About This Site",
    date: "2022-01-10T22:36:00.296Z",
    mdSrc: "markdown/about-this-site.md",
    preview:
      "This website was developed using React, React Redux, Tailwind CSS and TypeScript.",
  },
  {
    id: FolderId.PROFILE,
    label: "About Me",
    date: "2022-01-10T18:57:58.370Z",
    mdSrc: "markdown/about-me.md",
    preview: "Hi there! o/",
  },
  {
    id: FolderId.PROJECT,
    label: "Euterpe",
    date: "2022-01-10T22:36:00.296Z",
    mdSrc: "markdown/empty.md",
  },
  {
    id: FolderId.PROJECT,
    label: "Calliope",
    date: "2022-01-10T22:36:00.296Z",
    mdSrc: "markdown/empty.md",
  },
  {
    id: FolderId.PROJECT,
    label: "Tessara",
    date: "2022-01-10T22:36:00.296Z",
    mdSrc: "markdown/empty.md",
  },
];

export type AppNotesContentProps = {
  notesBreakpointXsPx: number;
  notesBreakpointSmPx: number;
  width: number;
  isAppActive: boolean;
  style: CSSProperties;
};

const AppNotesContent: FC<AppNotesContentProps> = ({
  notesBreakpointXsPx,
  notesBreakpointSmPx,
  width,
  isAppActive,
  style,
}) => {
  const [folderId, setFolderId] = useState<FolderId>(FolderId.PROFILE);
  const [itemId, setItemId] = useState<number>(0);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [currentFocus, setCurrentFocus] = useState<FolderId | number>(
    FolderId.PROFILE
  );
  const notes = useMemo(
    () =>
      folderId === FolderId.ICLOUD
        ? noteItems
        : noteItems.filter((item) => item.id === folderId),
    [folderId]
  );

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const response = await fetch(notes[itemId].mdSrc);
        const text = await response.text();

        setMarkdownContent(text);
      } catch (error) {
        console.error(error);
        setMarkdownContent("");
      }
    };

    loadMarkdown();
  }, [notes, itemId]);

  const handleFolderClick = (event: MouseEvent<HTMLButtonElement>) => {
    const folderId = event.currentTarget.getAttribute("data-id");

    if (folderId) {
      setFolderId(folderId as FolderId);
      setItemId(0);
      setCurrentFocus(folderId as FolderId);
    }
  };

  const handleItemClick = (event: MouseEvent<HTMLButtonElement>) => {
    const itemId = event.currentTarget.getAttribute("data-id");

    setItemId(Number(itemId));
    setCurrentFocus(Number(itemId));
  };

  const leftBarClasses = {
    "flex flex-col py-1 px-2": true,
    "w-[12.25rem] shrink-0": width >= notesBreakpointSmPx,
    "w-full max-w-[12.25rem]":
      width >= notesBreakpointXsPx && width < notesBreakpointSmPx,
    "bg-gray-300 border-r border-neutral-200 dark:bg-zinc-800 dark:border-black":
      width >= notesBreakpointXsPx && isAppActive,
    hidden: width < notesBreakpointXsPx,
    "bg-gray-200 border-r border-neutral-200 dark:bg-neutral-800 dark:border-black":
      width >= notesBreakpointXsPx && !isAppActive,
  };

  return (
    <div className="w-full flex bg-white dark:bg-zinc-800" style={style}>
      <div className={classNames(leftBarClasses)}>
        <p className="w-full text-xs text-gray-500 px-1.5">iCloud</p>
        {Object.values(FolderId).map((id, index) => {
          const folderClasses = {
            "flex shrink-0 w-full rounded py-1.5 px-2": true,
            "bg-yellow-500 text-white dark:bg-yellow-500/70 dark:text-neutral-200":
              id === currentFocus && isAppActive,
            "bg-gray-900/10 dark:bg-gray-50/10":
              (id !== currentFocus && id === folderId) ||
              (id === currentFocus && !isAppActive),
            "text-gray-400 dark:text-gray-500": !isAppActive,
          };

          const iconClasses = {
            "w-4 h-4": true,
            "text-yellow-600 dark:text-yellow-500":
              id !== currentFocus && isAppActive,
            "text-white dark:text-neutral-200":
              id === currentFocus && isAppActive,
            "text-yellow-500 dark:text-yellow-600": !isAppActive,
          };

          const countClasses = {
            "text-xs tracking-wide ml-auto": true,
            "text-gray-500": id !== currentFocus && isAppActive,
            "text-white dark:text-neutral-200":
              id === currentFocus && isAppActive,
            "text-gray-400 dark:text-gray-500": !isAppActive,
          };

          return (
            <Button
              key={`folder-${index}`}
              appearance={ButtonAppearance.DEFAULT}
              className={classNames(folderClasses)}
              dataId={id}
              onClick={handleFolderClick}
            >
              <IoFolderOutline className={classNames(iconClasses)} />
              <span className="text-xs tracking-wide ml-1.5">{id}</span>
              <span className={classNames(countClasses)}>
                {id === FolderId.ICLOUD
                  ? noteItems.length
                  : noteItems.filter((item) => item.id === id).length}
              </span>
            </Button>
          );
        })}
      </div>

      <div className="w-full flex">
        <div className="w-full max-w-[12.25rem] bg-white border-r border-neutral-200 py-2.5 pl-3 pr-2 dark:bg-stone-800 dark:border-black">
          {notes.map((item, index) => {
            const itemClasses = {
              "w-full block rounded py-2 px-2": true,
              "bg-amber-200 dark:bg-yellow-500/70": index === currentFocus,
              "bg-neutral-300 dark:bg-neutral-700":
                index !== currentFocus && index === itemId,
            };

            const previewColorClasses = {
              "text-neutral-500 dark:text-neutral-400": true,
              "dark:text-neutral-300": index === currentFocus,
            };

            return (
              <button
                key={`item-${index}`}
                className={classNames(itemClasses)}
                data-id={String(index)}
                onClick={handleItemClick}
              >
                <div className="text-neutral-800 ml-4 dark:text-neutral-200">
                  <p className="text-left text-sm font-semibold truncate">
                    {item.label}
                  </p>
                  <p className="text-left text-xs truncate">
                    {format(new Date(item.date), "d/M/yy")}
                    <span className={classNames("ml-2.5", previewColorClasses)}>
                      {item.preview ? item.preview : "No additional text"}
                    </span>
                  </p>
                  {folderId === FolderId.ICLOUD && (
                    <div
                      className={classNames(
                        "flex items-center",
                        previewColorClasses
                      )}
                    >
                      <IoFolderOutline className="w-3.5 h-3.5 ml-0.5" />
                      <span className="text-xs ml-1">{item.id}</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <div className="w-full min-w-[25.125rem] bg-white text-neutral-700 py-2.5 px-2 overflow-auto dark:bg-neutral-800 dark:text-neutral-200">
          <p className="text-center text-xs text-neutral-500 mb-1">
            {format(new Date(notes[itemId].date), "d MMMM yyyy 'at' h:mm aa")}
          </p>
          <div className="markdown mx-3.5">
            <ReactMarkdown
              children={markdownContent}
              linkTarget="_blank"
              remarkPlugins={[remarkGfm]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppNotesContent;
