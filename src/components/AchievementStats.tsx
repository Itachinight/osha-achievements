import React, {FC, memo, useContext} from 'react';
import {AchievementStats as AchievementStatsType} from '../types';
import TranslationContext from "./contexts/TranslationContext";

interface Props {
    stats: AchievementStatsType
}

const AchievementStats: FC<Props> = ({stats}) => {
    const translation = useContext(TranslationContext);

    return (
        <section className='achievement-stats'>
            <div className='achievement-stats__points'>
                {stats.totalPoints} {translation.points}
            </div>
            <div className='achievement-stats__trophies'>
                <h4>{translation.receivedTrophies}</h4>
                <div>
                    <div className='achievement-trophy'>
                        <i className='achievement-trophy__image achievement-trophy__image_platinum' data-tooltip={`250 ${translation.points}`}/>
                        <span className='achievement-trophy__count'>{stats.platinum}</span>
                    </div>
                    <div className='achievement-trophy'>
                        <i className='achievement-trophy__image achievement-trophy__image_ruby' data-tooltip={`30 ${translation.points}`}/>
                        <span className='achievement-trophy__count'>{stats.ruby}</span>
                    </div>
                    <div className='achievement-trophy'>
                        <i className='achievement-trophy__image achievement-trophy__image_golden' data-tooltip={`30 ${translation.points}`}/>
                        <span className='achievement-trophy__count'>{stats.golden}</span>
                    </div>
                    <div className='achievement-trophy'>
                        <i className='achievement-trophy__image achievement-trophy__image_silver' data-tooltip={`20 ${translation.points}`}/>
                        <span className='achievement-trophy__count'>{stats.silver}</span>
                    </div>
                    <div className='achievement-trophy'>
                        <i className='achievement-trophy__image achievement-trophy__image_bronze' data-tooltip={`10 ${translation.points}`}/>
                        <span className='achievement-trophy__count'>{stats.bronze}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(AchievementStats);