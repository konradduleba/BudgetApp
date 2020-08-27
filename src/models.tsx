export interface Entry {
  id: string;
  date: string;
  amount: number;
  description: string;
  expense: boolean;
  income: boolean;
  currency: string;
}

export function toEntry(doc: firebase.firestore.DocumentSnapshot): Entry {
  return { id: doc.id, ...doc.data() } as Entry;
}

export function toGetStatus(doc, currencySymbol) {

  const balance = [
    {
      currency: ' $',
      amount: 0,
      spended: 0,
      income: 0,
    },
    {
      currency: " €",
      amount: 0,
      spended: 0,
      income: 0,
    },
  ];

  const checkIfBalanceContainCurrency = balance.filter(cur => cur.currency === currencySymbol);
  if (!checkIfBalanceContainCurrency.length) balance.push({ currency: currencySymbol, amount: 0, spended: 0, income: 0 })
  for (let element of doc) {
    const { amount, expense, currency } = element.data();
    for (let thing of balance) {
      if (thing.currency.includes(currency)) {
        if (expense) {
          thing.amount = thing.amount - parseFloat(amount);
          thing.spended = thing.spended + parseFloat(amount);
        }
        else {
          thing.amount = thing.amount + parseFloat(amount);
          thing.income = thing.income + parseFloat(amount);
        }
      }
    }
  }
  return balance;
}
