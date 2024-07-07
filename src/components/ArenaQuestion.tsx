import Example from "@/utils/components/Example";
import Constraints from "@/utils/components/Constraints";

export default function ArenaQuestion({
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
