import { useEffect, useMemo, useState } from 'react';

import { useForm } from 'react-hook-form';

import { defaultValues, resolver } from './constant';
import { ToursitFormValues } from '@/schema/touristSchema';
import { TouristsList, getTourist } from '@/api/tourist';

export const useUpdateTouristForm = (id: string) => {
  const [data, setData] = useState<TouristsList>();

  const getDataTourist = async () => {
    try {
      const res = await getTourist(id);
      setData(res);
    } catch (e: any) {}
  };
  useEffect(() => {
    getDataTourist();
  }, [id]);

  const values = useMemo(() => {
    if (!data) return defaultValues;
    return {
      ...data
    };
  }, [data]);

  return useForm<ToursitFormValues>({
    resolver,
    defaultValues,
    values
  });
};
