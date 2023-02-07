import React from "react";
import { Tree } from "antd";
import type { DataNode, DirectoryTreeProps } from "antd/es/tree";

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: "parent 0",
    key: "0-0",
    children: [
      { title: "leaf 0-0", key: "0-0-0", isLeaf: true },
      { title: "leaf 0-1", key: "0-0-1", isLeaf: true },
    ],
  },
  {
    title: "parent 1",
    key: "0-1",
    children: [
      { title: "leaf 1-0", key: "0-1-0", isLeaf: true },
      { title: "leaf 1-1", key: "0-1-1", isLeaf: true },
    ],
  },
];

export default function AppProject() {
  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  return (
    <div id="events__container">
      <DirectoryTree
        multiple
        draggable
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
        // onDragEnter={onDragEnter}
        // onDrop={onDrop}
        // checkable
        blockNode
      />
    </div>
  );
}
