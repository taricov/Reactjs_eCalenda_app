import { ColorInput } from "@mantine/core";
import { useAtom } from "jotai";
import { favColorsAtom } from "../../store/jotai";

export default function AppColotInput({ props }: any) {
  const [favColors, setFavColors] = useAtom(favColorsAtom);

  return (
    <>
      <ColorInput
        // withEyeDropper
        size="sm"
        defaultValue="#7367f0"
        className="md:w-fit w-full"
        variant="unstyled"
        placeholder="Pick color"
        classNames={{
          icon: "w-fit",
          input: "px-6",
        }}
        format="hex"
        swatchesPerRow={7}
        swatches={favColors}
        // onChange={updateColors}
      />
    </>
  );
}
