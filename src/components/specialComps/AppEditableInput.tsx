import { ActionIcon, Flex, TextInput } from "@mantine/core";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";

interface Props {
  inputVal: string;
  valOnChange: (e: any) => void;
  disabled: boolean;
  inputRef?: string | undefined | any;
  iconOnClick: () => void;
  label?: string | undefined;
}

export default function AppEditableInput({
  inputVal,
  label,
  valOnChange,
  disabled = true,
  inputRef,
  iconOnClick,
}: Props) {
  return (
    <Flex
      align={"end"}
      // className="bg-slate-200 dark:bg-opacity-5 px-3 py-5 rounded"
    >
      <TextInput
        label={label}
        value={inputVal}
        onChange={valOnChange}
        disabled={disabled}
        ref={inputRef}
        classNames={{ input: "mt-2" }}
      />
      <ActionIcon onClick={iconOnClick} className="mb-1 ml-1">
        {disabled ? <AiOutlineEdit /> : <AiOutlineCheck />}
      </ActionIcon>
    </Flex>
  );
}
