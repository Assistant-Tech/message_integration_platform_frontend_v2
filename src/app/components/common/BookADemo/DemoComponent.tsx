import DemoFormContent from "./DemoFormContent";

const DemoComponent = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`w-full bg-white rounded-xl overflow-hidden shadow-sm border border-grey-light ${className}`}
    >
      <DemoFormContent isFullPage={true} />
    </div>
  );
};
export default DemoComponent;
