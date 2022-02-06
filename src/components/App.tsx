import React, {FC, useState} from 'react';
import {
    AchievementGroup as AchievementGroupType,
    AchievementStats as AchievementStatsType, AchievementWithUserData,
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
import AchievementSpecialGroup from "./AchievementSpecialGroup";

const App: FC = () => {
    const [achievementGroups, setAchievementGroups] = useState<AchievementGroupType[]>([]);
    const [uncategorized, setUncategorized] = useState<AchievementGroupType | null>(null);
    const [achievementStats, setAchievementStats] = useState<AchievementStatsType | null>(null);
    const [translation, setTranslation] = useState<Translation>(ruTranslation);

    const [lengthOfService, setLengthOfService] = useState<AchievementWithUserData | null>(null);
    const [platinum, setPlatinum] = useState<AchievementWithUserData | null>(null);

    useScrollbarWidthCustomProperty();

    useEffectOnce(() => {
        getAchievementData(52).then(async (data) => {
            const {groups, platinum, lengthOfService, uncategorized, elapsed} = data;

            console.log(elapsed);

            setUncategorized(uncategorized);
            setAchievementGroups(groups);
            setAchievementStats(makeAchievementStats(data));
            setLengthOfService(lengthOfService);
            setPlatinum(platinum);
            setTranslation(getTranslation(Math.random() <= 0.5 ? 'ua' : 'ru'));
        });
    });

    return (
        <TranslationContext.Provider value={translation}>
            <div className='container'>
                <AchievementDescription/>
                <AchievementRatingLink/>
                {achievementStats && <AchievementStats stats={achievementStats}/>}
                {lengthOfService != null && platinum != null && <AchievementSpecialGroup lengthOfService={lengthOfService} platinum={platinum}/>}
                {achievementGroups.map((group) => <AchievementGroup key={group.id} group={group}/>)}
                {uncategorized != null && <AchievementGroup key={uncategorized.id} group={uncategorized}/>}
            </div>
        </TranslationContext.Provider>
    );
}

export default App;