import { Button, MantineNumberSize } from "@mantine/core";
import React from "react";

interface Props {
  title: string;
  variant?:
    | "gradient"
    | "filled"
    | "outline"
    | "light"
    | "white"
    | "default"
    | "subtle"
    | undefined;
  radius?: MantineNumberSize | undefined;
  color?: string;
  disabled?: boolean;
  rel?: string;
  component?: any;
  target?: string;
  href?: any;
  // to: HTMLAnchorElement | string | undefined;
  Icon?: React.ReactNode;
  laoding?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  // Icon?: React.ElementType;
}
const MantineBtn = ({
  title,
  variant = "default",
  radius = undefined,
  disabled = false,
  // loading = false,
  color = "bg-primary-600 hover:bg-primary-700 transition-all duration-trans text-white hover:text-white mt-5",
  Icon = undefined,
  component = "a",
  rel = "noopener noreferrer",
  target = "_blank",
  href,
  type = undefined,
}: Props) => {
  return (
    <>
      <Button
        className={`${color}`}
        // color={color}
        component={component}
        rel={rel}
        target={target}
        radius={radius}
        title={title}
        variant={variant}
        disabled={disabled}
        leftIcon={Icon}
        href={href}
        type={type}
        // loading={loading}
      >
        {title}
      </Button>
    </>
  );
};

export default MantineBtn;
