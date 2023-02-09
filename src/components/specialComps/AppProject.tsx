import React from "react";
import { Badge, Tree } from "antd";
import type { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { FcOpenedFolder } from "react-icons/fc";
import { FaFolderMinus } from "react-icons/fa";
import { Flex } from "@mantine/core";
import { predefinedDraggables } from "../../store/jotai";

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: "parent 0",
    key: "0-0",
    // icon: (props) => (
    //   <>{props.expanded ? <FcOpenedFolder /> : <FaFolderMinus />}</>
    // ),
    // switcherIcon: <FaFolderMinus />,
    children: [
      { title: "leaf 0-0", key: "0-0-0", isLeaf: true },
      { title: "leaf 0-1", key: "0-0-1", isLeaf: true },
    ],
  },
  // {
  //   title: "parent 1",
  //   key: "0-1",
  //   children:
  //     <Flex direction={"column"} id="events__container">
  //     {predefinedDraggables.map((predefined: any) => {
  //       const { id, title, color, duration } = predefined;

  //       return (
  //         <Badge
  //         key={id}
  //         // data-id={id}
  //         data-title={title}
  //         data-color={color}
  //         data-dur={duration}
  //         className={`fc-event mb-1 bg-gradient-to-r from-app-color-500 to-app-color-700 hover:cursor-move text-app-color-100 dark:text-app-color-200`}
  //         variant={"gradient"}
  //         onClickCapture={() => console.log("this")}
  //         >
  //           {title}
  //         </Badge>
  //       );
  //     })}
  //   </Flex>
  // },
];

const App: React.FC = () => {
  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  return (
    <DirectoryTree
      className="bg-transparent dark:text-app-color-100 text-app-color-700 dark:active:bg-app-color-200"
      // multiple
      // defaultExpandAll
      // onSelect={onSelect}
      // onExpand={onExpand}
      treeData={treeData}
    />
  );
};

export default App;
