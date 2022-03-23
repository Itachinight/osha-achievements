import React, {FC, memo} from 'react';
import Achievement from "../achievement/Achievement";
import {useSelector} from "react-redux";
import {lengthOfServiceAchievementSelector, platinumAchievementSelector} from "../../redux/selectors";
import SpecialGroupSkeleton from "../skeleton/SpecialGroupSkeleton";
import LengthOfServiceAchievement from "../achievement/LengthOfServiceAchievement";

const AchievementSpecialGroup: FC = () => {
    const platinum = useSelector(platinumAchievementSelector);
    const lengthOfService = useSelector(lengthOfServiceAchievementSelector);

    return (
        <section className='achievement-group achievement-group_no-card'>
            {platinum == null ?
                <SpecialGroupSkeleton/> :
                (
                    <div className='achievements-grid'>
                        <Achievement key={platinum.id} achievement={platinum} noCard/>
                        {lengthOfService != null &&
                            <LengthOfServiceAchievement achievement={lengthOfService}/>
                        }
                    </div>
                )
            }
        </section>
    );
};

export default memo(AchievementSpecialGroup);