import { Center, Container, Modal, Space, Text, Timeline } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useAtom } from "jotai";
import { AiFillBug } from "react-icons/ai";
import { GiNewShoot } from "react-icons/gi";
import { isOpen } from "../../store/jotai";
import { RiSpeedFill } from "react-icons/ri";

export default function AppHelp() {
  const [isOpened, setIsOpened] = useAtom(isOpen);

  useHotkeys([
    [
      "alt+h",
      () => setIsOpened({ ...isOpened, help_modal: !isOpened.help_modal }),
    ],
  ]);
  return (
    <>
      <Modal
        title="Updates"
        classNames={{ title: "font-bold text-xl" }}
        transition={"slide-down"}
        opened={isOpened.help_modal}
        onClose={() => setIsOpened({ ...isOpened, help_modal: false })}
        fullScreen
      >
        <Center className="bg-app-color-200 rounded bg-opacity-5 py-4 px-2 m-auto w-5/6">
          Your Guide to easily understand/navigate the updates
        </Center>
        <Space h={10} />
        <Container mx={10}>
          <Timeline active={1} bulletSize={24} lineWidth={2}>
            <Timeline.Item bullet={<GiNewShoot size={12} />} title="New branch">
              <Text color="dimmed" size="sm">
                You&apos;ve created new branch{" "}
                <Text variant="link" component="span" inherit>
                  fix-notifications
                </Text>{" "}
                from master
              </Text>
              <Text size="xs" mt={4}>
                2 hours ago
              </Text>
            </Timeline.Item>

            <Timeline.Item bullet={<AiFillBug size={12} />} title="Commits">
              <Text color="dimmed" size="sm">
                You&apos;ve pushed 23 commits to
                <Text variant="link" component="span" inherit>
                  fix-notifications branch
                </Text>
              </Text>
              <Text size="xs" mt={4}>
                52 minutes ago
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Pull request"
              bullet={<GiNewShoot size={12} />}
              lineVariant="dashed"
            >
              <Text color="dimmed" size="sm">
                You&apos;ve submitted a pull request
                <Text variant="link" component="span" inherit>
                  Fix incorrect notification message (#187)
                </Text>
              </Text>
              <Text size="xs" mt={4}>
                34 minutes ago
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Code review"
              bullet={<RiSpeedFill size={12} />}
            >
              <Text color="dimmed" size="sm">
                <Text variant="link" component="span" inherit>
                  Robert Gluesticker
                </Text>{" "}
                left a code review on your pull request
              </Text>
              <Text size="xs" mt={4}>
                12 minutes ago
              </Text>
            </Timeline.Item>
          </Timeline>
        </Container>
      </Modal>
    </>
  );
}
