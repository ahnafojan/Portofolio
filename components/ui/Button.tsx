import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "dark" | "danger" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type BaseButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type LinkButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variants: Record<ButtonVariant, string> = {
  primary: "bg-nb-yellow text-nb-text shadow-hard",
  secondary: "bg-nb-surface text-nb-text shadow-hard",
  outline: "bg-nb-surface text-nb-text shadow-hard",
  ghost: "bg-nb-surface text-nb-text shadow-hard",
  dark: "bg-nb-text text-white shadow-hard-yellow",
  danger: "bg-nb-danger text-white shadow-hard",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

const baseClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 nb-border font-bold uppercase tracking-[0.03em] transition-[transform,box-shadow] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nb-yellow disabled:pointer-events-none disabled:opacity-40 disabled:shadow-hard";

function classNames(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(
    baseClass,
    sizes[size],
    variants[variant],
    "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0.5 active:translate-y-0.5 active:[box-shadow:2px_2px_0px_#111111]",
    variant === "dark" && "active:[box-shadow:2px_2px_0px_#FFD447]",
    className,
  );
}

export default function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", className } = props;

  if ("href" in props && props.href) {
    const {
      href,
      children: _children,
      variant: _variant,
      size: _size,
      className: _className,
      ...linkProps
    } = props;
    void _children;
    void _variant;
    void _size;
    void _className;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");

    if (isExternal) {
      return (
        <a className={classNames(variant, size, className)} href={href} {...linkProps}>
          {children}
        </a>
      );
    }

    return (
      <Link className={classNames(variant, size, className)} href={href} {...linkProps}>
        {children}
      </Link>
    );
  }

  const nativeProps = props as NativeButtonProps;
  const {
    children: _children,
    variant: _variant,
    size: _size,
    className: _className,
    type = "button",
    ...buttonProps
  } = nativeProps;
  void _children;
  void _variant;
  void _size;
  void _className;

  return (
    <button className={classNames(variant, size, className)} type={type} {...buttonProps}>
      {children}
    </button>
  );
}
