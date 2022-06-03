import { useCallback, useEffect, useState } from 'react';
import axiosClient from '../../utils/AxiosClient';

export default function useGet<T>(url: string, initialValue: T) {
  const [fetchedData, setFetchedData] = useState<T>(initialValue);
  const [loading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const { data } = await axiosClient(url);
    if (data !== undefined)
      setFetchedData(data);
    setIsLoading(false);
  }, []);

  const fetchFilterData = useCallback(async (filterUrl: string) => {
    setIsLoading(true);
    const { data } = await axiosClient(filterUrl);
    if (data !== undefined)
      setFetchedData(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [fetchData]);

  return {
    data: fetchedData,
    refetch: fetchData,
    refetchFilter: fetchFilterData,
    loading
  };
}
