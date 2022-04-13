import React, {FC, memo} from 'react';
import {AchievementCost, AchievementWithUserData} from '../../types';
import {getAchievementPrizeClassName} from "../../helpers/getAchievementPrizeClassName";
import AchievementProgress from "./AchievementProgress";
import AchievementDate from "./AchievementDate";
import AchievementRarity from "./AchievementRarity";
import AchievementPicture from "./AchievementPicture";
import {useCounter} from "react-use";
import SpecialAchievementPrizeElements from "./SpecialAchievementPrizeElements";

interface Props {
    achievement: AchievementWithUserData
}

const AchievementModal: FC<Props> = ({achievement}) => {
    const [counter, {inc, reset}] = useCounter(0, 3);

    const handleTrophyClick = () => counter === 3 ? reset() : inc();

    const isSpecial = achievement.id === 0 || achievement.cost === AchievementCost.PLATINUM;
    const isCompleted = isSpecial ?
        Boolean(achievement.progress?.current) || counter === 3 :
        achievement.isCompleted || counter === 3;

    const achievementClassName = ['achievement'];

    if (!isCompleted) {
        achievementClassName.push('achievement_greyscale');
    }

    return (
        <div className={achievementClassName.join(' ')}>
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
                    {achievement.progress != null && !isSpecial &&
                        <AchievementProgress progress={achievement.progress}/>
                    }
                    <AchievementRarity rarity={achievement.rarity} rarityLevel={achievement.rarityLevel}/>
                </div>
                <div className='achievement__footer'>
                    {achievement.date != null && <AchievementDate date={achievement.date}/>}
                    {isSpecial ?
                        <SpecialAchievementPrizeElements achievement={achievement}/> :
                        <i onClick={handleTrophyClick} className={getAchievementPrizeClassName(achievement)}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default memo(AchievementModal);