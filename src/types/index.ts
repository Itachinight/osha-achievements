export type Lang = 'ru' | 'ua';

export enum AchievementCost {
    BRONZE,
    SILVER,
    GOLDEN,
    RUBY,
    PLATINUM
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
}

export interface AchievementGroup {
    id: number
    title: string
    isCompleteAnnounced: boolean
    progress: Progress
    achievements: AchievementWithUserData[]
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