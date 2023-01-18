import {
  Button,
  Center,
  CheckIcon,
  ColorInput,
  ColorPicker,
  ColorSwatch,
  Container,
  Flex,
  Group,
  Modal,
  MultiSelect,
  Radio,
  Space,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { useAtom } from "jotai";
import { createContext, useState } from "react";
import { z } from "zod";
import {
  favColorsAtom,
  isOpen,
  settingsAtom,
  siteColors,
  tagsAtom,
} from "../../store/jotai";
import AppStandardModal from "./AppStandardModal";

// export let createprojectToggle = createContext<boolean>(false);

export default function Createproject() {
  const projectSchema = z.object({
    projectName: z.string(),
    projectColor: z.string().optional(),
    projectDesc: z.string().optional(),
    projectTags: z.string().array().optional(),
  });

  const form = useForm({
    initialValues: {
      projectName: "",
      projectDesc: "",
      projectTags: [],
      projectColor: "",
    },
    validate: zodResolver(projectSchema),
  });

  // const [createprojectOpened, createprojectHandlers] = useDisclosure(false);
  const [isOpened, setIsOpened] = useAtom(isOpen);
  const [favColors, setFavColors] = useAtom(favColorsAtom);
  const [tags, setTags] = useAtom(tagsAtom);
  useHotkeys([
    [
      "mod+shift+g",
      () =>
        setIsOpened({
          ...isOpened,
          addProject_form: !isOpened.addProject_form,
        }),
    ],
  ]);

  const [allColors] = useAtom(siteColors);

  return (
    <>
      {/* <createprojectToggle.Provider value={createprojectOpened}> */}
      {/* <Modal
        withinPortal={false}
        opened={setIsOpened.addproject_form}
        onClose={() =>
          setOpened({
            ...setIsOpened,
            addproject_form: false,
          })
        }
        centered
        size={"50%"}
        title="Create project"
        classNames={{
          title: "mx-4 dark:text-app-color-900 font-bold",
          modal: "p-0 overflow-hidden",
          header: "mb-0 py-4 bg-app-color-400",
          close: "mx-5",
        }}
      > */}
      <AppStandardModal
        modalOpned={isOpened.addProject_form}
        modalCloser={() => setIsOpened({ ...isOpened, addProject_form: false })}
        title="Create Project"
      >
        <></>
        <Container className="p-5">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              withAsterisk
              placeholder="Project Name"
              // onChange={handleEventTitle}
              variant="unstyled"
              {...form.getInputProps("projectName")}
            />

            <Textarea
              variant="unstyled"
              placeholder="Project Description..."
              {...form.getInputProps("projectDesc")}
            />
            <MultiSelect
              className="w-fit"
              data={tags}
              size="sm"
              placeholder="Add Tags"
              searchable
              variant="unstyled"
              creatable
              getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => {
                const item = query;
                setTags((current) => [...current, item]);
                return item;
              }}
              {...form.getInputProps("projectColor")}
            />
            <Space h={10} />
            <Stack align={"center"}>
              <ColorPicker
                classNames={{
                  swatch: "m-1",
                  swatches: "justify-center",
                }}
                swatchesPerRow={8}
                swatches={allColors}
                withPicker={false}
                {...form.getInputProps("projectColor")}
              />
              <Text>{form.values.projectColor}</Text>
            </Stack>

            <Group position="right" mt="md">
              <Button
                className="bg-app-color-500 hover:bg-app-color-600 transition duration-200 dark:bg-opacity-10 dark:hover:bg-opacity-5 dark:bg-app-color-50 dark-opacity-5"
                type="submit"
              >
                Create
              </Button>
            </Group>
          </form>
        </Container>
      </AppStandardModal>

      {/* </Modal> */}
      {/* </createprojectToggle.Provider> */}
    </>
  );
}
