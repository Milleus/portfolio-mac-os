import { FC, MouseEvent, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { IoFolderOutline, IoLockClosed } from "react-icons/io5";
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
  isLocked?: boolean;
};

const noteItems: Array<NoteItem> = [
  {
    id: FolderId.PROFILE,
    label: "About Me",
    date: "2022-01-10T18:57:58.370Z",
    mdSrc: "markdown/about-me.md",
    preview: "Hi there! o/",
  },
  {
    id: FolderId.PROFILE,
    label: "About This Site",
    date: "2022-01-10T22:36:00.296Z",
    mdSrc: "markdown/about-this-site.md",
    preview:
      "This website was developed using React, React Redux, Tailwind CSS and TypeScript.",
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

const AppNotesContent: FC<Record<string, never>> = () => {
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

  return (
    <>
      <div className="w-[12.25rem] shrink-0 bg-gray-300 py-1 px-2">
        <p className="w-full px-1.5 text-xs text-gray-600">iCloud</p>
        {Object.values(FolderId).map((id, index) => {
          const folderClasses = {
            "w-full rounded py-1.5 px-2": true,
            "bg-yellow-500 text-white": id === currentFocus,
            "bg-gray-900/10": id !== currentFocus && id === folderId,
          };

          const iconClasses = {
            "w-4 h-4": true,
            "text-yellow-600": id !== currentFocus,
            "text-white": id === currentFocus,
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
              <span className="text-xs tracking-wide ml-auto">
                {id === FolderId.ICLOUD
                  ? noteItems.length
                  : noteItems.filter((item) => item.id === id).length}
              </span>
            </Button>
          );
        })}
      </div>

      <div className="w-full flex">
        <div className="w-1/4 bg-white border-r border-neutral-200 py-2.5 pl-3 pr-2">
          {notes.map((item, index) => {
            const itemClasses = {
              "w-full block rounded py-2 px-2": true,
              "bg-amber-200": index === currentFocus,
              "bg-neutral-300": index !== currentFocus && index === itemId,
            };

            return (
              <button
                key={`item-${index}`}
                className={classNames(itemClasses)}
                data-id={String(index)}
                onClick={handleItemClick}
              >
                <div className="w-3 self-start">
                  {item.isLocked && <IoLockClosed className="w-3 h-3 mt-1" />}
                </div>
                <div className="ml-1">
                  <p className="text-left text-sm text-neutral-800 font-semibold truncate">
                    {item.label}
                  </p>
                  <p className="text-left text-xs text-neutral-800 truncate">
                    {format(new Date(item.date), "d/M/yy")}
                    <span className="text-neutral-500 ml-2.5">
                      {item.isLocked
                        ? "Locked"
                        : item.preview
                        ? item.preview
                        : "No additional text"}
                    </span>
                  </p>
                  {folderId === FolderId.ICLOUD && (
                    <div className="flex items-center">
                      <IoFolderOutline className="w-3.5 h-3.5 text-neutral-500 ml-0.5" />
                      <span className="text-xs text-neutral-500 ml-1">
                        {item.id}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <div className="w-3/4 bg-white text-neutral-700 py-2.5 px-2 overflow-auto">
          <p className="text-center text-xs mb-1">
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
    </>
  );
};

export default AppNotesContent;
