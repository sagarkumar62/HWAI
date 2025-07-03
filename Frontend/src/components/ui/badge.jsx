export function Badge({ children, className = "" }) {
  return (
    <span className={`inline-block px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}
