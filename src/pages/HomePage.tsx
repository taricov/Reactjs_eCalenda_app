import { Flex } from "@mantine/core";
import ShortcutsPane from "../components/ShortcutsPane/ShortcutsPane";
import AppContainer from "../layout/AppContainer";
import AppTopBar from "../layout/AppTopBar";
import FullCal from "../components/FullCal";

export default function HomePage() {
  return (
    <>
      <AppContainer>
        <ShortcutsPane />
        <Flex direction={"column"} gap={10}>
          {/* <TextInput
                placeholder="Search"
                radius="xl"
                size="xs"
                onChange={(e) => setValue(e.currentTarget.value)}
                icon={<BsSearch size={14} />}
              /> */}
          <AppTopBar />
          <FullCal />
        </Flex>
      </AppContainer>
    </>
  );
}
