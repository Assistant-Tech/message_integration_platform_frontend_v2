import * as Dialog from "@radix-ui/react-dialog";
import { Button, Input } from "@/app/components/ui";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: any;
  duration: "MONTHLY" | "YEARLY";
}

export const CheckoutDialog = ({
  open,
  onOpenChange,
  plan,
  duration,
}: CheckoutDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[800px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Left side - Billing form */}
            <div>
              <h2 className="text-lg font-semibold">Billing Information</h2>
              <p className="mt-1 text-sm text-gray-500">
                {plan.name} ({duration})
              </p>

              <div className="mt-4 space-y-3">
                <Input placeholder="Full Name" defaultValue="Jane Doe" />
                <Input placeholder="Your Country" defaultValue="Nepal" />
                <Input
                  placeholder="Number of staffs"
                  type="number"
                  defaultValue={3}
                />

                <div className="flex gap-2">
                  <Button variant="outlined" label="Khati" />
                  <Button variant="outlined" label="eSewa" />
                  <Button variant="outlined" label="Stripe" />
                </div>

                <div className="flex gap-2 mt-2">
                  <Input placeholder="Add a promo code" />
                  <Button variant="outlined" label="Apply" />
                </div>
              </div>
            </div>

            {/* Right side - Invoice */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold">Invoice</h3>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <p>Plan Name: {plan.name}</p>
                <p>
                  Payment Type: {duration === "YEARLY" ? "Yearly" : "Monthly"}
                </p>
                <p>Payment Option: Khati</p>
              </div>

              <div className="mt-6 border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    Rs.{" "}
                    {duration === "YEARLY"
                      ? plan.yearlyPrice
                      : plan.monthlyPrice}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (13%)</span>
                  <span>
                    Rs.{" "}
                    {Math.round(
                      (duration === "YEARLY"
                        ? plan.yearlyPrice
                        : plan.monthlyPrice) * 0.13,
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    Rs.{" "}
                    {Math.round(
                      (duration === "YEARLY"
                        ? plan.yearlyPrice
                        : plan.monthlyPrice) * 1.13,
                    )}
                  </span>
                </div>
              </div>

              <Button className="mt-6 w-full" label="Confirm and Pay" />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
