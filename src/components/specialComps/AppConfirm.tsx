import { Button, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { xTimesAtom } from "../../store/jotai";

// const removeEvent = (id: string) => {};

export const ConfirmationModal: any = (id: any, setEvents: any, events: any) =>
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
    onConfirm: () => {
      setEvents(events.filter((eve: any) => eve.id !== id));
    },
  });
