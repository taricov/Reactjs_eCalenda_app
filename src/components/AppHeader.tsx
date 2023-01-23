import {
  ActionIcon,
  Burger,
  Flex,
  Header,
  MediaQuery,
  Menu,
  Select,
  Space,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useAtom } from "jotai";
import { AiOutlineCoffee } from "react-icons/ai";
import { BsChevronDown, BsFillCircleFill } from "react-icons/bs";
import { GiStripedSun } from "react-icons/gi";
import { GoSettings } from "react-icons/go";
import { IoMdHelpCircle } from "react-icons/io";
import {
  darkModeAtom,
  integrationModalOpen,
  isOpen,
  langs,
  navBarToggleAtom,
  settingsAtom,
} from "../store/jotai";
import EasyOnYourself from "./specialComps/AppTakeABreak";
import AppIntegrationModal from "./specialComps/AppIntegrations";
import { MdUpdate } from "react-icons/md";
import { useTranslation } from "react-i18next";
export default function AppHeader() {
  const theme = useMantineTheme();

  const [isOpened, setIsOpened] = useAtom(isOpen);

  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const toggleDarkMode = () => {
    setDarkMode(darkMode === "dark" ? "light" : "dark");
    localStorage.setItem("darkMode", darkMode);
  };
  const [toggleNav, setToggleNav] = useAtom(navBarToggleAtom);
  const handleNavToggle = () => {
    setToggleNav((toggleNav) => !toggleNav);
  };
  const [allSettings, setSettings] = useAtom(settingsAtom);
  const [languages] = useAtom(langs);

  useHotkeys([
    ["alt + d", () => setDarkMode(darkMode === "dark" ? "light" : "dark")],
  ]);

  const { t, i18n } = useTranslation();

  const onChangeLanguage = (e: any) => {
    setSettings({
      ...allSettings,
      g_selected_lang: e,
      g_rtl_direction: e === "ar" ? true : false,
      c_locale: e,
    });
    // let loc = "http://localhost:5174";
    // window.location.replace(loc + "?lng=" + e);
  };
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
        <ActionIcon
          size={30}
          onClick={() => setIsOpened({ ...isOpened, updates_modal: true })}
        >
          <MdUpdate />
        </ActionIcon>

        <ActionIcon
          size={30}
          onClick={() => setIsOpened({ ...isOpened, easy_modal: true })}
        >
          <AiOutlineCoffee />
        </ActionIcon>

        <ActionIcon
          size={30}
          onClick={() => setIsOpened({ ...isOpened, integration_modal: true })}
        >
          <GoSettings />
        </ActionIcon>

        <ActionIcon size={30} onClick={toggleDarkMode}>
          {darkMode === "light" ? <GiStripedSun /> : <BsFillCircleFill />}
        </ActionIcon>
        <Select
          classNames={{
            item: "text-xl w-fit",
            input:
              "border-none bg-transparent hover:bg-slate-100 hover:bg-opacity-10 text-xl transition duration-200 p-0 !h-0 w-7 text-right",
            rightSection: "hidden",
            dropdown: "!w-fit",
          }}
          value={allSettings.g_selected_lang}
          onChange={onChangeLanguage}
          data={languages}
        />
      </Flex>
    </Header>
  );
}
