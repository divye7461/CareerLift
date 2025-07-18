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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
const Mock_Quiz = () => {
  const router = useRouter();
  const handleNav = () => {
    router.push("/mock-quiz-generate");
  };
  return (
    <div>
      <Card className="w-full max-w-sm h-[340px] bg-black text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">
            Mock Quiz Generated Based On Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Provides AI-powered Mock Quiz Based On the Skills in order to guide
            the user towards performing efficiently in interviews
          </p>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="bg-blue-700 w-full"
            onClick={handleNav}
          >
            Give a Mock Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Mock_Quiz;
