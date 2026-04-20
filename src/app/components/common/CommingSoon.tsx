import { Megaphone, Sparkles } from "lucide-react";
import PageShell from "@/app/components/layout/PageShell";

type CommingSoonProps = {
  title?: string;
  description?: string;
  eyebrow?: string;
};

const CommingSoon = ({
  title = "Coming soon",
  description = "We're polishing this experience for an upcoming release. Stay tuned — it will land in the next MVP.",
  eyebrow = "On the roadmap",
}: CommingSoonProps) => {
  return (
    <PageShell background="tint">
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-grey-light bg-white px-8 py-14 text-center shadow-sm">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary-light/60 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
              {eyebrow}
            </span>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/20">
              <Megaphone className="h-8 w-8" strokeWidth={2} />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-primary-dark sm:text-3xl">
                {title}
              </h1>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-grey-medium">
                {description}
              </p>
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-grey-medium">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
              Building something great for you
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default CommingSoon;
