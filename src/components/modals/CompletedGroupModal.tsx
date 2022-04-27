import React, {FC, memo} from "react";
import ReactModal from "react-modal";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {completedGroupRead} from "../../redux/actions/completedGroupRead";
import {useToggle} from "react-use";
import {useTranslation} from "../../hooks/useTranslation";
import {groupsToAnnounceSelector} from "../../redux/selectors";

const CompletedGroupModal: FC = () => {
    const groupsToAnnounce = useSelector(groupsToAnnounceSelector);
    const dispatch = useAppDispatch();

    const translation = useTranslation();

    const [isOpen, toggleOpen] = useToggle(true);

    const srcWebp = '/public/img/achievements/group.webp';
    const srcPng = '/public/img/achievements/group.png';

    const groupTitles = groupsToAnnounce?.map(({title}) => title);

    let text = '';

    if (groupTitles != null) {
        if (groupTitles.length === 1) {
            text = `${translation.groupCompletedSingular} «${groupTitles[0]}»`;
        } else if (groupTitles.length > 1) {
            text = `${translation.groupCompletedPlural} ${groupTitles.map((title) => `«${title}»`).join(', ')}`;
        }
    }

    return (
        <ReactModal
            bodyOpenClassName={null}
            className={{
                base: 'completed-group-modal',
                beforeClose: 'completed-group-modal_closing',
                afterOpen: 'completed-group-modal_opened',
            }}
            closeTimeoutMS={400}
            isOpen={isOpen && groupsToAnnounce != null && groupsToAnnounce.length > 0}
            portalClassName='achievement-modal__portal'
            overlayClassName='achievement-modal__overlay'
            onRequestClose={toggleOpen}
            onAfterClose={() => dispatch(completedGroupRead())}
        >
            <picture>
                <source srcSet={srcWebp} type='image/webp'/>
                <img className='completed-group-modal__icon' src={srcPng} alt='icon'/>
            </picture>
            <p className='completed-group-modal__text'>
                {text}
            </p>
        </ReactModal>
    );
};

export default memo(CompletedGroupModal);