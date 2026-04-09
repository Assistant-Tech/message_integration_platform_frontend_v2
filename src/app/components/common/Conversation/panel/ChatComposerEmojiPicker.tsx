import { EmojiPicker } from "frimousse";

interface Props {
  onSelect: (emoji: string) => void;
}

/**
 * Emoji picker body rendered inside the composer's Radix popover.
 * Uses Frimousse (https://frimousse.liveblocks.io) — headless, so all
 * visual styling is done here with Tailwind to match the composer theme.
 */
const ChatComposerEmojiPicker = ({ onSelect }: Props) => (
  <EmojiPicker.Root
    onEmojiSelect={({ emoji }) => onSelect(emoji)}
    className="isolate flex h-[340px] w-full flex-col bg-white"
  >
    <EmojiPicker.Search
      placeholder="Search emoji…"
      className="label-regular-16 mx-2 mt-2 appearance-none rounded-xl border border-grey-light bg-primary-light/20 px-3 py-2 text-sm text-grey outline-none placeholder:text-grey-medium focus-visible:border-primary/60"
    />
    <EmojiPicker.Viewport className="relative flex-1 outline-none">
      <EmojiPicker.Loading className="absolute inset-0 flex items-center justify-center text-xs text-grey-medium">
        Loading…
      </EmojiPicker.Loading>
      <EmojiPicker.Empty className="absolute inset-0 flex items-center justify-center text-xs text-grey-medium">
        No emoji found.
      </EmojiPicker.Empty>
      <EmojiPicker.List
        className="select-none pb-2"
        components={{
          CategoryHeader: ({ category, ...props }) => (
            <div
              className="bg-white px-3 pt-3 pb-1.5 text-xs font-semibold text-grey-medium"
              {...props}
            >
              {category.label}
            </div>
          ),
          Row: ({ children, ...props }) => (
            <div className="scroll-my-1.5 px-1.5" {...props}>
              {children}
            </div>
          ),
          Emoji: ({ emoji, ...props }) => (
            <button
              className="flex size-8 items-center justify-center rounded-md text-xl leading-none transition-colors data-[active]:bg-primary-light/60"
              {...props}
            >
              {emoji.emoji}
            </button>
          ),
        }}
      />
    </EmojiPicker.Viewport>
  </EmojiPicker.Root>
);

export default ChatComposerEmojiPicker;
