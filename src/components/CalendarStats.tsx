import {
  ActionIcon,
  Center,
  Flex,
  Group,
  Indicator,
  Space,
  Text,
} from "@mantine/core";
import { BsClockHistory, BsDot } from "react-icons/bs";
import { MdDone } from "react-icons/md";

export default function CalendarStats() {
  return (
    <>
      <Center>
        <Flex className="bg-app-color-100 items-center justify-around rounded px-10 xs:flex-row flex-col dark:bg-opacity-5 z-10">
          <Flex align="center" c="dimmed">
            <Text size={"xs"} mx={5} fw="bold">
              22
            </Text>
            <Text size={"xs"}>Completed</Text>
          </Flex>
          <Indicator
            className={`xs:inline hidden`}
            mx={5}
            size={2}
            color="gray"
          >
            {" "}
          </Indicator>
          {/* <ActionIcon className={`xs:inline hidden`}>
            <BsDot className=" dark:text-app-color-500" />
          </ActionIcon> */}
          <Flex align="center" c="red">
            <Text size={"xs"} mx={5} fw="bold">
              1
            </Text>
            <Text size={"xs"}>Right Now</Text>
          </Flex>
          <Indicator className={`xs:inline hidden`} mx={5} size={2} color="red">
            {" "}
          </Indicator>
          {/* <ActionIcon className={`xs:inline hidden`}>
            <BsDot className="dark:text-app-color-500" />
          </ActionIcon> */}
          <Flex align="center" c="green">
            <Text size={"xs"} mx={5} fw="bold">
              22
            </Text>
            <Text size={"xs"}>Scheduled</Text>
          </Flex>
          <Indicator
            className={`xs:inline hidden`}
            mx={5}
            size={2}
            color="green"
          >
            {" "}
          </Indicator>
          {/* <ActionIcon className={`xs:inline hidden`}>
            <BsDot className=" dark:text-app-color-500" />
          </ActionIcon> */}
        </Flex>
      </Center>
    </>
  );
}
