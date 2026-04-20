import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  Truck,
  MessageCircle,
} from "lucide-react";
import { Button, Badge } from "@/app/components/ui";
import { SectionEyebrow, GradientHeadline, LandingContainer } from "./_shared";

interface Order {
  id: string;
  customer: string;
  items: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  progress: number;
  eta: string;
  channel: string;
}

const ORDERS: Order[] = [
  {
    id: "ORD-2024-001",
    customer: "Sarah Johnson",
    items: 3,
    status: "delivered",
    progress: 100,
    eta: "Delivered",
    channel: "WhatsApp",
  },
  {
    id: "ORD-2024-002",
    customer: "Mike Chen",
    items: 1,
    status: "shipped",
    progress: 75,
    eta: "Tomorrow",
    channel: "Instagram",
  },
  {
    id: "ORD-2024-003",
    customer: "Emma Davis",
    items: 5,
    status: "processing",
    progress: 50,
    eta: "2 days",
    channel: "Messenger",
  },
];

const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    label: "Pending",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  processing: {
    icon: Package,
    label: "Processing",
    color: "text-information",
    bg: "bg-information/10",
  },
  shipped: {
    icon: Truck,
    label: "Shipped",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  delivered: {
    icon: CheckCircle2,
    label: "Delivered",
    color: "text-success",
    bg: "bg-success/10",
  },
};

const METRICS = [
  { icon: Package, label: "Orders Today", value: "247", color: "text-primary" },
  {
    icon: TrendingUp,
    label: "In Transit",
    value: "89",
    color: "text-information",
  },
  {
    icon: CheckCircle2,
    label: "Delivered",
    value: "156",
    color: "text-success",
  },
  {
    icon: MessageCircle,
    label: "Notifications",
    value: "524",
    color: "text-secondary",
  },
];

const OrderManagement: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(
    ORDERS[0]?.id ?? null,
  );

  return (
    <section
      aria-label="Order Management"
      className="relative overflow-hidden py-24 sm:py-28 bg-linear-to-b from-white  via-primary-light to-white"
    >
      <LandingContainer className="space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <SectionEyebrow className="mb-5">Order Management</SectionEyebrow>

          <GradientHeadline
            lead="Complete Order"
            accent="Control"
            as="h2"
            align="center"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.15 }}
            className="mt-5 mx-auto max-w-3xl body-regular-16 text-grey-medium sm:text-[17px] sm:leading-[28px]"
          >
            Manage orders seamlessly across all channels. Track shipments,
            automate notifications, and keep customers informed every step of
            the way.
          </motion.p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {METRICS.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-grey-light/60 bg-white p-4 sm:p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="label-medium-14 text-grey-medium">
                      {metric.label}
                    </p>
                    <p className="mt-2 h3-bold-32 text-base-black">
                      {metric.value}
                    </p>
                  </div>
                  <Icon className={`h-6 w-6 flex-shrink-0 ${metric.color}`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Order List */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-3"
          >
            <h3 className="body-bold-16 text-base-black mb-4">Active Orders</h3>

            {ORDERS.map((order, idx) => {
              const isSelected = selectedOrder === order.id;
              const config = STATUS_CONFIG[order.status];
              const Icon = config.icon;

              return (
                <motion.button
                  key={order.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => setSelectedOrder(order.id)}
                  className={`w-full text-left transition-all rounded-xl border p-4 ${
                    isSelected
                      ? "border-primary/40 bg-primary/5 shadow-md"
                      : "border-grey-light/60 bg-white hover:border-grey-light hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="body-bold-14 text-base-black">{order.id}</p>
                      <p className="label-regular-14 text-grey-medium mt-0.5">
                        {order.customer}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ${config.bg} ${config.color}`}
                    >
                      <Icon className="h-3 w-3" />
                      {config.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-grey-light/40 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${order.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08 + 0.2, duration: 1 }}
                        className="h-full bg-primary"
                      />
                    </div>
                    <span className="text-xs font-medium text-grey-medium">
                      {order.progress}%
                    </span>
                  </div>

                  <p className="label-regular-12 text-grey-medium mt-2">
                    ETA: {order.eta}
                  </p>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Right: Order Details */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl border border-grey-light/60 bg-white p-6 sm:p-8"
          >
            {selectedOrder ? (
              <div className="space-y-6">
                {(() => {
                  const order = ORDERS.find((o) => o.id === selectedOrder);
                  if (!order) return null;
                  const config = STATUS_CONFIG[order.status];
                  const Icon = config.icon;

                  return (
                    <>
                      {/* Header */}
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="h4-semi-bold-24 text-base-black">
                              {order.id}
                            </h3>
                            <p className="body-regular-14 text-grey-medium mt-1">
                              {order.customer}
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${config.bg} ${config.color}`}
                          >
                            <Icon className="h-4 w-4" />
                            {config.label}
                          </span>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-4">
                        <p className="label-bold-14 text-grey-medium">
                          Status Timeline
                        </p>
                        <div className="space-y-3">
                          {[
                            "pending",
                            "processing",
                            "shipped",
                            "delivered",
                          ].map((status, idx) => {
                            const isCompleted =
                              [
                                "pending",
                                "processing",
                                "shipped",
                                "delivered",
                              ].indexOf(order.status) >= idx;
                            const statusConfig =
                              STATUS_CONFIG[
                                status as keyof typeof STATUS_CONFIG
                              ];
                            const StatusIcon = statusConfig.icon;

                            return (
                              <div
                                key={status}
                                className="flex items-center gap-3"
                              >
                                <div
                                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                    isCompleted
                                      ? "bg-success/10"
                                      : "bg-grey-light/40"
                                  }`}
                                >
                                  <StatusIcon
                                    className={`h-4 w-4 ${
                                      isCompleted
                                        ? "text-success"
                                        : "text-grey-medium"
                                    }`}
                                  />
                                </div>
                                <span
                                  className={`body-medium-14 ${
                                    isCompleted
                                      ? "text-base-black"
                                      : "text-grey-medium"
                                  }`}
                                >
                                  {statusConfig.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="rounded-lg bg-grey-light/20 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="label-regular-14 text-grey-medium">
                            Items
                          </span>
                          <span className="body-bold-14 text-base-black">
                            {order.items} items
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="label-regular-14 text-grey-medium">
                            Channel
                          </span>
                          <Badge
                            title={order.channel}
                            bgColor="bg-primary-light/60"
                            textColor="text-primary"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="label-regular-14 text-grey-medium">
                            ETA
                          </span>
                          <span className="body-bold-14 text-success">
                            {order.eta}
                          </span>
                        </div>
                      </div>

                      {/* Action */}
                      <Button
                        variant="primary"
                        label="Send Update to Customer"
                        className="w-full"
                      />
                    </>
                  );
                })()}
              </div>
            ) : null}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8 sm:p-12 text-center"
        >
          <h3 className="h3-bold-32 text-base-black mb-3">
            Ready to streamline your orders?
          </h3>
          <p className="body-regular-16 text-grey-medium mx-auto max-w-2xl mb-8">
            Chatblix Order Management gives you complete visibility and control
            over every order, from creation to delivery.
          </p>
          <div className="flex justify-center items-center">
            <Button variant="primary" label="Start Free Trial" size="lg" />
          </div>
        </motion.div>
      </LandingContainer>
    </section>
  );
};

export default OrderManagement;
