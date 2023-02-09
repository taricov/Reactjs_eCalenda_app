import MantineDatePicker from "./DatePicker/MantineDatePicker";
import esLocale from "@fullcalendar/core/locales/es";
import frLocale from "@fullcalendar/core/locales/fr";
import arLocale from "@fullcalendar/core/locales/ar";
import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
// import DatePickerModal from "./MantineModal";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick
import { ConfirmationModal } from "./specialComps/AppConfirm";
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
  Indicator,
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
  calendarData,
  calendarDate,
  createdClustersAtom,
  createdProjectsAtom,
  eventsAtom,
  excludeDay,
  favColorsAtom,
  isOpen,
  PickerDate,
  repeatedAtom,
  searchBarQuery,
  settingsAtom,
  tagsAtom,
  xTimesAtom,
} from "../store/jotai";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import CreateEvent from "./specialComps/EventForm";
import CreateProject from "./specialComps/ProjectForm";
import CreateCluster from "./specialComps/ClusterForm";
import CreateRegular from "./specialComps/RegularForm";
import { all } from "axios";
import { pushNotification } from "./specialComps/pushNotification";
import { MdError } from "react-icons/md";
import dayjs from "dayjs";
import { showNotification } from "@mantine/notifications";
// export let selectedDateRange = createContext<any>(null);

