import {AchievementResponseData, UserData} from "../types";
import ky from 'ky';

export async function getUserData(): Promise<UserData> {
    return ky('/api/v2/users/data').json();
}

export async function getAchievementData(userId: number): Promise<AchievementResponseData> {
    return ky(`/api/v2/users/${userId}/achievements`).json();
}