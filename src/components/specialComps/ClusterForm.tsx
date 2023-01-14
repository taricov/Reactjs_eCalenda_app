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

export let createClusterToggle = createContext<boolean>(false);

export default function CreateCluster() {
  const clusterSchema = z.object({
    clusterName: z.string(),
    clusterColor: z.string().optional(),
    clusterDesc: z.string().optional(),
    clusterTags: z.string().array().optional(),
  });

  const form = useForm({
    initialValues: {
      clusterName: "",
      clusterColor: "",
      clusterDesc: "",
      clusterTags: [],
    },
    validate: zodResolver(clusterSchema),
  });

  const [createClusterOpened, createClusterHandlers] = useDisclosure(false);
  const [favColors, setFavColors] = useAtom(favColorsAtom);
  const [tags, setTags] = useAtom(tagsAtom);
  useHotkeys([["mod+shift+c", () => createClusterHandlers.toggle()]]);

  return (
    <>
      <createClusterToggle.Provider value={createClusterOpened}>
        <Modal
          withinPortal={false}
          opened={createClusterOpened}
          onClose={createClusterHandlers.close}
          centered
          size={"50%"}
          title="Create Cluster"
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
                placeholder="Cluster Name"
                // onChange={handleEventTitle}
                variant="unstyled"
                {...form.getInputProps("clusterName")}
              />

              <Textarea
                variant="unstyled"
                placeholder="cluster description ..."
                {...form.getInputProps("clusterDesc")}
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
                  {...form.getInputProps("clusterColor")}
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
                  {...form.getInputProps("clusterTags")}
                />
              </Flex>

              <Group position="right" mt="md">
                <Button type="submit">Create</Button>
              </Group>
            </form>
          </Container>
        </Modal>
      </createClusterToggle.Provider>
    </>
  );
}
