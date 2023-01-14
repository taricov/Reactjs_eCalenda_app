import { loggerAtom } from "../store/jotai";
import { useAtom } from "jotai";
import { useState } from "react";
import { Actionslogger } from "../helpers/activityLog/Actionslogger";

export const useActivityLog = (e: any) => {
  //   setNewLog("");
  const newLog = new Actionslogger(e);
  const logType = newLog.whichAction(e);
  console.log("b", logType);

  //   setNewLog(logWording);
  //   console.log(newLog);
};
