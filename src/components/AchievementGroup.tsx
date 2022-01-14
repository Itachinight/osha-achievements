import React, {FC, memo, useRef, useState} from 'react';
import {AchievementGroup as AchievementGroupType} from '../types';
import AchievementsGrid from './AchievementsGrid';
import AchievementGroupProgress from './AchievementGroupProgress';
import {preventDefault} from '../helpers/preventDefault';
import {flushSync} from 'react-dom';
import {raf} from '../helpers/raf';
import {animateElementHeight} from '../helpers/animateElementHeight';

interface Props {
    group: AchievementGroupType
}

const AchievementGroup: FC<Props> = ({group}) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isAnimationPlaying, setIsAnimationPlaying] = useState<boolean>(false);
    const [fixedHeight, setFixedHeight] = useState<number | null>(null);
    const [isOverflowHidden, setIsOverflowHidden] = useState(false);

    const detailsRef = useRef<HTMLDetailsElement | null>(null);
    const summaryRef = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleClick = () => {
        const details = detailsRef.current;
        const summary = summaryRef.current;
        const container = containerRef.current;

        if (isAnimationPlaying || details == null || summary == null || container == null) {
            return;
        }

        if (!isOpen) {
            const initHeight = details.offsetHeight;

            flushSync(() => {
                setIsOverflowHidden(true);
                setFixedHeight(initHeight);
                setIsOpen(true);
            });

            raf(() => {
                const endHeight = summary.offsetHeight + container.offsetHeight;

                setIsAnimationPlaying(true);

                animateElementHeight(details, initHeight, endHeight).addEventListener('finish', () => {
                    setIsOverflowHidden(false);
                    setFixedHeight(null);
                    setIsAnimationPlaying(false);
                });
            });
        } else {
            flushSync(() => setIsOverflowHidden(true));

            setIsAnimationPlaying(true);

            animateElementHeight(details, details.offsetHeight, summary.offsetHeight).addEventListener('finish', () => {
                setIsAnimationPlaying(false);
                setIsOverflowHidden(false);
                setIsOpen(false);
            });
        }
    };

    const detailsClass = ['achievement-group'];

    if (isOverflowHidden) {
        detailsClass.push('achievement-group_overflow-hidden');
    }

    const style = fixedHeight !== null ? {height: fixedHeight} : undefined;

    return (
        <details ref={detailsRef} className={detailsClass.join(' ')} open={isOpen} style={style}>
            <summary ref={summaryRef} onClick={preventDefault}>
                <div className='achievement-group__header'>
                    <h3 className='achievement-group__title' onClick={handleClick}>
                        {group.title}
                    </h3>
                    <AchievementGroupProgress progress={group.progress}/>
                </div>
                <hr className='achievement-group__line'/>
            </summary>
            <AchievementsGrid ref={containerRef} achievements={group.achievements}/>
        </details>
    );
};

export default memo(AchievementGroup);