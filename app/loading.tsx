export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-5xl animate-pulse space-y-6 px-4 py-8 sm:py-12">
      <div className="h-9 w-64 rounded-lg bg-slate-200 dark:bg-slate-800" />
      <div className="grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
        <div className="h-80 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-80 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </main>
  );
}
