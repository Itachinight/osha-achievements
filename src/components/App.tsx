import React, {FC, useState} from 'react';
import {
    AchievementGroup as AchievementGroupType,
    AchievementStats as AchievementStatsType,
} from "../types";
import {getAchievementData} from "../requests";
import AchievementStats from "./AchievementStats";
import AchievementGroup from "./AchievementGroup";
import {useEffectOnce} from "react-use";
import TranslationContext from './contexts/TranslationContext';
import {getTranslation, ruTranslation, Translation} from "../localization";
import AchievementDescription from "./AchievementDescription";
import {useScrollbarWidthCustomProperty} from "../hooks/useScrollbarWidthCustomProperty";
import {makeAchievementStats} from "../helpers/makeAchievementStats";
import AchievementRatingLink from "./AchievementRatingLink";

const App: FC = () => {
    const [achievementGroups, setAchievementGroups] = useState<AchievementGroupType[]>([]);
    const [uncategorized, setUncategorized] = useState<AchievementGroupType | null>(null);
    const [achievementStats, setAchievementStats] = useState<AchievementStatsType | null>(null);
    const [translation, setTranslation] = useState<Translation>(ruTranslation);

    useScrollbarWidthCustomProperty();

    useEffectOnce(() => {
        getAchievementData(52).then(async ({groups, platinum, uncategorized, elapsed}) => {
            console.log(elapsed);

            setUncategorized(uncategorized);
            setAchievementGroups(groups);
            setAchievementStats(makeAchievementStats(groups));
            setTranslation(getTranslation(Math.random() <= 0.5 ? 'ua' : 'ru'));
        });
    });

    return (
        <TranslationContext.Provider value={translation}>
            <div className='container'>
                <AchievementDescription/>
                <AchievementRatingLink/>
                {achievementStats && <AchievementStats stats={achievementStats}/>}
                {achievementGroups.map((group) => <AchievementGroup key={group.id} group={group}/>)}
                {uncategorized != null && <AchievementGroup key={uncategorized.id} group={uncategorized}/>}
            </div>
        </TranslationContext.Provider>
    );
}

export default App;