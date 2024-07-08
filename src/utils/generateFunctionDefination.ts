interface FunctionArgument {
  [key: string]: string;
}

interface FunctionSignature {
  return_type: string;
  name: string;
  arguments: FunctionArgument[];
}

const dataTypeMap: { [key: string]: { [key: string]: string } } = {
  javascript: {
    str: "string",
    bool: "boolean",
    int: "number",
    float: "number",
    double: "number",
  },
  "c++": {
    str: "std::string",
    bool: "bool",
    int: "int",
    float: "float",
    double: "double",
  },
  python: {
    str: "str",
    bool: "bool",
    int: "int",
    float: "float",
    double: "float",
  },
  java: {
    str: "String",
    bool: "boolean",
    int: "int",
    float: "float",
    double: "double",
  },
};

export default function generateFunctionDefinition(
  signature: FunctionSignature,
  language: string
): string {
  const langTypeMap = dataTypeMap[language.toLowerCase()];

  if (!langTypeMap) {
    return "Unsupported language. Please choose JavaScript, C++, Python, or Java.";
  }

  const mapType = (type: string) => langTypeMap[type.toLowerCase()] || type;

  switch (language.toLowerCase()) {
    case "javascript":
      const jsArgList = signature.arguments
        .map((arg) => Object.keys(arg)[0])
        .join(", ");
      return `function ${signature.name}(${jsArgList}) {
  // Implementation here
  
}`;

    case "c++":
      const cppArgList = signature.arguments
        .map((arg) => {
          const [key, type] = Object.entries(arg)[0];
          return `${mapType(type)} ${key}`;
        })
        .join(", ");
      return `${mapType(signature.return_type)} ${signature.name}(${cppArgList}) {
  // Implementation here
  
}`;

    case "python":
      const pyArgList = signature.arguments
        .map((arg) => {
          const [key, type] = Object.entries(arg)[0];
          return `${key}: ${mapType(type)}`;
        })
        .join(", ");
      return `def ${signature.name}(${pyArgList}) -> ${mapType(signature.return_type)}:
  # Implementation here
  `;

    case "java":
      const javaArgList = signature.arguments
        .map((arg) => {
          const [key, type] = Object.entries(arg)[0];
          return `${mapType(type)} ${key}`;
        })
        .join(", ");
      return `public ${mapType(signature.return_type)} ${signature.name}(${javaArgList}) {
  // Implementation here
  
}`;

    default:
      return "Unsupported language. Please choose JavaScript, C++, Python, or Java.";
  }
}
