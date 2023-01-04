import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  ActionIcon,
} from "@mantine/core";
import { GiStripedSun } from "react-icons/gi";
import { BsFillCircleFill } from "react-icons/bs";
import { useAtom } from "jotai";
import { darkModeAtom } from "../store/jotai";
interface Props {
  children: JSX.Element[] | JSX.Element;
}

export default function AppContainer({ children }: Props) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const toggleDarkMode = () => {
    setDarkMode(darkMode === "dark" ? "light" : "dark");
    localStorage.setItem("darkMode", darkMode);
    console.log(darkMode);
  };

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header
          className="flex justify-between"
          height={{ base: 50, md: 70 }}
          p="md"
        >
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>timeON</Text>
          </div>
          <div>
            <ActionIcon size={30} onClick={toggleDarkMode}>
              {darkMode === "light" ? <GiStripedSun /> : <BsFillCircleFill />}
            </ActionIcon>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
