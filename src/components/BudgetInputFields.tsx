import React from 'react';
import { DatePicker } from '../components/DatePicker';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { showCalulatedCurrency } from '../utils/CurrencyContext';
import {
    IonList,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonActionSheet,
    IonText
} from '@ionic/react';

export const BudgetInputFields = ({ data }) => {
    const {
        type,
        date, setDate,
        description, setDescription,
        expense, handleExpense,
        income, handleIncome,
        calcCurrency, setCalcCurrency,
        amount, setAmount,
        showCurrencySheet, localCurrency, currencySheet, currencyOptions, currency, warningMessage, handleSave, currencyList } = data;
    return (
        <IonList className="add-entry_list">
            <DatePicker type='pl' value={date} onChangeFunction={setDate} />
            <IonItem lines="none">
                <IonInput value={amount} type="number" placeholder="Wpisz kwotę" required={true} className="input_cash"
                    onIonChange={event => setAmount(event.detail.value)}
                />
                <IonButton className="input_cash" onClick={() => showCurrencySheet(true)}>{localCurrency.symbol ? `Waluta - ${localCurrency.symbol}` : `Waluta - ${currency.symbol}`}</IonButton>
                <IonActionSheet
                    isOpen={currencySheet}
                    onDidDismiss={() => showCurrencySheet(false)}
                    buttons={currencyOptions}
                    cssClass='currency_class'
                >
                </IonActionSheet>
            </IonItem>
            {type === 'add' &&
                <>
                    {(localCurrency.symbol && amount) && <IonItem lines="none" className="calc-currency-container">
                        <IonText className="text">{`Czy chcesz przeliczyć ${amount} ${localCurrency.symbol} na (${showCalulatedCurrency(currencyList, currency, amount, localCurrency)}) ${currency.symbol}?`}</IonText>
                        {calcCurrency ? <FaToggleOn className={`calc-currency calc-currency-${calcCurrency}`} onClick={() => setCalcCurrency(false)} /> : <FaToggleOff className={`calc-currency calc-currency-${calcCurrency}`} onClick={() => setCalcCurrency(true)} />}
                    </IonItem>}
                </>
            }
            {type === 'edit' &&
                <>
                    {((localCurrency.symbol && amount) && localCurrency.symbol !== currency.symbol) && <IonItem lines="none" className="calc-currency-container">
                        <IonText className="text">{`Czy chcesz przeliczyć ${amount} ${localCurrency.symbol} na (${showCalulatedCurrency(currencyList, currency, amount, localCurrency)}) ${currency.symbol}?`}</IonText>
                        {calcCurrency ? <FaToggleOn className={`calc-currency calc-currency-${calcCurrency}`} onClick={() => setCalcCurrency(false)} /> : <FaToggleOff className={`calc-currency calc-currency-${calcCurrency}`} onClick={() => setCalcCurrency(true)} />}
                    </IonItem>}
                </>
            }

            <IonItem lines="none">
                <IonTextarea value={description} required={true} className="entry_input" placeholder="Opis"
                    onIonChange={event => setDescription(event.detail.value)} />
            </IonItem>
            <IonItem lines="none" className="last_entry">
                <IonButton onClick={handleIncome} className={`button ${income}`}>Przychód</IonButton>
                <p className="income_or_expense">Czy</p>
                <IonButton onClick={handleExpense} className={`button expense ${expense}`}>Wydatek</IonButton>
            </IonItem>
            {warningMessage && <p className={`error_message ${warningMessage.error}`}>{warningMessage.message}</p>}
            <IonButton onClick={handleSave} className="button_last">Dodaj</IonButton>
        </IonList>
    )
}