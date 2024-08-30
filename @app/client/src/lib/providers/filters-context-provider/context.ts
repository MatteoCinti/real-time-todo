import { createContext, Dispatch, SetStateAction } from 'react';

type FlitersProviderState = {
  showCompleted: boolean;
  setShowCompleted: Dispatch<SetStateAction<boolean>>;
};

const initialState: FlitersProviderState = {
  showCompleted: true,
  setShowCompleted: () => true
};

export const FiltersProviderContext =
  createContext<FlitersProviderState>(initialState);
