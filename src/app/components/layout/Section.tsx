import Container from "@/app/components/layout/Container";

interface SectionProps {
  children: React.ReactNode;
  useContainer?: boolean;
}

const Section = ({ children, useContainer = true }: SectionProps) =>
  useContainer ? <Container>{children}</Container> : <>{children}</>;

export default Section;
