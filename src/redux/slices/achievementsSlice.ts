import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AchievementGroup, AchievementWithUserData} from '../../types';
import {initialAchievementsLoad} from "../actions/initialAchievementsLoad";

interface AchievementsSliceState {
    groups: AchievementGroup[]
    uncategorized: AchievementGroup | null
    platinum: AchievementWithUserData | null
    lengthOfService: AchievementWithUserData | null
}

const initialState: AchievementsSliceState = {
    groups: [],
    uncategorized: null,
    platinum: null,
    lengthOfService: null,
}

const achievementsSlice = createSlice({
    name: 'achievements',
    initialState,
    reducers: {
        readAchievement(state, action: PayloadAction<AchievementWithUserData>) {
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(initialAchievementsLoad.fulfilled, (state, action) => {
            const {groups, uncategorized, platinum, lengthOfService} = action.payload;

            state.groups = groups;
            state.uncategorized = uncategorized;
            state.platinum = platinum;
            state.lengthOfService = lengthOfService;
        });
    },
});

export default achievementsSlice;

export const achievementsReducer = achievementsSlice.reducer;
export const {readAchievement} = achievementsSlice.actions;