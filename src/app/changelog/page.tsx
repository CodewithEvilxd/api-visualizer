export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Changelog</h1>
      <p className="mt-2 text-sm text-muted-foreground">Latest updates and improvements.</p>
      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-sm font-medium">v0.1.0</h2>
          <ul className="mt-2 list-disc pl-6 text-sm text-muted-foreground">
            <li>Initial release with Landing, Tool, and Docs</li>
            <li>JSON tree viewer, pretty/raw modes, file upload</li>
            <li>Command palette, theme toggle, animations</li>
          </ul>
        </section>
      </div>
    </div>
  );
}


