import { useState } from 'react';

import { useDebounce } from '@uidotdev/usehooks';

const useTablePagination = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [search, setSearch] = useState('');

  const debounceSearch = useDebounce(search, 300);

  return {
    paginationModel,
    setPaginationModel,
    search: debounceSearch,
    setSearch,
  };
};

export default useTablePagination;
