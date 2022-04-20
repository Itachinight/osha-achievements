import React, {FC, memo, useCallback, useRef, useState} from 'react';
import { useInView } from "react-cool-inview";
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
import {useSelector} from "react-redux";
import {queryAchievementIdSelector} from "../../redux/selectors";
import {useEffectOnce} from "react-use";

interface Props {
    achievement: AchievementWithUserData
    isSpecial?: boolean
}

const Achievement: FC<Props> = ({achievement, isSpecial = false}) => {
    const queryAchievementId = useSelector(queryAchievementIdSelector);
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement | null>(null);
    const [isClicked, setIsClicked] = useState(false);

    useEffectOnce(() => {
        if (queryAchievementId === achievement.id) {
            dispatch(readAchievement(achievement));
            delay(() => ref.current?.scrollIntoView({behavior: 'smooth', block: 'center'}), 500);
        }
    });

    const {observe, inView} = useInView<HTMLDivElement>({
        threshold: 0,
    });

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

    if (isCompleted && achievement.isUnread && inView) {
        achievementClassName.push('achievement_highlight');
    }

    if (isClicked) {
        achievementClassName.push('achievement_clicked');
    }

    return (
        <div className='perspective-card'
             onMouseOver={handleHover}
             ref={(elem) => {
                 observe(elem);
                 ref.current = elem;
             }}
        >
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