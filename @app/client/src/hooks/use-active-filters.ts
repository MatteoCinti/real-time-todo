import { useContext } from 'react';
import { FiltersProviderContext } from '~/lib/providers/filters-context-provider';

function useActiveFilters() {
  return useContext(FiltersProviderContext);
}

export default useActiveFilters;
