import { ChevronRight, Search } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import type { SearchDestination } from "./types";

// Note: result rows use native <button> because each row has a complex
// layout (label + description + chevron) that can't be expressed via
// Button's label/IconLeft/IconRight slots — Button doesn't render `children`.

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  query: string;
  onQueryChange: (q: string) => void;
  destinations: SearchDestination[];
  onNavigate: (href: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const SearchDialog = ({
  isOpen,
  onOpenChange,
  query,
  onQueryChange,
  destinations,
  onNavigate,
  inputRef,
}: Props) => (
  <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]" />
      <Dialog.Content
        aria-describedby={undefined}
        className="fixed left-1/2 top-[14%] z-50 w-[min(760px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[22px] border border-grey-light bg-base-white shadow-[0_32px_120px_rgba(15,23,42,0.25)] outline-none"
      >
        <Dialog.Title className="sr-only">Search workspace</Dialog.Title>

        {/* Search input row */}
        <div className="border-b border-grey-light px-5 py-4">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 flex-shrink-0 text-grey-medium" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                  onOpenChange(false);
                }
              }}
              placeholder="Search workspace"
              className="min-w-0 flex-1 bg-transparent text-base text-grey outline-none placeholder:text-grey-medium"
            />
            <span className="rounded-md border border-grey-light bg-grey-light/60 px-2 py-1 text-xs text-grey-medium">
              ESC
            </span>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[420px] overflow-y-auto bg-white">
          {destinations.length > 0 ? (
            <div className="p-3">
              {destinations.map((destination) => (
                <button
                  key={destination.href}
                  type="button"
                  onClick={() => onNavigate(destination.href)}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors hover:bg-primary-light/40"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-grey">
                      {destination.label}
                    </p>
                    <p className="mt-1 truncate text-sm text-grey-medium">
                      {destination.section} / {destination.description}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-grey-medium" />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
              <Search className="h-8 w-8 text-grey-light" />
              <p className="mt-4 text-lg font-semibold text-grey">
                No matching pages
              </p>
              <p className="mt-1 text-sm text-grey-medium">
                Try searching for conversations, products, analytics, or settings.
              </p>
            </div>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default SearchDialog;
