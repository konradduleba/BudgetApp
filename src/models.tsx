export interface Entry {
  id: string;
  date: string;
  amount: number;
  description: string;
  expense: boolean;
  income: boolean;
}



export function toEntry(doc: firebase.firestore.DocumentSnapshot): Entry {
  return { id: doc.id, ...doc.data() } as Entry;
}

export function toGetStatus(doc, type) {
  if (type === 'amount') {
    let balanse = 0;
    doc.map(element => {
      const { amount, expense } = element.data();
      if (expense) return balanse = (balanse - parseFloat(amount))
      else return balanse = (balanse + parseFloat(amount))
    })
    return balanse;
  }
  else if (type === 'expense') {
    let balanse = 0;
    doc.map(element => {
      const { amount, expense } = element.data();
      if (expense) return balanse = (balanse - parseFloat(amount))
      else return null
    })
    return balanse;
  }
  else {
    let balanse = 0;
    doc.map(element => {
      const { amount, expense } = element.data();
      if (expense) return null
      else return balanse = (balanse + parseFloat(amount))
    })
    return balanse;
  }
}