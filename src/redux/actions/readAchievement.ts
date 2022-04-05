import {createAsyncThunk} from '@reduxjs/toolkit';
import {readAchievement as readAchievementRequest} from "../../requests";
import {AchievementWithUserData, UserData} from "../../types";

export const readAchievement = createAsyncThunk(
    'readAchievement',
    async (achievement: AchievementWithUserData, thunkApi): Promise<AchievementWithUserData> => {
        // @ts-ignore
        const state: {achievements: {userData: UserData | null}} = thunkApi.getState();
        const {userData} = state.achievements;

        if (userData == null) {
            throw new Error();
        }

        await readAchievementRequest(userData.id, achievement);

        return achievement;
    }
)