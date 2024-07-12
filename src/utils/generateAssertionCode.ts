export default function generateAssertionCode(
  function_signature: any,
  test_case: { input: string; output: string },
  language: string
) {
  const { name, return_type } = function_signature;
  const { input, output } = test_case;

  const parseArgument = (arg: string, type: string) => {
    switch (type) {
      case "int":
        return parseInt(arg);
      case "float":
      case "double":
        return parseFloat(arg);
      case "bool":
        return arg.toLowerCase() === "true";
      case "str":
        return `"${arg}"`;
      case "List[int]":
        return `[${arg.split(",").map(Number).join(", ")}]`;
      case "List[str]":
        return `[${arg
          .split(",")
          .map((s) => `"${s.trim()}"`)
          .join(", ")}]`;
      default:
        return arg;
    }
  };

  const args = input.split(", ").map((arg) => {
    const [argName, argValue] = arg.split(" = ");
    const argType = function_signature.arguments.find(
      (a: any) => Object.keys(a)[0].trim() === argName.trim()
    )?.[argName.trim()];
    return parseArgument(argValue.slice(0, -1), argType);
  });

  const parseOutput = (output: string, type: string) => {
    switch (type) {
      case "int":
        return parseInt(output);
      case "float":
      case "double":
        return parseFloat(output);
      case "bool":
        return output.toLowerCase() === "true";
      case "str":
        return `"${output}"`;
      case "List[int]":
        return `[${output.split(",").map(Number).join(", ")}]`;
      case "List[str]":
        return `[${output
          .split(",")
          .map((s) => `"${s.trim()}"`)
          .join(", ")}]`;
      default:
        return output;
    }
  };

  const parsedOutput = parseOutput(output, return_type);

  switch (language.toLowerCase()) {
    case "javascript":
      return `
try {
  const result = ${name}(${args.join(", ")});
  const expected = ${parsedOutput};
  if (JSON.stringify(result) !== JSON.stringify(expected)) {
    console.error(\`Test case failed. Expected \${JSON.stringify(expected)}, but got \${JSON.stringify(result)}\`);
    throw new Error("Test case failed");
  } else {
    console.log("Test case passed");
  }
} catch (error) {
  console.error("An error occurred:", error.message);
  throw error;
}`;

    case "python":
      return `
try:
    result = ${name}(${args.join(", ")})
    expected = ${parsedOutput}
    if result != expected:
        print(f"Test case failed. Expected {expected}, but got {result}")
        raise AssertionError("Test case failed")
    else:
        print("Test case passed")
except Exception as error:
    print("An error occurred:", str(error))
    raise`;

    case "java":
      return `
try {
    Object result = ${name}(${args.join(", ")});
    Object expected = ${parsedOutput};
    if (!result.equals(expected)) {
        System.out.println("Test case failed. Expected " + expected + ", but got " + result);
        throw new AssertionError("Test case failed");
    } else {
        System.out.println("Test case passed");
    }
} catch (Exception error) {
    System.out.println("An error occurred: " + error.getMessage());
    throw error;
}`;

    case "c++":
      return `
try {
    auto result = ${name}(${args.join(", ")});
    auto expected = ${parsedOutput};
    if (result != expected) {
        std::cout << "Test case failed. Expected " << expected << ", but got " << result << std::endl;
        throw std::runtime_error("Test case failed");
    } else {
        std::cout << "Test case passed" << std::endl;
    }
} catch (const std::exception& error) {
    std::cout << "An error occurred: " << error.what() << std::endl;
    throw;
}`;

    default:
      return `Unsupported language. Please choose JavaScript, Python, Java, or C++.`;
  }
}
