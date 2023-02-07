import {
  Divider,
  Drawer,
  Flex,
  MultiSelect,
  NumberInput,
  Select,
  Space,
  Switch,
  TextInput,
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
  langs,
  langs2,
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
  const [disabledProjectName, setProjectNameDisabled] = useState<boolean>(true);
  const [disabledClusterName, setClusterNameDisabled] = useState<boolean>(true);
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
  const refProjectTitle = useClickOutside(() => {
    setProjectNameDisabled(true);
    if (!disabledCalendarName) {
      pushNotification(
        "Updated!",
        "Your name has been updated",
        "teal",
        <IconCheck size={10} />
      );
    }
  });
  const refClusterTitle = useClickOutside(() => {
    setClusterNameDisabled(true);
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
  const projectOnChange = (e: any) =>
    setSettings({
      ...allSettings,
      g_projectName: e.currentTarget.value,
    });
  const clusterOnChange = (e: any) =>
    setSettings({
      ...allSettings,
      g_clusterName: e.currentTarget.value,
    });
  const editCalendarTitle = () => {
    setCalendarNameDisabled(false);
    refCalendarTitle.current.focus();

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
  const editProjectTitle = () => {
    setProjectNameDisabled(false);
    refProjectTitle.current.focus();
    if (!disabledProjectName) {
      setProjectNameDisabled(true);
      pushNotification(
        "Updated!",
        "Your project name has been updated",
        "teal",
        <IconCheck size={18} />
      );
    }
  };
  const editClusterTitle = () => {
    setClusterNameDisabled(false);
    refClusterTitle.current.focus();
    if (!disabledClusterName) {
      setClusterNameDisabled(true);
      pushNotification(
        "Updated!",
        "Cluster name has been updated",
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
  const toggleLastDayExcluded = () => {
    setSettings({
      ...allSettings,
      c_lastDayExcluded: !allSettings.c_lastDayExcluded,
    });
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
  const toggleEventOverlapping = () => {
    setSettings({
      ...allSettings,
      e_eventOverlapping: !allSettings.e_eventOverlapping,
    });
  };
  const toggleSounds = () => {
    setSettings({ ...allSettings, g_sounds: !allSettings.g_sounds });
  };
  const toggleDealWithTime = () => {
    setSettings({
      ...allSettings,
      g_dealWithTime: !allSettings.g_dealWithTime,
    });
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
  const onChangeHourSys = (e: any) => {
    setSettings({ ...allSettings, g_timeFormat: e });
  };
  const onChangeLanguage = (e: any) => {
    setSettings({
      ...allSettings,
      g_selected_lang: e,
      g_rtl_direction: e === "ar" ? true : false,
      c_locale: e,
    });
  };
  const [languages2] = useAtom(langs2);

  return (
    <>
      <Drawer
        withinPortal={false}
        opened={isOpened.settings_drawer}
        onClose={() => setIsOpened({ ...isOpened, settings_drawer: false })}
        title="Settings"
        classNames={{ title: "text-2xl font-bold" }}
        padding="xl"
        size="full"
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
              <Space h={20} />
              <Switch
                labelPosition="left"
                label="Deal With Time"
                checked={allSettings.g_dealWithTime}
                onChange={toggleDealWithTime}
                description="Decide whether or not to calculate time if you deal time not only days (Default is On)"
              />
              <Space h={20} />
              <Flex className="flex gap-5">
                <Select
                  label="Your Language"
                  value={allSettings.g_selected_lang}
                  onChange={onChangeLanguage}
                  data={languages2}
                />
                <Space h={20} />
                <Select
                  label="Time Format"
                  value={allSettings.g_timeFormat}
                  onChange={onChangeHourSys}
                  data={[
                    { value: "12", label: "12 Houres" },
                    { value: "24", label: "24 Hours" },
                  ]}
                />
              </Flex>
              <Space h={20} />
              <Divider my="xs" label="Workflow-related" />

              <Flex className="flex gap-5">
                <AppEditableInput
                  label="Project"
                  inputVal={allSettings.g_projectName}
                  disabled={disabledProjectName}
                  valOnChange={projectOnChange}
                  inputRef={refProjectTitle}
                  iconOnClick={editProjectTitle}
                />
                <AppEditableInput
                  label="Cluster"
                  inputVal={allSettings.g_clusterName}
                  disabled={disabledClusterName}
                  valOnChange={clusterOnChange}
                  inputRef={refClusterTitle}
                  iconOnClick={editClusterTitle}
                />
              </Flex>

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
              <Space h={20} />
              <Switch
                labelPosition="left"
                label="Exclude Last Day"
                checked={allSettings.c_lastDayExcluded}
                onChange={toggleLastDayExcluded}
                description="Include/Exclude last day in created events (Included by default)"
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="event_settings">
            <Accordion.Control>Event Settings</Accordion.Control>
            <Accordion.Panel>
              <Switch
                labelPosition="left"
                label="Event Overlap"
                checked={allSettings.e_eventOverlapping}
                onChange={toggleEventOverlapping}
                description="Toggle whether it's for more than one event to happen in a given day (Enabled by default)"
              />
              <Space h={20} />
              <NumberInput
                disabled={allSettings.e_eventOverlapping ? false : true}
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
