const c = () => {
  return <div>this</div>;
};
// import {
//   Checkbox,
//   ColorInput,
//   Container,
//   Flex,
//   MultiSelect,
//   Select,
//   Space,
//   Text,
//   Textarea,
//   TextInput,
// } from "@mantine/core";
// import { DatePicker, TimeInput } from "@mantine/dates";
// import { openConfirmModal } from "@mantine/modals";
// import { useAtom } from "jotai";
// import { BsClock } from "react-icons/bs";
// import {
//   allIntervals,
//   favColorsAtom,
//   repeateddAtom,
//   tagsAtom,
//   valuesAtom,
//   xTimesAtom,
// } from "../store/jotai";

// import MantineDatePicker from "./DatePicker/MantineDatePicker";

// favColorsAtom;
// const [values] = useAtom(valuesAtom);
// const handleOk = () => {
//   console.log(values);
// };
// const [asRepeated, setAsRepeated] = useAtom(repeateddAtom);
// const [repeatTimes, setRepeatTimes] = useAtom<any>(xTimesAtom);
// const [tags, setTags] = useAtom(tagsAtom);

// // const selectedXTimess = (selectedInterval: string) => {
// //   setRepeatTimes(selectedInterval);
// // };

// const [favColors, setFavColors] = useAtom(favColorsAtom);
// const updateColors = (selectedColor: string) => {
//   setFavColors([selectedColor, ...favColors.slice(0, -1)]);
// };

// const handleRepeated = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setAsRepeated(e.currentTarget.checked);
//   console.log(e.target.checked);
// };

// export const AppointmentModal = () => {
//   openConfirmModal({
//     title: "Create New",
//     children: (
//       <>
//         <Container>
//           <Flex direction="column">
//             <TextInput
//               withAsterisk
//               placeholder="Event Name"
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

//           <Space h={"md"} />
//           <Checkbox
//             label="Repeat"
//             color="teal"
//             size="sm"
//             checked={asRepeated}
//             onChange={() => handleRepeated}
//           />
//           <Flex
//             direction={"column"}
//             className={`${asRepeated ? "hidden" : ""}`}
//           >
//             {/* //TODO not Working Repeated */}
//             <Flex gap={20}>
//               <Select
//                 variant="unstyled"
//                 placeholder={"every 2 weeks"}
//                 onChange={undefined}
//                 data={allIntervals}
//                 className="w-3/5"
//                 size="xs"
//               />
//               <Flex className="w-full" gap={10}>
//                 <Text className="flex items-center justify-center " size={"xs"}>
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
//     onConfirm: () => handleOk(),
//   });
// };
