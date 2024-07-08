export default function generateAssertionCode(
  function_signature: any,
  test_case: { input: string; output: string },
  language: string
) {
  const { name } = function_signature;
  const { input, output } = test_case;

  const diffInput = input.split(", ");

  const args: any = [];
  diffInput.forEach((arg) => {
    const argument = arg.split(" = ")[1].slice(0, -1);
    const argumentName = arg.split("= ")[0].slice(1, -1);
    function_signature.arguments.forEach((arg: any) => {
      if (Object.keys(arg)[0].trim() == argumentName.trim()) {
        switch (Object.values(arg)[0]) {
          case "int":
            args.push(parseInt(argument));
            break;
          case "str":
            args.push(`${argument}`);
            break;
          case "array":
            args.push(`[${argument}]`);
            break;
          case "object":
            args.push(`{${argument}}`);
            break;
          default:
            break;
        }
      }
    });
  });

  switch (language) {
    case "javascript":
      return `if(${name}(${args.join(", ")}) !== ${output}) {throw Error} else {
      console.log(${name}(${args.join(", ")}));}`;
    default:
      return ``;
  }
}
