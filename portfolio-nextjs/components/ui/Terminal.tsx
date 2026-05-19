interface TerminalProps {
  command: string;
  output: string;
}

export default function Terminal({ command, output }: TerminalProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-code-bg font-mono text-sm">
      <div className="flex items-center gap-2 bg-primary-800 px-4 py-2">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-code-text">terminal</span>
      </div>
      <div className="p-4">
        <div className="text-green-400">$ {command}</div>
        <div className="mt-2 text-code-text">{output}</div>
      </div>
    </div>
  );
}
