import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAchievementData, getUserData} from "../../requests";

export const initialAchievementsLoad = createAsyncThunk(
    'initialAchievementsLoad',
    async () => {
        const {id} = await getUserData();
        return getAchievementData(id);
    }
)