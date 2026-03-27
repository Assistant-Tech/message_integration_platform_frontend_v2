import { forwardRef } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/app/utils/cn";

interface ChatFeedProps {
  messages: any[];
  members?: any[];
}

const ChatFeed = forwardRef<HTMLDivElement, ChatFeedProps>(
  ({ messages, members = [] }, ref) => {
    const getInitials = (value?: string) =>
      value
        ?.split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "NA";

    const isOwnMessage = (msg: any) => msg.sender === "You";

    const assignedNames = members
      .map((member: any) => member?.name)
      .filter(Boolean)
      .join(", ");

    const getMessageCardClassName = (mine: boolean) =>
      cn(
        "w-full max-w-[78%] rounded-[24px] border p-4 shadow-sm",
        mine
          ? "ml-auto border-primary bg-primary text-base-white"
          : "border-grey-light bg-base-white text-grey",
      );

    const renderMessageMeta = (msg: any, mine: boolean) => (
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
              mine
                ? "bg-base-white/20 text-base-white"
                : "bg-primary-light text-primary",
            )}
          >
            {getInitials(msg.sender)}
          </div>
          <div className="min-w-0">
            <p
              className={cn(
                "truncate text-sm font-semibold",
                mine ? "text-base-white" : "text-grey",
              )}
            >
              {msg.sender}
            </p>
            <p
              className={cn(
                "text-xs",
                mine ? "text-base-white/70" : "text-grey-medium",
              )}
            >
              {mine ? "Sent" : "Received"}
            </p>
          </div>
        </div>
        <span
          className={cn(
            "shrink-0 text-xs",
            mine ? "text-base-white/70" : "text-grey-medium",
          )}
        >
          {format(new Date(msg.createdAt), "p")}
        </span>
      </div>
    );

    const renderLastMessageAssignmentMeta = (msg: any, isLast: boolean) => {
      if (!isLast) return null;

      const sentBy = msg?.sender || "Unknown";
      const respondedBy =
        msg?.respondedBy ||
        (msg?.sender === "You"
          ? assignedNames || "Admin"
          : msg?.sender || "Unknown");

      return (
        <div className="mt-3 border-t border-grey-light/50 pt-3 text-xs text-grey-medium">
          <p>
            <span className="font-semibold">Sent by:</span> {sentBy}
          </p>
          <p>
            <span className="font-semibold">Assigned to:</span>{" "}
            {assignedNames || "Not assigned"}
          </p>
          <p>
            <span className="font-semibold">Responded by:</span> {respondedBy}
          </p>
        </div>
      );
    };

    // ------------------------
    // ORDER CONFIRMATION MESSAGE
    // ------------------------
    const renderOrderMessage = (msg: any, isLast: boolean) => {
      const d = msg.data;
      const mine = isOwnMessage(msg);

      return (
        <motion.div
          key={msg._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn("flex w-full", mine ? "justify-end" : "justify-start")}
        >
          <div className={getMessageCardClassName(mine)}>
            {renderMessageMeta(msg, mine)}

            <h3 className="mb-3 flex items-center gap-2 text-base font-bold">
              📦 Order Confirmation
            </h3>

            <div className="space-y-1 text-sm">
              <p>
                <b>Product:</b> {d.productName}
              </p>
              <p>
                <b>Name:</b> {d.customerName}
              </p>
              <p>
                <b>Phone:</b> {d.phone}
              </p>
              <p>
                <b>Location:</b> {d.location}
              </p>
            </div>

            <div
              className={cn(
                "my-3 border-y py-3 text-sm",
                mine ? "border-base-white/20" : "border-grey-light",
              )}
            >
              <div className="flex justify-between">
                <span>Total Amount</span>
                <span>Rs. {d.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>Rs. {d.deliveryAmount}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Grand Total</span>
                <span>Rs. {d.totalAmount}</span>
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <p>
                <b>Payment Method:</b> {d.paymentMethod}
              </p>
              <p>
                <b>Expected Delivery:</b> {d.expectedDelivery}
              </p>
            </div>

            {renderLastMessageAssignmentMeta(msg, isLast)}
          </div>
        </motion.div>
      );
    };

    // ------------------------
    // PRODUCT DETAILS MESSAGE
    // ------------------------
    const renderProductDetailsMessage = (msg: any, isLast: boolean) => {
      const d = msg.content.data;
      const mine = isOwnMessage(msg);

      return (
        <motion.div
          key={msg._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn("flex w-full", mine ? "justify-end" : "justify-start")}
        >
          <div className={getMessageCardClassName(mine)}>
            {renderMessageMeta(msg, mine)}

            <h3 className="mb-3 flex items-center gap-2 text-base font-bold">
              🛍️ Product Details
            </h3>

            <div className="space-y-2 text-sm">
              <p>
                <b>Name:</b> {d.title}
              </p>
              {d.description && (
                <p>
                  <b>Description:</b> {d.description}
                </p>
              )}
              <p>
                <b>Price:</b> Rs. {d.variants[0]?.price}
              </p>
              {d.stock && (
                <p>
                  <b>Available Stock:</b> {d.stock}
                </p>
              )}
              {d.category && (
                <p>
                  <b>Category:</b> {d.category}
                </p>
              )}
            </div>

            {d.image && (
              <div className="mt-3 overflow-hidden rounded-[20px] border border-grey-light/70">
                <img
                  src={d.image}
                  alt={d.title}
                  className="max-h-64 w-full object-cover"
                />
              </div>
            )}

            {renderLastMessageAssignmentMeta(msg, isLast)}
          </div>
        </motion.div>
      );
    };

    // ------------------------
    // NORMAL CHAT MESSAGE
    // ------------------------
    const renderDefaultMessage = (msg: any, isLast: boolean) => {
      const mine = isOwnMessage(msg);

      return (
        <motion.div
          key={msg._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn("flex w-full", mine ? "justify-end" : "justify-start")}
        >
          <div className={getMessageCardClassName(mine)}>
            {renderMessageMeta(msg, mine)}
            <p className="text-sm leading-6 whitespace-pre-wrap break-words">
              {msg.content}
            </p>
            {renderLastMessageAssignmentMeta(msg, isLast)}
          </div>
        </motion.div>
      );
    };

    // ------------------------
    // PAYMENT CHAT MESSAGE
    // ------------------------
    const renderPaymentLinkMessage = (msg: any, isLast: boolean) => {
      const link = msg.content?.url;
      const mine = isOwnMessage(msg);

      return (
        <motion.div
          key={msg._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn("flex w-full", mine ? "justify-end" : "justify-start")}
        >
          <div className={getMessageCardClassName(mine)}>
            {renderMessageMeta(msg, mine)}

            <h3 className="mb-3 flex items-center gap-2 text-base font-bold">
              💳 Payment Link
            </h3>

            <p className="text-sm">
              Please complete your payment using the link below:
            </p>

            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "mt-4 block rounded-[18px] px-4 py-3 text-center text-sm font-semibold transition-colors",
                mine
                  ? "bg-base-white text-primary hover:bg-primary-light"
                  : "bg-primary text-base-white hover:bg-primary-dark",
              )}
            >
              Pay Now
            </a>

            {renderLastMessageAssignmentMeta(msg, isLast)}
          </div>
        </motion.div>
      );
    };

    // ------------------------
    // MAIN RENDER
    // ------------------------
    return (
      <div className="min-h-full bg-primary-light/20 px-4 py-6">
        <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col justify-end gap-3">
          {messages.length === 0 ? (
            <div className="mt-10 text-center text-grey-medium">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg, index) => {
              const isLast = index === messages.length - 1;

              switch (msg.type) {
                case "order-confirmation":
                  return renderOrderMessage(msg, isLast);
                case "product-details":
                  return renderProductDetailsMessage(msg, isLast);
                case "payment-link":
                  return renderPaymentLinkMessage(msg, isLast);
                default:
                  return renderDefaultMessage(msg, isLast);
              }
            })
          )}

          <div ref={ref} />
        </div>
      </div>
    );
  },
);

export default ChatFeed;
