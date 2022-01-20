import React, {FC, memo} from 'react';
import {AchievementStats as AchievementStatsType} from '../types';

interface Props {
    stats: AchievementStatsType
}

const AchievementStats: FC<Props> = ({stats}) => {
    return (
        <section className='achievement-stats'>
            <div className='achievement-stats__points'>
                {stats.totalPoints} баллов
            </div>
            <div className='achievement-stats__trophies'>
                <h4>Полученные награды</h4>
                <div>
                    <div className='achievement-trophy'>
                        <i className='achievement-trophy__image achievement-trophy__image_platinum'/>
                        <span className='achievement-trophy__count'>{stats.platinum}</span>
                    </div>
                    <div className='achievement-trophy'>
                        <i className='achievement-trophy__image achievement-trophy__image_ruby'/>
                        <span className='achievement-trophy__count'>{stats.ruby}</span>
                    </div>
                    <div className='achievement-trophy'>
                        <i className='achievement-trophy__image achievement-trophy__image_golden'/>
                        <span className='achievement-trophy__count'>{stats.golden}</span>
                    </div>
                    <div className='achievement-trophy'>
                        <i className='achievement-trophy__image achievement-trophy__image_silver'/>
                        <span className='achievement-trophy__count'>{stats.silver}</span>
                    </div>
                    <div className='achievement-trophy'>
                        <i className='achievement-trophy__image achievement-trophy__image_bronze'/>
                        <span className='achievement-trophy__count'>{stats.bronze}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(AchievementStats);