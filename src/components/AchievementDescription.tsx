import React, {FC, memo, useContext} from "react";
import TranslationContext from "./contexts/TranslationContext";

const AchievementDescription: FC = () => {
    const translation = useContext(TranslationContext);

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