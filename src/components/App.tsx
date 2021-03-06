import React, {FC} from 'react';
import AchievementStats from './AchievementStats';
import {useEffectOnce} from 'react-use';
import TranslationContext from './contexts/TranslationContext';
import AchievementDescription from "./achievement/AchievementDescription";
import {useScrollbarWidthCustomProperty} from '../hooks/useScrollbarWidthCustomProperty';
import AchievementRatingLink from "./AchievementRatingLink";
import AchievementGroupsContainer from "./achievement-group/AchievementGroupsContainer";
import {useAppDispatch} from "../hooks/useAppDispatch";
import AchievementModal from "./modals/AchievementDetailedModal";
import {useTranslation} from "../hooks/useTranslation";
import {initialAchievementsLoad} from "../redux/actions/initialAchievementsLoad";
import {SCROLLBAR_WIDTH_PROPERTY_NAME} from "../config";
import CompletedGroupModal from "./modals/CompletedGroupModal";

const App: FC = () => {
    const translation = useTranslation();
    const dispatch = useAppDispatch();

    useScrollbarWidthCustomProperty(SCROLLBAR_WIDTH_PROPERTY_NAME);

    useEffectOnce(() => {
        dispatch(initialAchievementsLoad());
    });

    return (
        <TranslationContext.Provider value={translation}>
            <div className='container'>
                <AchievementDescription/>
                <AchievementRatingLink/>
                <AchievementStats/>
                <AchievementGroupsContainer/>
            </div>
            <AchievementModal/>
            <CompletedGroupModal/>
        </TranslationContext.Provider>
    );
}

export default App;