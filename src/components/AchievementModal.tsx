import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import ReactModal from 'react-modal';
import {raf} from '../helpers/raf';
import {AchievementWithUserData, NoneToVoidFunc} from '../types';
import Achievement from './Achievement';
import {ModalAnimation} from '../helpers/ModalAnimation';
import {delay} from '../helpers/delay';
import {isSmallWidth} from "../helpers/isSmallWidth";

interface Props {
    activeAchievement: AchievementWithUserData | null
    onClose: NoneToVoidFunc
    rect: DOMRect | null
}

enum ModalOpenCloseState {
    BeforeOpen,
    AfterOpen,
    BeforeClose,
    AfterClose
}

const AchievementModal: FC<Props> = ({activeAchievement, onClose, rect}) => {
    const [modalOpenCloseState, setModalOpenCloseState] = useState<ModalOpenCloseState>(ModalOpenCloseState.AfterClose);
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (rect == null || activeAchievement == null) {
            return;
        }

        raf(() => {
            const animation = ModalAnimation.animateOpen(ref.current!, rect, isSmallWidth());

            animation.addEventListener('finish', () => {
                setModalOpenCloseState(ModalOpenCloseState.AfterOpen);

                if ('commitStyles' in animation) {
                    animation.commitStyles();
                    animation.cancel();
                }
            });

            delay(() => setModalOpenCloseState(ModalOpenCloseState.BeforeOpen));
        });
    }, [activeAchievement, rect]);

    const handleClose = useCallback(() => {
        setModalOpenCloseState(ModalOpenCloseState.BeforeClose);

        const handleModalClose = () => {
            onClose();
            setModalOpenCloseState(ModalOpenCloseState.AfterClose);
        };

        if (rect == null) {
            handleModalClose();
        } else {
            ModalAnimation.animateClose(ref.current!, rect).addEventListener('finish', handleModalClose);
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

    return (
        <ReactModal
            bodyOpenClassName='scroll-locked'
            className={className.join(' ')}
            contentRef={(elem) => ref.current = elem}
            isOpen={activeAchievement != null}
            portalClassName='achievement-modal__portal'
            overlayClassName='achievement-modal__overlay'
            onRequestClose={handleClose}
            shouldCloseOnOverlayClick={true}
        >
            {activeAchievement && <Achievement achievement={activeAchievement}/>}
        </ReactModal>
    )
};

export default AchievementModal;