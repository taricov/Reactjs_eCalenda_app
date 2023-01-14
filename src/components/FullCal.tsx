import MantineDatePicker from "./DatePicker/MantineDatePicker";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEventHandler,
  createContext,
} from "react";
// import DatePickerModal from "./MantineModal";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick

import moment from "moment";

import {
  Grid,
  Text,
  ColorInput,
  Textarea,
  TextInput,
  Container,
  Flex,
  Checkbox,
  Space,
  Select,
  MultiSelect,
  Switch,
} from "@mantine/core";

// Functions
import {
  createEvent,
  listEvent,
  updateEvent,
  removeEvent,
  handleCurrentMonth,
} from "./functions/fullcalendar";
import "./Index.css";
import { openConfirmModal } from "@mantine/modals";
import { atom, useAtom } from "jotai";
import { EventInput } from "@fullcalendar/core";
import { DatePicker, DatePickerBase, TimeInput } from "@mantine/dates";
import { BsClock } from "react-icons/bs";
import {
  allIntervals,
  createdClustersAtom,
  createdProjectsAtom,
  favColorsAtom,
  repeatedAtom,
  tagsAtom,
  xTimesAtom,
} from "../store/jotai";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import CreateEvent from "./specialComps/EventForm";
import CreateProject from "./specialComps/ProjectForm";
import CreateCluster from "./specialComps/ClusterForm";
import CreateRegular from "./specialComps/RegularForm";
export let selectedDateRange = createContext<any>(null);

