import { ToursitFormValues } from '@/schema/touristSchema';
import { useForm } from 'react-hook-form';
import { defaultValues, resolver } from './constant';

export const useCreateQuestForm = () => {
  return useForm<ToursitFormValues>({
    resolver,
    defaultValues
  });
};
