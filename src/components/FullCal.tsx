import MantineDatePicker from "./DatePicker/MantineDatePicker";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEventHandler,
  createContext,
  useContext,
} from "react";
// import DatePickerModal from "./MantineModal";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import listPlugin from "@fullcalendar/list";
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
  createEventForm,
  eventsAtom,
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
// export let selectedDateRange = createContext<any>(null);

export let formContext = createContext<any>(null);
const FullCal = () => {
  // let x = useContext(eventFormContext);

  const newAddedColor = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState({
    title: "",
    start: "",
    end: "",
    color: "",
  });
  const [events, setEvents] = useAtom(eventsAtom);
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
  // const loadData = () => {
  //   listEvent()
  //     .then((res) => {
  //       setEvents(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
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
    // createEventHandlers.open;
    setEventFormOpened(true);
  };

  const clickedEvent = (eventClicked: any) => {
    const { id, title, start, end, allDay } = eventClicked.event;

    console.log(id, title, start, end, allDay);
    setEventFormOpened(true);
  };

  const handleClick = (event: any, jsEvent: any, view: any) => {
    console.log(event);
    // const id = info.event._def.extendedProps._id;
    setId(id);
    // setImage(info.event._def.extendedProps.filename);
  };
  useHotkeys([["mod+e", () => setEventFormOpened(!createEventFormOpened)]]);
  const handleRemove = () => {
    removeEvent(id)
      .then((res) => {
        //code
        // loadData();
        // console.log(res);
      })
      .catch((err) => {
        //error
        // console.log(err);
      });
  };

  const [createEventFormOpened, setEventFormOpened] = useAtom(createEventForm);
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
  const handleSelect = (info: any) => {
    setEventFormOpened(true);
    // console.log("fromSelect", info);
    setValues({
      ...values,
      start: info.startStr,
      end: info.endStr,
    });
  };

  // Handle Change Resize
  const handleChange = (eventData: any) => {
    console.log("fromSelect", eventData);
    // console.log(info.event._def.extendedProps._id)
    // console.log(info.event.startStr, info.event.endStr)
    const values = {
      id: eventData.event._def.extendedProps._id,
      start: eventData.event.startStr,
      end: eventData.event.endStr,
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

  // const d = moment(new Date()).format("DD/MM/YYYY");
  // const r = new Date();
  // const filterDate = currentEvent.filter((item) => {
  //   return d == moment(item.start).format("DD/MM/YYYY");
  // });

  // const betweenDate = currentEvent.filter((item) => {
  //   return r >= moment(item.start) && r < moment(item.end);
  // });
  // console.log("between", betweenDate);
  // window.location.reload();

  const views = {
    // listWeek: { buttonText: "Agenda" },
    timeGridDay: { buttonText: "Day" },
    timeGridWeek: { buttonText: "Week" },
    dayGridMonth: { buttonText: "Month" },
  };
  return (
    <>
      <formContext.Provider value={dateRange}>
        <CreateRegular />
        <CreateProject />
        <CreateCluster />
        <CreateEvent />
        <Grid className="h-full">
          <Grid.Col>
            <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              views={views}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              select={createEventClick}
              events={events}
              selectable={true}
              editable={true}
              eventClick={clickedEvent}
              drop={handleRecieve}
              datesSet={currentMonth}
              eventChange={handleChange}
            />
          </Grid.Col>
        </Grid>
      </formContext.Provider>
    </>
  );
};

export default FullCal;
