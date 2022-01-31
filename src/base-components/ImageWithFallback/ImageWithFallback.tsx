import { FC } from "react";

enum ImageType {
  WEBP = "image/webp",
  JPEG = "image/jpeg",
  PNG = "image/png",
}

export type ImageWithFallbackProps = {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
};

const getImageType = (filename: string): ImageType | undefined => {
  const extension = filename.split(".").pop();
  let type = undefined;

  switch (extension) {
    case "webp":
      type = ImageType.WEBP;
      break;
    case "jpg":
    case "jpeg":
      type = ImageType.JPEG;
      break;
    case "png":
      type = ImageType.PNG;
      break;
  }

  return type;
};

const ImageWithFallback: FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  className,
}) => {
  const srcType = getImageType(src);
  const fallbackType = getImageType(fallbackSrc);

  return (
    <picture>
      {srcType && <source type={srcType} srcSet={src} />}
      {fallbackType && <source type={fallbackType} srcSet={fallbackSrc} />}
      <img src={fallbackSrc} alt={alt} className={className} />
    </picture>
  );
};

export default ImageWithFallback;
