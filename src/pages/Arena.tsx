"use client";

import { Button } from "@/components/ui/button";
import {
  CircleChevronDown,
  CircleChevronUp,
  Cloudy,
  Play,
  ListRestart,
  Timer,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import languageDict from "../../utils/language.json";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-gruvbox";

import React from "react";
import { useCode } from "@/store/hooks/useCode";
import { useLanguage } from "@/store/hooks/setLanguage";

import makeSubmission from "../../actions/makeSubmission";
import { io, Socket } from "socket.io-client";

function CodeEditor({ socket, stdout }: { socket: Socket; stdout: string }) {
  const [language, setLanguage] = useLanguage();
  const [code, setCode] = useCode();

  React.useEffect(() => {
    if (socket) {
      socket.on("code", (data: string) => {
        console.log("Code received: ", data);
      });
      return () => {
        socket.close();
      };
    }
  }, [socket]);

  return (
    <main className="flex-1">
      <div className="flex h-10 justify-between rounded-t-md border-[1px] border-b-0 border-light-4 bg-dark-2 p-2">
        <p className="font-semibold">Code</p>
        <div className="flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ListRestart />
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset code to default</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="dark">
            <Select
              onValueChange={(e) => {
                setLanguage(e);
              }}
            >
              <SelectTrigger className="h-6 border-0 bg-transparent outline-0 focus:ring-0">
                <SelectValue placeholder="Javascript" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">Javascript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="c++">C++</SelectItem>
                <SelectItem value="python">Python</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <AceEditor
        width="full"
        theme="gruvbox"
        mode={language === "c++" ? "c_cpp" : language}
        onChange={(newCode) => setCode(newCode)}
        value={code}
        className="rounded-none border-[1px] border-b-0 border-light-4 bg-dark-2"
        fontSize={14}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
      <div className="h-[20vh] rounded-b-md border-[1px] border-light-4 bg-dark-2 p-4">
        <code>{stdout}</code>
      </div>
    </main>
  );
}

function DisplayTimer() {
  const [time, setTime] = React.useState("00:00");
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        const [minutes, seconds] = prev.split(":");
        let newMinutes = parseInt(minutes);
        let newSeconds = parseInt(seconds) + 1;

        if (newSeconds === 60) {
          newMinutes += 1;
          newSeconds = 0;
        }

        return `${newMinutes.toString().padStart(2, "0")}:${newSeconds
          .toString()
          .padStart(2, "0")}`;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Timer />
      <p className="font-semibold">{time}</p>
    </div>
  );
}

