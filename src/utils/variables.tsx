import iphone from '../img/iphone.png';
import piggyBudgetLogo from '../img/app_logo.png';
import planningSlide from '../img/planning3.png';
import controlSlide from '../img/control.png';
import calculateSlide from '../img/calculate.png';

export const dateTime = {
    'pl': {
        'monthShortNames': [
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
        'cancelText': 'ANULUJ',
        'doneText': 'WYBIERZ',
        'placeholder': 'Kiedy to było?',
    }
}

export const successfulSynchronizeMessage = 'Udało się przesłać dane, aby je zobaczyć, zaloguj się na swoje konto.';
export const successfulLoginMessage = 'Pomyślnie zalogowano!';
export const successfulRegisterMessage = 'Pomyślna rejestracja, dane zostały już przeniesione, zaloguj się na swoje konto.';
export const emptyFieldWarningMessage = 'Niektóre pola pozostały puste, pamiętaj by je uzupełnić.';
export const successfulAddEntryMessage = 'Dodaję Twój wpis do listy rekordów.';
export const loginMotto = 'Z łatwością kieruj swoimi finansami, planuj swoje wydatki dzięki jednej aplikacji.';
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
    description: 'Najnowsza aktualizacja: dzielenie się wydatkami i przychodami z innymi użytkownikami.'
}]

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
    photo: planningSlide,
    text: 'Zaplanuj swoje wydatki z naszą aplikacją.'
},
{
    key: "second_slide",
    photo: controlSlide,
    text: 'Kontroluj swoje finanse z dowolnego miejsca na świecie.'
},
{
    key: "third_slide",
    photo: calculateSlide,
    text: 'Nie martw się obliczeniami. Zrobimy to za Ciebie.'
},
{
    key: "fourth_slide",
    photo: piggyBudgetLogo,
    text: 'Zaczynamy !'
}]

export const emailjsData = {
    serviceID: "contact_service",
    templateID: "template_3s2apno",
    userID: 'user_a3rKwMsihXEmhFtHEqPZD'
}