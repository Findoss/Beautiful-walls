import type { Chenal } from './types';

import { createStore, createEvent } from 'effector';
import { persistState } from '../../services/fs-adapter';

export const storeAddChenal = createEvent<Chenal>('add');
export const storeRemoveChenal = createEvent<Chenal>('remove');

export const store = createStore<Chenal[]>([], { name: 'chenals' })
  .on(storeAddChenal, (state, idChenal: Chenal) => {
    return [...state, idChenal];
  })
  .on(storeRemoveChenal, (state, idChenal: Chenal) => {
    return state.filter((id) => id !== idChenal);
  });

export const selectAllChenals = () => store.getState();

export const selectHasChenal = (idChenal: Chenal) =>
  store.getState().includes(idChenal);

export const selectEmptyChenal = () => store.getState().length === 0;

persistState(store);
