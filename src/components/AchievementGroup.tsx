import React, {FC, memo} from 'react';
import {AchievementGroup as AchievementGroupType} from '../types';
import AchievementsGrid from './AchievementsGrid';
import AchievementGroupProgress from './AchievementGroupProgress';

interface Props {
    group: AchievementGroupType
}

const AchievementGroup: FC<Props> = ({group}) => {
    return (
        <div className='achievement-group'>
            <div className='achievement-group__header'>
                <h3 className='achievement-group__title'>{group.title}</h3>
                <AchievementGroupProgress progress={group.progress}/>
            </div>
            <hr className='achievement-group__line'/>
            <AchievementsGrid achievements={group.achievements}/>
        </div>
    );
};

export default memo(AchievementGroup);