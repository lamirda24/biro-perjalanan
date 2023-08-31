'use client';
import { updateTourist } from '@/api/tourist';
import { TouristForm } from '@/components/forms/tourist';
import { useToast } from '@/components/ui/use-toast';
import { useUpdateTouristForm } from '@/hooks/tourist/useUpdateTuoristForm';
import { ToursitFormValues } from '@/schema/touristSchema';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EditPage() {
  const { get } = useSearchParams();
  const id = get('id') ?? '1';
  const { toast } = useToast();
  const router = useRouter();

  const form = useUpdateTouristForm(id);

  const onSubmit = (values: ToursitFormValues) => {
    const data = { ...values };
    const args = { id, data };
    try {
      const res = updateTourist(args);
      router.push(`/tourist/detail?id=${id}`);
      toast({
        title: 'Success!',
        description: 'Tourist data just updated!'
      });
    } catch (e: any) {
      const { status, data } = e.response;
      if (status === 404) {
        toast({
          title: 'Erorr!',
          description: `${data.message}`
        });
      }
      if (status === 401) {
        router.push('/');
        toast({
          title: 'Erorr!',
          description: `${data.message}`
        });
        localStorage.clear();
      }
      throw e;
    }
  };
  return (
    <div className="flex flex-col">
      <h1 className="pb-2">Update Data</h1>
      <TouristForm form={form} onSubmit={onSubmit} />
    </div>
  );
}
