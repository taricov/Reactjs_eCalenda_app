import {
  ActionIcon,
  Burger,
  Flex,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useAtom } from "jotai";
import { BsFillCircleFill } from "react-icons/bs";
import { GiStripedSun } from "react-icons/gi";
import { GoSettings } from "react-icons/go";
import { IoMdHelpCircle } from "react-icons/io";
import {
  darkModeAtom,
  integrationModalOpen,
  navBarToggleAtom,
} from "../store/jotai";
import EasyOnYourself from "./EasyOnYouself";
import ModalIntegration from "./MantineAccordion";
export default function AppHeader() {
  const theme = useMantineTheme();
  const [integrationOpen, setIntegrationOpened] = useAtom(integrationModalOpen);

  const handleIntegrationModal = () => {
    setIntegrationOpened(true);
    console.log(integrationOpen);
  };

  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const toggleDarkMode = () => {
    setDarkMode(darkMode === "dark" ? "light" : "dark");
    localStorage.setItem("darkMode", darkMode);
    console.log(darkMode);
  };
  const [toggleNav, setToggleNav] = useAtom(navBarToggleAtom);
  const handleNavToggle = () => {
    setToggleNav((toggleNav) => !toggleNav);
    console.log(toggleNav);
  };

  useHotkeys([["mod+i", () => setIntegrationOpened(() => !integrationOpen)]]);
  useHotkeys([
    ["alt + d", () => setDarkMode(darkMode === "dark" ? "light" : "dark")],
  ]);
  return (
    <Header
      className="flex justify-between"
      height={{ base: 50, md: 70 }}
      p="md"
    >
      <Flex className="flex items-center h-full">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={!toggleNav}
            onClick={handleNavToggle}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Text>eCalenda</Text>
      </Flex>
      <Flex align={"center"} justify={"center"}>
        <ActionIcon size={30} onClick={undefined}>
          <IoMdHelpCircle />
        </ActionIcon>
        <ModalIntegration />
        <ActionIcon size={30} onClick={handleIntegrationModal}>
          <GoSettings />
        </ActionIcon>
        <EasyOnYourself />
        <ActionIcon size={30} onClick={toggleDarkMode}>
          {darkMode === "light" ? <GiStripedSun /> : <BsFillCircleFill />}
        </ActionIcon>
      </Flex>
    </Header>
  );
}
