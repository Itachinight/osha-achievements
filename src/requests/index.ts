import {AchievementGroup} from "../types";

export async function getAchievementData(userId: number): Promise<AchievementGroup[]> {
    const achievements = [
        {
            id: 1,
            cost: 3,
            icon: 'https://online-shkola.com.ua/public/img/achievements/1.PNG',
            title: 'Никаких отсрочек',
            description: 'Ни одного продления срока выполнения творческого ДЗ в течение 6 месяцев. При условии, что выполнено хотя бы одно такое ДЗ.',
            isCompleted: false,
            isUnread: false,
            date: null,
            progress: {
                current: 1,
                max: 5
            },
            rarity: 3,
        },
        {
            id: 2,
            cost: 0,
            icon: 'https://online-shkola.com.ua/public/img/achievements/2.PNG',
            title: 'Успеть за 60 секунд',
            description: 'Пройти любой тест менее чем за 60 секунд.',
            isCompleted: false,
            isUnread: false,
            progress: {
                current: 41,
                max: 100
            },
            date: null,
            rarity: 7.6,
        },
        {
            id: 3,
            cost: 1,
            icon: 'https://online-shkola.com.ua/public/img/achievements/3.PNG',
            title: 'Кто понял жизнь, тот не спешит',
            description: 'Пройти любой тест более чем за 45 минут.',
            isCompleted: true,
            isUnread: false,
            date: '12.12.21 15:35',
            rarity: 1.7,
        },
        {
            id: 4,
            cost: 2,
            icon: 'https://online-shkola.com.ua/public/img/achievements/4.PNG',
            title: 'Возвращение блудного попугая',
            description: 'Повторно зачислиться в нашу школу после отчисления.',
            isCompleted: false,
            isUnread: false,
            date: '21.12.21 12:21',
            progress: {
                current: 8,
                max: 10
            },
            rarity: 0.4,
        },
        {
            id: 5,
            cost: 3,
            icon: 'https://online-shkola.com.ua/public/img/achievements/5.PNG',
            title: 'Повторение — мать учения',
            description: 'Зайти на страницу любого архивного урока.',
            isCompleted: true,
            isUnread: true,
            date: '12.01.21 16:04',
            rarity: 14.7,
        },
        {
            id: 6,
            cost: 1,
            icon: 'https://online-shkola.com.ua/public/img/achievements/6.PNG',
            title: 'В последний момент',
            description: 'Загрузить на проверку творческое ДЗ в последний день перед блокировкой при окончании семестра.',
            isCompleted: true,
            isUnread: true,
            date: '12.12.21 15:35',
            rarity: 3.2,
        },
        {
            id: 7,
            cost: 2,
            icon: 'https://online-shkola.com.ua/public/img/achievements/7.PNG',
            title: 'Близкое знакомство',
            description: 'Открыть в увеличенном режиме фото учителя из галереи учителей или из чата.',
            isCompleted: false,
            isUnread: false,
            date: null,
            rarity: 53,
        },
        {
            id: 8,
            cost: 0,
            icon: 'https://online-shkola.com.ua/public/img/achievements/8.PNG',
            title: 'Новостная лента',
            description: 'Прочитать любую новость на сайте.',
            isCompleted: true,
            isUnread: false,
            date: '11.01.22 15:19',
            rarity: 73.1,
        },
        {
            id: 9,
            cost: 1,
            icon: 'https://online-shkola.com.ua/public/img/achievements/9.PNG',
            title: 'Но они же перемешивались',
            description: '3 раза открыть или обновить один и тот же тест.',
            isCompleted: true,
            isUnread: true,
            date: '12.11.21 10:21',
            rarity: 28.2,
        },
        {
            id: 10,
            cost: 3,
            icon: 'https://online-shkola.com.ua/public/img/achievements/10.PNG',
            title: 'Улыбочку',
            description: 'Отправить смайл или стикер в сообщении.',
            isCompleted: true,
            isUnread: false,
            date: '30.12.21 18:16',
            rarity: 17,
        },
        {
            id: 11,
            cost: 2,
            icon: 'https://online-shkola.com.ua/public/img/achievements/11.PNG',
            title: 'Совершенство',
            description: 'Пройти тренировочный тест и выполнить ДЗ того же урока на максимальный балл.',
            isCompleted: false,
            isUnread: false,
            date: null,
            rarity: 27.7,
        },
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