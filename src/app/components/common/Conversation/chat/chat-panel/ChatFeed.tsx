import { forwardRef } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/app/utils/cn";

const ChatFeed = forwardRef<HTMLDivElement, { messages: any[] }>(
  ({ messages }, ref) => {
    // ------------------------
    // ORDER CONFIRMATION MESSAGE
    // ------------------------
    const renderOrderMessage = (msg: any) => {
      const d = msg.data;

      return (
        <motion.div
          key={msg._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "ml-auto w-full max-w-xl p-4 rounded-2xl",
            "bg-primary text-white",
          )}
        >
          <h3 className="text-base font-bold mb-3 flex items-center gap-2">
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

          <div className="my-3 border-t border-b py-2 text-sm border-white/30">
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
              <span>Rs. {d.finalAmount}</span>
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

          <span className="text-xs opacity-70 block text-right mt-2">
            {format(new Date(msg.createdAt), "p")}
          </span>
        </motion.div>
      );
    };

    // ------------------------
    // PRODUCT DETAILS MESSAGE
    // ------------------------
    const renderProductDetailsMessage = (msg: any) => {
      const d = msg.content.data;
      console.log("🚀 ~ renderProductDetailsMessage ~ d:", d);

      return (
        <motion.div
          key={msg._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "w-full max-w-xl p-4 rounded-2xl",
            "bg-primary text-white",
          )}
        >
          <h3 className="text-base font-bold mb-3 flex items-center gap-2">
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
            <div className="mt-3">
              <img
                src={d.image}
                alt={d.name}
                className="rounded-xl w-full max-h-64 object-cover"
              />
            </div>
          )}

          <span className="text-xs opacity-70 block text-right mt-2">
            {format(new Date(msg.createdAt), "p")}
          </span>
        </motion.div>
      );
    };

    // ------------------------
    // NORMAL CHAT MESSAGE
    // ------------------------
    const renderDefaultMessage = (msg: any) => (
      <motion.div
        key={msg._id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex flex-col w-fit max-w-[75%] p-3 rounded-2xl break-words shadow-sm",
          msg.sender === "You"
            ? "ml-auto bg-primary text-white"
            : "bg-white text-grey border border-grey-light",
        )}
      >
        <span className="text-xs font-semibold mb-1 opacity-80">
          {msg.sender}
        </span>

        <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>

        <span className="mt-1 text-xs opacity-70 self-end">
          {format(new Date(msg.createdAt), "p")}
        </span>
      </motion.div>
    );

    // ------------------------
    // MAIN RENDER
    // ------------------------
    return (
      <div className="relative h-full bg-base-white">
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
          {messages.length === 0 ? (
            <div className="text-center text-grey-medium mt-10">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg) => {
              console.log("🚀 ~ msg:", msg);
              switch (msg.type) {
                case "order-confirmation":
                  return renderOrderMessage(msg);
                case "product-details":
                  return renderProductDetailsMessage(msg);
                default:
                  return renderDefaultMessage(msg);
              }
            })
          )}

          {/* Scroll anchor */}
          <div ref={ref} />
        </div>
      </div>
    );
  },
);

export default ChatFeed;
