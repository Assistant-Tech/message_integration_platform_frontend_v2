import DemoFormContent from "./DemoFormContent";

const DemoComponent = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full bg-white ${className}`}>
      <DemoFormContent isFullPage={true} />
    </div>
  );
};
export default DemoComponent;
