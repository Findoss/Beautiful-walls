import { createStore, createEvent } from 'effector';

// types

type ImgType = string;
type TextType = string;
type UserId = number;

type AA = {
  imgs: ImgType[];
  text: TextType;
};

type BB = {
  id: UserId;
  imgs: ImgType[];
};

type CC = {
  id: UserId;
  text: TextType;
};

type State = Record<UserId, AA>;

// actions

export const storeAddImgs = createEvent<BB>('addImg');
export const storeSetText = createEvent<CC>('setText');
export const storeResetImgs = createEvent();

// store

const initState: State = {
  0: {
    imgs: [],
    text: '',
  },
};

export const store = createStore<State>(initState, { name: 'imgs' })
  .on(storeAddImgs, (state, { id, imgs }: BB) => {
    const newImgs = [...state[id].imgs, ...imgs];
    const oldData = state[id] ?? { text: '' };
    return { ...state, [id]: { ...oldData, imgs: newImgs } };
  })
  .on(storeSetText, (state, { id, text }: CC) => {
    const oldData = state[id] ?? { imgs: [] };
    return { ...state, [id]: { ...oldData, text: text } };
  })
  .reset(storeResetImgs);

// selectors

const selectId = (id: UserId) => {
  const state = store.getState();
  if (state[id] === undefined) {
    state[id] = initState[0];
  }

  return state[id];
};

export const selectMessage = (id: UserId) => store.getState()[id];

export const isReadyMessageText = (id: UserId) => selectId(id).text !== '';

export const isReadyMessageImg = (id: UserId) => selectId(id).imgs.length !== 0;

export const selectCountImgs = (id: UserId) => selectId(id).imgs.length;

// watch

store.watch((e) => {
  console.log(JSON.stringify(e, null, 2));
});
