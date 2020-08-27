import React from 'react';
import { IonItem, IonButton, IonIcon } from '@ionic/react';
import { formatDate } from '../date';

export const renderBudget = ({ nextIcon, currency, entries }) => {
    const modifiedTable = modifyEntries(entries);

    return (
        modifiedTable.map(entry =>
            <div key={entry.date}>
                <p className="home-page_date">{entry.date}</p>
                <ul>
                    {entry.utils.map(({ id, description, income, expense, amount, otherCurrency }) => <IonItem
                        lines="none"
                        key={id}
                        className="home-page_item_list ion-justify-content-between"
                        routerLink={`/my/entries/view/${id}`}>
                        <p className="home-page_description">{description}</p>
                        <div className="home-page_amount_container">
                            <p className={`home-page_income_${income} home-page_expense_${expense}`}>{amount}{otherCurrency ? otherCurrency : currency.symbol}</p>
                            <IonButton fill="clear" className="home-page_edit_icon">
                                <IonIcon icon={nextIcon} className='home-page_next_icon' />
                            </IonButton>
                        </div>
                    </IonItem>)}
                </ul>
            </div>
        )
    )
}

const modifyEntries = entries => {
    const entryTable = [];
    const modifiedTable = [];
    entries.map(({ date, id, description, amount, expense, income, currency: otherCurrency }) => {
        if (entryTable.includes(formatDate(date))) {
            const index = entryTable.indexOf(formatDate(date));
            return modifiedTable[index].utils.push({
                id,
                description,
                amount,
                expense,
                income,
                otherCurrency
            })
        }
        else {
            entryTable.push(formatDate(date));
            return modifiedTable.push({
                date: formatDate(date),
                utils: [{
                    id,
                    description,
                    amount,
                    expense,
                    income,
                    otherCurrency
                }]
            })
        }
    })

    return modifiedTable;
}

export const setMainAccountInfo = data => {
    const amountData = [];
    const incomeData = [];
    const expenseData = [];

    data.map(({ amount, income, spended, currency }) => {
        if (amount) amountData.push({ amount, currency })
        if (income) incomeData.push({ amount: income, currency })
        if (spended) expenseData.push({ amount: spended, currency })
        return null
    })

    return { amount: amountData, income: incomeData, expense: expenseData }
}