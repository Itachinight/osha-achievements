import {useCookie} from "react-use";
import {Lang} from '../types';
import {useEffect, useState} from 'react';
import {ruTranslation, Translation, uaTranslation} from '../localization';

const getLang = (lang: Lang) => lang === 'ua' ? uaTranslation : ruTranslation;

export function useTranslation() {
    const [lang] = useCookie('lang') as [Lang, never, never];
    const [translation, setTranslation] = useState<Translation>(getLang(lang));

    useEffect(() => {
        setTranslation(getLang(lang));
    }, [lang]);

    return translation;
}