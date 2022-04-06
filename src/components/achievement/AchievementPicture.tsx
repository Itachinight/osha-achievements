import React, {FC, memo} from 'react';

interface Props {
    title: string
    iconWebp: string
    iconPng: string
}

const AchievementPicture: FC<Props> = (props) => {
    const {title, iconWebp, iconPng} = props;

    return (
        <picture>
            <source srcSet={iconWebp} type='image/webp'/>
            <img className='achievement__icon' src={iconPng} alt={title}/>
        </picture>
    );
};

export default memo(AchievementPicture);