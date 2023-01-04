// -- Main Features:
//  1) Side list for regular tasks to dnd either unique (removes on drop
//     or could be used more than once (stays on drop)
//  2) Events are extendible (extend them)
//  3) Events are dragable (can be moved over)
//  4) Events are Colorful (each color represents a type of event)
//  5) Events could be repetitive (daily/weekly/monthly)
//  6) Events could be overlapped (simultaneous)
//@  7) Events should be searchable (searchBar)
// Taggggggggggggs

//TODO: Future Updates: add attachment drop-zone
//TODO: Future Updates: TimeLine View (Vertical Calendar [Gantt-chart-like])

import MantineDatePicker from "./DatePicker/MantineDatePicker";
import React, {
  useState,
  useEffect,
  useRef,
  HtmlHTMLAttributes,
  ChangeEventHandler,
} from "react";
// import DatePickerModal from "./MantineModal";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick

import moment from "moment";

import {
  Grid,
  Col,
  Card,
  Modal,
  Badge,
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
} from "@mantine/core";

// Functions
import {
  createEvent,
  listEvent,
  updateEvent,
  removeEvent,
  handleCurrentMonth,
  updateImage,
} from "./functions/fullcalendar";
import "./Index.css";
import { openConfirmModal } from "@mantine/modals";
import { atom, useAtom } from "jotai";
import { EventInput } from "@fullcalendar/core";
import { DatePicker, DatePickerBase, TimeInput } from "@mantine/dates";
import { BsClock } from "react-icons/bs";
import { favColorsAtom } from "../store/jotai";
// App Components Types:

interface AppColorInputProps {
  // newAddedColor?: HTMLInputElement;
  onChangeFn?: any;
}
// App Components:

// const AppColorInput = ({ onChangeFn }: AppColorInputProps) => {
//   return (
//     <ColorInput
//       withEyeDropper
//       placeholder="Select A color"
//       label="Color:"
//       format="hex"
//       swatchesPerRow={7}
//       // ref={newAddedColor}
//       onChange={onChangeFn}
//       swatches={swatches}
//     />
//   );
// };
const Index = () => {
  const [favColors, setFavColors] = useAtom(favColorsAtom);
  const [repeatTimes, setRepeatTimes] = useState<string | null>(null);

  // console.log(favColors);

  const selectedXTimes = (selectedInterval: string) => {
    setRepeatTimes(selectedInterval);
  };
  const updateColors = (selectedColor: string) => {
    setFavColors([selectedColor, ...favColors.slice(0, -1)]);
  };

  const openModal = () => {
    openConfirmModal({
      title: "Please confirm your action",
      children: (
        <>
          <Grid>
            <Grid.Col md={6} lg={3}>
              <TextInput
                withAsterisk
                placeholder="New Event"
                variant="unstyled"
              />
              <Textarea variant="unstyled" placeholder="Type notes ..." />
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              {/* <AppColorInput onChangeFn={updateColors} /> */}
              <ColorInput
                withEyeDropper
                placeholder="Select A color"
                label="Color:"
                format="hex"
                swatchesPerRow={7}
                swatches={favColors}
                onChange={updateColors}
              />
            </Grid.Col>

            <MantineDatePicker
              label="Select the date range:"
              placeholder="Select Date Range"
            />
          </Grid>
          <Grid>
            <Grid.Col md={6} lg={3}>
              <Space h={"md"} />
              <Checkbox label="Repeat" color="teal" size="sm" onChange={""} />
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <Select
                variant="unstyled"
                placeholder={"Every 2 weeks"}
                // value={repeatTimes}
                onChange={selectedXTimes}
                data={[
                  "Daily",
                  "2 Days",
                  "Weekly",
                  "2 Weeks",
                  "Monthly",
                  "Quarterly",
                  "Bi-annually",
                  "Anuually",
                ]}
                size="xs"
              />
              <DatePicker
                variant="unstyled"
                label="Ends"
                placeholder="Never"
                size="xs"
              />
              <TimeInput
                label="reminder"
                size="xs"
                className="w-1/3"
                placeholder="None"
                icon={<BsClock size={16} />}
                variant="unstyled"
                defaultValue={new Date()}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col>
              <MultiSelect
                placeholder="tags"
                variant="unstyled"
                searchable
                creatable
                onCreate={(newData) => data.push(newData)}
                data={["Math", "History", "Chemistry", "Phenology"]}
              />
            </Grid.Col>
          </Grid>
        </>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });
  };

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
    loadData();
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
    let dragable = document.getElementById("external-event");
    new Draggable(dragable, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let id = eventEl.getAttribute("id");
        let title = eventEl.getAttribute("title");
        let color = eventEl.getAttribute("color");

        return {
          id: id,
          title: title,
          color: color,
        };
      },
    });
  };
  const handleClick = (info) => {
    openModal();
    const id = info.event._def.extendedProps._id;
    setId(id);
    setImage(info.event._def.extendedProps.filename);
  };

  const handleRemove = () => {
    removeEvent(id)
      .then((res) => {
        //code
        loadData();
        console.log(res);
      })
      .catch((err) => {
        //error
        console.log(err);
      });
  };

  const handleFile = (e: any) => {
    const fileInput = e.target.files[0];
    setFile(fileInput);
  };

  const handleRecieve = (eventInfo: any) => {
    console.log(eventInfo);
    let value = {
      id: eventInfo.draggedEl.getAttribute("id"),
      title: eventInfo.draggedEl.getAttribute("title"),
      color: eventInfo.draggedEl.getAttribute("color"),
      start: eventInfo.dateStr,
      end: moment(eventInfo.dateStr).add(+1, "days").format("YYYY-MM-DD"),
    };
    console.log("value", value);
    createEvent(value)
      .then((res) => {
        // loadData()
      })
      .catch((err) => {
        console.log(err);
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
        console.log(err);
      });
  };
  const handleSelect = (info: any) => {
    openModal();
    console.log("fromSelect", info);
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeValues = (e) => {
    console.log(e.target.value);
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
      <Grid>
        <Grid.Col span={3}>
          <Card>
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
          </Card>
        </Grid.Col>
        <Grid.Col span={9}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            selectable={true}
            select={handleSelect}
            drop={handleRecieve}
            datesSet={currentMonth}
            eventClick={handleClick}
            editable={true}
            eventChange={handleChange}
          />
          {/* <MantineModal /> */}
          {/* <Modal
            title="Basic Modal"
            opened={isModalVisible}
            // onOk={handleOk}
            onClose={handleCancel}
          > }
            <input
              name="title"
              value={values.title}
              onChange={onChangeValues}
            />
            <select name="color" onChange={onChangeValues}>
              <option key={999} value="">
                --กรุณาเลือกแผนก--
              </option>
              {department.map((item, index) => (
                <option
                  key={index}
                  value={item.color}
                  style={{ backgroundColor: item.color }}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </Modal>
          <Modal
            title="Basic Modal"
            opened={isModalVisible1}
            // onOk={handleOk1}
            onClose={handleCancel1}
            // footer={[
            //   <button onClick={handleOk1}>Submit</button>,
            //   <button onClick={handleCancel1}>Cancel</button>,
            //   <button onClick={handleRemove}>Delete</button>,
            // ]}
          >
            <h1>รายละเอียด</h1>
            <img src={`${process.env.REACT_APP_IMAGE}/${image}`} width="100%" /> 
            <input type="file" onChange={handleFile} name="file" />
          </Modal>
          datesSet={getCurrent}
              */}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Index;
