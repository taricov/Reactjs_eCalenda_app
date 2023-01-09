import { Button, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { ConfirmModalProps } from "@mantine/modals/lib/ConfirmModal";

export const MantineModal = (
  title: string,
  children: any,
  labels: { confirm: string; cancel: string },
  onCancel: any,
  onConfirm: any
) => {
  openConfirmModal({
    title,
    children,
    labels,
    onCancel,
    onConfirm,
  });
};
