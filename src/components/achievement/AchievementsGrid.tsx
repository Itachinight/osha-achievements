import React, {forwardRef} from 'react';
import {AchievementGroup,} from '../../types';
import Achievement from './Achievement';

type Props = Pick<AchievementGroup, 'achievements'>

const AchievementsGrid = forwardRef<HTMLDivElement, Props>(({achievements}, ref) => {
    return (
        <div ref={ref} className='achievements-grid'>
            {achievements.map((achievement) => (
                <Achievement key={achievement.id} achievement={achievement}/>
            ))}
        </div>
    );
});

export default AchievementsGrid;