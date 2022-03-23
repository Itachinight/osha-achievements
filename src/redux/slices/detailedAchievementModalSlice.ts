import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AchievementWithUserData} from '../../types';

interface DetailedAchievementModalState {
    activeAchievement: AchievementWithUserData | null
    rect: DOMRect | null
}

const initialState: DetailedAchievementModalState = {
    activeAchievement: null,
    rect: null
}

const detailedAchievementModalSlice = createSlice({
    name: 'detailedAchievementModal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<{activeAchievement: AchievementWithUserData, rect: DOMRect}>) {
            state.activeAchievement = action.payload.activeAchievement;
            state.rect = action.payload.rect;
        },
        closeModal(state) {
            state.activeAchievement = null;
            state.rect = null;
        }
    }
});

export default detailedAchievementModalSlice;

export const detailedAchievementModalReducer = detailedAchievementModalSlice.reducer;
export const {openModal, closeModal} = detailedAchievementModalSlice.actions;