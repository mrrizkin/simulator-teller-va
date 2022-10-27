import { ReactNode } from "react";

interface ShowProps {
  when: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

const Show = (props: ShowProps) => {
  return props.when ? <>{props.children}</> : <>{props.fallback}</>;
};

export default Show;
