import {
  ActionIcon,
  Avatar,
  Badge,
  Checkbox,
  Container,
  Flex,
  Grid,
  Navbar,
  Progress,
  Space,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useAtom } from "jotai";
import {
  createdClusters,
  createdProjects,
  loggerAtom,
  navBarToggleAtom,
  predefinedDraggables,
  settingsDrawerOpen,
} from "../store/jotai";
import myImg from "../assets/me.jpg";
import { BsBell, BsEnvelope, BsGear } from "react-icons/bs";
import { GiNothingToSay } from "react-icons/gi";
import Tooltip from "./MantineTooltip";
import { useActivityLog } from "../hooks/useActivityLog";
import ClusterIcon from "./ClusterIcon";
import SettingsDrawer from "./SettingsDrawer";

export default function AppSideBar() {
  const [toggleNav] = useAtom(navBarToggleAtom);
  console.log(toggleNav);
  const [settingsOpened, setSettingsOpened] = useAtom(settingsDrawerOpen);

  //   const [newLog, setNewLog] = useAtom(loggerAtom);
  // const loggerAct = (e) => {

  //   useActivityLog(x)
  // }
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={toggleNav}
      width={{ sm: 200, lg: 300 }}
    >
      <Container>
        <Flex direction={"column"} align="center">
          <Avatar
            classNames={{ root: "m-0" }}
            className="mx-auto my-3"
            component="a"
            radius={50}
            size="xl"
            href="#"
            // target="_blank"
            src={myImg}
            alt="Taric Ov"
          />
          <Text size="lg" color="bold">
            Taric Ov
          </Text>
          <Text className="italic" size="xs" color="dimmed">
            taricov1@gmail.com
          </Text>
        </Flex>
        <Flex gap={12} className="my-2" align="center" justify="center">
          <SettingsDrawer
            closedIt={settingsOpened}
            closeIt={() => setSettingsOpened(false)}
          />
          <ActionIcon onClick={() => setSettingsOpened(true)}>
            <Tooltip label={"tooltip"}>
              <BsGear />
            </Tooltip>
          </ActionIcon>
          <ActionIcon onClick={() => console.log("ff")}>
            <Tooltip label={"tooltip"}>
              <BsEnvelope />
            </Tooltip>
          </ActionIcon>
          <ActionIcon
            className="flex justify-center align-center"
            value={"xxx"}
            onClick={useActivityLog}
          >
            <Tooltip label={"tooltip"}>
              <BsBell />
            </Tooltip>
          </ActionIcon>
        </Flex>

        <Container className="p-0">
          <Tooltip label={"Usage"}>
            <Progress size="xs" value={20} />
          </Tooltip>
        </Container>
        <Flex direction={"column"} className="pt-4">
          <Text className="tracking-widest mb-2" opacity={0.5} size={"sm"}>
            Projects
          </Text>
          <Checkbox.Group
            spacing={1}
            defaultValue={createdProjects.map((x) => x.id)}
          >
            {createdProjects.map((proj: any) => {
              const { id, name } = proj;
              return (
                <>
                  <Checkbox
                    classNames={{ label: "pl-1 mr-4" }}
                    key={id}
                    value={id}
                    label={name}
                  />
                </>
              );
            })}
          </Checkbox.Group>
        </Flex>
        <Flex direction={"column"} className="pt-4">
          <Text className="tracking-widest mb-2" opacity={0.5} size={"sm"}>
            Clusters
          </Text>
          {createdClusters.map((cluster: any) => {
            const { id, name, color } = cluster;
            return (
              <Flex key={id} className="cursor-pointer mb-2">
                <ClusterIcon iconColor={color} />
                <Text className="text-sm pl-2">{name}</Text>
              </Flex>
            );
          })}
        </Flex>
        <Flex direction={"column"} className="pt-4" id="events__container">
          <Text className="tracking-widest mb-2" opacity={0.5} size={"sm"}>
            Regular
          </Text>
          <Flex direction={"column"} id="events__container">
            {predefinedDraggables.map((predefined: any) => {
              const { id, title, color, variant, gradiant } = predefined;
              return (
                <>
                  <Badge
                    key={id}
                    className="fc-event mb-1 hover:cursor-move"
                    variant={variant}
                    color={color}
                    gradient={gradiant}
                    onClickCapture={() => console.log("this")}
                  >
                    {title}
                  </Badge>
                </>
              );
            })}
          </Flex>
        </Flex>
      </Container>
    </Navbar>
  );
}
