// Maps a user's free-text subject (e.g. "Python", "react", "Git & GitHub")
// to a language identifier that react-syntax-highlighter/Prism understands.
// Falls back to plain text highlighting for anything unrecognized — never breaks.

const LANGUAGE_MAP = {
  python: "python",
  py: "python",
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  react: "jsx",
  jsx: "jsx",
  html: "markup",
  css: "css",
  java: "java",
  "c++": "cpp",
  cpp: "cpp",
  c: "c",
  "c#": "csharp",
  csharp: "csharp",
  sql: "sql",
  bash: "bash",
  shell: "bash",
  "git & github": "bash",
  git: "bash",
  github: "bash",
  devops: "bash",
  docker: "docker",
  yaml: "yaml",
  json: "json",
  aws: "bash",
  go: "go",
  golang: "go",
  rust: "rust",
  ruby: "ruby",
  php: "php",
  kotlin: "kotlin",
  swift: "swift",
};

export function detectLanguage(subject = "") {
  const key = subject.trim().toLowerCase();
  return LANGUAGE_MAP[key] || "text";
}
