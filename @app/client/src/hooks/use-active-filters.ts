import { useContext } from 'react';
import { FiltersProviderContext } from '~/lib/providers/filters-context-provider';

export type ActiveFilters = {
  showCompleted: boolean;
  setShowCompleted?: (value: boolean) => void;
  textSearch: string;
  setTextSearch?: (value: string) => void;
};

function useActiveFilters() {
  return useContext(FiltersProviderContext);
}

export default useActiveFilters;
