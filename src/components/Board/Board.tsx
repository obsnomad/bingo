import { useEffect, useRef, useState } from "react";
import { useTilt } from "./useTilt";
import { Tile } from "../Tile/Tile";
import { Toasty } from "../Toasty/Toasty";

import style from "./Board.module.css";
import { useGameplay } from "./useGameplay";

interface Props {
  center: string;
  items: string[];
}

export const Board = ({ center, items }: Props) => {
  const [tiles, setTiles] = useState<string[]>([]);
  const [activateToasty, setActivateToasty] = useState(false);

  const elementRef = useRef(null);

  useTilt(elementRef);
  const { selected, updateTile, winTiles, hasNewWinTiles } = useGameplay();

  useEffect(() => {
    const randomItems = items.sort(() => 0.5 - Math.random()).slice(0, 24);
    setTiles(randomItems);
  }, [items]);

  useEffect(() => {
    if (hasNewWinTiles) {
      setActivateToasty(true);
    }
  }, [hasNewWinTiles]);

  return (
    <>
      <Toasty
        activate={activateToasty}
        onStop={() => setActivateToasty(false)}
      />
      <div className={style.board} ref={elementRef}>
        <Tile main>{center}</Tile>
        {tiles.map((name, index) => (
          <Tile
            key={index}
            position={index + 1}
            selected={selected.includes(index)}
            win={winTiles.includes(index)}
            onClick={updateTile(index)}
          >
            {name}
          </Tile>
        ))}
      </div>
    </>
  );
};
