import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui";
import {
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { SectionEyebrow } from "./_shared";

const inventoryMetrics = [
  { label: "Total Items", value: "2,547", icon: Package, color: "text-primary" },
  { label: "Low Stock", value: "12", icon: AlertCircle, color: "text-warning" },
  { label: "In Transit", value: "89", icon: TrendingUp, color: "text-information" },
  { label: "Ready to Ship", value: "156", icon: CheckCircle2, color: "text-success" },
];

const topProducts = [
  {
    name: "Premium Bluetooth Speaker",
    sku: "SKU-2024-001",
    stock: 245,
    status: "In Stock",
    trend: "+12%",
  },
  {
    name: "Wireless Charging Pad",
    sku: "SKU-2024-002",
    stock: 89,
    status: "Low Stock",
    trend: "-8%",
  },
  {
    name: "USB-C Cable Bundle",
    sku: "SKU-2024-003",
    stock: 567,
    status: "In Stock",
    trend: "+23%",
  },
  {
    name: "Phone Case (Black)",
    sku: "SKU-2024-004",
    stock: 12,
    status: "Critical",
    trend: "-45%",
  },
  {
    name: "Screen Protector Pack",
    sku: "SKU-2024-005",
    stock: 423,
    status: "In Stock",
    trend: "+15%",
  },
];

const InventoryManagement: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedMetric((prev) => (prev + 1) % inventoryMetrics.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white via-surface-sky/30 to-white py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-8 xl:px-12 2xl:px-0">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <SectionEyebrow>Inventory Management</SectionEyebrow>
          <h2 className="mt-4 font-meri text-[32px] sm:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] text-grey">
            Real-Time Inventory Tracking
          </h2>
          <p className="mt-5 mx-auto max-w-2xl body-regular-16 text-grey-medium sm:text-[17px] sm:leading-[28px]">
            Monitor stock levels, track inventory movements, and optimize your supply
            chain with real-time updates and intelligent forecasting.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {inventoryMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const isSelected = index === selectedMetric;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedMetric(index)}
                className={`rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "bg-primary/10 border border-primary/30 shadow-[0_20px_40px_-12px_rgba(46,94,153,0.2)]"
                    : "bg-white border border-grey-light/60 hover:border-grey-light hover:shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="label-medium-14 text-grey-medium">{metric.label}</p>
                    <p className="mt-2 h3-bold-32 text-base-black">{metric.value}</p>
                  </div>
                  <Icon className={`h-6 w-6 flex-shrink-0 ${metric.color}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Top Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl border border-grey-light/60 bg-white shadow-sm overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-6 border-b border-grey-light/60 bg-primary/5">
            <h3 className="body-bold-16 text-base-black">Top Products by Movement</h3>
            <p className="body-regular-14 text-grey-medium mt-1">
              Monitor your fastest-moving inventory items
            </p>
          </div>

          {/* Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="hidden md:table-header-group border-b border-grey-light/60 bg-grey-light/20">
                <tr>
                  <th className="px-6 py-4 label-bold-14 text-grey">Product Name</th>
                  <th className="px-6 py-4 label-bold-14 text-grey">SKU</th>
                  <th className="px-6 py-4 label-bold-14 text-grey">Stock Level</th>
                  <th className="px-6 py-4 label-bold-14 text-grey">Status</th>
                  <th className="px-6 py-4 label-bold-14 text-grey">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-grey-light/60">
                {topProducts.map((product, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-grey-light/20 transition-colors block md:table-row mb-4 md:mb-0 border-4 md:border-0 border-grey-light/40 rounded-lg md:rounded-none p-4 md:p-0"
                  >
                    <td className="px-6 py-4 before:content-['Product_Name'] md:before:content-none text-xs text-grey-medium md:text-grey font-medium md:font-normal block md:table-cell mb-2 md:mb-0">
                      <span className="block md:hidden mr-2">Product:</span>
                      <p className="body-bold-14 text-base-black">{product.name}</p>
                    </td>
                    <td className="px-6 py-4 before:content-['SKU'] md:before:content-none text-xs text-grey-medium md:text-grey font-medium md:font-normal block md:table-cell mb-2 md:mb-0">
                      <span className="block md:hidden mr-2">SKU:</span>
                      <code className="body-medium-14 text-grey bg-grey-light/40 px-2 py-1 rounded inline-block">
                        {product.sku}
                      </code>
                    </td>
                    <td className="px-6 py-4 before:content-['Stock'] md:before:content-none text-xs text-grey-medium md:text-grey font-medium md:font-normal block md:table-cell mb-2 md:mb-0">
                      <span className="block md:hidden mr-2">Stock:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-grey-light/40 overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{
                              width: `${Math.min((product.stock / 600) * 100, 100)}%`,
                            }}
                          />
                        </div>
                        <span className="body-bold-14 text-base-black min-w-[50px]">
                          {product.stock}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 before:content-['Status'] md:before:content-none text-xs text-grey-medium md:text-grey font-medium md:font-normal block md:table-cell mb-2 md:mb-0">
                      <span className="block md:hidden mr-2">Status:</span>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          product.status === "In Stock"
                            ? "bg-success/15 text-success"
                            : product.status === "Low Stock"
                              ? "bg-warning/15 text-warning"
                              : "bg-danger/15 text-danger"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 before:content-['Trend'] md:before:content-none text-xs text-grey-medium md:text-grey font-medium md:font-normal block md:table-cell">
                      <span className="block md:hidden mr-2">Trend:</span>
                      <span
                        className={`body-bold-14 ${
                          product.trend.startsWith("+")
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {product.trend}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-5 border-t border-grey-light/60 bg-grey-light/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="body-regular-14 text-grey-medium">
              Last updated: 2 minutes ago
            </p>
            <Button variant="secondary" label="View Full Inventory" size="sm" />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Button
            variant="primary"
            label="Start Managing Inventory"
            className="px-8"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default InventoryManagement;
