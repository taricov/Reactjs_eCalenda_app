import {
  Button,
  ColorInput,
  Container,
  Flex,
  Group,
  Modal,
  MultiSelect,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { useAtom } from "jotai";
import { createContext } from "react";
import { z } from "zod";
import { favColorsAtom, tagsAtom } from "../../store/jotai";

export let createProjectToggle = createContext<boolean>(false);

export default function CreateProject() {
  const projSchema = z.object({
    projectName: z.string(),
    projectColor: z.string().optional(),
    projectDesc: z.string().optional(),
    projectTags: z.string().array().optional(),
  });

  const form = useForm({
    initialValues: {
      projectName: "",
      projectColor: "",
      projectDesc: "",
      projectTags: [],
    },
    validate: zodResolver(projSchema),
  });

  const [createProjOpened, createProjHandlers] = useDisclosure(false);
  const [favColors, setFavColors] = useAtom(favColorsAtom);
  const [tags, setTags] = useAtom(tagsAtom);
  useHotkeys([["mod+shift+p", () => createProjHandlers.toggle()]]);

  return (
    <>
      <createProjectToggle.Provider value={createProjOpened}>
        <Modal
          withinPortal={false}
          opened={createProjOpened}
          onClose={createProjHandlers.close}
          centered
          size={"50%"}
          title="Create Project"
          classNames={{
            title: "mx-4 dark:text-app-color-900 font-bold",
            modal: "p-0 overflow-hidden",
            header: "mb-0 py-4 bg-app-color-400",
            close: "mx-5",
          }}
        >
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
                placeholder="Project description ..."
                {...form.getInputProps("projectDesc")}
              />
              <Flex wrap={"wrap"}>
                <ColorInput
                  // withEyeDropper
                  size="sm"
                  className="w-fit"
                  variant="unstyled"
                  placeholder="Pick color"
                  format="hex"
                  swatchesPerRow={7}
                  swatches={favColors}
                  // onChange={updateColors}
                  {...form.getInputProps("colors")}
                />

                <MultiSelect
                  className="w-fit"
                  data={tags}
                  size="sm"
                  placeholder="add tags"
                  searchable
                  variant="unstyled"
                  creatable
                  getCreateLabel={(query) => `+ Create ${query}`}
                  onCreate={(query) => {
                    const item = query;
                    setTags((current) => [...current, item]);
                    return item;
                  }}
                  {...form.getInputProps("projectTags")}
                />
              </Flex>

              <Group position="right" mt="md">
                <Button type="submit">Create</Button>
              </Group>
            </form>
          </Container>
        </Modal>
      </createProjectToggle.Provider>
    </>
  );
}
