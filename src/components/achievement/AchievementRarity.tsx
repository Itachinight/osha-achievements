import React, {FC, memo} from "react";
import {AchievementRarityLevel, AchievementWithUserData} from "../../types";
import {useTranslationContext} from "../../hooks/useTranslationContext";

type Props = Pick<AchievementWithUserData, 'rarity' | 'rarityLevel'>;

const AchievementRarity: FC<Props> = ({rarity, rarityLevel}) => {
    const translation = useTranslationContext();

    if (rarity === 0) {
        return (
            <div className='achievement__rarity'>
                <p className='achievement__rarity-level achievement__rarity-level_not-received'>
                    {translation.wasNotReceivedByAnybodyStart}
                </p>
                <p className='achievement__rarity-text'>
                    {translation.wasNotReceivedByAnybodyEnd}
                </p>
            </div>
        );
    }

    let rarityLevelText: string;
    const rarityLevelClass = ['achievement__rarity-level'];

    switch (rarityLevel) {
        case AchievementRarityLevel.COMMON:
            rarityLevelText = translation.common;
            rarityLevelClass.push('achievement__rarity-level_common');
            break;
        case AchievementRarityLevel.RARE:
            rarityLevelText = translation.rare;
            rarityLevelClass.push('achievement__rarity-level_rare');
            break;
        case AchievementRarityLevel.VERY_RARE:
            rarityLevelText = translation.veryRare;
            rarityLevelClass.push('achievement__rarity-level_very-rare');
            break;
        case AchievementRarityLevel.LEGENDARY:
            rarityLevelText = translation.legendary;
            rarityLevelClass.push('achievement__rarity-level_legendary');
            break;
    }

    return (
        <div className='achievement__rarity'>
            <p className={rarityLevelClass.join(' ')}>
                {rarityLevelText} {translation.achievement}
            </p>
            <p className='achievement__rarity-text'>
                {translation.wasReceived} {rarity}% {translation.users}
            </p>
        </div>
    );
};

export default memo(AchievementRarity);