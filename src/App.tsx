import { QueryClientProvider, QueryClient } from "react-query";
import {
  ColorScheme,
  createEmotionCache,
  Flex,
  MantineProvider,
  Space,
  TextInput,
} from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { atom, PrimitiveAtom, useAtom } from "jotai";

import FullCal from "./components/FullCal";
import DatePicker from "./components/DatePicker/MantineDatePicker";
import AppContainer from "./layout/AppContainer";
import { darkModeAtom, settingsAtom } from "./store/jotai";
import { ModalsProvider } from "@mantine/modals";
import { useLayoutEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import AppTopBar from "./layout/AppTopBar";
import ShortcutsPane from "./components/ShortcutsPane/ShortcutsPane";
import AppTakeABreak from "./components/specialComps/AppTakeABreak";
import { Route } from "wouter";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import Error404Page from "./pages/Error404Page";
import HomePage from "./pages/HomePage";
import { NotificationsProvider } from "@mantine/notifications";
import { getWeatherIcons } from "./api/weather/getWeatherIcons";
import AppEditProfile from "./components/specialComps/AppEditProfile";
import AppSettings from "./components/specialComps/AppSettings";
import AppIntegrations from "./components/specialComps/AppIntegrations";

import rtlPlugin from "stylis-plugin-rtl";

const queryClient = new QueryClient();

function App() {
  const [darkMode] = useAtom(darkModeAtom);
  const [value, setValue] = useState("");

  // getWeatherIcons();
  useLayoutEffect(() => {
    const fetchdata: any = async () => {
      // const data: any = await fetch(null);
    };
    fetchdata();
    return () => {};
  }, []);
  const [allSettings, setSettings] = useAtom(settingsAtom);

  const rtlCache = createEmotionCache({
    key: "mantine-rtl",
    stylisPlugins: [rtlPlugin],
  });

  return (
    <div className={`App ${darkMode === "dark" ? "dark" : ""}`}>
      {/* <QueryClientProvider client={queryClient}> */}
      <MantineProvider
        emotionCache={!!allSettings.app_direction ? rtlCache : undefined}
        theme={{
          colorScheme: darkMode === "dark" ? "dark" : "light",
          dir: !!allSettings.app_direction ? "rtl" : "ltr",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider>
          <NotificationsProvider autoClose={2000}>
            <Route path="/">
              <HomePage />
            </Route>
            <Route path="/register">
              <RegistrationPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/:rest*">
              <Error404Page />
            </Route>
            {/* <AppContainer>
            <ShortcutsPane />
            <Flex direction={"column"} gap={10}>
            {/* <TextInput
            placeholder="Search"
            radius="xl"
            size="xs"
            onChange={(e) => setValue(e.currentTarget.value)}
            icon={<BsSearch size={14} />}
            /> 
            <AppTopBar />
            <FullCal />
            </Flex>
          </AppContainer> */}
            <AppEditProfile />
            <AppSettings />
            <AppIntegrations />
            <AppTakeABreak />
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
      {/* </QueryClientProvider> */}
    </div>
  );
}

export default App;
