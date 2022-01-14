export enum AchievementCost {
    BRONZE,
    SILVER,
    GOLDEN,
    RUBY,
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
}

export interface AchievementGroup {
    id: number
    title: string
    progress: Progress
    achievements: AchievementWithUserData[]
}