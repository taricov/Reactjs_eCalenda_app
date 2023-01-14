import { C } from "@fullcalendar/core/internal-common";
import {
  ActionIcon,
  Avatar,
  Badge,
  Checkbox,
  Container,
  Flex,
  Navbar,
  Progress,
  Text,
} from "@mantine/core";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { useAtom } from "jotai";
import { AiOutlineEdit } from "react-icons/ai";
import { BsBell, BsGear } from "react-icons/bs";
import myImg from "../assets/me.jpg";
import { useActivityLog } from "../hooks/useActivityLog";
import {
  createdClustersAtom,
  createdProjectsAtom,
  navBarToggleAtom,
  predefinedDraggables,
  settingsDrawerOpen,
  userInfoAtom,
} from "../store/jotai";
import ClusterIcon from "./ClusterIcon";
import Tooltip from "./MantineTooltip";
import { openEditProfileModal } from "./ModalEditProfile";
import SettingsDrawer from "./SettingsDrawer";
import AppEditProfile from "./specialComps/AppEditProfile";
import AppSettings from "./specialComps/AppSettings";
import IconWithTooltip from "./specialComps/MantineIconWithTip";

// =========================== EditPRofile imports

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
  const [opened, { close, open }] = useDisclosure(false);
  useHotkeys([["mod+j", () => setSettingsOpened(() => !settingsOpened)]]);
  useHotkeys([["mod+]", () => (opened === false ? open() : close())]]);

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

  // const openEditProfile = () =>{
  //   setEditProfile(true)
  // }
  const [userInfo] = useAtom(userInfoAtom);
  const [createdProjects] = useAtom(createdProjectsAtom);
  const [createdClusters] = useAtom(createdClustersAtom);
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
          <AppSettings
            closedIt={settingsOpened}
            closeIt={() => setSettingsOpened(false)}
          />
          {/* <SettingsDrawer
            closedIt={settingsOpened}
            closeIt={() => setSettingsOpened(false)}
          /> */}
          <ActionIcon onClick={() => setSettingsOpened(true)}>
            <Tooltip label={"Settings"}>
              <BsGear />
            </Tooltip>
          </ActionIcon>
          <AppEditProfile opened={opened} open={open} close={close} />
          <ActionIcon onClick={open}>
            <Tooltip label={"Profile"}>
              <AiOutlineEdit />
            </Tooltip>
          </ActionIcon>
          <ActionIcon
            className="flex justify-center align-center"
            value={"notifications"}
            onClick={useActivityLog}
          >
            <Tooltip label={"Notifications"}>
              <BsBell />
            </Tooltip>
          </ActionIcon>

          {/* <IconWithTooltip Icon={BsBell} tip="heo" /> */}
        </Flex>

        <Container className="p-0">
          <Tooltip label={"Usage"}>
            <Progress
              size="xs"
              value={20}
              classNames={{ bar: "bg-app-color-500" }}
            />
            <Text c="dimmed" size={"xs"} variant="text" align="right">
              23/100
            </Text>
          </Tooltip>
        </Container>
        <Flex direction={"column"} className="pt-4">
          <Flex>
            <Text className="tracking-widest mb-2" opacity={0.5} size={"sm"}>
              Projects
            </Text>
            <Text className="tracking-widest mb-2" opacity={0.5} size={"sm"}>
              {"(" + createdProjects.length + ")"}
            </Text>
          </Flex>
          <Checkbox.Group
            spacing={1}
            defaultValue={createdProjects.map((x) => x.id)}
          >
            {createdProjects.map((proj: any) => {
              const { id, name, color } = proj;
              return (
                <>
                  <Checkbox
                    className={`bg-[${color}]`}
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
          <Flex>
            <Text className="tracking-widest mb-2" opacity={0.5} size={"sm"}>
              Clusters
            </Text>
            <Text className="tracking-widest mb-2" opacity={0.5} size={"sm"}>
              {"(" + createdClusters.length + ")"}
            </Text>
          </Flex>
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
        <Flex direction={"column"} className="pt-4" id="external-event">
          <Flex>
            <Text className="tracking-widest mb-2" opacity={0.5} size={"sm"}>
              Regular
            </Text>
            <Text className="tracking-widest mb-2" opacity={0.5} size={"sm"}>
              {"(" + predefinedDraggables.length + ")"}
            </Text>
          </Flex>
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
