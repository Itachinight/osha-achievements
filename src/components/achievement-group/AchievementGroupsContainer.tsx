import React, {FC, memo} from 'react';
import AchievementSpecialGroup from "./AchievementSpecialGroup";
import AchievementGroup from "./AchievementGroup";
import {useSelector} from "react-redux";
import GroupSkeleton from "../skeleton/GroupSkeleton";
import {achievementGroupsSelector, uncategorizedGroupSelector} from "../../redux/selectors";

const AchievementGroupsContainer: FC = () => {
    const achievementGroups = useSelector(achievementGroupsSelector);
    const uncategorized = useSelector(uncategorizedGroupSelector);

    return (
        <>
            <AchievementSpecialGroup/>
            {achievementGroups.length > 0
                ? achievementGroups.map((group) => <AchievementGroup key={group.id} group={group}/>)
                : <GroupSkeleton/>
            }
            {uncategorized != null && <AchievementGroup key={uncategorized.id} group={uncategorized}/>}
        </>
    );
}

export default memo(AchievementGroupsContainer);