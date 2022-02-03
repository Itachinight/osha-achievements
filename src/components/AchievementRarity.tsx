import React, {FC, memo} from "react";
import {AchievementRarityLevel, AchievementWithUserData} from "../types";

type Props = Pick<AchievementWithUserData, 'rarity' | 'rarityLevel'>;

const AchievementRarity: FC<Props> = ({rarity, rarityLevel}) => {
    let rarityLevelText: string;
    let rarityLevelClass: string;

    switch (rarityLevel) {
        case AchievementRarityLevel.COMMON:
            rarityLevelText = 'Обычное';
            rarityLevelClass = 'achievement__rarity-level_common';
            break;
        case AchievementRarityLevel.RARE:
            rarityLevelText = 'Редкое';
            rarityLevelClass = 'achievement__rarity-level_rare';
            break;
        case AchievementRarityLevel.VERY_RARE:
            rarityLevelText = 'Очень редкое';
            rarityLevelClass = 'achievement__rarity-level_very-rare';
            break;
        case AchievementRarityLevel.LEGENDARY:
            rarityLevelText = 'Легендарное';
            rarityLevelClass = 'achievement__rarity-level_legendary';
            break;
    }

    return (
        <div className='achievement__rarity'>
            <p className={`achievement__rarity-level ${rarityLevelClass}`}>
                {rarityLevelText} достижение
            </p>
            <p className='achievement__rarity-text'>
                Его получили {rarity}% пользователей
            </p>
        </div>
    );
};

export default memo(AchievementRarity);