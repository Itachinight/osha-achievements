import React, {FC, memo, useCallback, useMemo, useRef, useState} from 'react';
import {AchievementWithUserData} from '../../types';
import {delay} from "../../helpers/delay";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {openModal} from "../../redux/slices/detailedAchievementModalSlice";
import AchievementPicture from "./AchievementPicture";
import {readAchievement} from "../../redux/actions/readAchievement";
import {ACHIEVEMENT_CLICK_DELAY} from "../../config";
import throttle from "lodash/throttle";

interface Props {
    achievement: AchievementWithUserData
}

const LengthOfServiceAchievement: FC<Props> = ({achievement}) => {
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement | null>(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        delay(() => setIsClicked(false), ACHIEVEMENT_CLICK_DELAY);

        const rect = ref.current!.getBoundingClientRect();

        delay(() => dispatch(openModal({activeAchievement: achievement, rect})));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const throttledAchievementRead = useCallback(
        throttle(() => dispatch(readAchievement(achievement)), 500, {trailing: false}),
        [achievement]
    );

    const handleHover = achievement.isUnread ? throttledAchievementRead : undefined;

    const achievementClassName = ['achievement', 'achievement_no-card'];

    if (!achievement.progress?.current) {
        achievementClassName.push('achievement_greyscale');
    }

    if (achievement.isUnread) {
        achievementClassName.push('achievement_highlight');
    }

    if (isClicked) {
        achievementClassName.push('achievement_clicked');
    }

    const prizeElements = useMemo(() => {
        const arr = [];

        const total = achievement.progress != null && achievement.progress.current > 0 ?
            achievement.progress.current :
            1;

        for (let i = 0; i < total; i++) {
            arr.push(<i className='achievement__prize achievement__prize_ruby' key={i}/>);
        }

        return arr;
    }, [achievement]);

    const isCompleted = Boolean(achievement.progress?.current);

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
                        <div className='achievement__description'>
                            {achievement.description}
                        </div>
                    </div>
                    <div className='achievement__footer'>
                        {prizeElements}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(LengthOfServiceAchievement);