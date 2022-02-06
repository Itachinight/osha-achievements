import React, {FC, memo} from 'react';
import {AchievementWithUserData} from "../types";
import Achievement from "./Achievement";

interface Props {
    lengthOfService: AchievementWithUserData
    platinum: AchievementWithUserData
}

const AchievementSpecialGroup: FC<Props> = ({lengthOfService, platinum}) => {
    return (
        <section className='achievement-group achievement-group_no-card'>
            <div  className='achievements-grid'>
                <Achievement key={platinum.id} achievement={platinum} noCard/>
                <Achievement key={lengthOfService.id} achievement={lengthOfService} noCard/>
            </div>
        </section>
    );
};

export default memo(AchievementSpecialGroup);