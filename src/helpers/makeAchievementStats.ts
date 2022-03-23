import {AchievementCost, AchievementResponseData, AchievementStats, AchievementWithUserData} from '../types';

export function makeAchievementStats(data: AchievementResponseData): Readonly<AchievementStats> {
    const stats: AchievementStats = {
        bronze: 0,
        silver: 0,
        golden: 0,
        ruby: 0,
        platinum: 0,
        groupsCompleted: 0,
        totalPoints: 0,
        progress: {
            current: 0,
            max: 0
        }
    };

    const processAchievement = (achievement: AchievementWithUserData): void => {
        stats.progress.max++;

        if (achievement.isCompleted) {
            stats.progress.current++;

            switch (achievement.cost) {
                case AchievementCost.BRONZE:
                    stats.bronze++;
                    stats.totalPoints += 10;
                    break;
                case AchievementCost.SILVER:
                    stats.silver++;
                    stats.totalPoints += 20;
                    break;
                case AchievementCost.GOLDEN:
                    stats.golden++;
                    stats.totalPoints += 30;
                    break;
                case AchievementCost.RUBY:
                    stats.ruby++;
                    stats.totalPoints += 30;
                    break;
                case AchievementCost.PLATINUM:
                    stats.platinum++;
                    stats.totalPoints += 250;
                    break;
            }
        }
    };

    for (const group of data.groups) {
        if (group.progress != null && group.progress.current === group.progress.max) {
            stats.groupsCompleted++;
        }

        group.achievements.forEach(processAchievement);
    }

    data.uncategorized.achievements.forEach(processAchievement);
    processAchievement(data.platinum);

    if (data.lengthOfService != null) {
        processAchievement(data.lengthOfService);
    }

    return stats;
}