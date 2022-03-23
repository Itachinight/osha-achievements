import React, {FC, memo, useRef, useState} from 'react';
import {AchievementGroup as AchievementGroupType} from '../../types';
import AchievementsGrid from '../achievement/AchievementsGrid';
import AchievementGroupProgress from './AchievementGroupProgress';
import {preventDefault} from '../../helpers/preventDefault';
import {flushSync} from 'react-dom';
import {raf} from '../../helpers/raf';
import {animateElementHeight} from '../../helpers/animateElementHeight';

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
                const containerMarginTop = window.parseInt(window.getComputedStyle(container).marginTop);

                const endHeight = summary.offsetHeight + container.offsetHeight + containerMarginTop;

                setIsAnimationPlaying(true);

                animateElementHeight(details, initHeight, endHeight, () => {
                    setIsOverflowHidden(false);
                    setFixedHeight(null);
                    setIsAnimationPlaying(false);
                });
            });
        } else {
            flushSync(() => setIsOverflowHidden(true));

            setIsAnimationPlaying(true);

            animateElementHeight(details, details.offsetHeight, summary.offsetHeight, () => {
                setIsAnimationPlaying(false);
                setIsOverflowHidden(false);
                setIsOpen(false);
            });
        }
    };

    const detailsClass = ['achievement-group__spoiler'];

    if (isOverflowHidden) {
        detailsClass.push('achievement-group__spoiler_overflow-hidden');
    }

    const style = fixedHeight !== null ? {maxHeight: fixedHeight} : undefined;

    return (
        <section className='achievement-group'>
            <details ref={detailsRef} className={detailsClass.join(' ')} open={isOpen} style={style}>
                <summary ref={summaryRef} onClick={preventDefault}>
                    <div className='achievement-group__header'>
                        <h3 className='achievement-group__title' onClick={handleClick}>
                            {group.title}
                        </h3>
                        {group.progress != null && <AchievementGroupProgress progress={group.progress}/>}
                    </div>
                    <hr className='achievement-group__line'/>
                </summary>
                <AchievementsGrid ref={containerRef} achievements={group.achievements}/>
            </details>
        </section>
    );
};

export default memo(AchievementGroup);
