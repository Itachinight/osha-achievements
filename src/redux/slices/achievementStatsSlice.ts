import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AchievementResponseData, AchievementStats} from '../../types';
import {makeAchievementStats} from "../../helpers/makeAchievementStats";

const initialState: AchievementStats = {
    bronze: 0,
    silver: 0,
    golden: 0,
    ruby: 0,
    platinum: 0,
    groupsCompleted: 0,
    totalPoints: 0,
    progress: {
        current: 0,
        max: 0,
    }
}

const achievementStatsSlice = createSlice({
    name: 'achievementStats',
    initialState,
    reducers: {
        calculateStats(state, action: PayloadAction<AchievementResponseData>) {
            return makeAchievementStats(action.payload);
        }
    }
});

export default achievementStatsSlice;

export const achievementStatsReducer = achievementStatsSlice.reducer;
export const {calculateStats} = achievementStatsSlice.actions;