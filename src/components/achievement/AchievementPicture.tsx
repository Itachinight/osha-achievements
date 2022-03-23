import React, {FC, memo} from 'react';
import {AchievementWithUserData} from '../../types';

type Props = Pick<AchievementWithUserData, 'iconWebp' | 'iconPng' | 'title'>;

const AchievementPicture: FC<Props> = ({title, iconPng, iconWebp}) => {
    return (
        <picture>
            <source srcSet={iconWebp} type='image/webp'/>
            <img className='achievement__icon' src={iconPng} alt={title}/>
        </picture>
    );
};

export default memo(AchievementPicture);