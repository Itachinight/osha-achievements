import React, {FC, useEffect, useState} from 'react';
import {AchievementGroup as AchievementGroupType, AchievementStats as AchievementStatsType} from "../types";
import {getAchievementData} from "../requests";
import AchievementStats from "./AchievementStats";
import AchievementGroup from "./AchievementGroup";
import {useEffectOnce, useScrollbarWidth} from "react-use";

const App: FC = () => {
    const [achievementGroups, setAchievementGroups] = useState<AchievementGroupType[]>([]);
    const [achievementStats, setAchievementStats] = useState<AchievementStatsType | null>(null);
    const scrollbarWidth = useScrollbarWidth();

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--scrollbar-width',
            scrollbarWidth != null ? `${scrollbarWidth}px` : '0'
        );
    }, [scrollbarWidth]);

    useEffectOnce(() => {
        getAchievementData(NaN).then(async (groups) => {
            setAchievementGroups(groups);
            setAchievementStats({
                bronze: 3,
                silver: 1,
                golden: 4,
                ruby: 2,
                platinum: 0,
                totalPoints: 180,
                progress: {
                    current: 6,
                    max: 135
                }
            });
        });
    });

    return (
        <div className='container'>
            {achievementStats && <AchievementStats stats={achievementStats}/>}
            {achievementGroups.map((group) => <AchievementGroup key={group.id} group={group}/>)}
        </div>
    );
}

export default App;