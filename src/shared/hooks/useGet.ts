import { useCallback, useEffect, useState } from 'react';
import axiosClient from '../../utils/AxiosClient';

export default function useGet<T>(url: string, initialValue: T, retrieveImmediately = true) {
  const [fetchedData, setFetchedData] = useState<T>(initialValue);
  const [loading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (retrieveImmediatelyFetch = true) => {
    fetchFilterData(url, retrieveImmediatelyFetch)
  }, []);

  const fetchFilterData = useCallback(async (filterUrl: string, retrieveImmediatelyFetchFilter = true) => {
    if (retrieveImmediatelyFetchFilter) {
      setIsLoading(true);
      const { data } = await axiosClient(filterUrl);
      if (data !== undefined)
        setFetchedData(data);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await fetchData(retrieveImmediately);
    })();
  }, [fetchData]);

  return {
    data: fetchedData,
    refetch: fetchData,
    refetchFilter: fetchFilterData,
    loading
  };
}
