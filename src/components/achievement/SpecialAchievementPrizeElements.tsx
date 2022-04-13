import React, {FC, memo} from 'react';
import {AchievementWithUserData} from '../../types';
import {getAchievementPrizeClassName} from "../../helpers/getAchievementPrizeClassName";

interface Props {
    achievement: AchievementWithUserData
}

const SpecialAchievementPrizeElements: FC<Props> = ({achievement}) => {
    const prizeElements = [];

    const total = achievement.progress != null && achievement.progress.current > 0 ? achievement.progress.current : 1;

    const className = getAchievementPrizeClassName(achievement);

    for (let i = 0; i < total; i++) {
        prizeElements.push(<i className={className} key={i}/>);
    }

    return (
        <div className='achievement__prize-wrapper'>
            {prizeElements}
        </div>
    );
};

export default memo(SpecialAchievementPrizeElements);