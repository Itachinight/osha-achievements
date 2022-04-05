import React, {FC, memo} from 'react';
import {AchievementWithUserData} from '../../types';

type Props = Pick<AchievementWithUserData, 'iconWebp' | 'iconPng' | 'title' | 'hiddenIconWebp' | 'hiddenIconPng' | 'isCompleted'>;

const AchievementPicture: FC<Props> = (props) => {
    const {title, isCompleted, iconWebp, iconPng, hiddenIconWebp, hiddenIconPng} = props;

    return (
        <picture>
            <source srcSet={isCompleted ? iconWebp : hiddenIconWebp} type='image/webp'/>
            <img className='achievement__icon' src={isCompleted ? iconPng : hiddenIconPng} alt={title}/>
        </picture>
    );
};

export default memo(AchievementPicture);