import { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

export function Paper({
  children = <></>,
  className = "",
}: ContainerProps): ReactNode {
  return (
    <div className={`bg-white p-3 rounded-xl shadow-md ${className}`}>
      {children}
    </div>
  );
}

export function Row({ children = <></>, className = "" }: ContainerProps) {
  return (
    <div className={`flex flex-row items-center space-x-2 ${className}`}>
      {children}
    </div>
  );
}

export function Col({ children = <></>, className = "" }: ContainerProps) {
  return (
    <div className={`flex flex-column justify-center space-y-2 ${className}`}>
      {children}
    </div>
  );
}
