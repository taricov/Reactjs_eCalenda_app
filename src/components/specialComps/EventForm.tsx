import {
  Container,
  Text,
  TextInput,
  Flex,
  Textarea,
  Select,
  MultiSelect,
  Space,
  Switch,
  Checkbox,
  ColorInput,
  Modal,
  Transition,
  Button,
  Group,
} from "@mantine/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { DatePicker, TimeInput } from "@mantine/dates";
import { useAtom } from "jotai";
import { createContext, useContext, useState } from "react";
import { BsClock } from "react-icons/bs";
import {
  allIntervals,
  createdClustersAtom,
  createdProjectsAtom,

  // dateRangePicker,
  eventsAtom,
  favColorsAtom,
  isOpen,
  repeatedAtom,
  tagsAtom,
} from "../../store/jotai";
import MantineDatePicker from "../DatePicker/MantineDatePicker";
import { date, z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

interface Props {
  open: () => void;
  close: () => void;
  opened: boolean;
}

export default function CreateEvent() {
  const [events, setEvents] = useAtom(eventsAtom);
  const [createdProjects] = useAtom(createdProjectsAtom);
  const [createdClusters] = useAtom(createdClustersAtom);
  const [favColors, setFavColors] = useAtom(favColorsAtom);
  const [tags, setTags] = useAtom(tagsAtom);
  //   const [repeated, setRepeated] = useAtom(repeatedAtom);
  const [repeated, setRepeated] = useState(false);
  // const [eventTitle, setEventTitle] = useState("");

  // const [hideMe] = useAutoAnimate<HTMLDivElement>();
  // const [repeatTimes, setRepeatTimes] = useAtom<string | undefined>(xTimesAtom);
  // const [repeatTimes, setRepeatTimes] = useState<string | null>(null);

  // const selectedXTimes = (selectedInterval: string) => {
  //   setRepeatTimes(selectedInterval);
  // };
  // const updateColors = (selectedColor: string) => {
  //   setFavColors([selectedColor, ...favColors.slice(0, -1)]);
  // };

  // const handleEventTitle = (e: any) => {
  //   setEventTitle(e.target.value);
  //   console.log(eventTitle);
  // };

  const eventSchema = z.object({
    eventName: z.string().nonempty(),
    // notes: z.string().optional(),
    // dateRange: z.date().array().nonempty(),
    // project: z.string().optional(),
    // clusters: z.string().array().optional(),
    // repeated: z.boolean().optional(),
    // freq: z.string().optional(),
    // ends: z.date().optional(),
    // reminder: z.date().optional(),
    // tags: z.string().array().optional(),
    // color: z.string().optional(),
  });

  const form = useForm({
    initialValues: {
      eventName: "",
      // dateRange: "",
      notes: "",
      project: "",
      clusters: "",
      repeated: false,
      freq: "",
      ends: "",
      reminder: "",
      tags: [],
      colored: "",
    },
    validate: zodResolver(eventSchema),
  });
  // const [creatEventOpened, createEventHandlers] = useDisclosure(false);

  // const [createdEventFormOpened, setEventFormOpened] = useAtom(createEventForm);

  // const [selectedDateRangePicker] = useAtom(dateRangePicker);
  const [isOpened, setIsOpened] = useAtom(isOpen);
  const eventData = (values: any) => {
    const { eventName, colored } = values;
    // const start = selectedDateRangePicker[0];
    // const end = selectedDateRangePicker[1];
    setEvents([...events, { title: eventName, allDay: true, color: colored }]);
    console.log(events);
    // setEventFormOpened(false);
    setIsOpened({ ...isOpened, createEvent_form: false });
    form.reset();
  };
  // let editObj = useContext(formContext);
  // console.log(editObj);
  return (
    <>
      <Modal
        withinPortal={false}
        opened={isOpened.createEvent_form}
        onClose={() => setIsOpened({ ...isOpened, createEvent_form: false })}
        centered
        size={"30%"}
        title="Create Event"
        classNames={{
          title: "mx-4 dark:text-red font-bold",
          modal: "p-0 overflow-hidden",
          header: "mb-0 py-4 bg-app-color-400",
          close: "mx-5",
        }}
      >
        <Container className="p-5">
          <form onSubmit={form.onSubmit(eventData)}>
            <Flex direction="column">
              <TextInput
                // withAsterisk
                placeholder="Event Name"
                // onChange={handleEventTitle}
                variant="unstyled"
                {...form.getInputProps("eventName")}
              />
              <Textarea
                variant="unstyled"
                placeholder="Type notes ..."
                {...form.getInputProps("notes")}
              />
              <MantineDatePicker
                desc="Select Dates"
                size="sm"
                {...form.getInputProps("dateRange")}
              />
            </Flex>
            <Flex gap={20}>
              <Select
                variant="unstyled"
                placeholder={"add project"}
                // onChange={selectedXTimes}
                data={createdProjects.map((v) => v.name)}
                className="w-3/5"
                size="sm"
                {...form.getInputProps("project")}
              />
              <MultiSelect
                className="w-fit"
                data={createdClusters.map((v) => v.name)}
                size="sm"
                placeholder="add clusters"
                searchable
                variant="unstyled"
                {...form.getInputProps("clusters")}
              />
            </Flex>

            <Space h={"md"} />
            <Checkbox
              label="Repeat"
              classNames={{
                input: `checked:bg-app-color-500 checked:border-none cursor-pointer`,
              }}
              size="sm"
              checked={repeated}
              // onChange={() => setRepeated((repeated) => !repeated)}
              {...form.getInputProps("repeated", { type: "checkbox" })}
            />
            <Flex
              direction={"column"}
              className={`${
                !form.getInputProps("repeated").value ? "hidden" : ""
              }`}
            >
              <Flex gap={20}>
                <Select
                  variant="unstyled"
                  placeholder={"every 2 weeks"}
                  //   onChange={selectedXTimes}
                  data={allIntervals}
                  className="w-3/5"
                  size="sm"
                  {...form.getInputProps("freq")}
                />
                <Flex className="w-full" gap={10}>
                  <Text
                    className="flex items-center justify-center "
                    size={"sm"}
                  >
                    ends
                  </Text>
                  <DatePicker
                    className="w-fit"
                    variant="unstyled"
                    placeholder="never"
                    size="sm"
                    {...form.getInputProps("ends")}
                  />
                </Flex>
              </Flex>
              <Flex>
                <Text className="flex items-center justify-center " size={"xs"}>
                  reminder
                </Text>
                <TimeInput
                  size="sm"
                  className="w-1/3"
                  placeholder="none"
                  icon={<BsClock size={16} />}
                  variant="unstyled"
                  defaultValue={new Date()}
                  {...form.getInputProps("reminder")}
                />
              </Flex>
            </Flex>

            <Flex gap={20}>
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
                {...form.getInputProps("tags")}
              />
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
                {...form.getInputProps("colored")}
              />
            </Flex>
            <Group position="right" mt="md">
              <Button type="submit">Create</Button>
            </Group>
          </form>
        </Container>
      </Modal>
    </>
  );
}
