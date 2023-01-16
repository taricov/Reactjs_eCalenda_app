import { useDisclosure, useHotkeys } from "@mantine/hooks";
import React, { useCallback, useEffect, useState } from "react";
import ShortcutsRow from "./ShortcutsRow";
import ShortcutsSection from "./ShortcutsSection";
import SiteCompModal from "./MantineModal";
import {
  Center,
  Container,
  Flex,
  Group,
  Kbd,
  Modal,
  Paper,
  Table,
  Text,
} from "@mantine/core";
import { string } from "zod";
import { Section } from "@mantine/core/lib/AppShell/HorizontalSection/Section/Section";
import AppStandardModal from "../specialComps/AppStandardModal";
import { isOpen } from "../../store/jotai";
import { useAtom } from "jotai";

const ShortcutsPane = () => {
  // const handleKeyPress   = useCallback((e: KeyboardEvent) => {
  //   let pressed = e.key;
  //   if ((e.metaKey || e.ctrlKey) && pressed === "/") {
  //     setOpened((opened) => !opened);
  //     console.log(opened);
  //   }
  // }, []);
  // useHotkeys([["mod+/", () => setOpened((opened) => !opened)]]);

  // useEffect(() => {
  //   document.addEventListener("keydown", handleKeyPress);
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [handleKeyPress]);

  const shortcutsObj: {
    section_title: string;
    items: { title: string; shortcut: string }[];
  }[] = [
    {
      section_title: "Quick Access",
      items: [
        {
          title: "Edit Profile",
          shortcut: "Ctrl/⌘ + ]",
        },
        {
          title: "Open Integrations",
          shortcut: "Ctrl/⌘ + I",
        },
        {
          title: "Open Shortcuts",
          shortcut: "Ctrl/⌘ + /",
        },
        {
          title: "Open Settings",
          shortcut: "Ctrl/⌘ + J",
        },
      ],
    },
    {
      section_title: "Quick Actions",
      items: [
        {
          title: "Toggle Dark Mode",
          shortcut: "Alt/⌥ + D",
        },
        {
          title: "Create New Event",
          shortcut: "Ctrl/⌘ + E",
        },
        {
          title: "Create Project",
          shortcut: "Ctrl/⌘ + Shift + P",
        },
        {
          title: "Create Cluster",
          shortcut: "Ctrl/⌘ + Shift + C",
        },
        {
          title: "Create Regular",
          shortcut: "Ctrl/⌘ + Shift + G",
        },
        {
          title: "New Calendar",
          shortcut: "Ctrl/⌘ + Shift + N",
        },
        {
          title: "Focus Search Bar",
          shortcut: 'Ctrl/⌘ + K Or "/"',
        },
      ],
    },
    {
      section_title: "Others",
      items: [
        {
          title: "Take A Nap",
          shortcut: "Ctrl/⌘ + '",
        },
      ],
    },
  ];

  const [isOpened, setIsOpened] = useAtom(isOpen);

  // const [shortCutsOpened, shortCutsHandlers] = useDisclosure(false);
  useHotkeys([
    [
      "mod+/",
      () =>
        setIsOpened({
          ...isOpened,
          shortcuts_modal: !isOpened.shortcuts_modal,
        }),
    ],
  ]);

  return (
    <>
      {/* <Modal
        withinPortal={false}
        classNames={{
          modal:
            "bg-gradient-to-r from-skin-hue2 to-skin-hue0 w-11/12 overflow-auto h-3/4 p-0",
        }}
        className="overflow-scroll h-auto"
        opened={shortCutsOpened}
        onClose={shortCutsHandlers.close}
        centered
        withCloseButton={false}
        overlayOpacity={0.75}
        overlayBlur={0}
      > */}
      <AppStandardModal
        modalOpned={isOpened.shortcuts_modal}
        modalCloser={() => setIsOpened({ ...isOpened, shortcuts_modal: false })}
        title="Shortcuts/Hacks"
        Xwidth={11}
      >
        {/* <Flex
          direction={"column"}
          className=" bg-app-color-500 top-0 sticky bg-primary-800 p-5 shadow-md"
        >
          <Text
            component="h1"
            fw={"bold"}
            className="dark:text-app-color-600 text-app-color-100"
          >
            Site Shortcuts
          </Text>
          <Text>
            Accelerate your pace and use your system more effeciently.
          </Text>
        </Flex> */}

        <Table striped>
          <tbody>
            {shortcutsObj.map((section) => {
              return (
                <>
                  <tr key={section.section_title}>
                    <Text
                      align="center"
                      className={"py-2 px-5"}
                      component="h2"
                      fw="bold"
                      key={section.section_title}
                    >
                      {section.section_title}
                    </Text>
                  </tr>
                  {section.items.map((item) => {
                    return (
                      <tr key={item.title}>
                        <td>
                          <Flex
                            justify={"space-between"}
                            className="w-full py-1 px-7"
                          >
                            <Text>{item.title}</Text>
                            <Group className="px-1 rounded shadow-lg text-app-color-50 dark:bg-app-color-50 bg-app-color-500 dark:bg-transparent">
                              <Text>{item.shortcut}</Text>
                            </Group>
                          </Flex>
                        </td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </Table>
        <Center className="py-1 dark:bg-app-color-900 bg-app-color-500 ">
          <Text fz={12}>
            Accelerate your pace and use your system more effeciently
          </Text>
        </Center>
        {/* </Modal> */}
      </AppStandardModal>
    </>
  );
};

export default ShortcutsPane;
