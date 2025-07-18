"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const BuildResume = () => {
  const router = useRouter();
  const handleNav = () => {
    router.push("/build-resume");
  };
  return (
    <div>
      <Card className="w-full max-w-sm h-[340px] bg-black text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">
            Build Your Own Personalized Resume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Helps you build a captivating resume to get closer to your dream
            job.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="bg-blue-700" onClick={handleNav}>
            Build Your Resume
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default BuildResume;
