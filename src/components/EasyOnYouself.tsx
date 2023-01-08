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

export default function EasyOnYourself() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        transition={"slide-down"}
        opened={opened}
        onClose={() => setOpened(false)}
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
              onClick={() => setOpened(false)}
            >
              Back To Work
            </Button>
          </Stack>
        </Container>
      </Modal>
      <Group position="center">
        <ActionIcon onClick={() => setOpened(true)}>
          <AiOutlineCoffee />
        </ActionIcon>
      </Group>
    </>
  );
}
