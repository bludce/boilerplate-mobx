type SearchParamsEntries = {
  params: {
    [key: string]: string,
  },
  searchParams: URLSearchParams,
}

export const getSearchParams = (search: string): SearchParamsEntries => {
  const searchParams = new URLSearchParams(search);
  const params: SearchParamsEntries['params'] = {};

  searchParams.forEach((value, key) => {
    params[key] = value || '';
  });

  return {
    params,
    searchParams
  };
};
