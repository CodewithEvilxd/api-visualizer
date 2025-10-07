export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Cookies</h1>
      <p className="mt-2 text-sm text-muted-foreground">This site aims to minimize cookie usage. If cookies are used, they will be essential for functionality and never for invasive tracking.</p>

      <section className="mt-8">
        <h2 className="text-base font-medium">Essential cookies</h2>
        <p className="mt-2 text-sm text-muted-foreground">These enable core features like theme preferences and page performance.</p>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-medium">Managing cookies</h2>
        <p className="mt-2 text-sm text-muted-foreground">You can control cookies via your browser settings and clear them at any time.</p>
      </section>
    </div>
  );
}


