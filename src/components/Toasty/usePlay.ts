import {useEffect, useState} from 'react';

const audio = new Audio('/toasty.wav');
audio.preload = 'auto';

export const usePlay = (activate: boolean, onStop: () => void) => {
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (activate) {
            audio.play().then(() => {
                setPlaying(true);
            });
        }
    }, [activate]);


    useEffect(() => {
        if (playing) {
            setTimeout(() => {
                setPlaying(false);
                onStop();
            }, 1500);
        }
    }, [playing, onStop]);

    return playing;
};
