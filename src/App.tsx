import { ColorScheme, MantineProvider, Space, TextInput } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { atom, PrimitiveAtom, useAtom } from "jotai";

import FullCal from "./components/FullCalendar";
import DatePicker from "./components/DatePicker/MantineDatePicker";
import AppContainer from "./layout/AppContainer";
import { darkModeAtom } from "./store/jotai";
import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

function App() {
  const [darkMode] = useAtom(darkModeAtom);
  const [value, setValue] = useState("");

  return (
    <div className="App">
      <MantineProvider
        theme={{ colorScheme: darkMode === "dark" ? "dark" : "light" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider>
          {" "}
          <AppContainer>
            <TextInput
              placeholder="Search"
              radius="xl"
              size="xs"
              onChange={(e) => setValue(e.currentTarget.value)}
              icon={<BsSearch size={14} />}
            />
            <Space />
            <DatePicker
              label="Select the date range:"
              placeholder="Select Date Range"
            />
            {/* <AppScheduler /> */}
            <FullCal />
          </AppContainer>
        </ModalsProvider>
      </MantineProvider>
    </div>
  );
}

export default App;
