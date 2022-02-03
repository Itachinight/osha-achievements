import {AchievementResponseData} from "../types";
import ky from 'ky';

export async function getAchievementData(userId: number): Promise<AchievementResponseData> {
    return ky(`/api/v2/users/${userId}/achievements`).json();
}