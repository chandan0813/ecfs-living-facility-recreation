import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, BookOpen, ClipboardList, LoaderCircle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Footer, Header } from "@/ecfs/Chrome";
import { MaintenanceEnquiryForm } from "@/ecfs/MaintenanceEnquiryForm";
import { PhotoMasthead } from "@/ecfs/PageVisuals";
import { issueInput, issueMaxLength, issueMinLength } from "@/ecfs/maintenance-advice";
import { recommendMaintenance } from "@/ecfs/maintenance-advice.functions";
import { headMeta } from "@/ecfs/seo";

const description =
  "Get practical next steps for facility maintenance issues and send your enquiry directly to ECFS.";

export const Route = createFileRoute("/maintenance-adviser")({
  head: () => headMeta("Maintenance Adviser | ECFS", description, "/maintenance-adviser"),
  component: MaintenanceAdviser,
});

type Advice = Awaited<ReturnType<typeof recommendMaintenance>>;

const errors = {
  busy: "The adviser is busy. Try again in a few minutes or browse the ECFS guides.",
  declined:
    "The adviser couldn’t provide a recommendation for this issue. Browse the guides or contact ECFS.",
  unavailable:
    "Recommendations are unavailable right now. Your description is still here; try again later or browse the ECFS guides.",
};

function MaintenanceAdviser() {
  const recommend = useServerFn(recommendMaintenance);
  const [issue, setIssue] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Advice | null>(null);
  const [inputError, setInputError] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const input = issueInput.safeParse({ issue });
    setInputError(!input.success);
    if (!input.success) return;
    setPending(true);
    setResult(null);
    try {
      setResult(await recommend({ data: input.data }));
    } catch {
      setResult({ kind: "unavailable" });
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Header />
      <main id="main">
        <PhotoMasthead
          title="Maintenance adviser"
          label="Maintenance adviser"
          parent={{ name: "Blog", path: "/blog" }}
          description={description}
        />
        <div className="site-wrap grid gap-6 py-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-8 lg:py-20">
          <div className="min-w-0 rounded-[1.75rem] border bg-card p-5 shadow-soft sm:p-8">
            <form onSubmit={submit} className="space-y-4" noValidate>
              <Label htmlFor="maintenance-issue" className="text-lg font-bold">
                Describe the maintenance issue
              </Label>
              <Textarea
                id="maintenance-issue"
                value={issue}
                onChange={(event) => {
                  setIssue(event.target.value);
                  setInputError(false);
                  setResult(null);
                }}
                maxLength={issueMaxLength}
                readOnly={pending}
                required
                aria-invalid={inputError}
                aria-describedby={inputError ? "issue-hint issue-error" : "issue-hint"}
                className="min-h-40 resize-y rounded-2xl bg-[var(--surface)] p-4 text-base"
                placeholder="Example: The office AC stops cooling every afternoon, but the fan keeps running. Two rooms on the same floor are affected."
              />
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <p id="issue-hint">
                  Your description is sent to AI. Leave out personal or confidential details.
                </p>
                <span>
                  {issue.length} / {issueMaxLength}
                </span>
              </div>
              {inputError && (
                <p id="issue-error" role="alert" className="text-sm text-destructive">
                  Enter at least {issueMinLength} characters describing the issue.
                </p>
              )}
              <Button
                type="submit"
                disabled={pending}
                className="min-h-12 rounded-full px-6 font-bold"
              >
                {pending ? (
                  <LoaderCircle aria-hidden="true" className="motion-safe:animate-spin" />
                ) : (
                  <ClipboardList aria-hidden="true" />
                )}
                {pending ? "Getting recommendations…" : "Get recommendations"}
              </Button>
            </form>
            <div aria-live="polite" className="mt-7" aria-busy={pending}>
              {result?.kind === "success" && (
                <>
                  <h2 className="text-2xl font-bold">Recommended next steps</h2>
                  <p className="mt-3 leading-relaxed break-words text-muted-foreground">
                    {result.summary}
                  </p>
                  <ol className="mt-4 list-decimal space-y-3 pl-6 leading-relaxed break-words marker:font-bold marker:text-deep-aqua">
                    {result.steps.map((step, index) => (
                      <li key={index} className="pl-1">
                        {step.replace(/^\s*(?:\d+[.)]|[-•])\s+/, "")}
                      </li>
                    ))}
                  </ol>
                  {result.guides.length > 0 && (
                    <section aria-labelledby="recommended-guides" className="mt-8 border-t pt-6">
                      <h3
                        id="recommended-guides"
                        className="flex items-center gap-2 text-lg font-bold"
                      >
                        <BookOpen size={20} aria-hidden="true" /> Recommended ECFS guides
                      </h3>
                      <ul className="mt-2 divide-y">
                        {result.guides.map((guide) => (
                          <li key={guide.slug} className="py-3">
                            <Link
                              to="/blog/$slug"
                              params={{ slug: guide.slug }}
                              className="link-grow inline-flex items-start gap-2 font-bold text-deep-aqua"
                            >
                              {guide.title}
                              <ArrowUpRight
                                size={16}
                                className="mt-1 shrink-0"
                                aria-hidden="true"
                              />
                            </Link>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {guide.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </>
              )}
              {result?.kind === "hazard" && (
                <p
                  role="alert"
                  className="border-l-4 border-destructive bg-secondary p-4 font-medium"
                >
                  This may be an immediate hazard. Move people away, follow your site emergency
                  plan, and contact emergency services as appropriate. Do not attempt repairs.
                </p>
              )}
              {result && result.kind in errors && (
                <p role="alert" className="bg-secondary p-4">
                  {result.kind !== "success" && result.kind !== "hazard" && errors[result.kind]}
                </p>
              )}
            </div>
            <MaintenanceEnquiryForm issue={issue} />
          </div>
          <aside className="self-start rounded-[1.75rem] border bg-secondary/60 p-6 lg:sticky lg:top-28">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShieldAlert size={20} className="text-deep-aqua" aria-hidden="true" /> Safety first
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              For an immediate hazard, follow your site emergency plan and contact emergency
              services. AI advice does not replace an onsite inspection by qualified personnel.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/blog" search={{}}>
                  Browse ECFS guides
                </Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-full">
                <a href="#maintenance-enquiry">
                  Send an enquiry <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
