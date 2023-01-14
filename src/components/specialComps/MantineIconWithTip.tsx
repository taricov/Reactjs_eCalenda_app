import { ActionIcon, Tooltip } from "@mantine/core";
import { IconType } from "react-icons";

interface Props {
  tip?: string | undefined;
  Icon: IconType;
  iconSize?: number | undefined;
}

export default function IconWithTooltip({
  Icon,
  iconSize = undefined,
  tip = undefined,
}: Props) {
  return (
    <ActionIcon
      className="flex justify-center align-center"
      value={"notifications"}
      // onClick={useActivityLog}
    >
      <Tooltip label={tip}>
        <Icon size={iconSize} />
      </Tooltip>
    </ActionIcon>
  );
}
