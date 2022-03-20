import {usePlay} from './usePlay';
import cn from 'classnames';

import image from './toasty.png';

import style from './Toasty.module.css';

interface Props {
    activate: boolean;
    onStop: () => void;
}

export const Toasty = ({ activate, onStop }: Props) => {
    const playing = usePlay(activate, onStop);
    return <div className={cn(style.image, playing && style.active)}>
        <div className={style.title}>Toasty!!!</div>
        <img src={image} alt=""/>
    </div>;
};
