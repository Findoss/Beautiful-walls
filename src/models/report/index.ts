import { createStore, createEvent } from 'effector';
import { Reports, UserId, PropsImg, PropsText } from './types';

// actions

export const storeAddImg = createEvent<PropsImg>('addImg');
export const storeSetText = createEvent<PropsText>('setText');
export const storeResetReport = createEvent();

// store

const initState: Reports = {
  0: {
    imgs: [],
    text: '',
  },
};

export const store = createStore<Reports>(initState, { name: 'imgs' })
  .on(storeAddImg, (state, { id, img }: PropsImg) => {
    const newImgs = [...state[id].imgs, img];
    const oldData = state[id] ?? { text: '' };
    return { ...state, [id]: { ...oldData, imgs: newImgs } };
  })
  .on(storeSetText, (state, { id, text }: PropsText) => {
    const oldData = state[id] ?? { imgs: [] };
    return { ...state, [id]: { ...oldData, text: text } };
  })
  .reset(storeResetReport);

// selectors

const selectId = (id: UserId) => {
  const state = store.getState();
  if (state[id] === undefined) {
    state[id] = initState[0];
  }
  return state[id];
};

export const selectReport = (id: UserId) => store.getState()[id];

export const isReadyReportText = (id: UserId) => selectId(id).text !== '';

export const isReadyReportImg = (id: UserId) => selectId(id).imgs.length !== 0;

export const selectReportCountImgs = (id: UserId) => selectId(id).imgs.length;

// watch

store.watch((e) => {
  console.log(JSON.stringify(e, null, 2));
});
