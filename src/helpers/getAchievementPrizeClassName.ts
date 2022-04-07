import {AchievementCost, AchievementWithUserData} from '../types';

const baseClass = 'achievement__prize';

export function getAchievementPrizeClassName(achievement: AchievementWithUserData): string {
    switch (achievement.cost) {
        case AchievementCost.BRONZE:
            return baseClass + ' achievement__prize_bronze';
        case AchievementCost.SILVER:
            return baseClass + ' achievement__prize_silver';
        case AchievementCost.GOLDEN:
            return baseClass + ' achievement__prize_golden';
        case AchievementCost.RUBY:
            return baseClass + ' achievement__prize_ruby';
        case AchievementCost.PLATINUM:
            return baseClass + ' achievement__prize_platinum';
        default:
            return baseClass;
    }
}