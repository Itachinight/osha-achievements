import {AchievementCost, AchievementWithUserData} from '../types';

export function getAchievementPrizeClassName(achievement: AchievementWithUserData): string {
    switch (achievement.cost) {
        case AchievementCost.BRONZE:
            return 'achievement__prize_bronze';
        case AchievementCost.SILVER:
            return 'achievement__prize_silver';
        case AchievementCost.GOLDEN:
            return 'achievement__prize_golden';
        case AchievementCost.RUBY:
            return 'achievement__prize_ruby';
        case AchievementCost.PLATINUM:
            return 'achievement__prize_platinum';
    }
}