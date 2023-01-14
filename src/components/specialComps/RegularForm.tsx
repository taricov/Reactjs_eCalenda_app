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

export let createRegularToggle = createContext<boolean>(false);

export default function CreateRegular() {
  const regularSchema = z.object({
    regularName: z.string(),
    regularColor: z.string().optional(),
    regularDesc: z.string().optional(),
    regularTags: z.string().array().optional(),
  });

  const form = useForm({
    initialValues: {
      regularName: "",
      regularColor: "",
      regularDesc: "",
      regularTags: [],
    },
    validate: zodResolver(regularSchema),
  });

  const [createRegularOpened, createRegularHandlers] = useDisclosure(false);
  const [favColors, setFavColors] = useAtom(favColorsAtom);
  const [tags, setTags] = useAtom(tagsAtom);
  useHotkeys([["mod+shift+g", () => createRegularHandlers.toggle()]]);

  return (
    <>
      <createRegularToggle.Provider value={createRegularOpened}>
        <Modal
          withinPortal={false}
          opened={createRegularOpened}
          onClose={createRegularHandlers.close}
          centered
          size={"50%"}
          title="Create Regular"
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
                placeholder="Regular Name"
                // onChange={handleEventTitle}
                variant="unstyled"
                {...form.getInputProps("regularName")}
              />

              <Textarea
                variant="unstyled"
                placeholder="regular description ..."
                {...form.getInputProps("regularDesc")}
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
                  {...form.getInputProps("regularTags")}
                />
              </Flex>

              <Group position="right" mt="md">
                <Button type="submit">Create</Button>
              </Group>
            </form>
          </Container>
        </Modal>
      </createRegularToggle.Provider>
    </>
  );
}
