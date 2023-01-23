import { Button, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";

export const ConfirmationModal = (xHappens: any) =>
  openConfirmModal({
    title: "Cancel Event",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to delete your profile? This action is destructive
        and you will have to contact support to restore your data.
      </Text>
    ),
    labels: { confirm: "Delete", cancel: "Back" },
    confirmProps: { color: "red" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => xHappens,
  });
