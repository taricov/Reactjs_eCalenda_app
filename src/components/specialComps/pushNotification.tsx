import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

export const pushNotification = (
  title: string,
  message: string,
  color: string,
  Icon: any
) => {
  showNotification({
    title,
    message,
    color,
    icon: <Icon size={18} />,
  });
};
