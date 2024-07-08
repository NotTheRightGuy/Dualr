export default function Example({
  example_number,
  input,
  output,
  explaination,
}: {
  example_number: number;
  input: string;
  output: string;
  explaination: string;
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
        <div>
          <p className="mt-2 flex gap-4">Explanation </p>
          <p className="text-sm font-semibold">{explaination}</p>
        </div>
      </div>
    </div>
  );
}
