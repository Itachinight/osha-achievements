import React, {FC, memo, useRef, useState} from 'react';
import {AchievementWithUserData} from '../../types';
import {getAchievementPrizeClassName} from "../../helpers/getAchievementPrizeClassName";
import AchievementProgress from "./AchievementProgress";
import AchievementDate from "./AchievementDate";
import {delay} from "../../helpers/delay";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {openModal} from "../../redux/slices/detailedAchievementModalSlice";
import AchievementPicture from "./AchievementPicture";
import {readAchievement} from "../../redux/slices/achievementsSlice";
import {ACHIEVEMENT_CLICK_DELAY} from "../../config";

interface Props {
    achievement: AchievementWithUserData
    noCard?: boolean
}

const Achievement: FC<Props> = ({achievement, noCard = false}) => {
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement | null>(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        delay(() => setIsClicked(false), ACHIEVEMENT_CLICK_DELAY);

        const rect = ref.current!.getBoundingClientRect();

        delay(() => dispatch(openModal({activeAchievement: achievement, rect})), noCard ? 0 : ACHIEVEMENT_CLICK_DELAY);
    };

    const handleHover = () => {
        if (!achievement.isUnread) {
            return;
        }

        delay(() => dispatch(readAchievement(achievement)), 500);
    };

    const achievementClassName = ['achievement'];

    if (noCard) {
        achievementClassName.push('achievement_no-card');
    }

    if (!achievement.isCompleted) {
        achievementClassName.push('achievement_greyscale');
    }

    if (achievement.isUnread) {
        achievementClassName.push('achievement_highlight');
    }

    if (isClicked) {
        achievementClassName.push('achievement_clicked');
    }

    const trophyClassName = ['achievement__prize', getAchievementPrizeClassName(achievement)];

    return (
        <div ref={ref} className='perspective-card' onMouseOver={handleHover}>
            <div className={achievementClassName.join(' ')} onClick={handleClick}>
                <div className='achievement__front-face'>
                    <div className='achievement__body'>
                        <AchievementPicture
                            title={achievement.title}
                            iconPng={achievement.iconPng}
                            iconWebp={achievement.iconWebp}
                            isCompleted={achievement.isCompleted}
                            hiddenIconPng={achievement.hiddenIconPng}
                            hiddenIconWebp={achievement.hiddenIconWebp}
                        />
                        <h3 className='achievement__title'>
                            {achievement.title}
                        </h3>
                        {achievement.progress != null && <AchievementProgress progress={achievement.progress}/>}
                        <div className='achievement__description'>
                            {achievement.description}
                        </div>
                    </div>
                    <div className='achievement__footer'>
                        {achievement.date != null && <AchievementDate date={achievement.date}/>}
                        <i className={trophyClassName.join(' ')}/>
                    </div>
                </div>
                {!noCard && <div className='achievement__back-face'>{achievement.description}</div>}
            </div>
        </div>
    );
};

export default memo(Achievement);