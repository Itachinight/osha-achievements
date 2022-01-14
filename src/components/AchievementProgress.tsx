import React, {FC, memo} from 'react';
import {AchievementWithUserData} from "../types";

type Props = Required<Pick<AchievementWithUserData, 'progress'>>;

const AchievementProgress: FC<Props> = ({progress}) => {
    return (
        <div className='achievement__progress'>
            <progress value={progress.current} max={progress.max}/>
        </div>
    );
};

export default memo(AchievementProgress);