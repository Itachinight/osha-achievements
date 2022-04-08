import {RootState} from '../index';

export const statsSelector = (state: RootState) => state.achievements.stats;
export const achievementGroupsSelector = (state: RootState) => state.achievements.groups;
export const uncategorizedGroupSelector = (state: RootState) => state.achievements.uncategorized;
export const platinumAchievementSelector = (state: RootState) => state.achievements.platinum;
export const lengthOfServiceAchievementSelector = (state: RootState) => state.achievements.lengthOfService;
export const modalActiveAchievementSelector = (state: RootState) => state.detailedAchievementModal.activeAchievement;
export const modalRectSelector = (state: RootState) => state.detailedAchievementModal.rect;