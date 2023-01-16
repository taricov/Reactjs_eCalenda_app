import {
  ActionIcon,
  Button,
  Container,
  Group,
  Modal,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { AiOutlineCoffee } from "react-icons/ai";
import { useState } from "react";
import { useHotkeys } from "@mantine/hooks";
import { useAtom } from "jotai";
import { isOpen } from "../../store/jotai";

export default function EasyOnYourself() {
  const [isOpened, setIsOpened] = useAtom(isOpen);

  useHotkeys([
    [
      "mod+'",
      () => setIsOpened({ ...isOpened, easy_modal: !isOpened.easy_modal }),
    ],
  ]);
  return (
    <>
      <Modal
        transition={"slide-down"}
        opened={isOpened.easy_modal}
        onClose={() => setIsOpened({ ...isOpened, easy_modal: false })}
        fullScreen
      >
        <Container>
          <Title
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            sx={{ fontFamily: "Greycliff CF, sans-serif" }}
            ta="center"
            fw={700}
            order={2}
          >
            Hey, You are doing great job!
          </Title>
          <Title order={4} align="center" weight={400}>
            You have been working for{" "}
            <Text
              className="inline"
              fs="italic"
              fw="500"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            >
              4 hours
            </Text>{" "}
            long 👏
          </Title>
          <Space h={20} />
          <Title order={1} align="center" weight={600}>
            Take Some Rest!
          </Title>
          <Stack className="my-10">
            <Button
              classNames={{
                root: "w-fit m-auto",
              }}
              variant="outline"
              onClick={() => setIsOpened({ ...isOpened, easy_modal: false })}
            >
              Back To Work
            </Button>
          </Stack>
        </Container>
      </Modal>
    </>
  );
}
