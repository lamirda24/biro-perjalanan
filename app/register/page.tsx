'use client';

import { RegistrationRequest, goRegistration } from '@/api/auth/regist';
import { Button, Card, CardContent, CardFooter, CardHeader, Input } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [authData, setAuthData] = useState<RegistrationRequest>({ name: '', email: '', password: '' });
  const { toast } = useToast();
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const handleRegist = async () => {
    const res = await goRegistration(authData);
    if (res?.message === 'success') {
      router.push('/');
      toast({
        title: 'Success!',
        description: 'Register succes!'
      });
    } else {
      toast({
        title: 'Error!',
        description: res.message
      });
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center md:p-[24px] md:m-auto gap-4">
      <Card className="text-center md:px-[20px] md:w-[500px] w-[330px]">
        <CardHeader className="text-lg md:text-2xl font-bold">Signup!</CardHeader>
        <CardContent className="text-center flex gap-2 md:gap-4 flex-col">
          <form className="flex flex-col gap-2" onSubmit={handleRegist}>
            <Input placeholder="Name" type="text" name="name" onChange={handleChangeInput} />
            <Input placeholder="Email" type="email" name="email" onChange={handleChangeInput} />
            <Input type="password" placeholder="Password" name="password" onChange={handleChangeInput} />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-2">
          <Button className="w-full" type="submit" onSubmit={handleRegist} onClick={handleRegist}>
            Sign Up
          </Button>
          <Link href="/" className="underline">
            You have an Account? Sign In here
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
