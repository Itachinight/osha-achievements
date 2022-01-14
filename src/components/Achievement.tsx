import React, {FC, memo} from 'react';
import {AchievementWithUserData} from '../types';
import {getAchievementPrizeClassName} from "../helpers/getAchievementPrizeClassName";
import AchievementProgress from "./AchievementProgress";
import AchievementDate from "./AchievementDate";

interface Props {
    achievement: AchievementWithUserData
}

const Achievement: FC<Props> = ({achievement}) => {
    const className = ['achievement'];
    const prizeClassName = ['achievement__prize', getAchievementPrizeClassName(achievement)];

    if (!achievement.isCompleted) {
        className.push('achievement_greyscale');
    }

    if (achievement.isUnread) {
        className.push('achievement_highlight');
    }

    return (
        <div className='perspective-card'>
            <div className={className.join(' ')}>
                <div className='achievement__front-face'>
                    <img className='achievement__icon' src={achievement.icon} alt={achievement.title}/>
                    <h3 className='achievement__title'>
                        {achievement.title}
                    </h3>
                    <div className='achievement__description'>
                        {achievement.description}
                    </div>
                    {achievement.progress != null && <AchievementProgress progress={achievement.progress}/>}
                    <div className='achievement__footer'>
                        {achievement.date != null && <AchievementDate date={achievement.date}/>}
                        <i className={prizeClassName.join(' ')}/>
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