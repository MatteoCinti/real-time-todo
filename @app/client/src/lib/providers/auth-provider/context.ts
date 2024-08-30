import { createContext, Dispatch, SetStateAction } from 'react';
import { UserLoginQuery } from '~/lib/graphql/__generated__/graphql';

type AuthProviderState = {
  auth: UserLoginQuery['userLogin'] | null;
  setAuth: Dispatch<SetStateAction<UserLoginQuery['userLogin'] | null>>;
  guest: string | null;
  setGuest: Dispatch<SetStateAction<string | null>>;
  logoutGuest: () => void;
  signIn: (user: UserLoginQuery['userLogin']) => void;
  logout: () => void;
  signInAsGuest: (guestUser: string) => void;
};

const initialState: AuthProviderState = {
  auth: null,
  setAuth: () => null,
  guest: null,
  setGuest: () => null,
  logoutGuest: () => null,
  signIn: () => null,
  logout: () => null,
  signInAsGuest: () => null
};

export const AuthProviderContext =
  createContext<AuthProviderState>(initialState);
