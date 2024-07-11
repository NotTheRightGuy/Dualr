import React from "react";
import { useCode } from "@/store/hooks/useCode";
import { useLanguage } from "@/store/hooks/setLanguage";
import { useCodeRunning } from "@/store/hooks/useCodingRunning";
import { ListRestart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-gruvbox";
import { useQuestion } from "@/store/hooks/useQuestion";
import generateFunctionDefinition from "@/utils/generateFunctionDefination";
import { Socket } from "socket.io-client";

export default function ArenaEditor({ socket }: { socket: Socket | null }) {
  const [language, setLanguage] = useLanguage();
  const [code, setCode] = useCode();
  const [_, setRunning] = useCodeRunning();
  const [question, __] = useQuestion();
  const [showResult, setShowResult] = React.useState<boolean>(false);
  const [functionPlaceholder, setFunctionPlaceholder] =
    React.useState<string>("");
  const [caseNumber, setCaseNumber] = React.useState<number>(0);
  const [testcasesSolved, setTestcasesSolved] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (question.function_signature) {
      const placeholder = generateFunctionDefinition(
        question.function_signature,
        language
      );
      setCode(placeholder);
      setFunctionPlaceholder(placeholder);
    }
    if (question.testcases) {
      setTestcasesSolved(new Array(question.testcases.length).fill(0));
    }
  }, [question, language]);

  React.useEffect(() => {
    if (socket) {
      socket.on("submission", (data) => {
        setRunning(false);
        console.log("Submission received: ", data);
        setTestcasesSolved((prev) => {
          const newSolved = [...prev];
          newSolved[data.test_case_number] =
            data.result.stdout === null ? -1 : 1;
          return newSolved;
        });
      });
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
        height="60%"
        theme="gruvbox"
        mode={language === "c++" ? "c_cpp" : language}
        onChange={(newCode) => setCode(newCode)}
        value={code ? code : functionPlaceholder}
        placeholder={functionPlaceholder}
        className="font-space rounded-none border-[1px] border-b-0 border-light-4 bg-dark-2"
        fontSize={14}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />

      <div className="flex h-[30vh] flex-col rounded-b-md border-[1px] border-light-4 bg-dark-2">
        <div className="flex border-b-[1px] border-light-4 *:cursor-pointer *:border-x-[1px] *:border-light-4 *:p-2 *:transition-colors hover:*:bg-dark-1">
          <div
            className={showResult ? "" : "bg-dark-1"}
            onClick={() => {
              setShowResult(false);
            }}
          >
            Test Cases
          </div>
          <div
            className={showResult ? "bg-dark-1" : ""}
            onClick={() => {
              setShowResult(true);
            }}
          >
            Test Result
          </div>
        </div>
        <div className="flex flex-1">
          <div className="border-[1px] border-light-4 *:border-b-[1px] *:border-light-4 *:p-2 *:transition-colors hover:*:cursor-pointer hover:*:bg-dark-1">
            {question.testcases?.map((_: any, index: number) => {
              return (
                <p
                  key={index}
                  onClick={() => {
                    setCaseNumber(index);
                  }}
                  className={`${
                    testcasesSolved[index] === 1
                      ? "bg-green-800"
                      : testcasesSolved[index] === -1
                        ? "bg-red-800"
                        : ""
                  } p-2`}
                >
                  Case {index + 1}
                </p>
              );
            })}
            <p className="invisible">Test Cases</p>
          </div>
          {!showResult ? (
            <div className="flex flex-1 flex-col gap-2 p-4">
              {question.testcases ? (
                <>
                  <p className="rounded-md bg-dark-1 p-2 font-mono">
                    {question.testcases[caseNumber].input.replace(/`/g, "")}
                  </p>
                  <p className="rounded-md bg-dark-1 p-2 font-mono">
                    {question.testcases[caseNumber].output}
                  </p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ) : (
            <div className="p-4">
              {testcasesSolved[caseNumber] === 1 ? (
                <p className="text-green-800">Test Case Passed.</p>
              ) : testcasesSolved[caseNumber] === -1 ? (
                <p className="text-red-800">Test Case Failed</p>
              ) : (
                <p>Run the code to see the result of the test case</p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
