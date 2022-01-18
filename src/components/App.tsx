import React, {FC, useEffect, useState} from 'react';
import {AchievementGroup as AchievementGroupType} from "../types";
import {getAchievementData} from "../requests";
import AchievementsHeader from "./AchievementsHeader";
import AchievementGroup from "./AchievementGroup";
import {useScrollbarWidth} from "react-use";

const App: FC = () => {
    const [achievementGroups, setAchievementGroups] = useState<AchievementGroupType[]>([]);
    const scrollbarWidth = useScrollbarWidth();

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--scrollbar-width',
            scrollbarWidth != null ? `${scrollbarWidth}px` : '0'
        );
    }, [scrollbarWidth]);

    useEffect(() => {
        getAchievementData(NaN).then(setAchievementGroups);
    }, []);

    return (
        <div className='container'>
            <div className='achievements-container'>
                <AchievementsHeader/>
                {achievementGroups.map((group) => <AchievementGroup key={group.id} group={group}/>)}
            </div>
        </div>
    );
}

export default App;