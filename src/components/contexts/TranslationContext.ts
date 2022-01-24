import {Context, createContext} from 'react';
import {uaTranslation as defaultTranslation, Translation} from '../../localization';

const TranslationContext: Context<Translation> = createContext(defaultTranslation);

export default TranslationContext;