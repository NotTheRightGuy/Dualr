import Example from "@/utils/components/Example";
import Constraints from "@/utils/components/Constraints";
import { useQuestion } from "@/store/hooks/useQuestion";
import Markdown from "react-markdown";

export default function ArenaQuestion() {
  const [question, _] = useQuestion();
  return (
    <div className="h-[calc(88vh)] flex-1 overflow-y-scroll rounded-md border-[1px] border-light-4 bg-dark-2 p-4">
      <div className="flex items-center gap-2">
        <div className="text-headline-5 font-bold">
          {question.question_name}
        </div>
        <div className="rounded-full bg-light-4 px-2 py-1 text-xs font-medium opacity-60">
          {question.slug}
        </div>
      </div>
      <div className="mt-4 text-sm opacity-90" id="question-body">
        <Markdown
          components={{
            code(props) {
              return (
                <code className="rounded-md bg-dark-1 px-1 py-1">
                  {props.children}
                </code>
              );
            },
          }}
        >
          {question.problem_statement}
        </Markdown>
      </div>
      <div id="question-inputs" className="mt-4">
        {question.examples?.map((example: any, index: number) => (
          <Example
            key={index}
            example_number={index + 1}
            input={example.input.slice(1, -1)}
            output={example.output.slice(1, -1)}
            explaination={example.explanation}
          />
        ))}
      </div>
      <Constraints constraints_array={question.constraints} />
    </div>
  );
}
