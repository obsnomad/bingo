import { useEffect, useState } from "react";

const combo = [
  "01234",
  "56789",
  "abcd",
  "efghi",
  "jklmn",
  "05aej",
  "16bfk",
  "27gl",
  "38chm",
  "49din",
  "06hn",
  "48fj",
];

const match = (row: string) => (item: string) =>
  row.match(new RegExp(item.split("").join(".*")));

const matchCombo = (selected: number[]) => {
  const row = selected.map((index) => index.toString(24)).join("");
  return combo.filter(match(row));
};

export const useGameplay = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [winCombo, setWinCombo] = useState<string[]>([]);
  const [winTiles, setWinTiles] = useState<number[]>([]);
  const [hasNewWinTiles, setHasNewWinTiles] = useState(false);

  const updateTile = (index: number) => () => {
    const newSelected = [...selected];
    const tileIndex = selected.indexOf(index);

    if (tileIndex >= 0) {
      newSelected.splice(tileIndex, 1);
    } else {
      newSelected.push(index);
    }

    newSelected.sort((a, b) => a - b);

    const newWinCombo = matchCombo(newSelected);
    setWinCombo(newWinCombo);

    setSelected(newSelected);
  };

  useEffect(() => {
    const comboSet = new Set(winCombo.join(""));
    const numbers = Array.from(comboSet).map((item) => parseInt(item, 24));
    setHasNewWinTiles(
      numbers.filter((item) => !winTiles.includes(item)).length > 0
    );
    setWinTiles(numbers);
  }, [winCombo]);

  useEffect(() => {
    if (hasNewWinTiles) {
      setHasNewWinTiles(false);
    }
  }, [hasNewWinTiles]);

  return {
    selected,
    updateTile,
    winTiles,
    hasNewWinTiles,
  };
};
