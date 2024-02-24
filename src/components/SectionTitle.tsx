interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text: string;
}

export function SectionTitle({ text, ...others }: SectionTitleProps) {
  return (
    <h2 className="text-lg font-semibold" {...others}>
      {text}
    </h2>
  );
}
