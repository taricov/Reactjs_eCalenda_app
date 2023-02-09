import { Flex } from "@mantine/core";
import ShortcutsPane from "../components/ShortcutsPane/ShortcutsPane";
import AppContainer from "../layout/AppContainer";
import AppTopBar from "../layout/AppTopBar";
import FullCal from "../components/FullCal";
import CalendarStats from "../components/CalendarStats";
import ReactWhatsapp from 'react-whatsapp';
import { FloatingWhatsApp} from "react-floating-whatsapp"

import WinBox from "react-winbox";
import "winbox/dist/css/winbox.min.css"; // required
// import "winbox/dist/css/themes/modern.min.css"; // optional
// import "winbox/dist/css/themes/white.min.css"; // optional


const englishAccounts = [
  {
    name: "Jeffrey Brown",
    position: "creative leader",
    account: "98912*******",
    avatar: (<img src={""} alt="" />),
    status: false,
  },
  // {
  //   name: "${{accountList.*.name}}",
  //   position: "${{accountList.*.position}}",
  //   account: "98912*******",
  //   avatar: <img src={"#"} alt="" />,
  //   status: true,
  // },
  // {
  //   name: "Alex Grinfield",
  //   position: "programming guru",
  //   account: "98912*******",
  //   avatar: <img src={"#"} alt="" />,
  //   status: true,
  // },
  // {
  //   name: "Roxie Swanson",
  //   position: "Sales Manager",
  //   account: "98912*******",
  //   avatar: <img src={"#"} alt="" />,
  //   status: true,
  // },

  // {
  //   name: "سارا لطیفی ",
  //   position: "مدیر پشتیبانی",
  //   account: "98912*******",
  //   avatar: <img src={"#"} alt="" />,
  //   status: true,
  // },
  // {
  //   name: "علی عزیزی",
  //   position: "مدیر برنامه نویسی",
  //   account: "98912*******",
  //   avatar: <img src={"#"} alt="" />,
  //   status: true,
  // },
  // {
  //   name: "سحر کیانی",
  //   position: "مدیر فروش",
  //   account: "98912*******",
  //   avatar: <img src={"#"} alt="" />,
  //   status: true,
  // },
];

export default function HomePage() {
  return (
    <>
      {/* <WinBox
        title="Project"
        // background="red"
        onResize={() => console.log("resize")}
        className="bg-app-color-800 rounded !text-xs"
        width={500}
        // modal={true}
        // children
        height={150}
        x={0}
        y={200}
      >
        <div className="w-screen h-screen bg-app-color-200"></div>
      </WinBox> */}

      <AppContainer>
        <ShortcutsPane />
        <Flex direction={"column"} gap={10}>
          {/* <TextInput
                placeholder="Search"
                radius="xl"
                size="xs"
                onChange={(e) => setValue(e.currentTarget.value)}
                icon={<BsSearch size={14} />}
              /> */}
          <AppTopBar />
          <FullCal />
          <FloatingWhatsApp 
          
          tooltipTitle={"Do you have any questions about this product?"}
        tooltipDescription="Chat via WhatsApp"
        title={"chat start"}
        lead={"Please chat on WhatsApp"}
        description={"Responsive, usually responds in minutes"}
        accountList={englishAccounts}
        phoneNumber="98912*******"
        textareaPlaceholder="send message ..."
        widthSendIcon={42}
    textAreaPlaceholder="Helooooooooo"/>
          {/* <ReactWhatsapp number="1-212-736-5000" message="Hello World!!!" /> */}

          <CalendarStats />
        </Flex>
      </AppContainer>
    </>
  );
}
