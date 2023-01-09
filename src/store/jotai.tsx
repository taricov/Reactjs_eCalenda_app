import { Flex, Text, TextInput } from "@mantine/core";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// ====================== Setting DarkMode ====================
//FIXME: sync icon, theme, localStorage and toggle
const browser = typeof window !== "undefined";
const localStrOpt = browser ? localStorage.getItem("darkMode") : "light";

const preferredColorScheme =
  browser && matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

// const localStorageDarkMode = localStrOpt === "dark" ? true : false;
// const sysDarkMode = preferredColorScheme === "dark" ? true : false;

export const darkModeAtom = atom(localStrOpt || preferredColorScheme);

// ====================== Fav Colors ====================

const swatches = [
  "#25262b",
  "#868e96",
  "#fa5252",
  "#e64980",
  "#be4bdb",
  "#7950f2",
  "#4c6ef5",
  "#228be6",
  "#15aabf",
  "#12b886",
  "#40c057",
  "#82c91e",
  "#fab005",
  "#fd7e14",
];
export const favColorsAtom = atom(swatches);

export const navBarToggleAtom = atom(true);

let tags = ["Math", "History", "Chemistry", "Phenology"];

export const tagsAtom = atom(tags);

export const allIntervals = [
  "Daily",
  "2 Days",
  "Weekly",
  "2 Weeks",
  "Monthly",
  "Quarterly",
  "Bi-annually",
  "Anuually",
];

export const repeatedAtom = atom<boolean | undefined>(undefined);

//"outline" | "light" | "filled" | "gradient" | "dot"
export const predefinedDraggables = [
  {
    title: "Task #1",
    variant: "gradient",
    gradient: "red",
  },
  {
    title: "Task #2",
    color: "red",
    variant: "gradiant",
    gradient: { from: "teal", to: "lime", deg: 105 },
  },
  {
    title: "Task #3",
    color: "blue",
    variant: "",
    gradient: { from: "red", to: "green", deg: 105 },
  },
  {
    title: "Task #4",
    color: "none",
    variant: "gradient",
    gradient: { from: "teal", to: "lime", deg: 105 },
  },
];

export const createdProjects = [
  {
    id: "1",
    name: "Project #1",
    color: "#fa5252",
  },
  {
    id: "2",
    name: "Project #2",
    color: "green",
  },
  {
    id: "3",
    name: "Project #3",
    color: "brown",
  },
];

export const eventsAtom = atom([
  {
    id: "1",
    title: "Event #1",
    start: "2023-01-22",
    end: "2023-01-29",
    filename: "event",
    color: "rgba(255,255,2,0.4)",
    textColor: "rgba(255,255,2)",
    className: "font-bold border-none",
    allDay: false,
  },
  {
    id: "2",
    title: "Event #3",
    start: "2023-01-02",
    end: "2023-01-03",
    filename: "event",
    color: "",
    allDay: false,
  },
  {
    id: "3",
    title: "Event #3",
    start: "2023-01-11",
    end: "2023-01-11",
    filename: "event",
    color: "teal",
    allDay: true,
  },
]);

export const createdClusters = [
  {
    name: "Cluster #1",
    id: "1",
    color: "red-400",
  },
  {
    name: "Cluster #2",
    id: "2",
    color: "violet-400",
  },
  {
    name: "Cluster #3",
    id: "3",
    color: "#4c6ef5",
  },
];
export const searchDataAtom = atom([undefined, "rr", "22"]);
export const searchQueryAtom = atom("");
export const loggerAtom = atom<string | null>("");

export const valuesAtom = atom({
  title: "",
  start: "",
  end: "",
  color: "",
});
export const repeateddAtom = atom(false);
export const xTimesAtom = atom(undefined);

export const settingsDrawerOpen = atom(false);
export const integrationModalOpen = atom(false);

export const userInfoDisabledAtom = atom({
  user_name: true,
  user_email: true,
  user_role: true,
});
export const userInfoAtom = atom({
  user_name: "Taric Ov",
  user_email: "taricov1@gmail.com",
  user_role: "admin",
});

export const availableIntegrationsAtom = [
  {
    id: "1",
    image:
      "https://play-lh.googleusercontent.com/8nvKcNeL5ELV6vaMD5N3grOA2D7xvHvNKmrsSCRUMIzImLvcuKRbcpfMmtka6Ryfeoo",
    label: "Daftra",
    description: "Manage your business calendar.",
    disabled: false,
    children: () => {
      return (
        <>
          <Text size="sm">
            Leverage your workflow and manage all your appointments in one
            place.
          </Text>
          <TextInput
            className="mt-4"
            label="API Key"
            description={
              <Flex className="items-center" gap={3}>
                <Text>Get your Zoom API key </Text>
                <Text color={"blue"} component="a" href="https://mantine.dev">
                  Click here
                </Text>
              </Flex>
            }
          />
        </>
      );
    },
  },

  {
    id: "2",
    image:
      "https://play-lh.googleusercontent.com/yZsmiNjmji3ZoOuLthoVvptLB9cZ0vCmitcky4OUXNcEFV3IEQkrBD2uu5kuWRF5_ERA",
    label: "Zoom",
    description: "Schedule your Meetings",
    disabled: false,
    children: () => {
      return (
        <>
          <Text size="sm">
            Manage your meetings on zoom from the same place you manage your
            business calendar.
          </Text>
          <TextInput
            className="mt-4"
            label="API Key"
            description={
              <>
                <Text>Get your Zoom API key </Text>
                <Text color={"blue"} component="a" href="https://mantine.dev">
                  Click here
                </Text>
              </>
            }
          />
        </>
      );
    },
  },

  {
    id: "3",
    image:
      "https://www.showmetech.com.br/wp-content/uploads//2017/10/1200x630bb.jpg",
    label: "Google Calendar",
    description: "Coming soon",
    //  "Full compatibility with Google Calendar",
    disabled: true,
    children: () => {
      return (
        <>
          <Text size="sm">
            Preserve your workflow, but take the shortcut to its best
          </Text>

          <TextInput
            label="API Key"
            className="mt-4"
            description={
              <>
                <Text>If you don't know how to get your Google API key,</Text>
                <Text color={"blue"} component="a" href="https://mantine.dev">
                  Click here
                </Text>
              </>
            }
          />
        </>
      );
    },
  },
];
