const TypingIndicator = () => (
  <div className="flex gap-3">
    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-grey-light text-xs font-semibold text-grey">
      ...
    </div>
    <div className="flex items-end gap-1 rounded-2xl rounded-tl-sm bg-base-white px-4 py-3 shadow-sm ring-1 ring-grey-light">
      <span className="h-2 w-2 animate-bounce rounded-full bg-grey-medium [animation-delay:0ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-grey-medium [animation-delay:150ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-grey-medium [animation-delay:300ms]" />
    </div>
  </div>
);

export default TypingIndicator;
