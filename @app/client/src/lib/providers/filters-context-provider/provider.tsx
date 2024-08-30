import { useMemo, useState } from 'react';
import { FiltersProviderContext } from './context';

function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [showCompleted, setShowCompleted] = useState(true);

  const filters = useMemo(
    () => ({ showCompleted, setShowCompleted }),
    [showCompleted, setShowCompleted]
  );

  return (
    <FiltersProviderContext.Provider value={filters}>
      {children}
    </FiltersProviderContext.Provider>
  );
}

export default FiltersProvider;
