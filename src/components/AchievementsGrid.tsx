import React, {FC} from "react";
import {AchievementWithUserData} from "../types";
import Achievement from "./Achievement";

interface Props {
    achievements: AchievementWithUserData[]
}

const AchievementsGrid: FC<Props> = ({achievements}) => {
    return (
        <div className='achievements-grid'>
            {achievements.map((achievement) => <Achievement key={achievement.id} achievement={achievement}/>)}
        </div>
    );
};

export default AchievementsGrid;