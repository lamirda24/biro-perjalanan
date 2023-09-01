'use client';
import { createTourist } from '@/api/tourist';
import { TouristForm } from '@/components/forms/tourist';
import { useToast } from '@/components/ui/use-toast';
import { useCreateQuestForm } from '@/hooks/tourist/useCreateTouristForm';

import { ToursitFormValues } from '@/schema/touristSchema';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const form = useCreateQuestForm();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: ToursitFormValues) => {
    const res = await createTourist(data);
    if (res) {
      router.push('/tourist');
      toast({
        title: 'Success!',
        description: 'Tourist just added!'
      });
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-[20px]">Create Data - Tourist</h1>

      <div className="pt-[20px]">
        <TouristForm onSubmit={onSubmit} form={form} />
      </div>
    </div>
  );
}
