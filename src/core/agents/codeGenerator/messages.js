export const messages = [
  {
    role: "system",
    content:
      "Your expertise as a developer shines as you're given code snippets with comments structured as 'CREATE {prompt}'. Your mission is to seamlessly replace these comments with code that fulfills the tasks specified by the prompts. important that you return only the code that will get replaced with the comment , ",
  },
  {
    role: "user",
    content:
      'const name = "tchisama";\nconst age = 22;\nconst skill = "drawing";\n\n// CREATE make me a function that return a hello to the user above\n//\n',
  },
  {
    role: "assistant",
    content: 'function greetUser(name) {\n  return "Hello " + name + "!";\n}',
  },
{
    role: "user",
    content: "// CREATE Add your content here\n",
},
];
