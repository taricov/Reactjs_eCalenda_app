import {
  Drawer,
  Flex,
  MultiSelect,
  NumberInput,
  Select,
  Space,
  Switch,
} from "@mantine/core";
import { useClickOutside, useHotkeys, useToggle } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useAtom } from "jotai";
import {
  allTimeZone,
  indexedDays,
  validMomentTimezones,
} from "../../store/baseData";
import {
  darkModeAtom,
  isOpen,
  settingsAtom,
  userInfoDisabledAtom,
} from "../../store/jotai";
import AppEditableInput from "../specialComps/AppEditableInput";

import { Accordion } from "@mantine/core";
import { pushNotification } from "./pushNotification";
import { ChangeEvent, useState } from "react";

export default function () {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  const [allSettings, setSettings] = useAtom(settingsAtom);

  const [disabledCalendarName, setCalendarNameDisabled] =
    useState<boolean>(true);
  const refCalendarTitle = useClickOutside(() => {
    setCalendarNameDisabled(true);
    if (!disabledCalendarName) {
      pushNotification(
        "Updated!",
        "Your name has been updated",
        "teal",
        <IconCheck size={10} />
      );
    }
  });

  const nameOnChange = (e: any) =>
    setSettings({
      ...allSettings,
      c_calendarName: e.currentTarget.value,
    });
  const editCalendarTitle = () => {
    setCalendarNameDisabled(false);
    if (!disabledCalendarName) {
      setCalendarNameDisabled(true);
      pushNotification(
        "Updated!",
        "Your name has been updated",
        "teal",
        <IconCheck size={18} />
      );
    }
  };

  const settingsTh = darkMode ? true : false;
  // const [checked, setChecked] = useAtom(settingsThemAtom);
  const toggleDarkMode = (e: any) => {
    // setChecked(!e.currentTarget.checked);
    const p = e.currentTarget.checked;

    setDarkMode(darkMode === "dark" ? "light" : "dark");
    localStorage.setItem("darkMode", darkMode);
  };

  const [allTimeZones] = useAtom(validMomentTimezones);
  const [TimeZones] = useAtom(allTimeZone);
  const [allDays] = useAtom(indexedDays);
  const x = TimeZones.map((v) => v.Timezone);
  const toggleWeathering = () => {
    setSettings({
      ...allSettings,
      c_weatherIndicator: !allSettings.c_weatherIndicator,
    });
  };
  const toggleRecurring = () => {
    setSettings({ ...allSettings, c_recurring: !allSettings.c_recurring });
  };
  const toggleWeekends = () => {
    setSettings({ ...allSettings, c_weekends: !allSettings.c_weekends });
  };
  const toggleWeekNums = () => {
    setSettings({
      ...allSettings,
      c_week_numbers: !allSettings.c_week_numbers,
    });
  };
  const toggleEasyEdit = () => {
    setSettings({
      ...allSettings,
      e_easyEdit: !allSettings.e_easyEdit,
    });
  };
  const toggleSounds = () => {
    setSettings({ ...allSettings, g_sounds: !allSettings.g_sounds });
  };
  const handleEventLimit = (e: any) => {
    setSettings({
      ...allSettings,
      e_eventLimit: e,
    });
  };

  const [isOpened, setIsOpened] = useAtom(isOpen);

  useHotkeys([
    [
      "mod+j",
      () =>
        setIsOpened({
          ...isOpened,
          settings_drawer: !isOpened.settings_drawer,
        }),
    ],
  ]);
  return (
    <>
      <Drawer
        withinPortal={false}
        opened={isOpened.settings_drawer}
        onClose={() => setIsOpened({ ...isOpened, settings_drawer: false })}
        title="Settings"
        classNames={{ title: "text-2xl font-bold" }}
        padding="xl"
        size="xl"
        // className="w-full md:w-[40%]"
      >
        <Accordion defaultValue="Settings" className="-mx-4">
          <Accordion.Item value="global_settings">
            <Accordion.Control>Global Settings</Accordion.Control>
            <Accordion.Panel>
              {/* <Flex className="bg-app-color-50 dark:bg-gray-400 px-3 py-5 rounded mb-3"> */}
              <Switch
                labelPosition="left"
                label="Dark Mode"
                checked={darkMode === "dark" ? true : false}
                onChange={toggleDarkMode}
                description="Toggle Modes (Between Light/Dark Mode)"
              />
              <Space h={20} />
              <Switch
                labelPosition="left"
                label="Sounds"
                checked={allSettings.g_sounds}
                onChange={toggleSounds}
                description="On/Off Notifications Sound (Default is On)"
              />
              {/* </Flex> */}
              {/* 
              <Flex
              direction={"column"}
              align={"start"}
              className="bg-app-color-100 dark:bg-opacity-10 px-3 py-5 rounded mb-3"
            > */}
              <Space h={20} />
              {/* </Flex> */}
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="calendar_settings">
            <Accordion.Control>Calendar Settings</Accordion.Control>
            <Accordion.Panel>
              <AppEditableInput
                label="Calendar Name"
                inputVal={allSettings.c_calendarName}
                disabled={disabledCalendarName}
                valOnChange={nameOnChange}
                inputRef={refCalendarTitle}
                iconOnClick={editCalendarTitle}
              />
              <Space h={20} />
              <Switch
                labelPosition="left"
                label="Weather Indicators"
                checked={allSettings.c_weatherIndicator}
                onChange={toggleWeathering}
                description="On/Off Wh Weather Indicators (Default is Off)"
              />
              <Space h={20} />
              <Switch
                labelPosition="left"
                label="Recurring"
                checked={allSettings.c_recurring}
                onChange={toggleRecurring}
                description="Enable/Disable Recurring Events (Default is Off)"
              />
              <Space h={20} />
              <Switch
                labelPosition="left"
                label="Include Weekends"
                checked={allSettings.c_weekends}
                onChange={toggleWeekends}
                description="Include/Exclude Weekends in the calednar (Included by default)"
              />
              <Space h={20} />
              <Switch
                labelPosition="left"
                label="Show Weeks Nums"
                checked={allSettings.c_weekends}
                onChange={toggleWeekNums}
                description="Toggle Week Nums on calendar (Off by default)"
              />
              <Space h={20} />
              <MultiSelect
                className="w-fit"
                label="Hide More Days"
                placeholder="Select Days to hide"
                description="Hide More Days other than weekends"
                searchable
                value={allSettings.c_hiddenDays}
                onChange={(e: any) => {
                  setSettings({
                    ...allSettings,
                    c_hiddenDays: e,
                  });
                  console.log(allSettings.c_hiddenDays);
                }}
                data={allDays}
              />
              <Space h={20} />
              <Select
                className="w-fit"
                label="Select your timezone"
                placeholder="Select Your Timezone"
                description="Search For Your City/Region"
                searchable
                data={allTimeZones}
                onChange={(e: any) =>
                  setSettings({ ...allSettings, c_timezone: e.target.value })
                }
              />
              <Space h={20} />
              <Select
                className="w-fit"
                label="First Day"
                placeholder="Pick a Day"
                description="Select The First Day Of The Week"
                searchable
                data={allDays}
                onChange={(e: any) =>
                  setSettings({ ...allSettings, c_firstDay: e })
                }
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="event_settings">
            <Accordion.Control>Event Settings</Accordion.Control>
            <Accordion.Panel>
              <NumberInput
                label="Event Limit"
                classNames={{ wrapper: "w-fit" }}
                description='Set How Many Events Could be Set Per Day ("0" Means Unlimited)'
                value={allSettings.e_eventLimit}
                onChange={handleEventLimit}
                step={1}
                min={0}
                max={10}
              />
              <Space h={20} />
              <Switch
                labelPosition="left"
                label="Easy Edit"
                checked={allSettings.e_easyEdit}
                onChange={toggleEasyEdit}
                description="Toggle Easy Edit to move events around and update start/end dates (Enabled by default)"
              />
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
