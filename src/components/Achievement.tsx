import React, {FC, memo, useRef, useState} from 'react';
import {AchievementWithUserData} from '../types';
import {getAchievementPrizeClassName} from "../helpers/getAchievementPrizeClassName";
import AchievementProgress from "./AchievementProgress";
import AchievementDate from "./AchievementDate";
import {delay} from "../helpers/delay";
import AchievementRarity from "./AchievementRarity";

interface Props {
    achievement: AchievementWithUserData
    bothFaces?: boolean
    noCard?: boolean
    onClick?: (achievement: AchievementWithUserData, rect: DOMRect) => void
}

const Achievement: FC<Props> = ({achievement, bothFaces = true, onClick, noCard = false}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isClicked, setIsClicked] = useState(false);
    
    const handleClick = () => {
        setIsClicked(true);
        delay(() => setIsClicked(false), 500);
        onClick?.(achievement, ref.current!.getBoundingClientRect());
    };

    const achievementClassName = ['achievement'];

    if (noCard) {
        achievementClassName.push('achievement_no-card');
    }

    if (achievement.isSecret) {
        achievementClassName.push('achievement_secret');
    }

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
                        <picture>
                            <source srcSet={achievement.iconWebp} type='image/webp'/>
                            <img className='achievement__icon' src={achievement.iconPng} alt={achievement.title}/>
                        </picture>
                        <h3 className='achievement__title'>
                            {achievement.title}
                        </h3>
                        <div className='achievement__description'>
                            {achievement.description}
                        </div>
                        {achievement.progress != null && <AchievementProgress progress={achievement.progress}/>}
                        <AchievementRarity rarity={achievement.rarity} rarityLevel={achievement.rarityLevel}/>
                    </div>
                    <div className='achievement__footer'>
                        {achievement.date != null && <AchievementDate date={achievement.date}/>}
                        <i className={['achievement__prize', getAchievementPrizeClassName(achievement)].join(' ')}/>
                    </div>
                </div>
                {bothFaces &&
                    <div className='achievement__back-face'>
                        {achievement.description}
                    </div>
                }
            </div>
        </div>
    );
};

export default memo(Achievement);