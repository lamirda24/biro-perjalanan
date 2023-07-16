"use client";
import { Button, Card, CardContent, CardFooter, CardHeader } from "@/components/ui";
import { LucideGithub, LucideLinkedin } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const profile = (idx: number) => {
    switch (idx) {
      case 1:
        window.open("https://github.com/lamirda24", "_blank");
        break;
      case 2:
        window.open("https://github.com/luthfiAM", "_blank");
        break;

      default:
        window.open("https://www.linkedin.com/in/luthfiam/", "_blank");
        break;
    }
  };
  return (
    <main className="flex h-screen flex-col items-center justify-center md:p-[24px] md:m-auto gap-4">
      <Card className="text-center md:px-[20px] md:w-[500px] w-[330px]">
        <CardHeader className="text-lg md:text-2xl font-bold">Submission for Technical Test Frontend</CardHeader>
        <CardContent className="text-center flex gap-2 md:gap-4 flex-col">
          <h2 className="text-md md:text-xl font-semibold">by: Luthfi Anugerah Mirda</h2>
          <div className="flex flex-row gap-2 md:gap-4 justify-around">
            <Button variant="ghost" className="flex flex-row gap-2 items-center w-full justify-center cursor-pointer" onClick={() => profile(1)}>
              <LucideGithub className="w-[15px] md:w-[20px]" />
              <p className="text-xs md:text-md">lamirda24</p>
            </Button>
            <Button variant="ghost" className="flex flex-row gap-2 items-center w-full justify-center cursor-pointer" onClick={() => profile(2)}>
              <LucideGithub className="w-[15px] md:w-[20px]" />
              <p className="text-xs md:text-md">luthfiAM</p>
            </Button>
            <Button variant="ghost" className="flex flex-row gap-2 items-center w-full justify-center cursor-pointer" onClick={() => profile(3)}>
              <LucideLinkedin className="w-[15px] md:w-[20px]" />
              <p className="text-xs md:text-md">luthfiam</p>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Link href={"/products"}>
            <Button>Proceed to /product</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
