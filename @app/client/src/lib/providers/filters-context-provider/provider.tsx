import { useMemo, useState } from 'react';
import { FiltersProviderContext } from './context';

function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [showCompleted, setShowCompleted] = useState(true);
  const [textSearch, setTextSearch] = useState('');

  const filters = useMemo(
    () => ({ showCompleted, setShowCompleted, textSearch, setTextSearch }),
    [showCompleted, setShowCompleted, textSearch, setTextSearch]
  );

  return (
    <FiltersProviderContext.Provider value={filters}>
      {children}
    </FiltersProviderContext.Provider>
  );
}

export default FiltersProvider;
