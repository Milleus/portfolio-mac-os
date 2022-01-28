type FullScreenDocument = Document & {
  mozFullScreenElement: Element | null;
  msFullscreenElement: Element | null;
  webkitFullscreenElement: Element | null;
  mozCancelFullScreen: () => void;
  webkitExitFullscreen: () => void;
};

type FullScreenDocumentElement = HTMLElement & {
  mozRequestFullScreen: () => void;
  webkitRequestFullscreen: () => void;
  msRequestFullscreen: () => void;
};

const detectFullScreen = (): boolean => {
  const doc = document as FullScreenDocument;

  return !!(
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement ||
    doc.webkitFullscreenElement
  );
};

const requestFullScreen = () => {
  const docEl = document.documentElement as FullScreenDocumentElement;

  const request =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullscreen ||
    docEl.msRequestFullscreen;

  request && request.call(docEl);
};

const exitFullScreen = () => {
  const doc = document as FullScreenDocument;

  const exit =
    doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen;

  exit && exit.call(doc);
};

export const toggleFullScreen = (): void => {
  const isFullScreen = detectFullScreen();

  isFullScreen ? exitFullScreen() : requestFullScreen();
};
