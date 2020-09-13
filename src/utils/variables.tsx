import iphone from '../img/iphone.png';
import piggyBudgetLogo from '../img/app_logo.png';

export const dateTime = {
    monthShortNames: [
        'styczeń',
        'luty',
        'marzec',
        'kwiecień',
        'maj',
        'czerwiec',
        'lipiec',
        'sierpień',
        'wrzesień',
        'październik',
        'listopad',
        'grudzień'
    ],
    cancelText: 'ANULUJ',
    doneText: 'WYBIERZ',
}

export const successfulSynchronizeMessage = 'Udało się przesłać dane, aby je zobaczyć, zaloguj się na swoje konto.';
export const successfulLoginMessage = 'Pomyślnie zalogowano!';
export const successfulRegisterMessage = 'Pomyślna rejestracja, za chwilkę nastąpi zalogowanie.'
export const emptyFieldWarningMessage = 'Niektóre pola pozostały puste, pamiętaj by je uzupełnić.';
export const successfulAddEntryMessage = 'Dodaję Twój wpis do listy rekordów.';
export const loginMotto = 'Z łatwością kieruj swoimi finansami, planuj swoje wydatki i to wszystko z jednego miejsca.';
export const appName = 'Piggy Budget';
export const appLogo = piggyBudgetLogo;
export const aboutMeDescription = 'To zdjęcie powyżej to ja. Lubię programować i tworzyć ciekawe aplikacje jak i strony internetowe. W wolnym czasie gram w bilarda i jeżdżę na rowerze.';

export const menuList = [{
    href: '/login',
    title: 'Zaloguj / Zarejestruj'
},
{
    href: './news',
    title: 'Nowości'
},
{
    href: './other_apps',
    title: 'Inne aplikacje'
},
{
    href: './privacy',
    title: 'Prywatność i bezpieczeństwo'
},
{
    href: './contact',
    title: 'Kontakt'
},
]

export const newsList = [{
    photo: iphone,
    title: 'Udostępnianie wydatków',
    description: 'W najbliższym czasie, aktualizacja aplikacji wprowadzi możliwość dzielenia się swoimi wydatkami/przychodami z innymi użytkownikami. Odbywać się to będzie poprzez zrobienie screenshota wpisów i przesłanie ich na messengera. A to już zaniedługo !!'
}]

export const otherAppList = [{
    title: 'Piggy Notes',
    href: 'www.konradduleba.pl',
    description: 'Piggy Notes - aplikacja z rodziny Piggy, do przechowywania swoich notatek. Już za niedługo w sklepie Play!'
},
]

export const privacyData = [{
    title: 'Prywatność',
    description: 'Twoje dane nie są nikomu udostępniane. Każdy Twój wpisany rekord jest tylko dostępny dla Ciebie'
},
{
    title: 'Bezpieczeństwo',
    description: 'Ciągle ulepszamy naszą aplikację, by zapewnić jej najwyższy stopień bezpieczeństwa, więc możesz czuć się spokojnie'
},
{
    title: 'Uprawnienia',
    description: 'Na telefonach mobilnych mogłeś zauważyć, że prosiliśmy o uprawnienia związane z internetem. Otóż by móc korzystać z aplikacji, potrzebny jest dostęp do internetu'
},]

export const slides = [{
    key: "first_slide",
    photo: piggyBudgetLogo,
    text: 'Zaplanuj swoje wydatki z naszą aplikacją.'
},
{
    key: "second_slide",
    photo: piggyBudgetLogo,
    text: 'Kontroluj swoje finanse z dowolnego miejsca.'
},
{
    key: "third_slide",
    photo: piggyBudgetLogo,
    text: 'Nie martw się obliczeniami. Zrobimy to wszystko za Ciebie.'
},
{
    key: "fourth_slide",
    photo: piggyBudgetLogo,
    text: 'Życzymy powodzenia !'
}]