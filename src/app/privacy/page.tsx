export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Your privacy matters. This page explains what we do—and don’t do—with your data.</p>

      <section className="mt-8">
        <h2 className="text-base font-medium">Data you paste</h2>
        <p className="mt-2 text-sm text-muted-foreground">Content you paste into the Tool (JSON/XML/Raw) is processed entirely in your browser. It is not uploaded or stored on our servers.</p>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-medium">Cookies and analytics</h2>
        <p className="mt-2 text-sm text-muted-foreground">We aim to minimize tracking. If analytics are enabled in the future, they will be privacy-friendly and aggregate-only.</p>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-medium">Contact</h2>
        <p className="mt-2 text-sm text-muted-foreground">For privacy questions, email <a className="underline" href="mailto:codeiwthevilxd@gnail">codeiwthevilxd@gnail</a>.</p>
      </section>
    </div>
  );
}


