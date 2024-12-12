import { Col } from "@components/Container";
import { ReactNode } from "react";

interface PageBlockProps {
  children: ReactNode;
  className?: string;
}

interface HeroProps extends PageBlockProps {
  imageUrl?: string;
}

export function Hero({ imageUrl, children, className = "" }: HeroProps) {
  return (
    <Col className={`${imageUrl ? "bg-" + imageUrl : ""} ${className}`}>
      {children}
    </Col>
  );
}

export function Screen({ children, className = "" }: PageBlockProps) {
  return (
    <Col className={`m-0 min-h-screen w-screen ${className}`}>{children}</Col>
  );
}
