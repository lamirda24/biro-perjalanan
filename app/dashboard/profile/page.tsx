'use client';

import { Profile, getProfile } from '@/api/user';
import { Card, CardContent, CardTitle } from '@/components/ui';
import { useProfile } from '@/hooks/useToken';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [data, setData] = useState<Profile>();
  const {
    profile: { id }
  } = useProfile();

  const fetchProfile = async () => {
    try {
      const res = await getProfile(id);
      setData(res?.data);
    } catch (e: any) {
      throw e;
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchProfile();
  }, [id]);

  return (
    <div className="flex flex-col">
      <Card className="p-4">
        <CardTitle>Profile</CardTitle>
        <CardContent>
          <div className="flex pt-4">
            <div className="flex flex-col gap-4">
              <img src={data?.avatar} className="w-40 rounded-lg object-conaint" alt="avatar" />
              <div className="flex flex-col">
                <p className="text-muted-foreground">Nama:</p>
                <p className="text-lg font-semibold">{data?.name}</p>
              </div>

              <div className="flex flex-col">
                <p className="text-muted-foreground">Email:</p>
                <p className="text-lg font-semibold">{data?.email}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-muted-foreground">Id user:</p>
                <p className="text-lg font-semibold">{data?.id}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
