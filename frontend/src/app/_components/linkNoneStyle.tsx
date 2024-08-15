import { FC } from "react";
import Link from "next/link";

interface LinkNoneStyleProps {
  href: string;
  children: React.ReactNode;
}

const LinkNoneStyle: FC<LinkNoneStyleProps> = ({ href, children }) => {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
      {children}
    </Link>
  );
};

export default LinkNoneStyle;
