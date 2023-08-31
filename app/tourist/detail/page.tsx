'use client';
import { TouristRes, deleteTourist, getTourist } from '@/api/tourist';
import { ConfirmDeleteDialog } from '@/components/dialog/DeleteDialog';
import { Button } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DetailPage() {
  const { get } = useSearchParams();
  const id = get('id') ?? '1';
  const { toast } = useToast();
  const [data, setData] = useState<TouristRes>();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const fetchTourist = async () => {
    const res = await getTourist(id);
    setData(res);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteTourist(id);
      router.push('/tourist');
      toast({
        title: 'Success!',
        description: `${res.tourist_name} data just deleted!`
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
    }
  };
  useEffect(() => {
    fetchTourist();
  }, [id]);

  return (
    <div className="flex flex-col">
      <h1>Detail - {data?.tourist_name}</h1>
      <div className="rounded-md w-[90px] pt-[16px] ">
        {data?.tourist_profilepicture && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data?.tourist_profilepicture} alt={data?.tourist_name} className="object-contain w-full rounded-md" />
        )}
      </div>
      <div className="flex pt-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-muted-foreground">Nama:</p>
            <p className="text-lg font-semibold">{data?.tourist_name}</p>
          </div>

          <div className="flex flex-col">
            <p className="text-muted-foreground">Email:</p>
            <p className="text-lg font-semibold">{data?.tourist_email}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-muted-foreground">Location:</p>
            <p className="text-lg font-semibold">{data?.tourist_location}</p>
          </div>
          <div className="flex flex-row gap-2 w-full justify-end">
            <Button variant="outline" onClick={() => router.push(`/tourist/edit?id=${id}`)}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => setOpen(true)}>
              Delete
            </Button>
          </div>
        </div>
      </div>
      <ConfirmDeleteDialog open={open} setOpen={setOpen} onDelete={handleDelete} />
    </div>
  );
}
