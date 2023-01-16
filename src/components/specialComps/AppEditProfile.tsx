import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useAtom } from "jotai";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import { userInfoAtom, userInfoDisabledAtom } from "../../store/jotai";
import AppEditableInput from "./AppEditableInput";
import AppStandardModal from "./AppStandardModal";

// Push Notification
const pushNotification = (title: string, message: string, color: string) => {
  showNotification({
    title,
    message,
    color,
    icon: <IconCheck size={18} />,
  });
};

interface Props {
  open: () => void;
  close: () => void;
  opened: boolean;
}

export default function AppEditProfile({ opened, close, open }: Props) {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [disabledFields, setDisabledFields] = useAtom(userInfoDisabledAtom);
  const refYourName = useClickOutside(() => {
    setDisabledFields({ ...disabledFields, user_name: true });
    if (!disabledFields.user_name) {
      pushNotification("Updated!", "Your name has been updated", "teal");
    }
    console.log(disabledFields.user_name);
  });
  const editYourName = () => {
    setDisabledFields({ ...disabledFields, user_name: false });
    if (!disabledFields.user_name) {
      pushNotification("Updated!", "Your name has been updated", "teal");
    }
  };

  return (
    <>
      {/* <Modal
        opened={opened}
        onClose={close}
        centered
        size={"40%"}
        title="Edit Profile"
        className="text-app-color-800 dark:text-app-color-50"
        classNames={{
          title: "font-bold text-app-color-800 dark:text-app-color-50",
        }}
      > */}
      <AppStandardModal
        modalOpned={opened}
        modalCloser={close}
        title="Edit Profile"
        Xwidth={10}
      >
        <AppEditableInput
          label="Your Name"
          inputVal={userInfo.user_name}
          disabled={disabledFields.user_name}
          valOnChange={(e) =>
            setUserInfo({ ...userInfo, user_name: e.currentTarget.value })
          }
          inputRef={refYourName}
          iconOnClick={editYourName}
        />
        <AppEditableInput
          label="Your Name"
          inputVal={userInfo.user_name}
          disabled={disabledFields.user_name}
          valOnChange={(e) =>
            setUserInfo({ ...userInfo, user_name: e.currentTarget.value })
          }
          inputRef={refYourName}
          iconOnClick={editYourName}
        />
        {/* <Flex align={"end"}>
          <TextInput
            label="Your Name"
            value={userInfo.user_name}
            onChange={(e) =>
              setUserInfo({ ...userInfo, user_name: e.currentTarget.value })
            }
            disabled={disabledFields.user_name}
            ref={refYourName}
          />
          <ActionIcon onClick={editYourName} className="mb-1 ml-1">
            {disabledFields.user_name ? <AiOutlineEdit /> : <AiOutlineCheck />}
          </ActionIcon>
        </Flex> */}
        {/* <Group mt="xl">
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "blue", deg: 60 }}
          >
            Teal blue
          </Button>

          <Button size="xl" color={""} variant="gradient" title="Discard" />
          <Button title="Save" />
        </Group> */}
        {/* </Modal> */}
      </AppStandardModal>
    </>
  );
}
