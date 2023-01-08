import { MantineColor, MantineTransition, Tooltip } from "@mantine/core";
import React from "react";

interface Props {
  label: string | undefined;
  color?: MantineColor | undefined;
  trans?: MantineTransition | undefined;
  transitionDuration?: number;
  openDelay?: number;
  closeDelay?: number;
  multiline?: boolean;
  position?: string;
  withArrow?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}
const MantineTooltip = ({
  label,
  children,
  color = undefined,
  trans = "fade",
  transitionDuration = 100,
  openDelay = 0,
  closeDelay = 0,
  multiline = false,
  withArrow = true,
  disabled = false,
}: Props) => {
  return (
    <Tooltip
      classNames={{
        tooltip: "text-xs bg-primary-800 dark:bg-slate-700",
      }}
      label={label}
      disabled={disabled}
      color={color}
      multiline
      withArrow
      offset={2}
      position="top"
      transition={trans}
      transitionDuration={transitionDuration}
      openDelay={openDelay}
      closeDelay={closeDelay}
    >
      <div className="">{children}</div>
    </Tooltip>
  );
};

export default MantineTooltip;
