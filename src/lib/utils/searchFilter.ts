import getValueByDeepKey, { DeepKeys } from './getValueByDeepKey';

const searchFilter = <T>(rows: T[], searchText: string, keys: DeepKeys<T>[]): T[] => {
  if (!searchText) return rows;

  const lowercasedSearchText = searchText.toLowerCase();

  return rows.filter((row) =>
    keys.some((key) => {
      const value = getValueByDeepKey(row, key as string);
      return value ? String(value).toLowerCase().includes(lowercasedSearchText) : false;
    }),
  );
};

export default searchFilter;
