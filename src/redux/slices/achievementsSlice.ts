import {createSlice} from "@reduxjs/toolkit";
import {AchievementGroup, AchievementWithUserData, UserData} from '../../types';
import {initialAchievementsLoad} from "../actions/initialAchievementsLoad";
import {readAchievement as readAchievementAction} from "../actions/readAchievement";

interface AchievementsSliceState {
    groups: AchievementGroup[]
    uncategorized: AchievementGroup | null
    platinum: AchievementWithUserData | null
    lengthOfService: AchievementWithUserData | null
    userData: UserData | null
}

const initialState: AchievementsSliceState = {
    groups: [],
    uncategorized: null,
    platinum: null,
    lengthOfService: null,
    userData: null,
}

const achievementsSlice = createSlice({
    name: 'achievements',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initialAchievementsLoad.fulfilled, (state, action) => {
            const {groups, uncategorized, platinum, lengthOfService} = action.payload.achievementData;
            const {userData} = action.payload;

            state.groups = groups;
            state.uncategorized = uncategorized;
            state.platinum = platinum;
            state.lengthOfService = lengthOfService;
            state.userData = userData;
        });

        builder.addCase(readAchievementAction.fulfilled, (state, action) => {
            const targetAchievement = action.payload;

            let groups = [...state.groups];

            if (state.uncategorized) {
                groups.push(state.uncategorized);
            }

            for (const group of groups) {
                const achievement = group.achievements.find((achievement) => achievement.id === targetAchievement.id);

                if (achievement) {
                    achievement.isUnread = false;
                    break;
                }
            }

            for (const uniqueAchievement of [state.platinum, state.lengthOfService]) {
                if (uniqueAchievement != null && uniqueAchievement.id === targetAchievement.id) {
                    uniqueAchievement.isUnread = false;
                    break;
                }
            }
        });
    },
});

export default achievementsSlice;

export const achievementsReducer = achievementsSlice.reducer;