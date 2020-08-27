import React, { useContext, useEffect, useState } from 'react';
import { auth as firebaseAuth, firestore } from './firebase';
import {
    successfulSynchronizeMessage,
    emptyFieldWarningMessage,
    successfulAddEntryMessage,
    successfulLoginMessage,
    successfulRegisterMessage
} from './utils/variables';
import { showCalulatedCurrency } from './CurrencyContext';
import { toEntry } from './models';


interface Auth {
    loggedIn: boolean;
    welcome: boolean;
    userId?: string;
}

interface AuthInit {
    loading: boolean;
    auth?: Auth;
}

interface Currency {
    currency: string;
}

export const handleDeleteDocumentByEntryId = async (userId, documentId) => await firestore.collection('users').doc(userId)
    .collection('entries').doc(documentId).delete();

const handleDeleteDocument = async (userId, document) => await firestore.collection('users').doc(userId)
    .collection('entries').doc((toEntry(document).id)).delete();

const getUserId = async (email, password) => {
    let userID;
    await firebaseAuth.signInWithEmailAndPassword(email, password).then(ev => userID = ev.user.uid);
    return userID;
}

export const getUserSingleEntryById = (userId, documentId) => firestore.collection('users').doc(userId)
    .collection('entries').doc(documentId);

export const getUserEntriesByUserId = userId => firestore.collection('users').doc(userId)
    .collection('entries');

const getUserEntriesByEmailAndPassword = async (email, password) => {
    const userID = await getUserId(email, password);
    return firestore.collection('users').doc(userID).collection('entries');
}

const addSyncDataAndDeleteLocalEntries = (localUserEntry, syncUserEntry, localUserId) => localUserEntry.orderBy('date', 'desc')
    .onSnapshot(({ docs }) => docs.map(doc => {
        syncUserEntry.add({ ...doc.data() });
        return handleDeleteDocument(localUserId, doc);
    }));

const getLocalStorageData = () => JSON.parse(localStorage.getItem('data'));

const checkAuthErrorCode = code => {
    switch (code) {
        case "auth/wrong-password": return "Wprowadzone hasło jest nieprawidłowe.";
        case "auth/user-not-found": return "Nie ma takiego konta, lub zostało ono usunięte.";
        case "auth/invalid-email": return "Błędny adres email.";
        case "auth/weak-password": return "Hasło powinno mieć conajmniej 6 znaków.";
        case "auth/email-already-in-use": return "Adres email jest już przez kogoś zajęty.";
        case "auth/too-many-requests": return "Za dużo zapytań do bazy, proszę chwilkę poczekać."
        default: return "Nieznany błąd."
    }
}

export const handleSynchronizeData = async (syncAccountEmail, syncAccountPassword) => {
    try {
        const { email, password } = getLocalStorageData();

        const localUserEntries = await getUserEntriesByEmailAndPassword(email, password);
        const localUserId = await getUserId(email, password);
        const syncUserEntries = await getUserEntriesByEmailAndPassword(syncAccountEmail, syncAccountPassword);

        await addSyncDataAndDeleteLocalEntries(localUserEntries, syncUserEntries, localUserId);

        return { error: false, message: successfulSynchronizeMessage };
    } catch (error) {
        return { error: true, message: checkAuthErrorCode(error.code) };
    }
}


export const registerAndSynchronizeData = async (syncAccountEmail, syncAccountPassword) => {
    const message = await handleRegister(syncAccountEmail, syncAccountPassword);
    if (!message) return await handleSynchronizeData(syncAccountEmail, syncAccountPassword);
    else return message;
}

export const loggedWithoutRegister = async () => {
    const localData = window.localStorage;
    if (!localData.length) {
        const { email, password } = generateLoginValues(10);
        localStorage.setItem('data', JSON.stringify({ email, password }));
        localStorage.setItem('loggedWithoutRegister', 'true');
        handleRegister(email, password);
    }
    else {
        const { email, password } = getLocalStorageData();
        handleLogin(email, password);
        localStorage.setItem('loggedWithoutRegister', 'true');
    }
}

export const handleRegister = async (email, password) => {
    try {
        await firebaseAuth.createUserWithEmailAndPassword(email, password);
        return { error: false, message: successfulRegisterMessage };
    } catch (error) {
        return { error: true, message: checkAuthErrorCode(error.code) };
    }
};

export const handleLogin = async (email, password) => {
    try {
        localStorage.setItem('loggedWithoutRegister', 'false');
        await firebaseAuth.signInWithEmailAndPassword(email, password);
        return { error: false, message: successfulLoginMessage }
    }
    catch (error) {
        return { error: true, message: checkAuthErrorCode(error.code) };
    }
};

export const generateLoginValues = length => {
    let firstEmail = '';
    let secondEmail = '';
    let password = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        firstEmail += characters.charAt(Math.floor(Math.random() * characters.length));
        secondEmail += characters.charAt(Math.floor(Math.random() * characters.length));
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return {
        email: `${firstEmail}@${secondEmail}.com`,
        password
    };
}


export const CurrencyContext = React.createContext<Currency>({ currency: ' zł' });

export function useCurrency() {
    return useContext(CurrencyContext);
}

export const AuthContext = React.createContext<Auth>({ loggedIn: false, welcome: true });

export function useAuth(): Auth {
    return useContext(AuthContext);
}

export function useAuthInit(): AuthInit {
    const [authInit, setAuthInit] = useState<AuthInit>({ loading: true });
    useEffect(() => {
        return firebaseAuth.onAuthStateChanged(firebaseUser => {
            const auth = firebaseUser ?
                { loggedIn: true, welcome: false, userId: firebaseUser.uid } :
                { loggedIn: false, welcome: true };
            setAuthInit({ loading: false, auth });
        });
    }, []);
    return authInit;
}

const modifyEntryValues = data => {
    const { calcCurrency, currencyList, currency, amount, localCurrency, date, description, income, expense } = data;
    if (calcCurrency) {
        const amountResult = showCalulatedCurrency(currencyList, currency, amount, localCurrency);
        return { date, amount: amountResult, description, income, expense, currency: currency.symbol, code: currency.code };
    }
    else
        if (localCurrency.symbol) return { date, amount, description, income, expense, currency: localCurrency.symbol, code: localCurrency.code };
        else return { date, amount, description, income, expense, currency: currency.symbol, code: currency.code };
}

const handleAddEntry = async ({ entryData, data }) => await firestore.collection('users').doc(data.userId)
    .collection('entries').add(entryData);

const handleUpdateEntry = async ({ entryData, data }) => await firestore.collection('users').doc(data.userId)
    .collection('entries').doc(data.id).update(entryData);

const checkDataPropriety = data => {
    const { id } = data.data;
    if (id) handleUpdateEntry(data);
    else handleAddEntry(data);
}

export const checkDataProprietyAndAddEntry = async data => {
    const { amount, date, description, income, expense } = data;
    if (amount !== '' && date !== '' && description !== '' && (income || expense)) {
        const entryData = modifyEntryValues(data);
        checkDataPropriety({ entryData, data });

        return { error: false, message: successfulAddEntryMessage };
    }
    else return { error: true, message: emptyFieldWarningMessage };
}