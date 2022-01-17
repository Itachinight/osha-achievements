import React, {forwardRef, useCallback, useState} from 'react';
import {AchievementGroup, AchievementWithUserData, ModalState} from '../types';
import Achievement from './Achievement';
import AchievementModal from './AchievementModal';
import {delay} from '../helpers/delay';

type Props = Pick<AchievementGroup, 'achievements'>

const AchievementsGrid = forwardRef<HTMLDivElement, Props>(({achievements}, ref) => {
    const [{rect, activeAchievement}, setModalState] = useState<ModalState>({activeAchievement: null, rect: null});

    const handleOpenModal = useCallback((activeAchievement: AchievementWithUserData, rect: DOMRect) => {
        delay(() => setModalState({activeAchievement, rect}), 225);
    }, []);

    const handleClose = useCallback(() => setModalState({activeAchievement: null, rect: null}), []);

    return (
        <>
            <div ref={ref} className='achievements-grid'>
                {achievements.map((achievement) => (
                    <Achievement key={achievement.id} achievement={achievement} onClick={handleOpenModal}/>
                ))}
            </div>
            <AchievementModal activeAchievement={activeAchievement} rect={rect} onClose={handleClose}/>
        </>
    );
});

export default AchievementsGrid;