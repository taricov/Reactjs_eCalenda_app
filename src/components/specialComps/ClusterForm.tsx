import { MdArchive } from "react-icons/md";
import {
  Button,
  ColorInput,
  Container,
  Flex,
  Group,
  MediaQuery,
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
import AppColotInput from "./AppColorInput";
import { pushNotification } from "./pushNotification";
import AppStandardModal from "./AppStandardModal";

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

  const myFn = () => {
    pushNotification("Hello!", "here goes a message", "teal");
  };

  return (
    <>
      <createClusterToggle.Provider value={createClusterOpened}>
        {/* <Modal
          withinPortal={false}
          opened={createClusterOpened}
          onClose={createClusterHandlers.close}
          centered
          title="Create Cluster"
          className="md:w-3/6 mx-auto w-full "
          classNames={{
            close:
              "bg-none text-app-color-100 dark:hover:bg-app-color-50 dark:hover:bg-opacity-5 hover:bg-app-color-600 transition duration-200 mx-5 outline-none",
            title: "mx-4 text-app-color-100 dark:text-app-color-100 font-bold",
            modal: "p-0 overflow-hidden",
            header:
              "mb-0 py-4 bg-app-color-500 dark:bg-opacity-5 dark:bg-app-color-50 shadow-lg",
          }}
        > */}
        <AppStandardModal
          modalOpned={createClusterOpened}
          modalCloser={createClusterHandlers.close}
          title="Create Cluster"
        >
          <></>
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
                placeholder="Cluster Description"
                {...form.getInputProps("clusterDesc")}
              />
              <Flex wrap={"wrap"}>
                <ColorInput
                  // withEyeDropper
                  size="sm"
                  defaultValue="#7367f0"
                  className="md:w-fit w-full"
                  variant="unstyled"
                  placeholder="Pick color"
                  classNames={{
                    icon: "w-fit",
                    input: "px-6",
                  }}
                  format="hex"
                  swatchesPerRow={7}
                  swatches={favColors}
                  // onChange={updateColors}
                  {...form.getInputProps("clusterColor")}
                />

                <MultiSelect
                  className="md:w-fit md:mx-5 w-full"
                  data={tags}
                  size="sm"
                  placeholder="Add Tags"
                  searchable
                  variant="unstyled"
                  creatable
                  dropdownPosition="flip"
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
                <Button
                  onClick={myFn}
                  className="bg-app-color-500 hover:bg-app-color-600 transition duration-200 dark:bg-opacity-10 dark:hover:bg-opacity-5 dark:bg-app-color-50 dark-opacity-5"
                  type="submit"
                >
                  Create
                </Button>
              </Group>
            </form>
          </Container>
          {/* </Modal> */}
        </AppStandardModal>
      </createClusterToggle.Provider>
    </>
  );
}
