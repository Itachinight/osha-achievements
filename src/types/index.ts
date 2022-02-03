export type Lang = 'ru' | 'ua';

export enum AchievementCost {
    BRONZE,
    SILVER,
    GOLDEN,
    RUBY,
    PLATINUM
}

export enum AchievementRarityLevel {
    COMMON,
    RARE,
    VERY_RARE,
    LEGENDARY,
}

interface Progress {
    current: number
    max: number
}

export interface AchievementWithUserData {
    id: number
    cost: AchievementCost
    icon: string
    title: string
    description: string
    isCompleted: boolean
    isUnread: boolean
    progress?: Progress
    date?: string | null
    rarity: number
    rarityLevel: AchievementRarityLevel
}

export interface AchievementGroup {
    id: number
    title: string
    isCompleteAnnounced: boolean
    progress: Progress
    achievements: AchievementWithUserData[]
}

export interface AchievementResponseData {
    groups: AchievementGroup[]
    uncategorized: AchievementGroup
    platinum: AchievementWithUserData
    elapsed: string
}

export type NoneToVoidFunc = () => void;

export interface ModalState {
    activeAchievement: AchievementWithUserData | null
    rect: DOMRect | null
}

export interface AchievementStats {
    bronze: number
    silver: number
    golden: number
    ruby: number
    platinum: number
    groupsCompleted: number
    totalPoints: number
    progress: Progress
}