import {
  ActionIcon,
  Drawer,
  Flex,
  Select,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useAtom } from "jotai";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import { allTimeZone, validMomentTimezones } from "../store/baseData";
import {
  calendarSettingsAtom,
  darkModeAtom,
  userInfoDisabledAtom,
} from "../store/jotai";
import AppEditableInput from "./specialComps/AppEditableInput";

export default function SettingsDrawer({ closedIt, closeIt }: any) {
  // const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  // const [disabledFields, setDisabledFields] = useAtom(userInfoDisabledAtom);
  // const [yourName, setYourName] = useAtom("Taric Ov");

  // interface Props {
  //   title: string;
  //   message: string;
  //   color: string;
  // }
  // const pushNotification = (title: string, message: string, color: string) => {
  //   showNotification({
  //     title,
  //     message,
  //     color,
  //     icon: <IconCheck size={18} />,
  //   });
  // };

  // const refYourName = useClickOutside(() => {
  //   setDisabledFields({ ...disabledFields, user_name: true });
  //   if (!disabledFields.user_name) {
  //     pushNotification("Updated!", "Your name has been updated", "teal");
  //   }
  //   console.log(disabledFields.user_name);
  // });

  // const editYourName = () => {
  //   setDisabledFields({ ...disabledFields, user_name: false });
  //   if (!disabledFields.user_name) {
  //     pushNotification("Updated!", "Your name has been updated", "teal");
  //   }
  // };
  // Push Notification
  const pushNotification = (title: string, message: string, color: string) => {
    showNotification({
      title,
      message,
      color,
      icon: <IconCheck size={18} />,
    });
  };

  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [caleandarSettings, setCaleandarSettings] =
    useAtom(calendarSettingsAtom);
  const [disabledFields, setDisabledFields] = useAtom(userInfoDisabledAtom);

  const refCalendarTitle = useClickOutside(() => {
    setDisabledFields({ ...disabledFields, calendar_title: true });
    if (!disabledFields.calendar_title) {
      pushNotification("Updated!", "Your name has been updated", "teal");
    }
    console.log(disabledFields.calendar_title);
  });
  const refEventLimit = useClickOutside(() => {
    setDisabledFields({ ...disabledFields, event_limit: true });
    if (!disabledFields.event_limit) {
      pushNotification("Updated!", "Your name has been updated", "teal");
    }
    console.log(disabledFields.event_limit);
  });

  const nameOnChange = (e: any) =>
    setCaleandarSettings({
      ...caleandarSettings,
      calendar_title: e.currentTarget.value,
    });
  const editCalendarTitle = () => {
    setDisabledFields({ ...disabledFields, calendar_title: false });
    if (!disabledFields.calendar_title) {
      setDisabledFields({ ...disabledFields, calendar_title: true });

      pushNotification("Updated!", "Calendar title has been updated", "teal");
    }
  };
  const editEventLimit = () => {
    setDisabledFields({ ...disabledFields, event_limit: false });
    if (!disabledFields.event_limit) {
      setDisabledFields({ ...disabledFields, event_limit: true });
      pushNotification(
        "Updated!",
        "Event Limit per day has been updated",
        "teal"
      );
    }
  };

  const settingsTh = darkMode ? true : false;
  // const [checked, setChecked] = useAtom(settingsThemAtom);
  const toggleDarkMode = (e: any) => {
    // setChecked(!e.currentTarget.checked);
    const p = e.currentTarget.checked;
    console.log("checked", p);

    setDarkMode(darkMode === "dark" ? "light" : "dark");
    localStorage.setItem("darkMode", darkMode);
    console.log(darkMode);
  };

  const [allTimeZones] = useAtom(validMomentTimezones);
  const [TimeZones] = useAtom(allTimeZone);
  const x = TimeZones.map((v) => v.Timezone);
  return (
    <>
      <Drawer
        opened={closedIt}
        onClose={closeIt}
        title="Settings"
        classNames={{ title: "text-2xl font-bold" }}
        padding="xl"
        // size={"xl"}
      >
        <Flex className="bg-app-color-50 dark:bg-gray-400 px-3 py-5 rounded mb-3">
          <Switch
            labelPosition="left"
            label="Theme"
            checked={darkMode === "dark" ? true : false}
            onChange={toggleDarkMode}
            description="Switch between light/dark themes"
          />
        </Flex>

        <Flex
          direction={"column"}
          align={"start"}
          className="bg-app-color-100 dark:bg-opacity-10 px-3 py-5 rounded mb-3"
        >
          <AppEditableInput
            label="This new input"
            inputVal={caleandarSettings.calendar_title}
            disabled={disabledFields.calendar_title}
            valOnChange={nameOnChange}
            inputRef={refCalendarTitle}
            iconOnClick={editCalendarTitle}
          />
          <Text fw="bold">Event-based settings</Text>
          {/* <Flex align={"end"} className="bg-slate-200 px-3 py-5 rounded mb-3">
            <TextInput
              label="Calendar Title"
              value={caleandarSettings.calendar_title}
              onChange={(e) =>
                setCaleandarSettings({
                  ...caleandarSettings,
                  calendar_title: e.currentTarget.value,
                })
              }
              disabled={disabledFields.calendar_title}
              ref={refCalendarTitle}
            />
            <ActionIcon onClick={editCalendarTitle} className="mb-1 ml-1">
              {disabledFields.calendar_title ? (
                <AiOutlineEdit />
              ) : (
                <AiOutlineCheck />
              )}
            </ActionIcon>
          </Flex> */}
          {/* </Flex>
        <Flex align={"end"} className="bg-slate-200 px-3 py-5 rounded mb-3"> */}
          <Flex align={"end"} className="bg-slate-200 px-3 py-5 rounded mb-3">
            <TextInput
              label="Event Limits/day"
              value={caleandarSettings.event_limit}
              onChange={(e) =>
                setCaleandarSettings({
                  ...caleandarSettings,
                  event_limit: e.currentTarget.value,
                })
              }
              disabled={disabledFields.event_limit}
              ref={refEventLimit}
            />
            <ActionIcon onClick={editEventLimit} className="mb-1 ml-1">
              {disabledFields.event_limit ? (
                <AiOutlineEdit />
              ) : (
                <AiOutlineCheck />
              )}
            </ActionIcon>
          </Flex>
          <Flex className="bg-slate-200 px-3 py-5 rounded mb-3">
            <Switch
              labelPosition="left"
              label="Weather Indicator"
              checked={caleandarSettings.weather_indicator}
              onChange={(e) =>
                setCaleandarSettings({
                  ...caleandarSettings,
                  weather_indicator: e.currentTarget.checked,
                })
              }
              description="Show/Hide weather indicators"
            />
          </Flex>
        </Flex>
        <Flex
          bg={darkMode === "dark" ? "black" : ""}
          className="px-3 py-5 rounded mb-3"
        >
          <Select
            label="Select your timezone"
            placeholder="Select your timezone"
            searchable
            data={allTimeZones}
          />
        </Flex>
        {/* <Flex align={"end"}>
          <TextInput
            label="Your Name"
            value={userInfo.user_name}
            onChange={(e) =>
              setUserInfo({ ...userInfo, user_name: e.currentTarget.value })
            }
            disabled={disabledFields.user_name}
            ref={refYourName}
          />
          <ActionIcon onClick={editYourName} className="mb-1 ml-1">
            {disabledFields.user_name ? <AiOutlineEdit /> : <AiOutlineCheck />}
          </ActionIcon>
        </Flex> */}
      </Drawer>
    </>
  );
}
