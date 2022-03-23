import React, {FC, memo} from 'react';
import {useSelector} from "react-redux";
import {statsSelector} from "../redux/selectors";
import {useTranslationContext} from "../hooks/useTranslationContext";

const AchievementStats: FC = () => {
    const translation = useTranslationContext();
    const stats = useSelector(statsSelector);

    return (
        <section className='achievement-stats'>
            <div className='achievement-stats__points'>
                <span>{stats.totalPoints} {translation.points}</span>
                <div className='achievement-stats__points-help'>
                    <p>
                        <i className='achievement__prize achievement__prize_platinum'/> - 250 {translation.points}
                    </p>
                    <p>
                        <i className='achievement__prize achievement__prize_ruby'/> - 30 {translation.points}
                    </p>
                    <p>
                        <i className='achievement__prize achievement__prize_golden'/> - 30 {translation.points}
                    </p>
                    <p>
                        <i className='achievement__prize achievement__prize_silver'/> - 20 {translation.points}
                    </p>
                    <p>
                        <i className='achievement__prize achievement__prize_bronze'/> - 10 {translation.points}
                    </p>
                </div>
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