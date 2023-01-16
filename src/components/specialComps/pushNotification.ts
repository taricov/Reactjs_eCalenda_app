import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

export const pushNotification = (
  title: string,
  message: string,
  color: string,
  icon?: any
) => {
  showNotification({
    title,
    message,
    color,
    icon,
  });
};
