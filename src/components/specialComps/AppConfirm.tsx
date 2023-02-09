import { Button, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { xTimesAtom } from "../../store/jotai";

// const removeEvent = (id: string) => {};

export const ConfirmationModal: any = (id: any, setEvents: any, events: any) =>
  openConfirmModal({
    title: "Delete Event",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to delete this event? This action will remove the
        event eCalenda and can <b>NOT </b>be undone.
      </Text>
    ),
    labels: {
      confirm: (
        <>
          <Button title="Delete" bg={"red"} />
        </>
      ),
      cancel: "Back",
    },
    confirmProps: { color: "red" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => {
      setEvents(events.filter((eve: any) => eve.id !== id));
    },
  });
