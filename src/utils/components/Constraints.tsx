import Markdown from "react-markdown";

export default function Constraints({
  constraints_array,
}: {
  constraints_array: string[];
}) {
  return (
    <div>
      <p className="text-headline-6 font-semibold opacity-90">Constraints</p>
      {constraints_array?.map((constraint, index) => (
        <div className="my-2 ml-4 list-item list-disc">
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
            {constraint}
          </Markdown>
        </div>
      ))}
    </div>
  );
}
