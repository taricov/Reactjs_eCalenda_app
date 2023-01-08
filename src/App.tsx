import {
  ColorScheme,
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
import { darkModeAtom, searchDataAtom } from "./store/jotai";
import { ModalsProvider } from "@mantine/modals";
import { useLayoutEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import AppTopBar from "./layout/AppTopBar";
import ShortcutsPane from "./components/ShortcutsPane/ShortcutsPane";
import EasyOnYourself from "./components/EasyOnYouself";
import { Route } from "wouter";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import Error404Page from "./pages/Error404Page";
import HomePage from "./pages/HomePage";

function App() {
  const [darkMode] = useAtom(darkModeAtom);
  const [value, setValue] = useState("");
  const [searchData, setSrearchData] = useAtom(searchDataAtom);

  useLayoutEffect(() => {
    const fetchdata: any = async () => {
      // const data: any = await fetch(null);
      setSrearchData(["data"]);
    };
    fetchdata();
    return () => {};
  }, []);

  return (
    <div className={`App ${darkMode === "dark" ? "dark" : ""}`}>
      <MantineProvider
        theme={{ colorScheme: darkMode === "dark" ? "dark" : "light" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider>
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
        </ModalsProvider>
      </MantineProvider>
    </div>
  );
}

export default App;
