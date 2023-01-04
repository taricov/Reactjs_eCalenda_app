import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// ====================== Setting DarkMode ====================
//FIXME: sync icon, theme, localStorage and toggle
const browser = typeof window !== "undefined";
const localStrOpt = browser ? localStorage.getItem("darkMode") : "light";

const preferredColorScheme =
  browser && matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

// const localStorageDarkMode = localStrOpt === "dark" ? true : false;
// const sysDarkMode = preferredColorScheme === "dark" ? true : false;

export const darkModeAtom = atom(localStrOpt || preferredColorScheme);

// ====================== Fav Colors ====================

const swatches = [
  "#25262b",
  "#868e96",
  "#fa5252",
  "#e64980",
  "#be4bdb",
  "#7950f2",
  "#4c6ef5",
  "#228be6",
  "#15aabf",
  "#12b886",
  "#40c057",
  "#82c91e",
  "#fab005",
  "#fd7e14",
];
export const favColorsAtom = atom(swatches);
