import { MouseEventHandler, ReactNode } from "react";
import cn from "classnames";

import style from "./Tile.module.css";

interface Props {
  children: ReactNode;
  position?: number;
  main?: boolean;
  selected?: boolean;
  win?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Tile = ({
  children,
  position,
  main,
  selected,
  win,
  onClick,
}: Props) => {
  return (
    <div
      className={cn(
        style.tile,
        main && style.main,
        selected && style.selected,
        win && style.win
      )}
      onClick={onClick}
    >
      {position && <span className={style.position}>{position}</span>}
      {children}
    </div>
  );
};
