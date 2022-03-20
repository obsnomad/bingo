import {useState} from 'react';

const combo = [
    '01234',
    '56789',
    'abcd',
    'efghi',
    'jklmn',
    '05aej',
    '16bfk',
    '27gl',
    '38chm',
    '49din',
    '06hn',
    '48fj',
].map((item) => new RegExp(item.split('').join('.*')));

const matchCombo = (selected: number[]) => {
    const row = selected.map((index) => index.toString(24)).join('');
    return combo.some((item) => row.match(item));
}

export const useGameplay = () => {
    const [selected, setSelected] = useState<number[]>([]);
    const [winAction, setWinAction] = useState(false);

    const updateTile = (index: number) => () => {
        const newSelected = [...selected];
        const tileIndex = selected.indexOf(index);

        if (tileIndex >= 0) {
            newSelected.splice(tileIndex, 1);
        } else {
            newSelected.push(index);
        }

        newSelected.sort((a, b) => a - b);

        if (newSelected.length > selected.length) {
            matchCombo(newSelected);
            setWinAction(matchCombo(newSelected));
        }

        setSelected(newSelected);
    }

    const resetWinAction = () => setWinAction(false);

    return {
        selected,
        updateTile,
        winAction,
        resetWinAction,
    };
};
