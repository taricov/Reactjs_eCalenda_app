import { ActionIcon, Flex, Text, TextInput } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useAtom } from "jotai";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import { userInfoAtom, userInfoDisabledAtom } from "../store/jotai";
import { MantineModal } from "./MantineModal";

const onEditProfileModalCancel = () => {
  console.log("onEditProfileModalCancel");
};
const onEditProfileModalConfirm = () => {
  console.log("onEditProfileModalConfirmed");
};

// Push Notification
const pushNotification = (title: string, message: string, color: string) => {
  showNotification({
    title,
    message,
    color,
    icon: <IconCheck size={18} />,
  });
};

export const ReactNodes = () => {
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
      <Flex align={"end"}>
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
      </Flex>
    </>
  );
};

// Exported Modal function
export const openEditProfileModal = () => {
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
      setDisabledFields({ ...disabledFields, user_name: true });
      pushNotification("Updated!", "Your name has been updated", "teal");
    }
  };
  MantineModal(
    "Edit Profile",
    // ReactNodes(),
    <>
      {" "}
      <Flex align={"end"}>
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
      </Flex>
    </>,
    { confirm: "cin", cancel: "cancel" },
    onEditProfileModalCancel,
    onEditProfileModalConfirm
  );
};
