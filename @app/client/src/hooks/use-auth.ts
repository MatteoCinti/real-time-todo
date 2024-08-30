import { useContext } from 'react';

import { AuthProviderContext } from '~/lib/providers/auth-provider/context';

export const useAuth = () => useContext(AuthProviderContext);

export type AuthContext = ReturnType<typeof useAuth>;
