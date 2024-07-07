import ConstraintHelper from "@/utils/components/ConstraintHelper";

export default function Constraints({
  constraints_array,
}: {
  constraints_array: string[];
}) {
  return (
    <div>
      <p className="text-headline-6 font-semibold opacity-90">Constraints</p>
      <ul className="list-inside list-disc">
        {constraints_array.map((constraint, index) => (
          <li key={index} className="mt-2 text-sm">
            {ConstraintHelper(constraint)}
          </li>
        ))}
      </ul>
    </div>
  );
}
