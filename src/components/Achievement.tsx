import React, {FC, memo, useRef, useState} from 'react';
import {AchievementWithUserData, NoneToVoidFunc} from '../types';
import {getAchievementPrizeClassName} from "../helpers/getAchievementPrizeClassName";
import AchievementProgress from "./AchievementProgress";
import AchievementDate from "./AchievementDate";
import {delay} from "../helpers/delay";

interface Props {
    achievement: AchievementWithUserData
    onClick?: (achievement: AchievementWithUserData, rect: DOMRect) => void
}

const Achievement: FC<Props> = ({achievement, onClick}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick: NoneToVoidFunc | undefined = onClick != null ?
        () => {
            setIsClicked(true);
            delay(() => setIsClicked(false), 1000);
            onClick(achievement, ref.current!.getBoundingClientRect());
        } :
        undefined;

    const achievementClassName = ['achievement'];

    if (!achievement.isCompleted) {
        achievementClassName.push('achievement_greyscale');
    }

    if (achievement.isUnread) {
        achievementClassName.push('achievement_highlight');
    }

    if (isClicked) {
        achievementClassName.push('achievement_clicked');
    }

    return (
        <div ref={ref} className='perspective-card'>
            <div className={achievementClassName.join(' ')} onClick={handleClick}>
                <div className='achievement__front-face'>
                    <div className='achievement__body'>
                        <img className='achievement__icon' src={achievement.icon} alt={achievement.title}/>
                        <h3 className='achievement__title'>
                            {achievement.title}
                        </h3>
                        <div className='achievement__description'>
                            {achievement.description}
                        </div>
                        {achievement.progress != null && <AchievementProgress progress={achievement.progress}/>}
                    </div>
                    <div className='achievement__footer'>
                        {achievement.date != null && <AchievementDate date={achievement.date}/>}
                        <i className={['achievement__prize', getAchievementPrizeClassName(achievement)].join(' ')}/>
                    </div>
                </div>
                <div className='achievement__back-face'>
                    {achievement.description}
                </div>
            </div>

        </div>
    );
};

export default memo(Achievement);