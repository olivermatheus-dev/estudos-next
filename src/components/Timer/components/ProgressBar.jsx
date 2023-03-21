export default function ProgressBar({ progress }) {
  return (
    <div className="relative h-2 rounded-full w-96 overflow-hidden border">
      <div className="absolute top-0 left-0 h-full bg-emerald-600  w-full" />
      <div
        className="absolute top-0 left-0 h-full bg-white"
        style={{ width: `${100 - progress}%` }}
      />
    </div>
  );
}
