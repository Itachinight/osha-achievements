import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAchievementData, getUserData} from "../../requests";

export const initialAchievementsLoad = createAsyncThunk(
    'initialAchievementsLoad',
    async () => {
        const userData = await getUserData();
        const achievementData = await getAchievementData(userData.id);

        return {achievementData, userData};
    }
)