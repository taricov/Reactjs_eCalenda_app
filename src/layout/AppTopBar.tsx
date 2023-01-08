import {
  ActionIcon,
  Autocomplete,
  Button,
  Flex,
  Menu,
  Stack,
  Text,
} from "@mantine/core";
import { useAtom } from "jotai";
import { ChangeEvent, ChangeEventHandler, SetStateAction } from "react";
import { BsPlusLg, BsSearch } from "react-icons/bs";
import { searchDataAtom, searchQueryAtom } from "../store/jotai";

export default function AppTopBar() {
  const [searchData] = useAtom(searchDataAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const handleSearch = (e: SetStateAction<string>) => {
    setSearchQuery(e);
    console.log(e);
  };
  return (
    <>
      <Flex justify={"space-between"}>
        <Autocomplete
          classNames={{
            input:
              "border-gray-100 focus:border-gray-300 dark:border-gray-800 dark:focus:border-gray-700  transition-all duration-200",
          }}
          className="grow mr-5 "
          icon={<BsSearch />}
          data={[]}
          placeholder="search"
          onChange={handleSearch}
          value={searchQuery}
          radius="md"
          size="sm"
        />
        <Menu
          classNames={{ item: "py-1", dropdown: "px-0" }}
          shadow="md"
          width={"fit"}
        >
          <Menu.Target>
            <Button size="sm" variant="default" leftIcon={<BsPlusLg />}>
              Add New
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Actions</Menu.Label>
            <Menu.Item>New Event</Menu.Item>
            <Menu.Item>New Project</Menu.Item>
            <Menu.Item>New Cluster</Menu.Item>

            <Menu.Divider />

            <Menu.Label>+ Features</Menu.Label>
            <Menu.Item>New Feature</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </>
  );
}
