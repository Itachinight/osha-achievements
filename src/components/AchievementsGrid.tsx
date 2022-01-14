import React, {forwardRef} from "react";
import {AchievementWithUserData} from "../types";
import Achievement from "./Achievement";

interface Props {
    achievements: AchievementWithUserData[]
}

const AchievementsGrid = forwardRef<HTMLDivElement, Props>(({achievements}, ref) => {
    return (
        <div ref={ref} className='achievements-grid'>
            {achievements.map((achievement) => <Achievement key={achievement.id} achievement={achievement}/>)}
        </div>
    );
});

export default AchievementsGrid;