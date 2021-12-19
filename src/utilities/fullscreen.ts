// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API

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

export const detectFullScreen = (): boolean => {
  const doc = document as FullScreenDocument;

  return !!(
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement ||
    doc.webkitFullscreenElement
  );
};

export const toggleFullScreen = (): void => {
  const isFullScreen = detectFullScreen();
  const doc = document as FullScreenDocument;
  const docEl = document.documentElement as FullScreenDocumentElement;

  if (isFullScreen) {
    const exitFullScreen =
      doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen;

    exitFullScreen && exitFullScreen.call(doc);
  } else {
    const requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullscreen ||
      docEl.msRequestFullscreen;

    requestFullScreen && requestFullScreen.call(docEl);
  }
};
