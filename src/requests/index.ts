import {AchievementResponseData, AchievementWithUserData, UserData} from "../types";
import ky from 'ky';

export async function getUserData(): Promise<UserData> {
    return ky('/api/v2/users/data').json();
}

export async function getAchievementData(userId: number): Promise<AchievementResponseData> {
    return ky(`/api/v2/users/${userId}/achievements`).json();
}

export async function readAchievement(userId: number, achievement: AchievementWithUserData): Promise<void> {
    await ky.put(`/api/v2/users/${userId}/achievements/${achievement.id}/read`);
}