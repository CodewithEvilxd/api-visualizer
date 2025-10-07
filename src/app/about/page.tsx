export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">About API Visualizer</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        API Visualizer is a modern tool for exploring API responses with clarity and speed. It blends a premium UI with practical developer workflows
        like pretty-printing, tree navigation, copying, and exporting.
      </p>

      <section className="mt-8">
        <h2 className="text-base font-medium">What you can do</h2>
        <ul className="mt-3 list-disc pl-6 text-sm text-muted-foreground space-y-1">
          <li>Paste or upload responses in JSON, XML, or raw text</li>
          <li>Toggle between Tree, Pretty, and Raw views</li>
          <li>Copy, clear, and download payloads instantly</li>
          <li>Keyboard shortcuts for a faster workflow</li>
          <li>Theme toggle with system preference support</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-base font-medium">Principles</h2>
        <ul className="mt-3 list-disc pl-6 text-sm text-muted-foreground space-y-1">
          <li>Speed: minimal friction, instant feedback</li>
          <li>Clarity: readable typography and clean hierarchy</li>
          <li>Delight: subtle motion and polished interactions</li>
          <li>Privacy: your pasted data stays on your device</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-base font-medium">Roadmap</h2>
        <ul className="mt-3 list-disc pl-6 text-sm text-muted-foreground space-y-1">
          <li>Advanced JSON querying and search</li>
          <li>Improved XML formatting and validation</li>
          <li>Shareable links with client-side encryption</li>
        </ul>
      </section>
    </div>
  );
}
