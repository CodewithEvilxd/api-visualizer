export default function DocsPage() {
  return (
    <div className="w-full px-6 py-10 grid md:grid-cols-[220px_1fr] gap-8">
      <aside className="hidden md:block sticky top-24 h-[calc(100vh-120px)] overflow-auto pr-4 border-r">
        <nav className="text-sm space-y-2">
          <a className="block text-muted-foreground hover:text-foreground" href="#getting-started">Getting started</a>
          <a className="block text-muted-foreground hover:text-foreground" href="#formats">Supported formats</a>
          <a className="block text-muted-foreground hover:text-foreground" href="#shortcuts">Shortcuts</a>
        </nav>
      </aside>
      <article className="prose dark:prose-invert max-w-none">
        <h1 id="getting-started">Using the API Visualizer</h1>
        <p>Paste an API response into the Tool page. Choose JSON, XML, or Raw. Use Beautify to format, then explore the Tree, Pretty, or Raw views.</p>
        <h2 id="formats">Supported formats</h2>
        <ul>
          <li>JSON: pretty-print, syntax-colored, and collapsible tree view</li>
          <li>XML: basic pretty-print (experimental)</li>
          <li>Raw: plain text with copy and download</li>
        </ul>
        <h2 id="shortcuts">Keyboard shortcuts</h2>
        <ul>
          <li>Ctrl/Cmd + B: Beautify</li>
          <li>Ctrl/Cmd + C: Copy</li>
        </ul>
      </article>
    </div>
  );
}


