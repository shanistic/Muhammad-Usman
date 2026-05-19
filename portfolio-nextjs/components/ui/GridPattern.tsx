export default function GridPattern() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-secondary/50" />
    </div>
  );
}
