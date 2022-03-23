import React, {FC, memo} from "react";
import {useTranslationContext} from "../../hooks/useTranslationContext";

const AchievementDescription: FC = () => {
    const translation = useTranslationContext();

    return (
        <section className='achievement-page-description'>
            <div className='page-description'>
                <h3 className='page-description__title'>
                    {translation.whatIsAchievements}
                </h3>
                <div className='page-description__text'>
                    <p>{translation.whatIsAchievementsFull}</p>
                </div>
            </div>
        </section>
    );
};

export default memo(AchievementDescription);