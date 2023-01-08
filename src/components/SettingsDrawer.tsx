import { useState } from "react";
import {
  Drawer,
  Button,
  Group,
  Container,
  Flex,
  TextInput,
  ActionIcon,
} from "@mantine/core";
import { useAtom } from "jotai";
import { settingsDrawerOpen } from "../store/jotai";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import { useClickOutside } from "@mantine/hooks";

export default function SettingsDrawer({ closedIt, closeIt }: any) {
  const [yourName, setYourName] = useState("Taric Ov");
  const [disableYourName, setdisableYourName] = useState(true);
  const refYourName = useClickOutside(() => setdisableYourName(false));

  const editYourName = () => {
    // setYourName("");
    setdisableYourName(false);
  };
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
        <Flex align={"end"}>
          <TextInput
            label="Your Name"
            value={yourName}
            onChange={(event) => setYourName(event.currentTarget.value)}
            disabled={disableYourName}
            ref={refYourName}
          />
          <ActionIcon onClick={editYourName} className="mb-1 ml-1">
            {disableYourName ? (
              <AiOutlineEdit size={18} />
            ) : (
              <AiOutlineCheck size={18} />
            )}
            {/* <AiOutlineEdit /> */}
          </ActionIcon>
        </Flex>
      </Drawer>
    </>
  );
}
