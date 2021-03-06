import create from 'zustand';

export type History = {
  amount: number;
  change: string;
  id: number;
};

export type Record = {
  name: string;
  amount: number;
  history: History[];
};

export type UpdatePerson = (
  name: string,
  amount: number,
  change: string,
  deleteValue?: boolean,
  id?: number,
) => void;

export type AddPerson = (name: string, amount: number, change: string) => void;

export type RemovePerson = (name: string) => void;

export type Store = {
  records: Record[];
  addPerson: AddPerson;
  updatePerson: UpdatePerson;
  removePerson: RemovePerson;
};

export const useStore = create<Store>(set => ({
  records: [],

  addPerson: (name, amount, change) => {
    const submitAmount = change === 'inc' ? amount : -amount;
    const person = {
      name,
      amount: submitAmount,
      history: [{ amount, change, id: 1 }],
    };

    set(state => ({ records: [...state.records, person] }));
  },

  removePerson: (name: string) => {
    set(state => ({
      records: state.records.filter(person => person.name !== name),
    }));
  },

  updatePerson: (name, amount, change, deleteValue, id) => {
    set(state => ({
      records: state.records.map(record => {
        if (record.name === name) {
          if (deleteValue) {
            return {
              ...record,
              history: record.history.filter(record => record.id !== id),
              amount:
                change === 'inc'
                  ? (Number(record.amount * 100) - Number(amount * 100)) / 100
                  : (Number(record.amount * 100) + Number(amount * 100)) / 100,
            };
          } else {
            return {
              ...record,
              history: [
                {
                  amount,
                  change,
                  id: record.history[0].id + 1,
                },
                ...record.history,
              ],
              amount:
                change === 'inc'
                  ? (Number(record.amount * 100) + Number(amount * 100)) / 100
                  : (Number(record.amount * 100) - Number(amount * 100)) / 100,
            };
          }
        }

        return record;
      }),
    }));
  },
}));
