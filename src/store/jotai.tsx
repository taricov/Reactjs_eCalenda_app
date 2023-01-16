import { Flex, Text, TextInput } from "@mantine/core";
import { DateRangePickerValue } from "@mantine/dates";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// ====================== Setting DarkMode ====================
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

export const repeatedAtom = atom(false);

export const predefinedDraggables = [
  {
    id: "1",
    title: "Task #1",
    toColor: "to-[#cee010]",
  },
  {
    id: "2",
    title: "Task #2",
    toColor: "to-[blue]",
  },
  {
    id: "3",
    title: "Task #3",
    toColor: "to-[green]",
  },
  {
    id: "4",
    title: "Task #4",
    toColor: "to-[black]",
  },
];

// export const createEventForm = atom(false);
// export const dateRangePicker = atom<DateRangePickerValue | []>([]);
export const createdProjectsAtom = atom([
  {
    id: "1",
    name: "Project #1",
    CheckedColor: "checked:bg-[#fa5252]",
  },
  {
    id: "2",
    name: "Project #2",
    CheckedColor: "checked:bg-[green]",
  },
  {
    id: "3",
    name: "Project #3",
    CheckedColor: "checked:bg-[brown]",
  },
]);
interface eventProps {
  id: string;
  title: string;
  start: string;
  end: string;
  filename: string;
  color: string;
  textColor: string;
  className: string;
  allDay: boolean;
}
export const eventsAtom = atom<any>([
  {
    id: "1",
    title: "Event #1",
    start: "2023-01-22",
    end: "2023-01-28T22:00:00.000Z",
    filename: "event",
    color: "rgba(255,255,2,0.4)",
    textColor: "rgba(255,255,2)",
    className: "font-bold border-none",
    allDay: false,
  },
  {
    id: "2",
    title: "Event #2",
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

export const createdClustersAtom = atom([
  {
    name: "Cluster #1",
    id: "1",
    color: "bg-red-400",
    borderColor: "border-red-400",
  },
  {
    name: "Cluster #2",
    id: "2",
    color: "bg-violet-400",
    borderColor: "border-violet-400",
  },
  {
    name: "Cluster #3",
    id: "3",
    color: "bg-[#4c6ef5]",
    borderColor: "border-[#4c6ef5]",
  },
]);
export const searchQueryAtom = atom("");
export const loggerAtom = atom<string | null>("");

export const valuesAtom = atom({
  title: "",
  start: "",
  end: "",
  color: "",
});

export const xTimesAtom = atom(undefined);

export const integrationModalOpen = atom(false);

// export const eventLimitAtom = atom("");
// export const calendarTitleAtom = atom("Calendar #1");

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
  {
    id: "3",
    image:
      "https://static.toiimg.com/thumb/msid-93048963,width-1280,height-720,resizemode-4/.jpg",
    label: "Google Meet",
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

// export const weatherIndicatorAtom = atom(false);

// ================ user settings variables =================

// export const settingsDrawerOpen = atom(false);
export const settingsAtom = atom({
  g_darkMode: false,
  g_sounds: true,
  g_calendarName: "Calendar #1",
  e_eventLimit: 0,
  e_allDay: true,
  c_weatherIndicator: false,
  c_recurring: false,
});

export const userInfoDisabledAtom = atom({
  user_name: true,
  user_email: true,
  user_role: true,
  calendar_title: true,
  event_limit: true,
});
export const userInfoAtom = atom({
  user_name: "Taric Ov",
  user_email: "taricov1@gmail.com",
  avatar_url: "../assets/me.jpg",
  user_birthday: undefined,
});

export const isOpen = atom({
  settings_drawer: false,
  integration_modal: false,
  profile_modal: false,
  shortcuts_modal: false,
  easy_modal: false,
  help_modal: false,
  createEvent_form: false,
  addCluster_form: false,
  addProject_form: false,
});
