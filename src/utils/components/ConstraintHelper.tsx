export default function ConstraintHelper(con: string) {
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
