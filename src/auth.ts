import React, { useContext, useEffect, useState } from 'react';
import { auth as firebaseAuth } from './firebase';

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