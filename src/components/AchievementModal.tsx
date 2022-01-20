import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import ReactModal from 'react-modal';
import {raf} from '../helpers/raf';
import {AchievementWithUserData, NoneToVoidFunc} from '../types';
import Achievement from './Achievement';
import {ModalAnimation} from '../helpers/ModalAnimation';
import {delay} from '../helpers/delay';
import {isSmallWidth} from "../helpers/isSmallWidth";
import {MODAL_NEAR_CLOSE_DELAY} from "../config";
import {PREFERS_REDUCE_MOTION} from "../env";

interface Props {
    activeAchievement: AchievementWithUserData | null
    onClose: NoneToVoidFunc
    rect: DOMRect | null
}

enum ModalOpenCloseState {
    BeforeOpen,
    AfterOpen,
    BeforeClose,
    NearClose,
    Closed
}

const AchievementModal: FC<Props> = ({activeAchievement, onClose, rect}) => {
    const ref = useRef<HTMLElement | null>(null);
    const [modalOpenCloseState, setModalOpenCloseState] = useState<ModalOpenCloseState>(ModalOpenCloseState.Closed);

    useEffect(() => {
        if (rect == null || activeAchievement == null) {
            return;
        }

        raf(() => {
            ModalAnimation.animateOpen(ref.current!, rect, isSmallWidth(), () => {
                setModalOpenCloseState(ModalOpenCloseState.AfterOpen);
            });

            document.body.classList.add('scroll-locked');

            delay(() => setModalOpenCloseState(ModalOpenCloseState.BeforeOpen));
        });
    }, [activeAchievement, rect]);

    const handleClose = useCallback(() => {
        setModalOpenCloseState(ModalOpenCloseState.BeforeClose);

        const handleModalClose = () => {
            document.body.classList.remove('scroll-locked');
            onClose();
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
    }, [rect, onClose]);

    const className = ['achievement-modal'];

    if (modalOpenCloseState === ModalOpenCloseState.BeforeOpen) {
        className.push('achievement-modal_opening');
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
            shouldCloseOnOverlayClick={true}
        >
            {isOpen && <Achievement achievement={activeAchievement} bothFaces={true}/>}
        </ReactModal>
    )
};

export default AchievementModal;