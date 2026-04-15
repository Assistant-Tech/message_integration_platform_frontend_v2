import { ModalMessageBox } from "../ui";

const OrderModals = ({
  showConfirm,
  showSuccess,
  onConfirm,
  onCancel,
  onSuccess,
}: any) => {
  return (
    <>
      {showConfirm && (
        <ModalMessageBox
          type="success"
          title="Confirm Order?"
          confirmLabel="Yes"
          cancelLabel="Cancel"
          onConfirm={onConfirm}
          onCancel={onCancel}
          description={"Are you sure you want to place this order?"}
        />
      )}

      {showSuccess && (
        <ModalMessageBox
          type="success"
          title="Order Placed!"
          confirmLabel="OK"
          onConfirm={onSuccess}
          onCancel={onSuccess}
          description={"Are you sure you want to place this order?"}
        />
      )}
    </>
  );
};

export default OrderModals;
