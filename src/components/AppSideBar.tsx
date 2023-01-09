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
  userInfoAtom,
} from "../store/jotai";
import myImg from "../assets/me.jpg";
import { BsBell, BsEnvelope, BsGear } from "react-icons/bs";
import { GiNothingToSay } from "react-icons/gi";
import Tooltip from "./MantineTooltip";
import { useActivityLog } from "../hooks/useActivityLog";
import ClusterIcon from "./ClusterIcon";
import SettingsDrawer from "./SettingsDrawer";
import { MantineModal } from "./MantineModal";
import { AiOutlineEdit } from "react-icons/ai";
import { openEditProfileModal } from "./ModalEditProfile";
import { useHotkeys } from "@mantine/hooks";

// =========================== EditPRofile imports
import { TextInput } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { AiOutlineCheck } from "react-icons/ai";
import { userInfoDisabledAtom } from "../store/jotai";

// =========================== EditPRofile Modal starts
// const openEditProfileModal = () =>
//   MantineModal(
//     "Edit Profile",
//     ReactNodes(),
//     { confirm: "Apply", cancel: "Discard" },
//     onEditProfileModalCancel,
//     onEditProfileModalConfirm
//   );

// =========================== EditPRofile Modal ends
// const ss = () =>
//   MantineModal(
//     "Edit Profile",
//     () => {
//       return (
//         <>
//           <Text size="sm">This is a modal</Text>
//           <Text size="sm">This is a modal</Text>
//           <Text size="sm">This is a modal</Text>
//         </>
//       );
//     },
//     { confirm: "Apply", cancel: "Discard" },
//     onEditProfileModalCancel,
//     onEditProfileModalConfirm
//   );
export default function AppSideBar() {
  const [toggleNav] = useAtom(navBarToggleAtom);
  console.log(toggleNav);
  const [settingsOpened, setSettingsOpened] = useAtom(settingsDrawerOpen);
  useHotkeys([["mod+j", () => setSettingsOpened((opened) => !settingsOpened)]]);

  //   const [newLog, setNewLog] = useAtom(loggerAtom);
  // const loggerAct = (e) => {

  //   useActivityLog(x)
  // }

  // const onEditProfileModalCancel = () => {
  //   console.log("onEditProfileModalCancel");
  // };
  // const onEditProfileModalConfirm = () => {
  //   console.log("onEditProfileModalConfirmed");
  // };

  // const openEditProfileModal = () =>
  //   MantineModal(
  //     "Edit Profile",
  //     ReactNodes(),
  //     { confirm: "Apply", cancel: "Discard" },
  //     onEditProfileModalCancel,
  //     onEditProfileModalConfirm
  //   );

  // Edit Personal Profile Modal::Start

  // const onEditProfileModalCancel = () => {
  //   console.log("onEditProfileModalCancel");
  //   console.log(ReactNodes);
  // };
  // const onEditProfileModalConfirm = () => {
  //   console.log("onEditProfileModalConfirmed");
  // };
  // const openEditProfileModal = () =>
  //   MantineModal(
  //     "New modal",
  //     ReactNodes(),
  //     { confirm: "cin", cancel: "cancel" },
  //     onEditProfileModalCancel,
  //     onEditProfileModalConfirm
  //   );
  // Edit Personal Profile Modal::Finish

  const [userInfo] = useAtom(userInfoAtom);
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
            {userInfo.user_name}
          </Text>
          <Text className="italic" size="xs" color="dimmed">
            {userInfo.user_email}
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
          <ActionIcon onClick={() => openEditProfileModal()}>
            <Tooltip label={"tooltip"}>
              <AiOutlineEdit />
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
              const { id, name, color } = proj;
              return (
                <>
                  <Checkbox
                    classNames={{
                      label: "pl-1 mr-4",
                      input: `checked:bg-[${color}] checked:border-none`,
                      root: "cursor:pointer",
                    }}
                    key={id}
                    value={id}
                    label={color}
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
