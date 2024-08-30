import { createContext, Dispatch, SetStateAction } from 'react';

type FlitersProviderState = {
  showCompleted: boolean;
  setShowCompleted: Dispatch<SetStateAction<boolean>>;
  textSearch: string;
  setTextSearch: Dispatch<SetStateAction<string>>;
};

const initialState: FlitersProviderState = {
  showCompleted: true,
  setShowCompleted: () => true,
  textSearch: '',
  setTextSearch: () => ''
};

export const FiltersProviderContext =
  createContext<FlitersProviderState>(initialState);
