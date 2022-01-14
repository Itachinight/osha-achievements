import React, {FC, memo} from 'react';
import {AchievementGroup} from '../types';
import {useDelayedNumber} from "../hooks/useDelayedNumber";

type Props = Pick<AchievementGroup, 'progress'>;

const AchievementGroupProgress: FC<Props> = ({progress}) => {
    const delayedCurrent = useDelayedNumber(progress.current);

    return (
        <div className='achievement-group__progress'>
            <progress value={delayedCurrent} max={progress.max}/>
            <span>{progress.current}/{progress.max}</span>
        </div>
    );
}

export default memo(AchievementGroupProgress);