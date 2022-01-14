import React, {FC} from "react";

const AchievementsHeader: FC = () => {
    return (
        <div className='achievements-header'>
            <div className="trophy trophy_platinum"/>
            <div className="trophy trophy_ruby"/>
            <div className="trophy trophy_golden"/>
            <div className="trophy trophy_silver"/>
            <div className="trophy trophy_bronze"/>
        </div>
    );
};

export default AchievementsHeader;