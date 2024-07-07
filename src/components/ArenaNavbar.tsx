import { useCodeRunning } from "@/store/hooks/useCodingRunning";
import { useCode } from "@/store/hooks/useCode";
import { useLanguage } from "@/store/hooks/setLanguage";
import makeSubmission from "../../actions/makeSubmission";
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

export default function ArenaNavBar({
  player1,
  player2,
}: {
  player1: string;
  player2: string;
}) {
  const [code, _] = useCode();
  const [language, __] = useLanguage();
  const [running, setRunning] = useCodeRunning();
  async function handleSubmit(choice: "test" | "submit") {
    if (running) {
      toast.error("Please wait for the current submission to finish");
    } else {
      await makeSubmission(
        1, //! Replace with user_id
        languageDict[language as keyof typeof languageDict] as number,
        code
      );
      console.log(`Sent submission to server`);
    }
  }

  return (
    <nav className="flex justify-between py-4">
      <section className="flex items-center gap-8">
        <div className="text-headline-5 font-bold">Dualr</div>
        <div className="flex items-center gap-2 rounded-lg bg-dark-2 p-2">
          <div className="text-sm font-semibold">{player1}</div>
          <p className="font-bold opacity-45">vs</p>
          <div className="text-sm font-semibold">{player2}</div>
        </div>
      </section>
      <section className="flex items-center">
        <Button className="rounded-none rounded-l-md border-r-[1px] border-light-4 bg-dark-2 hover:bg-dark-1">
          <Timer />
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
        <Button className="rounded-none rounded-r-md bg-dark-2 hover:bg-dark-1">
          <Cloudy className="mr-2" />
          Submit
        </Button>
      </section>
      <section className="flex items-center gap-8">
        <div className="flex">
          <CircleChevronUp className="text-caption-2 text-accent-green" />
          <p className="ml-1 font-semibold opacity-70">+35</p>
          <CircleChevronDown className="ml-4 text-caption-2 text-accent-red" />
          <p className="ml-1 font-semibold opacity-70">-35</p>
        </div>
        <Button variant="destructive">End Dual</Button>
      </section>
    </nav>
  );
}
