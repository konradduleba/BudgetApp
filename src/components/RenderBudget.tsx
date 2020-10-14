import React from 'react';
import { IonItem, IonButton, IonIcon } from '@ionic/react';
import { formatDate } from '../utils/date';

export const renderBudget = ({ nextIcon, currency, entries }) => {
    const modifiedTable = modifyEntries(entries);

    return (
        modifiedTable.map(entry =>
            <div key={entry.date}>
                <p className="date">{entry.date}</p>
                <ul>
                    {entry.utils.map(({ id, description, income, expense, amount, otherCurrency }) => <IonItem
                        lines="none"
                        key={id}
                        className="item_list"
                        routerLink={`/my/entries/view/${id}`}>
                        <p className="description">{description}</p>
                        <div className="amount_container">
                            <p className={`income_${income} expense_${expense}`}>{parseFloat(amount).toFixed(2)}{otherCurrency ? otherCurrency : currency.symbol}</p>
                            <IonButton fill="clear" className="edit_icon">
                                <IonIcon icon={nextIcon} />
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