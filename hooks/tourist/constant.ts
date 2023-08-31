import { touristFormSchema } from '@/schema/touristSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const defaultValues = {
  tourist_name: '',
  tourist_email: '',
  tourist_location: ''
};

export const resolver = zodResolver(touristFormSchema);
