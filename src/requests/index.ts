import {AchievementGroup} from "../types";

export async function getAchievementData(userId: number): Promise<AchievementGroup[]> {
    const achievements = [
        {
            id: 1,
            cost: 3,
            icon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/594650/1fecf31652701981199ab63ffb0eef1aa65335d3.jpg',
            title: 'Ясновидящий',
            description: 'Найдите и устраните Босса без подсказок.',
            isCompleted: false,
            isUnread: false,
            date: null,
        },
        {
            id: 2,
            cost: 0,
            icon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/444090/a698eb124ba35920894e068d6c6ef31361f616b4.jpg',
            title: 'Охотник за головами',
            description: 'Убейте 100 вражеских Охотников выстрелом в голову.',
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
            icon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/578080/b534a3173fe847ae350ea5fb834a76a470702951.jpg',
            title: 'Давайте жить дружно',
            description: 'Войти в десятку лучших, никого не убив.',
            isCompleted: true,
            isUnread: false,
            date: '12.12.21 15:35',
        },
        {
            id: 4,
            cost: 2,
            icon: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/578080/6a9fb182488b7ecd8014543a65ac9fc9191b6367.jpg',
            title: 'Теперь-то я готов воевать!',
            description: 'Экипировать шлем 3-го уровня, военный жилет и рюкзак 3-го уровня в 10 матчах.',
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
            icon: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/252490/843a3897267256b31881b3579afa1b54bdb361c4.jpg',
            title: 'Папарацци',
            description: 'Сделайте фото другого игрока.',
            isCompleted: true,
            isUnread: true,
            date: '12.01.21 16:04',

        },
        {
            id: 6,
            cost: 1,
            icon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/444090/53b42d551effbac743d7952772f4f953861f4cb6.jpg',
            title: 'Хорошее обучение',
            description: 'Пройти обучение Paladins.',
            isCompleted: true,
            isUnread: true,
            date: '12.12.21 15:35',
        },
        {
            id: 7,
            cost: 2,
            icon: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/444090/3274afb0f20d259cb20c90770bc2ea2e0bd038e4.jpg',
            title: 'Отличный коллекционер',
            description: 'Открыть 10 карт.',
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