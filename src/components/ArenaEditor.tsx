import React from "react";
import { Socket } from "socket.io-client";
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

export default function ArenaEditor({
  socket,
  stdout,
}: {
  socket: Socket;
  stdout: string;
}) {
  const [language, setLanguage] = useLanguage();
  const [code, setCode] = useCode();
  const [running, _] = useCodeRunning();

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

      {!running ? (
        <div className="h-[20vh] rounded-b-md border-[1px] border-light-4 bg-dark-2 p-4">
          <code>{stdout}</code>
        </div>
      ) : (
        <div className="h-[20vh] animate-pulse rounded-b-md border-[1px] border-light-4 bg-dark-2 p-4"></div>
      )}
    </main>
  );
}
