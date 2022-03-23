import React, {FC, memo} from 'react';
import {useTranslationContext} from "../hooks/useTranslationContext";

const AchievementRatingLink: FC = () => {
    const translation = useTranslationContext();

    // noinspection HtmlUnknownTarget
    return (
        <section className='achievement-rating-link'>
            <a href='/achievement_rating' className="btn btn--large btn--underline" target='_blank' rel='noreferrer noopener'>
                <span>
                    <span>{translation.goToRating}</span>
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                        <path d="M14 9V3L22 12L14 21V15C8.44 15 4.78 17.03 2 21C3.11 15.33 6.22 10.13 14 9Z"/>
                    </svg>
                </span>
            </a>
        </section>
    );
}

export default memo(AchievementRatingLink);