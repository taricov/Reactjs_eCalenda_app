import { useHotkeys } from "@mantine/hooks";
import React, { useCallback, useEffect, useState } from "react";
import ShortcutsRow from "./ShortcutsRow";
import ShortcutsSection from "./ShortcutsSection";
import SiteCompModal from "./MantineModal";

const ShortcutsPane = () => {
  // const handleKeyPress = useCallback((e: KeyboardEvent) => {
  //   let pressed = e.key;
  //   if ((e.metaKey || e.ctrlKey) && pressed === "/") {
  //     setOpened((opened) => !opened);
  //     console.log(opened);
  //   }
  // }, []);
  useHotkeys([["mod+/", () => setOpened((opened) => !opened)]]);

  // useEffect(() => {
  //   document.addEventListener("keydown", handleKeyPress);
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [handleKeyPress]);

  const [opened, setOpened] = useState(false);
  return (
    <>
      <SiteCompModal opened={opened} setOpened={setOpened}>
        <div className="w-full bg-gradient-to-r from-skin-hue2 to-skin-hue0 relative">
          <div className="top-0 sticky bg-primary-800 p-5 shadow-md">
            <h1 className="text-center text-slate-100 font-bold text-2xl px-3 w-fit rounded-panel cursor-pointer ">
              Site Shortcuts
            </h1>
            <h1 className="text-center text-slate-300 text-sm  px-3 w-fit rounded-panel cursor-pointer ">
              Accelerate your pace and use your system more effeciently.
            </h1>
          </div>
          <div className="flex item-start justify-center w-full py-3 flex-wrap p-9">
            <ShortcutsSection title="Quick Access">
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
            </ShortcutsSection>
            <ShortcutsSection title="Edit Mode">
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
            </ShortcutsSection>
            <ShortcutsSection title="Configure on the fly">
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
            </ShortcutsSection>
            <ShortcutsSection title="Notes App">
              <ShortcutsRow desc="gsfdsfs effe" shCuts={["M", "T", "3"]} />
              <ShortcutsRow
                desc="toggle bold format in current selection"
                shCuts={["Ctrl / ⌘", "B"]}
              />
              <ShortcutsRow
                desc="toggle italic format in current selection"
                shCuts={["Ctrl / ⌘", "I"]}
              />
              <ShortcutsRow
                desc="toggle italic format in current selection"
                shCuts={["Ctrl / ⌘", "I"]}
              />
              <ShortcutsRow
                desc="toggle underline format in current selection"
                shCuts={["Ctrl / ⌘", "U"]}
              />
              <ShortcutsRow
                desc="add link to current selection"
                shCuts={["Ctrl / ⌘", "K"]}
              />
              <ShortcutsRow
                desc="toggle heading at current line, valid for 1-6 headings"
                shCuts={["Ctrl / ⌘", "Alt", "1"]}
              />
            </ShortcutsSection>
          </div>
        </div>
      </SiteCompModal>
    </>
  );
};

export default ShortcutsPane;
