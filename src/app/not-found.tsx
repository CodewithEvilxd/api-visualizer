import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">The page you are looking for does not exist.</p>
      <Link href="/" className="inline-flex mt-6 rounded-xl border px-4 py-2 text-sm hover:bg-foreground/5 transition-colors">Go home</Link>
    </div>
  );
}