const FullCal = () => {
  // const [createdProjects] = useAtom(createdProjectsAtom);
  // const [createdClusters] = useAtom(createdClustersAtom);

  // const [favColors, setFavColors] = useAtom(favColorsAtom);
  // const [tags, setTags] = useAtom(tagsAtom);
  // const [repeated, setRepeated] = useAtom(repeatedAtom);
  // const [eventTitle, setEventTitle] = useState("");
  // const [repeatTimes, setRepeatTimes] = useAtom<string | undefined>(xTimesAtom);
  // const [repeatTimes, setRepeatTimes] = useState<string | null>(null);

  // const handleRepeated = (e: any) => {
  //   setRepeated(!!e.currentTarget.checked);
  //   console.log(repeated);
  // };

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

  // const openModal = () => {
  //   openConfirmModal({
  //     title: "Create New",
  //     children: (
  //       <>
  //         <Container>
  //           <Flex direction="column">
  //             <TextInput
  //               withAsterisk
  //               placeholder="Event Name"
  //               onChange={handleEventTitle}
  //               variant="unstyled"
  //             />
  //             <Textarea variant="unstyled" placeholder="Type notes ..." />
  //             <MantineDatePicker
  //               label=""
  //               desc="Select Dates:"
  //               placeholder=""
  //               size="sm"
  //             />
  //           </Flex>
  //           <Flex gap={20}>
  //             <Select
  //               variant="unstyled"
  //               placeholder={"add project"}
  //               onChange={selectedXTimes}
  //               data={createdProjects.map((v) => v.name)}
  //               className="w-3/5"
  //               size="xs"
  //             />
  //             <MultiSelect
  //               className="w-fit"
  //               data={createdClusters.map((v) => v.name)}
  //               size="xs"
  //               placeholder="add clusters"
  //               searchable
  //               variant="unstyled"
  //             />
  //           </Flex>

  //           <Space h={"md"} />
  //           <Switch
  //             labelPosition="left"
  //             label="Indicator"
  //             checked={repeated}
  //             onChange={() => setRepeated(!repeated)}
  //             description="Show/Hide weather indicators"
  //           />
  //           <Checkbox
  //             label="Repeat"
  //             color="teal"
  //             size="sm"
  //             // checked={repeated}
  //             // onChange={(e) => setRepeated(e.currentTarget.checked)}
  //           />
  //           <Flex
  //             direction={"column"}
  //             className={`${repeated ? "hidden" : ""}`}
  //           >
  //             {/* //TODO not Working Repeated */}
  //             <Flex gap={20}>
  //               <Select
  //                 variant="unstyled"
  //                 placeholder={"every 2 weeks"}
  //                 onChange={selectedXTimes}
  //                 data={allIntervals}
  //                 className="w-3/5"
  //                 size="xs"
  //               />
  //               <Flex className="w-full" gap={10}>
  //                 <Text
  //                   className="flex items-center justify-center "
  //                   size={"xs"}
  //                 >
  //                   ends
  //                 </Text>
  //                 <DatePicker
  //                   className="w-fit"
  //                   variant="unstyled"
  //                   placeholder="never"
  //                   size="xs"
  //                 />
  //               </Flex>
  //             </Flex>
  //             <Flex>
  //               <Text className="flex items-center justify-center " size={"xs"}>
  //                 reminder
  //               </Text>
  //               <TimeInput
  //                 size="xs"
  //                 className="w-1/3"
  //                 placeholder="none"
  //                 icon={<BsClock size={16} />}
  //                 variant="unstyled"
  //                 defaultValue={new Date()}
  //               />
  //             </Flex>
  //           </Flex>
  //           <Flex gap={20}>
  //             <MultiSelect
  //               className="w-fit"
  //               data={tags}
  //               size="xs"
  //               placeholder="add tags"
  //               searchable
  //               variant="unstyled"
  //               creatable
  //               getCreateLabel={(query) => `+ Create ${query}`}
  //               onCreate={(query) => {
  //                 const item = query;
  //                 setTags((current) => [...current, item]);
  //                 return item;
  //               }}
  //             />
  //             <ColorInput
  //               // withEyeDropper
  //               size="xs"
  //               className="w-fit"
  //               variant="unstyled"
  //               placeholder="Pick color"
  //               format="hex"
  //               swatchesPerRow={7}
  //               swatches={favColors}
  //               onChange={updateColors}
  //             />
  //           </Flex>
  //         </Container>
  //       </>
  //     ),
  //     labels: { confirm: "Confirm", cancel: "Cancel" },
  //     onCancel: () => console.log("Cancel"),
  //     onConfirm: () => console.log("Confirmed"),
  //   });
  // };

  const newAddedColor = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState({
    title: "",
    start: "",
    end: "",
    color: "",
  });
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState([]);

  const [id, setId] = useState("");
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  const department = [
    { id: "1", name: "แผนกบัญชี", color: "red" },
    { id: "2", name: "แผนกการเงิน", color: "#55A9F7" },
    { id: "3", name: "แผนกไอที", color: "#1DCF0E" },
  ];
  useEffect(() => {
    // loadData();
    drag();
  }, []);
  const loadData = () => {
    listEvent()
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const drag = () => {
    let dragable: any = document.getElementById("external-event");
    new Draggable(dragable, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let id = eventEl.getAttribute("id");
        let title = eventEl.getAttribute("title");
        let color = eventEl.getAttribute("color");

        return {
          id,
          title,
          color,
        };
      },
    });
  };
  const [dateRange, setDateRange] = useState<{}>({});
  const createEventClick = (dayInfo: any) => {
    let startDate: string[] = dayInfo.startStr.split("-");
    let startYear = +startDate[0];
    let startMonth = +startDate[1];
    let startDay = +startDate[2];
    let endDate: string[] = dayInfo.endStr.split("-");
    let endYear = +endDate[0];
    let endMonth = +endDate[1];
    let endDay = +endDate[2];

    setDateRange({
      startYear,
      startMonth,
      startDay,
      endYear,
      endMonth,
      endDay,
    });
    createEventHandlers.open();

    console.log("clickEvent", dateRange);
  };

  const handleClick = (info: any) => {
    createEventHandlers.open();
    const id = info.event._def.extendedProps._id;
    setId(id);
    setImage(info.event._def.extendedProps.filename);
  };
  useHotkeys([["mod+e", () => createEventHandlers.toggle()]]);
  const handleRemove = () => {
    removeEvent(id)
      .then((res) => {
        //code
        loadData();
        // console.log(res);
      })
      .catch((err) => {
        //error
        // console.log(err);
      });
  };

  const handleFile = (e: any) => {
    const fileInput = e.target.files[0];
    setFile(fileInput);
  };

  const handleRecieve = (eventInfo: any) => {
    // console.log(eventInfo);
    let value = {
      id: eventInfo.draggedEl.getAttribute("id"),
      title: eventInfo.draggedEl.getAttribute("title"),
      color: eventInfo.draggedEl.getAttribute("color"),
      start: eventInfo.dateStr,
      end: moment(eventInfo.dateStr).add(+1, "days").format("YYYY-MM-DD"),
    };
    // console.log("value", value);
    createEvent(value)
      .then((res) => {
        // loadData()
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const currentMonth = (info: any) => {
    const m = info.view.calendar.currentDataManager.data.currentDate;
    const mm = moment(m).format("M");
    handleCurrentMonth({ mm })
      .then((res) => {
        setCurrentEvent(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const [creatEventOpened, createEventHandlers] = useDisclosure(false);
  const handleSelect = (info: any) => {
    createEventHandlers.open();
    // console.log("fromSelect", info);
    setValues({
      ...values,
      start: info.startStr,
      end: info.endStr,
    });
  };

  // Handle Change Resize
  const handleChange = (info: any) => {
    // console.log(info.event._def.extendedProps._id)
    // console.log(info.event.startStr, info.event.endStr)
    const values = {
      id: info.event._def.extendedProps._id,
      start: info.event.startStr,
      end: info.event.endStr,
    };
    updateEvent(values)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const onChangeValues = (e: any) => {
    // console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const handleOk = () => {
  //   console.log(values);
  //   createEvent(values)
  //     .then((res) => {
  //       setValues({ ...values, title: "" });
  //       loadData();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const handleCancel = () => {
  //   setValues({ ...values, title: "" });
  // };

  // const handleOk1 = () => {
  //   console.log(id, file);
  //   const formData = new FormData();
  //   formData.append("id", id);
  //   formData.append("file", file);
  //   updateImage(formData)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const handleCancel1 = () => {
  //   setImage("");
  // };

  // console.log(currentEvent);

  const d = moment(new Date()).format("DD/MM/YYYY");
  const r = new Date();
  const filterDate = currentEvent.filter((item) => {
    return d == moment(item.start).format("DD/MM/YYYY");
  });

  const betweenDate = currentEvent.filter((item) => {
    return r >= moment(item.start) && r < moment(item.end);
  });
  // console.log("between", betweenDate);
  // window.location.reload();

  return (
    <>
      <selectedDateRange.Provider value={dateRange}>
        <Grid className="h-full">
          {/* <Grid.Col span={3}> */}
          {/* <Card id="external-event">s</Card> */}
          {/* <Card>
            <div id="external-event">
              <ul>
                {department.map((item, index) => (
                  <li
                    className="fc-event"
                    id={item.id}
                    title={item.name}
                    color={item.color}
                    key={index}
                    style={{ backgroundColor: item.color }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          <Card>
            <ol>
              {currentEvent.map((item, index) => (
                <li key={index}>
                  {d == moment(item.start).format("DD/MM/YYYY") ? (
                    <>
                      {moment(item.start).format("DD/MM/YYYY") +
                        "-" +
                        item.title}
                      <Badge color="green">วันนี้</Badge>
                    </>
                  ) : r >= moment(item.start) && r < moment(item.end) ? (
                    <>
                      {moment(item.start).format("DD/MM/YYYY") +
                        "-" +
                        item.title}
                      <Badge color="yellow">อยู่ระหว่างดำเนินการ</Badge>
                    </>
                  ) : (
                    <>
                      {moment(item.start).format("DD/MM/YYYY") +
                        "-" +
                        item.title}
                    </>
                  )}
                </li>
              ))}
            </ol>
          </Card>*/}
          {/* </Grid.Col> */}
          <Grid.Col>
            <CreateRegular />
            <CreateProject />
            <CreateCluster />
            <CreateEvent
              opened={creatEventOpened}
              open={createEventHandlers.open}
              close={createEventHandlers.close}
            />
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={events}
              selectable={true}
              select={createEventClick}
              drop={handleRecieve}
              datesSet={currentMonth}
              eventClick={handleClick}
              editable={true}
              eventChange={handleChange}
            />
          </Grid.Col>
        </Grid>
      </selectedDateRange.Provider>
    </>
  );
};

export default FullCal;
