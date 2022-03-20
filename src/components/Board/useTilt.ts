import {RefObject, useEffect, useRef} from 'react';

export const useTilt = (elementRef: RefObject<HTMLElement>) => {
    const sizes = useRef({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const resizeHandler = () => {
            sizes.current = { width: window.innerWidth, height: window.innerHeight };
        };

        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    }, []);

    useEffect(() => {
        const moveHandler = (event: PointerEvent) => {
            const element = elementRef.current;

            if (!element) {
                return;
            }

            const { width, height } = sizes.current;
            const { clientX, clientY } = event;
            const x = clientX / width - 0.5;
            const y = clientY / height - 0.5;

            element.style.setProperty('--axis', String(-Math.sign(y) * x * 2));
            element.style.setProperty('--angle', String(y));
        };

        window.addEventListener('pointermove', moveHandler);
        return () => {
            window.removeEventListener('pointermove', moveHandler);
        }
    }, [elementRef]);
};
