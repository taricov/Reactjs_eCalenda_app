import { useState } from "react";
import {
  Drawer,
  Button,
  Group,
  Container,
  Flex,
  TextInput,
  ActionIcon,
  Notification,
  Select,
} from "@mantine/core";
import { useAtom } from "jotai";
import {
  darkModeAtom,
  settingsDrawerOpen,
  userInfoAtom,
  userInfoDisabledAtom,
} from "../store/jotai";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import { useClickOutside } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import { Switch } from "@mantine/core";
import { allTimeZone, validMomentTimezones } from "../store/baseData";

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
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
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
        size="xl"
      >
        <Flex className="bg-slate-200 px-3 py-5 rounded mb-3">
          <Switch
            labelPosition="left"
            label="Theme"
            checked={darkMode === "dark" ? true : false}
            onChange={toggleDarkMode}
            description="Switch between light/dark themes"
          />
        </Flex>
        <Flex className="bg-slate-200 px-3 py-5 rounded mb-3">
          <Switch
            labelPosition="left"
            label="Theme"
            checked={darkMode === "dark" ? true : false}
            onChange={toggleDarkMode}
            description="Switch between light/dark themes"
          />
        </Flex>
        <Flex
          bg={darkMode === "dark" ? "black" : "red"}
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
