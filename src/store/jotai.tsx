import { Flex, Text, TextInput } from "@mantine/core";
import { DateRangePickerValue } from "@mantine/dates";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import moment from "moment";

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
    color: "bg-app-color-100",
    // days: 14,
    duration: "48:00",
    create: false,
    // itemSelected: ".fuck",
  },
  {
    id: "2",
    title: "Task #2",
    color: "#f067d3",
  },
  {
    id: "3",
    title: "Task #3",
    toColor: "to-[green]",
  },
  {
    id: "4",
    title: "Task #4",
    color: "black",
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
    start: "2023-01-22T13:00:00Z",
    end: "2023-01-38T20:00:00",
    filename: "event",
    project_id: "1",
    cluster_id: "2",
    tag: ["dfsd", "gas", "awefd"],
    // color: "#40c057",
    // backgroundColor: "#40c057",
    className:
      "!text-app-color-300 !bg-app-color-700 !bg-opacity-50 after:!bg-app-color-500 before:!bg-app-color-500",
    // allDay: false,
  },
  {
    id: "2",
    title: "Event #2",
    start: "2023-01-01T02:02:00Z",
    end: "2023-01-04",
    filename: "event",
    color: "",
    textColor: "white",
    startRecur: "2023-01-03T12:10:00Z",
    endRecur: true,
    daysOfWeek: [2],
    groupId: "222",
    // url: "https://www.google.com",
    // extraParams: {
    //   custom_param1: "something",
    //   custom_param2: "somethingelse",
    // },
    allDay: false,
  },
  // {
  //   googleCalendarApiKey:
  //     "658535880589-249msa404ejrp26son858m39av1bs28k.apps.googleusercontent.com",
  //   googleCalendarId: "mizom64.com.calendar.google.com",
  //   color: "yellow", // an option!
  //   textColor: "black", // an option!
  // },
  {
    id: "3",
    title: "Event #3",
    start: "2023-01-11",
    end: "2023-01-11",
    filename: "event",
    color: "teal",
    allDay: true,
    className:
      "!bg-red-700 !bg-opacity-50 !text-red-200  after:!bg-red-300 before:!bg-red-300",
  },
  {
    id: "4",
    title: "Event #4",
    start: "2023-01-30",
    end: "2023-02-20",
    filename: "event",
    color: "teal",
    allDay: true,
    className:
      "!bg-red-700 !bg-opacity-50 !text-red-200  after:!bg-red-300 before:!bg-red-300",
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
// export const searchQueryAtom = atom("");
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

export const searchBarQuery = atom("");
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
export const excludeDay = (excluded: boolean, treatedDate: Date) => {
  if (excluded) {
    const treatedDay = treatedDate;
    // const treatedDay = moment(treatedDate).subtract(1, "days")._d;
    return treatedDay;
  } else {
    const treatedDay = moment(treatedDate).add(1, "days").toDate();
    return treatedDay;
  }
};
export const settingsAtom = atom({
  g_darkMode: false,
  g_sounds: true,
  g_dealWithTime: true,
  g_timeFormat: undefined,
  g_useSecondsInTime: false,
  c_calendarName: "Calendar #1",
  g_projectName: "Project",
  g_clusterName: "Cluster",
  e_eventLimit: 0,
  e_allDay: true,
  e_eventOverlapping: true,
  c_lastDayExcluded: false,
  // c_startDayExcluded: true,
  c_weatherIndicator: false,
  c_weekends: true,
  c_hiddenDays: [],
  c_timezone: undefined,
  c_week_numbers: true,
  c_recurring: false,
  e_easyEdit: true,
  g_selected_lang: "en",
  g_rtl_direction: false,
  c_firstDay: 0,
  c_locale: "en",
  c_direction: "ltr",
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
  plan: 1,
});

export const isOpen = atom({
  settings_drawer: false,
  integration_modal: false,
  profile_modal: false,
  shortcuts_modal: false,
  easy_modal: false,
  updates_modal: false,
  api_modal: false,
  addEvent_form: false,
  editEvent_form: false,
  addCluster_form: false,
  addProject_form: false,
  addRegular_form: false,
});

export const siteColors = atom([
  // "#25262b",
  "#868e96",
  "#fa5252",
  "#e64980",
  // "#be4bdb",
  "#7950f2",
  "#4c6ef5",
  "#228be6",
  "#15aabf",
  "#12b886",
  "#40c057",
  "#82c91e",
  "#fab005",
  "#fd7e14",
]);

export const siteColorsMap = atom({
  "#868e96":
    "!bg-oslo-gray-700 !text-oslo-gray-900 !bg-opacity-60 dark:!bg-opacity-30 dark:!text-oslo-gray-400",
  "#fa5252":
    "!bg-carnation-700 !text-carnation-500 !bg-opacity-60 dark:!bg-opacity-30 dark:!text-carnation-400",
  "#e64980":
    "!bg-mandy-700 !text-mandy-500 !bg-opacity-60 dark:!bg-opacity-30 dark:!text-mandy-400",
  "#7950f2":
    "!bg-cornflower-blue2-700 !text-cornflower-blue2-500 !bg-opacity-60 dark:!bg-opacity-30 dark:!text-cornflower-blue2-400",

  "#4c6ef5":
    "!bg-cornflower-blue-700 !text-cornflower-blue-500 !bg-opacity-60 dark:!bg-opacity-30 dark:!text-cornflower-blue-400",
  "#228be6":
    "!bg-curious-blue-700 !text-curious-blue-500 !bg-opacity-60 dark:!bg-opacity-30 dark:!text-curious-blue2-400",
  "#15aabf":
    "!bg-java-700 !text-java-500 !bg-opacity-60 dark:!bg-opacity-30 dark:!text-java-400",
  "#12b886":
    "!bg-mountain-meadow-700 !text-mountain-meadow-500 !bg-opacity-60 dark:!bg-opacity-30 dark:!text-mountain-meadow-400",
  "#40c057":
    "!bg-chateau-green-700 !text-chateau-green-500 !bg-opacity-60 dark:!bg-opacity-30 dark:!text-chateau-green-400",
  "#82c91e":
    "!bg-lime-700 !text-lime-500 !bg-opacity-60 dark:!bg-opacity-30 dark:!text-lime-400",
  "#fab005":
    "!bg-yellow-sea-700 !text-yellow-sea-500 !bg-opacity-60 dark:!bg-opacity-30 dark:!text-yellow-sea-400",
  "#fd7e14":
    "!bg-ecstasy-700 !text-ecstasy-500 !bg-opacity-60 dark:!bg-opacity-30 dark:!text-ecstasy-400",
});

export const langs = atom([
  { label: "🇺🇸", value: "en" },
  { label: "🇸🇦", value: "ar" },
  { label: "🇪🇸", value: "es" },
  { label: "🇫🇷", value: "fr" },
]);
export const langs2 = atom([
  { label: "🇺🇸 English", value: "en" },
  { label: "🇸🇦 Arabic", value: "ar" },
  { label: "🇪🇸 Spanish", value: "es" },
  { label: "🇫🇷 French", value: "fr" },
]);

export const siteUpdates = atom([
  {
    icon: "",
    title: "",
    desc: "",
    date: "",
  },
]);

export const calendarDate = atom<any>(undefined);
export const PickerDate = atom<any>(undefined);
export const PickerTime = atom<any>([new Date(), new Date()]);
export const calendarData = atom<any>({});
export const pickerData = atom<any>({});

// export const selectedTime = atom<any>(null);
