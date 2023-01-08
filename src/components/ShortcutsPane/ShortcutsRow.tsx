import { Kbd } from "@mantine/core";
import React from "react";

interface Props {
  desc: string;
  shCuts: string[];
}

const ShortcutsRow = ({ desc, shCuts }: Props) => {
  return (
    <div className="flex items-between justify-center border-t border-slate-400 w-2/5 my-1">
      <div className="text-dark-lighter">{desc}</div>
      <div className="flex-1 text-right ">
        {shCuts.map((v, i) => {
          return i === shCuts.length - 1 ? (
            <Kbd className="text-sm bg-transparent text-dimmed">{v}</Kbd>
          ) : (
            <>
              <Kbd className="text-sm bg-transparent text-dimmed">{v}</Kbd>
              <span className=" text-dimmed">+</span>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ShortcutsRow;
