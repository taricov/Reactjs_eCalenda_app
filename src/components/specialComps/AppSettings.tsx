import { Drawer, Flex, Space, Switch } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useAtom } from "jotai";
import { allTimeZone, validMomentTimezones } from "../../store/baseData";
import {
  calendarSettingsAtom,
  darkModeAtom,
  userInfoDisabledAtom,
} from "../../store/jotai";
import AppEditableInput from "../specialComps/AppEditableInput";

import { Accordion } from "@mantine/core";

interface Props {
  closedIt: boolean;
  closeIt: () => void;
}
export default function AppSettings({ closedIt, closeIt }: Props) {
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
        withinPortal={false}
        opened={closedIt}
        onClose={closeIt}
        title="Settings"
        classNames={{ title: "text-2xl font-bold" }}
        padding="xl"
        size="xl"
      >
        <Accordion defaultValue="Settings">
          <Accordion.Item value="global_settings">
            <Accordion.Control>Global Settings</Accordion.Control>
            <Accordion.Panel>
              {/* <Flex className="bg-app-color-50 dark:bg-gray-400 px-3 py-5 rounded mb-3"> */}
              <Switch
                labelPosition="left"
                label="Theme"
                checked={darkMode === "dark" ? true : false}
                onChange={toggleDarkMode}
                description="Switch between light/dark themes"
              />
              <Space h={20} />
              {/* </Flex> */}
              {/* 
              <Flex
                direction={"column"}
                align={"start"}
                className="bg-app-color-100 dark:bg-opacity-10 px-3 py-5 rounded mb-3"
              > */}
              <AppEditableInput
                label="This new input"
                inputVal={caleandarSettings.calendar_title}
                disabled={disabledFields.calendar_title}
                valOnChange={nameOnChange}
                inputRef={refCalendarTitle}
                iconOnClick={editCalendarTitle}
              />
              {/* </Flex> */}
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="calendar_settings">
            <Accordion.Control>Calendar Settings</Accordion.Control>
            <Accordion.Panel>
              <AppEditableInput
                label="Calendar Name"
                inputVal={caleandarSettings.calendar_title}
                disabled={disabledFields.calendar_title}
                valOnChange={nameOnChange}
                inputRef={refCalendarTitle}
                iconOnClick={editCalendarTitle}
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="event_settings">
            <Accordion.Control>Event Settings</Accordion.Control>
            <Accordion.Panel>
              Configure components appearance and behavior with vast amount of
              settings or overwrite any part of component styles
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="user permissions">
            <Accordion.Control disabled>User Permissions</Accordion.Control>
            <Accordion.Panel>User Permissions</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Drawer>
    </>
  );
}
