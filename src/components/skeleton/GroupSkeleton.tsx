import React, {FC, memo} from 'react';
import {preventDefault} from '../../helpers/preventDefault';
import AchievementSkeleton from './AchievementSkeleton';

const GroupSkeleton: FC = () => {
    return (
        <section className='achievement-group'>
            <details className='achievement-group__spoiler' open>
                <summary onClick={preventDefault}>
                    <div className='achievement-group__header achievement-group__header_skeleton'/>
                    <hr className='achievement-group__line'/>
                </summary>
                <div className='achievements-grid'>
                    {Array.from(new Array(10).keys()).map((num) => <AchievementSkeleton key={num}/>)}
                </div>
            </details>
        </section>
    );
}

export default memo(GroupSkeleton);