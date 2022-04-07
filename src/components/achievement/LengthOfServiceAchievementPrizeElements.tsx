import React, {FC, memo} from 'react';
import {AchievementWithUserData} from '../../types';

interface Props {
    achievement: AchievementWithUserData
}

const LengthOfServiceAchievementPrizeElements: FC<Props> = ({achievement}) => {
    const prizeElements = [];

    const total = achievement.progress != null && achievement.progress.current > 0 ? achievement.progress.current : 1;

    for (let i = 0; i < total; i++) {
        prizeElements.push(<i className='achievement__prize achievement__prize_ruby' key={i}/>);
    }

    return (
        <div className='achievement__prize-wrapper'>
            {prizeElements}
        </div>
    );
};

export default memo(LengthOfServiceAchievementPrizeElements);