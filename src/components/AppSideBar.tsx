import { C } from "@fullcalendar/core/internal-common";
import {
  ActionIcon,
  Avatar,
  Badge,
  Checkbox,
  Container,
  Flex,
  MantineProvider,
  Navbar,
  Progress,
  Text,
} from "@mantine/core";
import { useAtom } from "jotai";
import { AiOutlineEdit } from "react-icons/ai";
import { BsBell, BsGear } from "react-icons/bs";
import myImg from "../assets/me.jpg";
import { useActivityLog } from "../hooks/useActivityLog";
import {
  createdClustersAtom,
  createdProjectsAtom,
  isOpen,
  navBarToggleAtom,
  predefinedDraggables,
  userInfoAtom,
} from "../store/jotai";
import ClusterIcon from "./ClusterIcon";
import Tooltip from "./MantineTooltip";
import { openEditProfileModal } from "./ModalEditProfile";
import SettingsDrawer from "./SettingsDrawer";
import AppEditProfile from "./specialComps/AppEditProfile";
import { AppProject } from "./specialComps/AppProject";
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
  // console.log(toggleNav);

  // const [opened, { close, open }] = useDisclosure(false);

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

  const [isOpened, setIsOpened] = useAtom(isOpen);
  const [userInfo] = useAtom(userInfoAtom);
  const [createdProjects] = useAtom(createdProjectsAtom);
  const [createdClusters] = useAtom(createdClustersAtom);
  return (
    <Navbar
      className="overflow-auto scroll-smooth"
      p="md"
      hiddenBreakpoint="sm"
      hidden={toggleNav}
      zIndex={1000}
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
            src={
              // userInfo.avatar_url
              myImg
            }
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
          <AppSettings />

          <ActionIcon
            onClick={() => setIsOpened({ ...isOpened, settings_drawer: true })}
          >
            <Tooltip label={"Settings"}>
              <BsGear />
            </Tooltip>
          </ActionIcon>
          <ActionIcon
            onClick={() => setIsOpened({ ...isOpened, profile_modal: true })}
          >
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
          <AppProject />
          <Checkbox.Group
            spacing={1}
            defaultValue={createdProjects.map((x) => x.id)}
          >
            {createdProjects.map((proj: any) => {
              const { id, name } = proj;
              return (
                <Checkbox
                  classNames={{
                    label: "pl-2 mr-4",
                    input: `checked:bg-app-color-500 checked:border-none`,
                    root: "cursor:pointer",
                  }}
                  key={id}
                  value={id}
                  label={name}
                />
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
            const { id, name, borderColor, color } = cluster;
            return (
              <Flex key={id} className="cursor-pointer mb-2">
                <ClusterIcon borderColor={borderColor} iconColor={color} />
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
              const { id, title, toColor } = predefined;

              return (
                <Badge
                  key={id}
                  className={`fc-event mb-1 bg-gradient-to-r from-app-color-500 to-app-color-700 hover:cursor-move text-app-color-100 dark:text-app-color-200`}
                  variant={"gradient"}
                  onClickCapture={() => console.log("this")}
                >
                  {title}
                </Badge>
              );
            })}
          </Flex>
        </Flex>
      </Container>
    </Navbar>
  );
}
