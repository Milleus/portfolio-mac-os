import { FC, ReactNode } from "react";

export type LinkProps = {
  children: ReactNode;
  href?: string;
  className?: string;
};

const Link: FC<LinkProps> = ({ children, href, className }) => {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default Link;
