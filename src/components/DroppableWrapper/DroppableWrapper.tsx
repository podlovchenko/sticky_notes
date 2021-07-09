import './DroppableWrapper.css';

import {
    INotePosition,
} from '../../types/notes';

import React, {
    useEffect,
    useRef,
} from 'react';

interface IProps {
    children: JSX.Element;
    initialPosition?: INotePosition;
    onFinishMove: (position: INotePosition) => void,
}

function DroppableWrapper({
    children,
    initialPosition,
    onFinishMove,
}: IProps) {
    const element = useRef<HTMLDivElement>(null);

    const getCoordinates = () => {
        if (element && element.current) {
            const box = element.current.getBoundingClientRect();

            return {
                top: box!.top + window.pageYOffset,
                left: box!.left + window.pageXOffset,
            };
        }

        return {
            top: 0,
            left: 0,
        }
    }

    useEffect(() => {
        console.log(initialPosition)
        if (initialPosition && element && element.current) {
            element.current.style.left = `${initialPosition.x}px`;
            element.current.style.top = `${initialPosition.y}px`;
        }

        const onMouseDown = (evt: MouseEvent) => {
            if (element && element.current) {
                const coordinates = getCoordinates();
                const shiftX = evt.pageX - coordinates.left;
                const shiftY = evt.pageY - coordinates.top;

                const moveAt = (evt: MouseEvent) => {
                    if (element && element.current) {
                        element.current.style.left = `${evt.pageX - shiftX}px`;
                        element.current.style.top = `${evt.pageY - shiftY}px`;
                    }
                }

                moveAt(evt);

                document.onmousemove = (evt) => {
                    moveAt(evt);
                };

                element.current.onmouseup = () => {
                    document.onmousemove = null;

                    if (element && element.current) {
                        element.current.onmouseup = null;

                        onFinishMove({
                            x: element.current.offsetLeft,
                            y: element.current.offsetTop,
                        });
                    }
                };
            }
        };

        element?.current?.addEventListener('mousedown', onMouseDown);

        return () => {
            element?.current?.removeEventListener('mousedown', onMouseDown);
        }
    }, [])

    return (
        <div
            className={'droppable-wrapper'}
            ref={element}
            onDragStart={() => false}
        >
            {children}
        </div>
    );
}

export default DroppableWrapper;
