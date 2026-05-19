export default function CodeSnippet() {
  return (
    <div className="pointer-events-none absolute right-0 top-20 select-none font-mono text-xs opacity-10">
      <pre className="text-primary">
        {`const automation = {
  websites: 50,
  businesses: 70,
  hoursSaved: 40,
  systems: 11,
  status: 'running'
}

async function optimizeAgency() {
  const bottlenecks = await analyze()
  const systems = await build(bottlenecks)
  return eliminate(manualWork)
}`}
      </pre>
    </div>
  );
}