function NavBar({ player1, player2 }: { player1: string; player2: string }) {
  const [isRunning, setIsRunning] = React.useState(false);
  const [code, _] = useCode();
  const [language, __] = useLanguage();
  async function handleSubmit(choice: "test" | "submit") {
    await makeSubmission(
      1, //* Replace with user_id
      languageDict[language as keyof typeof languageDict] as number,
      code
    );
    console.log(`Sent submission to server`);
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
          <DisplayTimer />
        </Button>
        <Button
          className="rounded-none border-r-[1px] border-light-4 bg-dark-2 hover:bg-dark-1"
          onClick={() => handleSubmit("test")}
        >
          <Play className="mr-2" />
          Run
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

function Example({
  example_number,
  input,
  output,
}: {
  example_number: number;
  input: string;
  output: string;
}) {
  return (
    <div className="mb-4">
      <p className="text-headline-6 font-semibold">Example {example_number}</p>
      <div className="border-l-[1px] border-light-3 border-opacity-50 pl-2">
        <div>
          <p className="flex gap-4">Input </p>
          <code className="rounded-md bg-dark-1 px-1 py-1">{input}</code>
        </div>
        <div>
          <p className="mt-2 flex gap-4">Output </p>
          <code className="rounded-md bg-dark-1 px-1 py-1">{output}</code>
        </div>
      </div>
    </div>
  );
}

function Constraints({ constraints_array }: { constraints_array: string[] }) {
  function Helper(con: string) {
    let [min, variable, max] = con.split("<=");
    let minElement: any, maxElement: any;
    if (min.includes("^")) {
      const [num, power] = min.split("^");
      minElement = (
        <>
          {num}
          <sup>{power}</sup>
        </>
      );
    } else {
      minElement = min;
    }
    if (max.includes("^")) {
      const [num, power] = max.split("^");
      maxElement = (
        <>
          {num}
          <sup>{power}</sup>
        </>
      );
    } else {
      maxElement = max;
    }
    return (
      <code className="rounded-md bg-dark-1 px-1 py-1">
        {minElement} {"<="} {variable} {"<="} {maxElement}
      </code>
    );
  }

  return (
    <div>
      <p className="text-headline-6 font-semibold opacity-90">Constraints</p>
      <ul className="list-inside list-disc">
        {constraints_array.map((constraint, index) => (
          <li key={index} className="mt-2 text-sm">
            {Helper(constraint)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Question({
  question_name,
  question_slug,
}: {
  question_name: string;
  question_slug: string;
}) {
  return (
    <div className="h-[calc(88vh)] flex-1 overflow-y-scroll rounded-md border-[1px] border-light-4 bg-dark-2 p-4">
      <div className="flex items-center gap-2">
        <div className="text-headline-5 font-bold">{question_name}</div>
        <div className="rounded-full bg-light-4 px-2 py-1 text-xs font-medium opacity-60">
          {question_slug}
        </div>
      </div>
      <div className="mt-4 text-sm opacity-90" id="question-body">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae, ipsum
        veritatis. Ipsum nemo maxime dolorum molestias, deserunt vel earum esse,
        qui aspernatur autem consectetur dignissimos quisquam alias praesentium,
        sapiente dicta. <br /> <br /> Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Quae, ipsum veritatis. Ipsum nemo maxime dolorum
        molestias, deserunt vel earum esse, qui aspernatur autem consectetur
        dignissimos quisquam alias praesentium, sapiente dicta. Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Quae, ipsum veritatis.
        Ipsum nemo maxime dolorum molestias, deserunt vel earum esse, qui
        aspernatur autem consectetur dignissimos quisquam alias praesentium,
        sapiente dicta. <br /> <br /> Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Quae, ipsum veritatis. Ipsum nemo maxime dolorum
        molestias, deserunt vel earum esse, qui aspernatur autem consectetur
        dignissimos quisquam alias praesentium, sapiente dicta. Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Quae, ipsum veritatis.
        Ipsum nemo maxime dolorum molestias, deserunt vel earum esse, qui
        aspernatur autem consectetur dignissimos quisquam alias praesentium,
        sapiente dicta.
      </div>
      <div id="question-inputs" className="mt-4">
        <Example example_number={1} input="[1,2,3,4]" output="6" />
        <Example example_number={2} input="[1,2,3,4]" output="6" />
        <Example example_number={3} input="[1,2,3,4]" output="6" />
      </div>
      <Constraints
        constraints_array={["10^3 <= n <= 10^7", "100 <= num <= 200"]}
      />
    </div>
  );
}

export default function Arena() {
  const [codeOutput, setcodeOutput] = React.useState<string>("");
  const [socket, setSocket] = React.useState<Socket | null>(null);

  React.useEffect(() => {
    const socket = io("http://localhost:8080");

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("joined", 1);
    });

    socket.on("submission", (data: any) => {
      console.log("Submission received: ", data);
      setcodeOutput(data.stdout);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    setSocket(socket);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <main className="px-6">
      <NavBar player1="NotTheRightGuy" player2="Meow189" />
      <div className="flex gap-2">
        <Question question_name="Bob in Alice" question_slug="BOBIAL" />
        <CodeEditor socket={socket as Socket} stdout={codeOutput} />
      </div>
    </main>
  );
}
