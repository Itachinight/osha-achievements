export type Lang = 'ru' | 'ua';

export enum UserLevel {
    Student = 1,
    Teacher = 2,
    Admin = 4
}

export enum EduType {
    NoEduType,
    MainEdu,
    AdditionalEdu,
    PartialEdu
}

export interface UserData {
    id: number
    level: UserLevel
    name: string
    surname: string
    patronymic: string
    class: number
    lang: Lang
    eduType: EduType
    isLocked: boolean
    isCourse: boolean
    paymentEndDate: string
    startLearningDate: string
}

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
    iconPng: string
    iconWebp: string
    hiddenIconPng: string
    hiddenIconWebp: string
    title: string
    description: string
    isSecret: boolean
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
    needToAnnounce: boolean
    progress?: Progress
    achievements: AchievementWithUserData[]
}

export interface AchievementResponseData {
    groups: AchievementGroup[]
    uncategorized: AchievementGroup
    platinum: AchievementWithUserData
    lengthOfService: AchievementWithUserData | null
    stats: AchievementStats
}

export type NoneToVoidFunc = () => void;

export interface AchievementStats {
    bronze: number
    silver: number
    golden: number
    groups: number
    ruby: number
    platinum: number
    points: number
}