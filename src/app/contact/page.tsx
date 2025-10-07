export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-2 text-sm text-muted-foreground">We’d love to hear from you.</p>

      <div className="mt-6 grid gap-6 text-sm">
        <div>
          <div className="font-medium">Support</div>
          <p className="text-muted-foreground">Email us for help with bugs, issues, or feature requests.</p>
          <p className="mt-1"><a className="underline" href="mailto:codeiwthevilxd@gnail">codeiwthevilxd@gnail</a></p>
        </div>
        <div>
          <div className="font-medium">Feedback</div>
          <p className="text-muted-foreground">Got ideas to improve the tool? Share your feedback anytime.</p>
          <p className="mt-1"><a className="underline" href="mailto:codeiwthevilxd@gnail">codeiwthevilxd@gnail</a></p>
        </div>
        <div>
          <div className="font-medium">Business</div>
          <p className="text-muted-foreground">For partnerships and integrations.</p>
          <p className="mt-1"><a className="underline" href="mailto:codeiwthevilxd@gnail">codeiwthevilxd@gnail</a></p>
        </div>
      </div>
    </div>
  );
}


