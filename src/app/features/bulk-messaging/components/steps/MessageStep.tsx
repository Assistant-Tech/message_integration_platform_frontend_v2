import { Paperclip, Variable } from "lucide-react";
import type { BroadcastMessage } from "../../types";
import type { Platform } from "@/app/components/common/Conversation/panel/helpers";

interface MessageStepProps {
  channel: Platform | null;
  value: BroadcastMessage;
  onChange: (message: BroadcastMessage) => void;
}

const SMS_LIKE_LIMIT = 1024;
const WA_BODY_LIMIT = 1024;

const MessageStep = ({ channel, value, onChange }: MessageStepProps) => {
  const limit = channel === "WHATSAPP" ? WA_BODY_LIMIT : SMS_LIKE_LIMIT;
  const remaining = limit - value.body.length;
  const isOver = remaining < 0;

  const insertVariable = (name: string) => {
    onChange({
      ...value,
      body: `${value.body}{{${name}}}`,
    });
  };

  return (
    <section aria-labelledby="message-heading">
      <h2 id="message-heading" className="text-base font-semibold text-grey">
        What do you want to say?
      </h2>
      <p className="mt-1 text-sm text-grey-medium">
        {channel === "WHATSAPP"
          ? "WhatsApp requires an approved template for broadcasts outside the 24-hour session."
          : "Use variables like {{name}} to personalize. Keep it short and direct."}
      </p>

      <div className="mt-5 overflow-hidden rounded-xl border border-grey-light bg-white">
        <textarea
          value={value.body}
          onChange={(e) => onChange({ ...value, body: e.target.value })}
          rows={8}
          placeholder="Hi {{name}}, we've got something new for you…"
          className="w-full resize-none border-0 px-4 py-3 text-sm text-grey outline-none placeholder:text-grey-medium"
        />
        <div className="flex items-center justify-between border-t border-grey-light bg-primary-light/10 px-3 py-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => insertVariable("name")}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-grey-medium hover:bg-white hover:text-primary"
            >
              <Variable className="h-3.5 w-3.5" strokeWidth={2} />
              Insert variable
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-grey-medium hover:bg-white hover:text-primary"
            >
              <Paperclip className="h-3.5 w-3.5" strokeWidth={2} />
              Attach
            </button>
          </div>
          <span
            className={
              isOver
                ? "text-xs font-semibold text-danger"
                : "text-xs tabular-nums text-grey-medium"
            }
          >
            {value.body.length} / {limit}
          </span>
        </div>
      </div>

      {channel === "WHATSAPP" && (
        <div className="mt-4 rounded-lg border border-warning/30 bg-warning/5 p-3 text-xs text-grey">
          <strong className="block text-warning">Template required</strong>
          Pick an approved template after saving the draft — template picker
          opens from the broadcast detail view.
        </div>
      )}
    </section>
  );
};

export default MessageStep;
