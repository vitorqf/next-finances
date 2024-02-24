interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  title: string;
  icon?: React.ReactNode;
}

export function Button({
  variant = "primary",
  title,
  icon,
  ...others
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} {...others}>
      {icon}
      {title}
    </button>
  );
}
