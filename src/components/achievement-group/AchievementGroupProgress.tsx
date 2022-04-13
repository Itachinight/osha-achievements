import React, {FC, memo, useMemo} from 'react';
import {AchievementGroup} from '../../types';
import {useDelayedValue} from '../../hooks/useDelayedValue';

type Props = Required<Pick<AchievementGroup, 'progress'>>;

const AchievementGroupProgress: FC<Props> = ({progress}) => {
    const delayedValue = useDelayedValue(progress.current, 0);
    const percentage = useMemo<number>(() => Math.round(progress.current / progress.max * 100), [progress]);

    if (percentage === 100) {
        return <div className='achievement-group__completed-icon'/>;
    }

    return (
        <div className='achievement-group__progress'>
            <progress value={delayedValue} max={progress.max}/>
            <span>{progress.current}/{progress.max} ({percentage}%)</span>
        </div>
    );
}

export default memo(AchievementGroupProgress);