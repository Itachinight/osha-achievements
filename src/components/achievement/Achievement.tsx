import React, {FC, memo, useCallback, useRef, useState} from 'react';
import {AchievementWithUserData} from '../../types';
import {getAchievementPrizeClassName} from "../../helpers/getAchievementPrizeClassName";
import AchievementProgress from "./AchievementProgress";
import AchievementDate from "./AchievementDate";
import {delay} from "../../helpers/delay";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {openModal} from "../../redux/slices/detailedAchievementModalSlice";
import AchievementPicture from "./AchievementPicture";
import {ACHIEVEMENT_CLICK_DELAY} from "../../config";
import {readAchievement} from "../../redux/actions/readAchievement";
import throttle from "lodash/throttle";
import SpecialAchievementPrizeElements from "./SpecialAchievementPrizeElements";

interface Props {
    achievement: AchievementWithUserData
    isSpecial?: boolean
}

const Achievement: FC<Props> = ({achievement, isSpecial = false}) => {
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement | null>(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        delay(() => setIsClicked(false), ACHIEVEMENT_CLICK_DELAY);

        const rect = ref.current!.getBoundingClientRect();

        delay(() => dispatch(openModal({activeAchievement: achievement, rect})), isSpecial ? 0 : ACHIEVEMENT_CLICK_DELAY);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const throttledAchievementRead = useCallback(
        throttle(() => dispatch(readAchievement(achievement)), 500, {trailing: false}),
        [achievement]
    );

    const handleHover = achievement.isUnread ? throttledAchievementRead : undefined;

    const isCompleted = isSpecial ? Boolean(achievement.progress?.current) : achievement.isCompleted;

    const achievementClassName = ['achievement'];

    if (isSpecial) {
        achievementClassName.push('achievement_no-card');
    }

    if (!isCompleted) {
        achievementClassName.push('achievement_greyscale');
    }

    if (isCompleted && achievement.isUnread) {
        achievementClassName.push('achievement_highlight');
    }

    if (isClicked) {
        achievementClassName.push('achievement_clicked');
    }

    return (
        <div ref={ref} className='perspective-card' onMouseOver={handleHover}>
            <div className={achievementClassName.join(' ')} onClick={handleClick}>
                <div className='achievement__front-face'>
                    <div className='achievement__body'>
                        <AchievementPicture
                            title={achievement.title}
                            iconPng={isCompleted ? achievement.iconPng : achievement.hiddenIconPng}
                            iconWebp={isCompleted ? achievement.iconWebp : achievement.hiddenIconWebp}
                        />
                        <h3 className='achievement__title'>
                            {achievement.title}
                        </h3>
                        {achievement.progress != null && !isSpecial &&
                            <AchievementProgress progress={achievement.progress}/>
                        }
                        <div className='achievement__description'>
                            {achievement.description}
                        </div>
                    </div>
                    <div className='achievement__footer'>
                        {achievement.date != null && <AchievementDate date={achievement.date}/>}
                        {isSpecial ?
                            <SpecialAchievementPrizeElements achievement={achievement}/> :
                            <i className={getAchievementPrizeClassName(achievement)}/>
                        }
                    </div>
                </div>
                {!isSpecial && <div className='achievement__back-face'>{achievement.description}</div>}
            </div>
        </div>
    );
};

export default memo(Achievement);