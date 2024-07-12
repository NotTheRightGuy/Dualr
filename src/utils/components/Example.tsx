import React from "react";
import Markdown from "react-markdown";

export default function Example({
  example_number,
  input,
  output,
  explanation,
}: {
  example_number: number;
  input: string;
  output: string;
  explanation: string;
}) {
  return (
    <div className="mb-4">
      <p className="text-headline-6 font-semibold">Example {example_number}</p>
      <div className="border-l-[1px] border-light-3 border-opacity-50 pl-2">
        <div>
          <p className="flex gap-4 font-semibold">Input </p>
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
            {input}
          </Markdown>
        </div>
        <div>
          <p className="mt-2 flex gap-4 font-semibold">Output </p>
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
            {output}
          </Markdown>
        </div>
        <div>
          <p className="mt-2 flex gap-4">Explanation </p>
          <p className="text-sm font-semibold">
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
              {explanation}
            </Markdown>
          </p>
        </div>
      </div>
    </div>
  );
}
