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
  Stack,
  ColorPicker,
} from "@mantine/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { DatePicker, TimeInput } from "@mantine/dates";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
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
  settingsAtom,
  siteColors,
  PickerDate,
  tagsAtom,
  excludeDay,
  siteColorsMap,
  calendarData,
} from "../../store/jotai";
import MantineDatePicker from "../DatePicker/MantineDatePicker";
import { date, z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure, useFocusTrap } from "@mantine/hooks";
import AppStandardModal from "./AppStandardModal";
import moment from "moment";

interface Props {
  open: () => void;
  close: () => void;
  opened: boolean;
}

export default function EditEvent() {
  const [events, setEvents] = useAtom(eventsAtom);
  const [createdProjects] = useAtom(createdProjectsAtom);
  const [createdClusters] = useAtom(createdClustersAtom);
  const [favColors, setFavColors] = useAtom(favColorsAtom);
  const [datePicked] = useAtom(PickerDate);
  const [tags, setTags] = useAtom(tagsAtom);
  //   const [repeated, setRepeated] = useAtom(repeatedAtom);
  const [repeated, setRepeated] = useState(false);
  const [mappedColors]: any = useAtom(siteColorsMap);

  // const [hideMe] = useAutoAnimate<HTMLDivElement>();
  // const [repeatTimes, setRepeatTimes] = useAtom<string | undefined>(xTimesAtom);
  // const [repeatTimes, setRepeatTimes] = useState<string | null>(null);

  // const selectedXTimes = (selectedInterval: string) => {
  //   setRepeatTimes(selectedInterval);
  // };
  // const updateColors = (selectedColor: string) => {
  //   setFavColors([selectedColor, ...favColors.slice(0, -1)]);
  // };

  const [eveData] = useAtom(calendarData);

  const [eventTitle, updateTitle] = useState(eveData.title);
  const [eventColor, updateColor] = useState("");
  const [eventNotes, updateNotes] = useState("");
  const [eventProject, updateProject] = useState("");
  const [eventTags, updateTags] = useState<string[] | undefined | any>([]);
  const [eventClusters, updateClusters] = useState<string[] | undefined | any>(
    []
  );

  // const [creatEventOpened, createEventHandlers] = useDisclosure(false);

  // const [createdEventFormOpened, setEventFormOpened] = useAtom(createEventForm);

  // const [selectedDateRangePicker] = useAtom(dateRangePicker);
  const [isOpened, setIsOpened] = useAtom(isOpen);
  const onEditEvent = (values: any) => {
    const { eventName, eventColor } = values;
    const className = `${mappedColors[eventColor]}`;
    const alertClassName = `after:!bg-slate-900 dark:after:!bg-slate-300`;
    console.log(className);
    // const start = selectedDateRangePicker[0];
    // const end = selectedDateRangePicker[1];
    const lastDate = excludeDay(allSettings.c_lastDayExcluded, datePicked[1]);
    setEvents([
      ...events,
      {
        title: eventName,
        allDay: true,
        id: new String(Math.random()),
        className,
        start: datePicked[0],
        end: lastDate,
      },
    ]);
    // console.log(events);
    // setEventFormOpened(false);
    setIsOpened({ ...isOpened, editEvent_form: false });
  };
  // let editObj = useContext(formContext);
  // console.log(editObj);
  const [allColors] = useAtom(siteColors);
  const [allSettings, setSettings] = useAtom(settingsAtom);
  return (
    <>
      <AppStandardModal
        modalOpned={isOpened.editEvent_form}
        modalCloser={() => setIsOpened({ ...isOpened, editEvent_form: false })}
        title="Create Event"
      >
        <></>
        <Container className="p-5">
          <form onSubmit={onEditEvent}>
            <Flex direction="column">
              <TextInput
                data-autofocus
                placeholder="Event Name"
                onChange={(e: any) => {
                  updateTitle(e.target.value);
                }}
                variant="unstyled"
                value={eventTitle}
              />
              <Textarea
                variant="unstyled"
                placeholder="Type Notes ..."
                value={eventNotes}
                onChange={() => updateNotes((e) => e)}
              />
              <MantineDatePicker desc="Select Dates" size="sm" />
            </Flex>
            <Flex gap={20}>
              <Select
                variant="unstyled"
                placeholder={"add project"}
                // onChange={selectedXTimes}
                data={createdProjects.map((v) => v.name)}
                value={eventProject}
                onChange={(e: any) => updateProject(e.target.value)}
                className="w-3/5"
                size="sm"
              />
              <MultiSelect
                className="w-fit"
                data={createdClusters.map((v) => v.name)}
                value={eventClusters}
                onChange={(e: any) =>
                  updateClusters([...eventClusters, e.target.value])
                }
                size="sm"
                placeholder="add clusters"
                searchable
                variant="unstyled"
              />
            </Flex>

            <Space h={"md"} />
            <Checkbox
              className={allSettings.c_recurring ? "" : "hidden"}
              label="Repeat"
              classNames={{
                input: `checked:bg-app-color-500 checked:border-none cursor-pointer`,
              }}
              size="sm"
              checked={repeated}
              onChange={() => setRepeated((repeated) => !repeated)}
            />
            <Flex direction={"column"}>
              <Flex gap={20}>
                <Select
                  variant="unstyled"
                  placeholder={"every 2 weeks"}
                  //   onChange={selectedXTimes}
                  data={allIntervals}
                  className="w-3/5"
                  size="sm"
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
                value={eventTags}
                onChange={(e: any) =>
                  updateTags([...eventTags, e.target.value])
                }
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                  const item = query;
                  setTags((current) => [...current, item]);
                  return item;
                }}
              />
            </Flex>

            <Space h={10} />
            <Stack align={"center"}>
              <ColorPicker
                classNames={{
                  preview: "bg-slate-100",
                  swatch: "m-1",
                  swatches: "justify-center",
                }}
                value={eventColor}
                onChange={(e: any) => updateColor(e.target.value)}
                swatchesPerRow={8}
                swatches={allColors}
                withPicker={false}
              />
              <Text>{eventColor}</Text>
            </Stack>
            <Group position="right" mt="md">
              <Button
                className="bg-red-500 hover:bg-red-600 transition duration-200 dark:bg-opacity-10 dark:hover:bg-opacity-5 dark:bg-red-50 dark-opacity-5"
                type="button"
                onClick={() =>
                  setIsOpened({ ...isOpened, editEvent_form: false })
                }
              >
                Cancel
              </Button>
              <Button
                className="bg-app-color-500 hover:bg-app-color-600 transition duration-200 dark:bg-opacity-10 dark:hover:bg-opacity-5 dark:bg-app-color-50 dark-opacity-5"
                type="submit"
              >
                Edit
              </Button>
            </Group>
          </form>
        </Container>
      </AppStandardModal>

      {/* </Modal> */}
    </>
  );
}
