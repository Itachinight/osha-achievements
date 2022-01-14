import React, {FC, useEffect, useState} from 'react';
import {AchievementGroup as AchievementGroupType} from "../types";
import {getAchievementData} from "../requests";
import AchievementsHeader from "./AchievementsHeader";
import AchievementGroup from "./AchievementGroup";

const App: FC = () => {
    const [achievementGroups, setAchievementGroups] = useState<AchievementGroupType[]>([]);

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