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
    const ref = useRef<HTMLElement | null>(null);
    const [modalOpenCloseState, setModalOpenCloseState] = useState<ModalOpenCloseState>(ModalOpenCloseState.AfterClose);

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

            document.body.classList.add('scroll-locked');

            delay(() => setModalOpenCloseState(ModalOpenCloseState.BeforeOpen));
        });
    }, [activeAchievement, rect]);

    const handleClose = useCallback(() => {
        setModalOpenCloseState(ModalOpenCloseState.BeforeClose);

        document.body.classList.remove('scroll-locked');

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
            {isOpen && <Achievement achievement={activeAchievement}/>}
        </ReactModal>
    )
};

export default AchievementModal;