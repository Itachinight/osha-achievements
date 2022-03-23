import {configureStore} from '@reduxjs/toolkit';
import {achievementsReducer} from './slices/achievementsSlice';
import {detailedAchievementModalReducer} from './slices/detailedAchievementModalSlice';
import {achievementStatsReducer} from "./slices/achievementStatsSlice";

export const store = configureStore({
    reducer: {
        achievements: achievementsReducer,
        achievementStats: achievementStatsReducer,
        detailedAchievementModal: detailedAchievementModalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;