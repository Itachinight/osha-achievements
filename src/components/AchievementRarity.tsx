import React, {FC, memo} from "react";
import {AchievementWithUserData} from "../types";

type Props = Pick<AchievementWithUserData, 'rarity'>;

const AchievementRarity: FC<Props> = ({rarity}) => {
    return (
        <div className='achievement__rarity'>
            Это достижение получили {rarity}% пользователей
        </div>
    );
};

export default memo(AchievementRarity);