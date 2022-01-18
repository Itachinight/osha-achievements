import React, {FC, memo} from 'react';
import {AchievementGroup} from '../types';
import {useDelayedValue} from '../hooks/useDelayedValue';

type Props = Pick<AchievementGroup, 'progress'>;

const AchievementGroupProgress: FC<Props> = ({progress}) => {
    return (
        <div className='achievement-group__progress'>
            <progress value={useDelayedValue(progress.current, 0)} max={progress.max}/>
            <span>{progress.current}/{progress.max}</span>
        </div>
    );
}

export default memo(AchievementGroupProgress);