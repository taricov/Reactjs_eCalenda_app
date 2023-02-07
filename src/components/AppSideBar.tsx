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
import { BsBell, BsFillPatchCheckFill, BsGear } from "react-icons/bs";
import { RiEditCircleLine } from "react-icons/ri";
import myImg from "../assets/me.jpg";
import { useActivityLog } from "../hooks/useActivityLog";
import {
  createdClustersAtom,
  createdProjectsAtom,
  isOpen,
  navBarToggleAtom,
  predefinedDraggables,
  settingsAtom,
  userInfoAtom,
} from "../store/jotai";
import ClusterIcon from "./ClusterIcon";
import Tooltip from "./MantineTooltip";
import { openEditProfileModal } from "./ModalEditProfile";
import SettingsDrawer from "./SettingsDrawer";
import AppEditProfile from "./specialComps/AppEditProfile";
import AppProject from "./specialComps/AppProject";
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

  const [allSettings] = useAtom(settingsAtom);
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
      // zIndex={-10}//was before 1000
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
          <Tooltip label={userInfo.plan === 1 ? "Premium" : "Free"}>
            {userInfo.plan === 1 ? (
              <Text
                className="italic"
                c="dimmed"
                size={"xs"}
                variant="text"
                align="right"
              >
                Premium
                <BsFillPatchCheckFill
                  size={10}
                  className="mx-1 inline"
                  color="#7367f0"
                />
              </Text>
            ) : (
              <Text
                className="italic"
                c="dimmed"
                size={"xs"}
                variant="text"
                align="right"
              >
                Free
                <BsFillPatchCheckFill className="mx-1 inline" size={10} />
              </Text>
            )}
          </Tooltip>
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
              value={30}
              classNames={{ bar: "bg-app-color-500" }}
            />
          </Tooltip>
          <Flex className="flex justify-between items-center mx-1">
            <Tooltip label={userInfo.plan === 1 ? "Premium" : "Free"}>
              <Text c="dimmed" size={"xs"} variant="text" align="right">
                {userInfo.plan === 1 ? (
                  <BsFillPatchCheckFill color="#7367f0" />
                ) : (
                  <BsFillPatchCheckFill />
                )}
              </Text>
            </Tooltip>
            <Text c="dimmed" size={"xs"} variant="text" align="right">
              3/10
            </Text>
          </Flex>
        </Container>
        <Flex direction={"column"} className="pt-4">
          <Flex className="flex items-center justify-between">
            <Flex className="flex items-center">
              <Text className="tracking-widest" opacity={0.5} size={"sm"}>
                {allSettings.g_projectName}
              </Text>
              <Text className="tracking-widest" opacity={0.5} size={"sm"}>
                {"(" + createdProjects.length + ")"}
              </Text>
            </Flex>
            <Flex>
              <RiEditCircleLine
                size={11}
                className="cursor-pointer"
                onClick={() => console.log("am clicked")}
              />
            </Flex>
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
                  data-name={name}
                  data-id={id}
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
              {allSettings.g_clusterName}
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
              const { id, title, color, duration } = predefined;

              return (
                <Badge
                  key={id}
                  // data-id={id}
                  data-title={title}
                  data-color={color}
                  data-dur={duration}
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
