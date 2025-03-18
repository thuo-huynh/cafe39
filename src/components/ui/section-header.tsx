interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <h2 className="text-xl font-semibold text-foreground tracking-tight">
      {title}
    </h2>
  );
}
