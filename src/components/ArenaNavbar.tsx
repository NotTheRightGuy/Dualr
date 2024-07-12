import { useCodeRunning } from "@/store/hooks/useCodingRunning";
import { useCode } from "@/store/hooks/useCode";
import { useLanguage } from "@/store/hooks/setLanguage";
import makeSubmission from "@/actions/makeSubmission";
import { toast } from "sonner";
import languageDict from "@/utils/data/language.json";
import { Timer } from "@/utils/components/Timer";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  Play,
  Cloudy,
  CircleChevronUp,
  CircleChevronDown,
} from "lucide-react";
import { useQuestion } from "@/store/hooks/useQuestion";
import generateAssertionCode from "@/utils/generateAssertionCode";
import { useUser } from "@/store/hooks/useUser";
import { Socket } from "socket.io-client";
import Modal from "./ui/Modal";
import SubmitButton from "./ui/SubmitButton";
import { Delta } from "@/app/dashboard/arena/page";

export default function ArenaNavBar({
  player1,
  player2,
  player1Rating,
  player2Rating,
  socket,
  startTime,
  delta,
}: {
  player1: string;
  player2: string;
  player1Rating: number;
  player2Rating: number;
  startTime: number;
  socket: Socket | null;
  delta: Delta;
}) {
  const [code, _] = useCode();
  const [user, setUser] = useUser();
  const [language, __] = useLanguage();
  const [question, ___] = useQuestion();
  const [running, setRunning] = useCodeRunning();

  async function handleSubmit(choice: "test" | "submit") {
    if (running) {
      toast.error("Please wait for the current submission to finish");
      return;
    }
    if (choice === "test") {
      const allSubmission: any = [];
      question.testcases.forEach((testCase: any) => {
        const assertion = generateAssertionCode(
          question.function_signature,
          testCase,
          language
        );
        allSubmission.push(code + "\n\n" + assertion);
      });
      const res = await makeSubmission(
        user.id,
        languageDict[language as keyof typeof languageDict],
        allSubmission
      );
      console.log(res);
    }
  }

  return (
    <nav className="flex justify-between py-4">
      <section className="flex items-center gap-8">
        <div className="text-headline-5 font-bold">Dualr</div>
        <div className="flex items-center gap-2 rounded-lg bg-dark-2 p-2">
          <div className="flex text-sm font-semibold">
            {player1} | {player1Rating}
          </div>
          <p className="font-bold opacity-45">vs</p>
          <div className="flex text-sm font-semibold">
            {player2} | {player2Rating}
          </div>
        </div>
      </section>
      <section className="flex items-center rounded-md border-2 border-light-4">
        <Button className="rounded-none rounded-l-md border-r-[1px] border-light-4 bg-dark-2 hover:bg-dark-1">
          <Timer startTime={startTime} />
        </Button>
        <Button
          className="rounded-none border-r-[1px] border-light-4 bg-dark-2 hover:bg-dark-1"
          onClick={() => {
            setRunning(true);
            handleSubmit("test");
          }}
        >
          {running ? (
            <RefreshCw className="mr-2 animate-spin" />
          ) : (
            <>
              <Play className="mr-2" />
              Run
            </>
          )}
        </Button>
        <SubmitButton />
      </section>
      <section className="flex items-center gap-8">
        <div className="flex">
          <CircleChevronUp className="text-caption-2 text-accent-green" />
          <p className="ml-1 font-semibold opacity-70">+{delta.player1Delta}</p>
          <CircleChevronDown className="ml-4 text-caption-2 text-accent-red" />
          <p className="ml-1 font-semibold opacity-70">-{delta.player2Delta}</p>
        </div>

        <Modal socket={socket}></Modal>
      </section>
    </nav>
  );
}
