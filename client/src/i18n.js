// https://react.i18next.com/ && https://dev.to/ksushiva/how-to-translate-your-react-js-app-with-i18next-12mn
import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import moment from 'moment';
// not like to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

i18n
    // load translation using xhr -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-xhr-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        // lng: 'en', // Caution !don't uses, lost user select language
        fallbackLng: ['en'],
        availableLanguages : ['en', 'es'],

        /// saveMissing causes err 405
        //saveMissing: true, // send not translated keys to endpoint

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
            format: (value, format, lng) => {
                if (value instanceof Date) return moment(value).format(format);
                return value;
            },//if the format is 'currentDate', then take its __value__ transfom it to a moment object, translate it to the current language and show it in Month DD, YYYY format.    
        }
    });

export default i18n;