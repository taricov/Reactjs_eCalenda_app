import {
  ActionIcon,
  Autocomplete,
  Button,
  Flex,
  Menu,
  Stack,
  Text,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { ChangeEvent, ChangeEventHandler, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { eventsAtom, isOpen, searchBarQuery } from "../store/jotai";

export default function AppTopBar() {
  const [isOpened, setIsOpened] = useAtom(isOpen);
  // const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [events] = useAtom(eventsAtom);
  const processEvents = (e: SetStateAction<string>) => {
    // events.
  };
  const searchBar = useRef<HTMLInputElement | null>(null);
  const focusSearchBar: () => void = () => {
    searchBar.current?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useHotkeys([
    ["mod+k", () => focusSearchBar()],
    ["/", () => focusSearchBar()],
  ]);
  const { t, i18n } = useTranslation();

  // const calWrapper = forwardedRef?.current;
  // console.log("from Top this is my ref", calWrapper);
  const [, commandBarHandler] = useAtom(searchBarQuery);

  const handleMagicBar = (e: any) => {
    commandBarHandler(e);
    setSearchQuery(e);

    // const commandSymbol =
    //   searchQuery.split(":")[0].trim() ?? searchQuery.trim();
    // let qry = commandSymbol[1];

    // if (commandSymbol === "/create") {
    // } else if (commandSymbol === "/filter") {
    // } else if (commandSymbol === "/goto") {
    // } else if (commandSymbol === "/open") {
    // } else {
    // }
  };

  return (
    <>
      <Flex
        direction="column"
        justify="space-between"
        gap={10}
        className="xs:flex-row"
      >
        <Autocomplete
          ref={searchBar}
          classNames={{
            input:
              "border-app-color-200 focus:border-app-color-400 dark:border-gray-800 dark:focus:border-gray-700  transition-all duration-200",
          }}
          className="grow xm:mx-auto"
          icon={<BsSearch />}
          data={[]}
          placeholder="Search, Filter, Navigate, and more..."
          onChange={handleMagicBar}
          value={searchQuery}
          onKeyDown={(e) => console.log("s")}
          radius="md"
          size="sm"
        />
        <Menu
          classNames={{ item: "py-1", dropdown: "px-0" }}
          shadow="md"
          width={"fit"}
        >
          <Menu.Target>
            <Button
              size="sm"
              className="bg-app-color-500 hover:bg-app-color-600 text-app-color-50 transition-all duration-200"
              variant="default"
              leftIcon={<BsPlusLg />}
            >
              {t("nw_tsk")}
            </Button>
          </Menu.Target>

          <Menu.Dropdown className="xs:w-fit w-11/12">
            <Menu.Label>Actions</Menu.Label>
            <Menu.Item
              onClick={() => setIsOpened({ ...isOpened, addEvent_form: true })}
            >
              New Event
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                setIsOpened({ ...isOpened, addProject_form: true })
              }
            >
              New Project
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                setIsOpened({ ...isOpened, addCluster_form: true })
              }
            >
              New Cluster
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>+ Features</Menu.Label>
            <Menu.Item>New Feature</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </>
  );
}
