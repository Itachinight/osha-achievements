import React, {FC, memo, useCallback, useEffect, useRef, useState} from 'react';
import ReactModal from 'react-modal';
import {raf} from '../../helpers/raf';
import {ModalAnimation} from '../../helpers/ModalAnimation';
import {delay} from '../../helpers/delay';
import {isSmallWidth} from "../../helpers/isSmallWidth";
import {MODAL_NEAR_CLOSE_DELAY} from "../../config";
import {PREFERS_REDUCE_MOTION} from "../../env";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {closeModal} from "../../redux/slices/detailedAchievementModalSlice";
import {modalActiveAchievementSelector, modalRectSelector} from "../../redux/selectors";
import AchievementModal from "../achievement/AchievementModal";

enum ModalOpenCloseState {
    BeforeOpen,
    NearOpen,
    AfterOpen,
    BeforeClose,
    NearClose,
    Closed
}

const AchievementDetailedModal: FC = () => {
    const dispatch = useAppDispatch();

    const activeAchievement = useSelector(modalActiveAchievementSelector);
    const rect = useSelector(modalRectSelector);

    const ref = useRef<HTMLElement | null>(null);
    const [modalOpenCloseState, setModalOpenCloseState] = useState(ModalOpenCloseState.Closed);

    useEffect(() => {
        if (rect == null || activeAchievement == null) {
            return;
        }

        raf(() => {
            ModalAnimation.animateOpen(ref.current!, rect, isSmallWidth(), () => {
                setModalOpenCloseState(ModalOpenCloseState.NearOpen);
                delay(() => setModalOpenCloseState(ModalOpenCloseState.AfterOpen));
            });

            document.documentElement.classList.add('scroll-locked');

            delay(() => setModalOpenCloseState(ModalOpenCloseState.BeforeOpen));
        });
    }, [activeAchievement, rect]);

    const handleClose = useCallback(() => {
        setModalOpenCloseState(ModalOpenCloseState.BeforeClose);

        const handleModalClose = () => {
            document.documentElement.classList.remove('scroll-locked');
            dispatch(closeModal());
            setModalOpenCloseState(ModalOpenCloseState.Closed);
        };

        if (rect == null) {
            handleModalClose();
        } else {
            ModalAnimation.animateClose(ref.current!, rect, isSmallWidth(), handleModalClose);
        }

        if (!PREFERS_REDUCE_MOTION) {
            delay(() => setModalOpenCloseState(ModalOpenCloseState.NearClose), MODAL_NEAR_CLOSE_DELAY);
        }
    }, [rect, dispatch]);

    const className = ['achievement-modal'];

    if (modalOpenCloseState === ModalOpenCloseState.BeforeOpen) {
        className.push('achievement-modal_opening');
    }

    if (modalOpenCloseState === ModalOpenCloseState.NearOpen) {
        className.push('achievement-modal_near-opened');
    }

    if (modalOpenCloseState === ModalOpenCloseState.AfterOpen) {
        className.push('achievement-modal_opened');
    }

    if (modalOpenCloseState === ModalOpenCloseState.BeforeClose) {
        className.push('achievement-modal_closing');
    }

    if (modalOpenCloseState === ModalOpenCloseState.NearClose) {
        className.push('achievement-modal_near-closed');
    }

    const isOpen = activeAchievement != null;

    return (
        <ReactModal
            bodyOpenClassName={null}
            className={className.join(' ')}
            contentRef={(elem) => ref.current = elem}
            isOpen={isOpen}
            portalClassName='achievement-modal__portal'
            overlayClassName='achievement-modal__overlay'
            onRequestClose={handleClose}
        >
            {isOpen && <AchievementModal achievement={activeAchievement}/>}
        </ReactModal>
    )
};

export default memo(AchievementDetailedModal);