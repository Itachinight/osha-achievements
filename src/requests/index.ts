import {AchievementGroup} from "../types";

export async function getAchievementData(userId: number): Promise<AchievementGroup[]> {
    const achievements = [
        {
            id: 1,
            cost: 3,
            icon: 'https://online-shkola.test/public/img/achievements/1.png',
            title: 'Никаких отсрочек',
            description: 'Ни одного продления срока выполнения творческого ДЗ в течение 6 месяцев. При условии, что выполнено хотя бы одно такое ДЗ.',
            isCompleted: false,
            isUnread: false,
            date: null,
            progress: {
                current: 1,
                max: 5
            }
        },
        {
            id: 2,
            cost: 0,
            icon: 'https://online-shkola.test/public/img/achievements/2.png',
            title: 'Успеть за 60 секунд',
            description: 'Пройти любой тест менее чем за 60 секунд.',
            isCompleted: false,
            isUnread: false,
            progress: {
                current: 41,
                max: 100
            },
            date: null,

        },
        {
            id: 3,
            cost: 1,
            icon: 'https://online-shkola.test/public/img/achievements/3.png',
            title: 'Кто понял жизнь, тот не спешит',
            description: 'Пройти любой тест более чем за 45 минут.',
            isCompleted: true,
            isUnread: false,
            date: '12.12.21 15:35',
        },
        {
            id: 4,
            cost: 2,
            icon: 'https://online-shkola.test/public/img/achievements/4.png',
            title: 'Возвращение блудного попугая',
            description: 'Повторно зачислиться в нашу школу после отчисления.',
            isCompleted: false,
            isUnread: false,
            date: '21.12.21 12:21',
            progress: {
                current: 8,
                max: 10
            }
        },
        {
            id: 5,
            cost: 3,
            icon: 'https://online-shkola.test/public/img/achievements/5.png',
            title: 'Повторение — мать учения',
            description: 'Зайти на страницу любого архивного урока.',
            isCompleted: true,
            isUnread: true,
            date: '12.01.21 16:04',

        },
        {
            id: 6,
            cost: 1,
            icon: 'https://online-shkola.test/public/img/achievements/6.png',
            title: 'В последний момент',
            description: 'Загрузить на проверку творческое ДЗ в последний день перед блокировкой при окончании семестра.',
            isCompleted: true,
            isUnread: true,
            date: '12.12.21 15:35',
        },
        {
            id: 7,
            cost: 2,
            icon: 'https://online-shkola.test/public/img/achievements/7.png',
            title: 'Близкое знакомство',
            description: 'Открыть в увеличенном режиме фото учителя из галереи учителей или из чата.',
            isCompleted: false,
            isUnread: false,
            date: '21.12.21 12:21',
            progress: {
                current: 5,
                max: 10
            }
        }
    ];

    return [
        {
            id: 1,
            title: 'Исследователь интерфейса',
            achievements,
            progress: {
                current: 2,
                max: 7,
            }
        }
    ];
}