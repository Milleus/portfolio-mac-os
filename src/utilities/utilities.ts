/**
 * Full screen support
 * https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
 */
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

const requestFullScreen = (): void => {
  const docEl = document.documentElement as FullScreenDocumentElement;

  const request =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullscreen ||
    docEl.msRequestFullscreen;

  request && request.call(docEl);
};

const exitFullScreen = (): void => {
  const doc = document as FullScreenDocument;

  const exit =
    doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen;

  exit && exit.call(doc);
};

export const toggleFullScreen = (): void => {
  const isFullScreen = detectFullScreen();

  isFullScreen ? exitFullScreen() : requestFullScreen();
};

/**
 * Webp support
 * https://developers.google.com/speed/webp/faq
 */
type KTestImages = {
  lossy: string;
  lossless: string;
  alpha: string;
  animation: string;
};

export const checkWebpFeature = (
  feature: keyof KTestImages,
  callback: (feature: keyof KTestImages, result: boolean) => void
) => {
  const kTestImages: KTestImages = {
    lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
    lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
    alpha:
      "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
    animation:
      "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
  };
  const img = new Image();

  img.onload = () => {
    const result = img.width > 0 && img.height > 0;
    callback(feature, result);
  };
  img.onerror = () => {
    callback(feature, false);
  };
  img.src = "data:image/webp;base64," + kTestImages[feature];
};

/**
 * Others
 */
export const convertRemToPixels = (rem: number): number => {
  const fontSize = getComputedStyle(document.documentElement).fontSize;

  return rem * parseFloat(fontSize);
};
