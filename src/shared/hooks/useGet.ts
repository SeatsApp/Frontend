import { useCallback, useEffect, useState } from 'react';
import axiosClient from '../../utils/AxiosClient';

export default function useGet<T>(url: string, initialValue: T) {
  const [fetchedData, setFetchedData] = useState<T>(initialValue);

  const fetchData = useCallback(async () => {
    const { data } = await axiosClient(url);
    setFetchedData(data);
  }, [url]);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [fetchData]);

  return {
    data: fetchedData,
    refetch: fetchData,
  };
}