// export let formContext = createContext<any>(null);
const FullCal = ({ toDate }: any) => {
  // let x = useContext(eventFormContext);

  const newAddedColor = useRef<HTMLInputElement>(null);
  const [editCalData, setCalData] = useAtom(calendarData);
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
  const [magicNum, setMagicNum] = useState("24:00");

  const setQuickDuration = (e: any) => {
    // console.log(+e.key);
    const dd = `${+e.key ? +e.key * 24 + ":00" : "24:00"}`;
    // console.log(dd);
    setMagicNum(dd);

    // showNotification({
    //   title: "",
    //   message: (
    //     <Text className="text-[60px] text-app-color-800 opacity-100 ">
    //       {e.key}
    //     </Text>
    //   ),
    //   autoClose: 700,
    // });

    // const floatingDiv: any = `<div class="magic-num z-10 text-[200px] text-app-color-800 opacity-100 absolute !w-fit text-center top-1/2 left-1/2 font-bold mx-auto -translate-x-1/2">${e.key}</div>`;
    // document
    //   ?.querySelector(".App")
    //   .insertAdjacentHTML("afterbegin", floatingDiv);
    // setTimeout(() => {
    // }, 300);
  };

  useEffect(() => {
    window.addEventListener("keyup", setQuickDuration);
    // document.querySelectorAll(".fc-event").forEach((el) =>
    //   el.addEventListener("mousedown", () => {
    //     window.addEventListener("keyup", (e: any) => {
    //       // console.log(e.key);
    //       setMagicNum(magicNum.concat(e.key));
    //       // console.log(magicNum);
    //     });
    //   })
    // );

    let draggableElement: any = document.getElementById("external-event");
    const onDragging = new Draggable(draggableElement, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        // console.log(eventEl);
        // eventEl.style.cssText = `relative
        // after:content-[${magicNum}] after:absolute after:top-0 after:left-0 after:text-xl after:opacity-30
        // `;
        let draggable_id = Math.floor(Math.random() * 100000);
        let id = Math.floor(Math.random() * 2000);
        let title = eventEl.dataset.title;
        let backgroundColor = eventEl.dataset.color;
        let duration = magicNum;
        // console.log(id);
        // let duration = eventEl.dataset.dur;

        // setEvents([
        //   ...events,
        //   {
        //     draggable_id,
        //     id,
        //     title,
        //     backgroundColor,
        //     duration,
        //     create: false,
        //   },
        // ]);
        return {
          draggable_id,
          id,
          title,
          backgroundColor,
          duration,
        };
      },
      // loadData();
    });
    return () => {
      onDragging.destroy();
      window.removeEventListener("keyup", setQuickDuration);
    };

    // drag(draggableElement);
  }, [magicNum]);
  // const loadData = () => {
  //   listEvent()
  //     .then((res) => {
  //       setEvents(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const drag = (el: any) => {
  //   const draggable = new Draggable(el, {
  //     itemSelector: ".fc-event",
  //     eventData: function (eventEl) {
  //       let id = eventEl.getAttribute("id");
  //       let title = eventEl.getAttribute("title");
  //       let color = eventEl.getAttribute("color");

  //       return {
  //         id,
  //         title,
  //         color,
  //       };
  //     },
  //   });
  // };

  // HANDLE SELECT DAYS && CREATE EVENTS ==== START
  const onSelectDays = (dayInfo: any) => {
    // let startDate: string[] = dayInfo.startStr.split("-");
    // let startYear = +startDate[0];
    // let startMonth = +startDate[1];
    // let startDay = +startDate[2];
    // let endDate: string[] = dayInfo.endStr.split("-");
    // let endYear = +endDate[0];
    // let endMonth = +endDate[1];
    // let endDay = +endDate[2];

    // setDateRange({
    //   startYear,
    //   startMonth,
    //   startDay,
    //   endYear,
    //   endMonth,
    //   endDay,
    // });
    // createEventHandlers.open;
    // const lastDay: Date = excludeDay(
    //   allSettings.c_lastDayExcluded,
    //   dayInfo.endStr
    // );
    // const lastDay: Date = excludeDay(false, dayInfo.endStr)._d;
    // const lastDay: Date = excludeLastDay(true, dayInfo.endStr)._d;
    // console.log("lastttttttttt", l);
    console.log(dayInfo);
    const startDate = moment(dayInfo.start);
    const endDate = moment(dayInfo.end);
    const numnerOfDays = endDate.diff(startDate, "days");

    const selectedDaysArr = [...Array(numnerOfDays).keys()].map((i) =>
      moment(startDate.clone()).add(i, "d").format("YYYY-MM-DD")
    );
    // events.filter((d) => d.===)
    console.log(selectedDaysArr);

    calendarHandler(() => [dayInfo.startStr, dayInfo.endStr]);
    // console.log([dayInfo.startStr, dayInfo.endStr]);
    // console.log("fromCalendar", dateCalendar);
    const calendarStartDate = dayInfo.start;
    // const calendarStartDate = new Date(dayInfo.startStr);
    // const calendarLastDate = moment(dayInfo.end).subtract(1, "days");
    const calendarLastDate = moment(dayInfo.endStr)
      .subtract(1, "days")
      .toDate();
    // const calendarLastDate = dayjs(dayInfo.endStr).subtract(1, "day").$d;
    pickerHandler([calendarStartDate, calendarLastDate]);
    setIsOpened({ ...isOpened, addEvent_form: true });
  };

  // HANDLE EDIT && DELETE EVENTS ==== START
  const onClickEvent = (eventClicked: any) => {
    const { id, title, start, end, allDay } = eventClicked.event;
    // console.log(eventClicked, id);
    const startDate = start;
    const endDate = moment(end).subtract(1, "days").toDate();
    setCalData({ id, title, start, end, allDay });
    pickerHandler([startDate, endDate]);
    eventClicked.el.addEventListener("click", (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.altKey && e.shiftKey) {
        // console.log("doble");
        removeEvent(id);
        pushNotification(
          "Removed!",
          "Event has been removed by a force command",
          "red",
          <MdError />
        );
      } else if (e.altKey) {
        ConfirmationModal(id, setEvents, events);
        // removeEvent(id)
        // console.log(events);
      } else {
        setIsOpened({ ...isOpened, editEvent_form: true });
        console.log(id, title, start, end, allDay);
      }
    });
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter((eve: { id: string }) => eve.id !== id));
  };
  // HANDLE EDIT && DELETE EVENTS ==== END

  const handleClick = (event: any, jsEvent: any, view: any) => {
    console.log(event);
    // const id = info.event._def.extendedProps._id;
    setId(id);
    // setImage(info.event._def.extendedProps.filename);
  };
  useHotkeys([
    [
      "mod+e",
      () =>
        setIsOpened({
          ...isOpened,
          addEvent_form: !isOpened.addEvent_form,
        }),
    ],
    ["]", () => toNext()],
    ["[", () => toPrev()],
    ["\\", () => toToday()],
    ["alt+shift+1", () => toMonthView()],
    ["alt+2", () => toWeekView()],
    ["alt+", () => toDayView()],
  ]);

  const toMonthView = () => {
    const targetedView: HTMLElement | null = document.querySelector(
      ".fc-dayGridMonth-button"
    );
    targetedView?.click();
  };
  const toWeekView = () => {
    const targetedView: HTMLElement | null = document.querySelector(
      ".fc-timeGridWeek-button"
    );
    targetedView?.click();
  };
  const toDayView = () => {
    const targetedView: HTMLElement | null = document.querySelector(
      ".fc-timeGridDay-button"
    );
    targetedView?.click();
  };
  const toToday = () => {
    const todayBtn: HTMLElement | null =
      document.querySelector(".fc-today-button");
    todayBtn?.click();
  };
  const toNext = () => {
    document.querySelector(".fc-icon-chevron-right")?.parentElement?.click();
  };
  const toPrev = () => {
    document.querySelector(".fc-icon-chevron-left")?.parentElement?.click();
  };
  // const handleRemove = () => {
  //   removeEvent(id)
  //     .then((res) => {
  //code
  // loadData();
  // console.log(res);
  // })
  // .catch((err) => {
  //error
  // console.log(err);
  //     });
  // };

  const [isOpened, setIsOpened] = useAtom(isOpen);
  const handleFile = (e: any) => {
    const fileInput = e.target.files[0];
    setFile(fileInput);
  };

  const whileDragging: any = () => {
    // console.log(info);
    // window.addEventListener("keyup", (e: any) => {
    //   setMagicNum(magicNum.concat(e.key));
    //   console.log(e.key);
    //   const setDuration = `${magicNum}:00`;
    //   return setDuration;
    // });
  };
  // console.log(events);

  const onDropping = (eventInfo: any) => {
    let values = {
      // id: eventInfo.draggedEl.dataset.id,
      id: Math.floor(Math.random() * 100000),
      title: eventInfo.draggedEl.dataset.title,
      color: eventInfo.draggedEl.dataset.tocolor,
      start: eventInfo.dateStr,
      end: moment(eventInfo.dateStr).add(magicNum, "days").format("YYYY-MM-DD"),
      create: false,
    };
    setEvents([...events, values]);
    console.log(events);
    // console.log(eventInfo);
    // console.log(values);
    // calendarRef.current.addEvent(values);
    // return values;
    // createEvent(value)
    //   .then((res) => {
    // loadData()
    // })
    // .catch((err) => {
    // console.log(err);
    // });
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
    setIsOpened({ ...isOpened, addEvent_form: true });
    // console.log("fromSelect", info);
    setValues({
      ...values,
      start: info.startStr,
      end: info.endStr,
    });
  };

  // Handle Change Resize
  const handleChange = (eventData: any) => {
    // console.log("fromSelect", eventData);
    // console.log(info.event._def.extendedProps._id)
    // console.log(info.event.startStr, info.event.endStr)
    console.log("change");
    // eventData.revert();
    // const values = {
    //   id: eventData.event._def.extendedProps._id,
    //   start: eventData.event.startStr,
    //   end: eventData.event.endStr,
    // };
    // updateEvent(values)
    //   .then((res) => {
    //     // console.log(res);
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //   });
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
    // timeGridFourDay: {
    //   type: "timeGrid",
    //   duration: { days: 4 },
    // },
    // listDay: { buttonText: "list day" },
    // listWeek: { buttonText: "list week" },
    // listMonth: { buttonText: "list month" },
    // listWeek: { buttonText: "Agenda" },
    // timeGridDay: { buttonText: "Day" },
    // timeGridWeek: { buttonText: "Week" },
    // dayGridMonth: { buttonText: "Month" },
    // listView: { buttonText: "List" },
  };
  const [allSettings] = useAtom(settingsAtom);
  const [dateCalendar, calendarHandler] = useAtom(calendarDate);
  const [, pickerHandler] = useAtom(PickerDate);
  const [commandBar] = useAtom(searchBarQuery);
  const calendarRef = useRef<any>();

  const calWrapper = calendarRef.current?.getApi();
  // const xxz = calWrapper.getEvents();
  console.log("He", calWrapper);
  const handleCommand = () => {
    const commandSymbol = commandBar.split(":")[0].trim() ?? commandBar.trim();
    let qry = commandSymbol[1].trim();

    if (commandSymbol === "/create") {
    } else if (commandSymbol === "/filter") {
    } else if (commandSymbol === "/goto") {
      let newDate: any =
        qry.length === 1 ? `01-${qry}-${new Date().getFullYear()}` : null;
      // console.log(newDate);
      calWrapper.gotoDate(new Date(newDate));
    } else if (commandSymbol === "/open") {
    } else {
    }
  };

  useEffect(() => {
    handleCommand;
    // console.log(commandBar);
  }, [commandBar]);

  const renderedEventContent = (ev: any) => {
    console.log("from render", ev);
    return (
      <>
        <div
          className="block"
          data-id={ev.event.id}
          data-start={ev.event.startStr}
          data-end={ev.event.endStr}
          data-group={ev.event.groupId}
        >
          {ev.event.title}
        </div>
      </>
    );
  };
  return (
    <>
      {/* <formContext.Provider value={dateRange}> */}

      <Grid className="h-full">
        <Grid.Col>
          <FullCalendar
            eventContent={renderedEventContent}
            ref={calendarRef}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            nowIndicator={true}
            nowIndicatorContent="Now"
            // nowIndicatorClassNames="!border-app-color-600"
            scrollTime={"12:00"}
            views={views}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            navLinks
            displayEventTime
            eventResizableFromStart
            weekText="W"
            fixedWeekCount={false}
            selectable={true}
            selectOverlap={allSettings.e_eventOverlapping}
            editable={true}
            events={events}
            firstDay={allSettings.c_firstDay}
            dayMaxEvents={3}
            eventClassNames="border-app-color-600"
            // eventRemove={(removeInfo) => {
            //   const x = (e: any) => {
            //     e.keyUp() === "/" ? true : false;
            //   };
            //   // x(e);

            //   removeInfo.revert();
            // }}
            // eventContent={(args) => {
            // args.isStart ? (
            // <>
            //   <div className="!w-fit !h-fit !bg-red-600">
            //     {args.event.title}
            //   </div>
            //   <Indicator color={"indigo"} size={10} processing>
            //     {args.event.title}
            //   </Indicator>
            // </>;
            // ) : null;
            // }}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }}
            // weekNumberCalculation={}
            weekends={allSettings.c_weekends}
            hiddenDays={allSettings.c_hiddenDays.map((e) => +e)}
            weekNumbers={allSettings.c_week_numbers}
            eventAllow={() => allSettings.e_easyEdit}
            //selectConstraint={}
            // validRange={{ start: "2023-01-03", end: "2023-01-09" }} -- to be Custom programmed
            // Fns
            locales={[arLocale, esLocale, frLocale]}
            locale={allSettings.c_locale}
            direction={!!allSettings.g_rtl_direction ? "rtl" : "ltr"}
            select={onSelectDays}
            eventClick={onClickEvent}
            drop={onDropping}
            datesSet={currentMonth}
            eventChange={handleChange}
            eventDragStart={whileDragging} //to add ability to drag [tempalate] events with no period specified before and keydown to add days
          />
        </Grid.Col>
      </Grid>
      {/* </formContext.Provider> */}
    </>
  );
};

export default FullCal;
