import { FC, ReactNode } from "react";

export type LinkProps = {
  children: ReactNode;
  href?: string;
};

const Link: FC<LinkProps> = ({ children, href }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default Link;
