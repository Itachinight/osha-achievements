import {Lang} from '../types';

export const ruTranslation = {
    goToRating: 'Перейти в рейтинг',
    points: 'очков',
    receivedTrophies: 'Полученные награды',
    whatIsAchievements: 'Что такое достижения (ачивки) ?',
    whatIsAchievementsFull: 'В процессе обучения и исследования сайта школы вам будут вручаться ачивки за выполнение определенных условий. Сами достижения поделены на типы по уровням сложности получения: золотые, серебряные и бронзовые, а также некоторые уникальные ачивки имеют рубиновый уровень. Некоторые ачивки являются секретными и узнать условия их получения до того, как они будут получены, нельзя. За получение каждого достижения начисляется определенное количество очков, они накапливаются, и по общим набранным очкам все ученики, которые зачислены в «Альтернативу», попадают в рейтинг достижений и могут соревноваться с остальными учениками школы. Большинство ачивок группируются в челленджи, при прохождении которых ученики получают дополнительные очки. При получении всех челленджей ученик получает самую высшую ачивку платинового уровня.',
};

export const uaTranslation = {
    goToRating: 'Перейти до рейтингу',
    points: 'балів',
    receivedTrophies: 'Отримані нагороди',
    whatIsAchievements: 'Що таке досягнення (ачівки) ?',
    whatIsAchievementsFull: 'У процесі навчання та дослідження сайту школи вам вручатимуться ачівки за виконання певних умов. Самі досягнення поділені на типи за рівнями складності одержання: золоті, срібні та бронзові, а також деякі унікальні ачівки мають рубіновий рівень. Деякі ачівки є секретними і дізнатися про умови їх отримання до того, як вони будуть отримані, не можна. За отримання кожного досягнення нараховується певна кількість очок, вони накопичуються, і за загальними набраним очками усі учні, які зараховані до «Альтернативи», потрапляють до рейтингу досягнень і можуть змагатися з іншими учнями школи. Більшість ачівок об’єднуються в челенджі, при проходженні яких учні отримують додаткові очки. При виконанні всіх челенджів учень отримує найвищу ачивку платинового рівня.',
};

export const getTranslation = (lang: Lang) => lang === 'ua' ? uaTranslation : ruTranslation;
export type Translation = ReturnType<typeof getTranslation>;