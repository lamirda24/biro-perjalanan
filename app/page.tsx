'use client';

import { LoginRequest, postLogin } from '@/api/auth';
import { Button, Card, CardContent, CardFooter, CardHeader, Input } from '@/components/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [authData, setAuthData] = useState<LoginRequest>({ email: '', password: '' });

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const handleLogin = async () => {
    const res = await postLogin(authData);
    if (typeof window !== 'undefined') {
      if (res?.message === 'success') {
        localStorage.setItem('profile', JSON.stringify(res?.data));
        localStorage.setItem('token', res?.data.Token);
        router.push('/tourist');
      } else {
        localStorage.clear();
      }
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center md:p-[24px] md:m-auto gap-4">
      <Card className="text-center md:px-[20px] md:w-[500px] w-[330px]">
        <CardHeader className="text-lg md:text-2xl font-bold">Welcome!</CardHeader>
        <CardContent className="text-center flex gap-2 md:gap-4 flex-col">
          <form className="flex flex-col gap-2" onSubmit={handleLogin}>
            <Input placeholder="Email" type="email" name="email" onChange={handleChangeInput} />
            <Input type="password" placeholder="Password" name="password" onChange={handleChangeInput} />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-2">
          <Button className="w-full" type="submit" onSubmit={handleLogin} onClick={handleLogin}>
            Sign In
          </Button>
          <Link href="/register" className="underline">
            Do not have an account? Register here
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
