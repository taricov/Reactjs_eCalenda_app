import {
  ActionIcon,
  Button,
  Flex,
  Container,
  Group,
  Modal,
  Text,
  TextInput,
  Space,
  Avatar,
  Center,
  FileButton,
} from "@mantine/core";
import { useClickOutside, useDisclosure, useHotkeys } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons";
import { useAtom } from "jotai";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import { isOpen, userInfoAtom, userInfoDisabledAtom } from "../../store/jotai";
import AppEditableInput from "./AppEditableInput";
import AppStandardModal from "./AppStandardModal";
import { pushNotification } from "./pushNotification";
import myImg from "../../assets/me.jpg";
import { DatePicker } from "@mantine/dates";

export default function AppEditProfile() {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [disabledUserEmail, setUserEmailDisabled] = useState<boolean>(true);
  const [disabledUserName, setUserNameDisabled] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);

  const editYourName = () => {
    setUserNameDisabled(false);
    if (!disabledUserName) {
      setUserNameDisabled(true);
      pushNotification(
        "Updated!",
        "Your Name has been updated",
        "teal",
        <IconCheck size={18} />
      );
    }
  };
  const editYourEmail = () => {
    setUserEmailDisabled(false);
    if (!disabledUserEmail) {
      setUserEmailDisabled(true);
      pushNotification(
        "Updated!",
        "Your Email has been updated",
        "teal",
        <IconCheck size={18} />
      );
    }
  };

  const refYourName = useClickOutside(() => {
    setUserNameDisabled(true);
    if (!disabledUserName) {
      pushNotification(
        "Updated!",
        "Your Name has been updated",
        "teal",
        <IconCheck size={18} />
      );
    }
  });
  const refYourEmail = useClickOutside(() => {
    setUserEmailDisabled(true);
    if (!disabledUserEmail) {
      pushNotification(
        "Updated!",
        "Your Email has been updated",
        "teal",
        <IconCheck size={18} />
      );
    }
  });
  const [isOpened, setIsOpened] = useAtom(isOpen);

  useHotkeys([
    [
      "mod+]",
      () =>
        setIsOpened({ ...isOpened, profile_modal: !isOpened.profile_modal }),
    ],
  ]);
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
        modalOpned={isOpened.profile_modal}
        modalCloser={() =>
          setIsOpened({ ...isOpened, profile_modal: !isOpened.profile_modal })
        }
        title="Edit Profile"
        Xwidth={10}
      >
        <></>
        <Container className="py-4">
          {/* <Flex direction={"column"} align="center"> */}
          <Avatar
            classNames={{ root: "m-0" }}
            className="mx-auto my-3"
            component="a"
            radius={50}
            size="xl"
            href="#"
            // target="_blank"
            src={myImg}
            alt="Taric Ov"
          />
          <Center>
            <Group position="center">
              <FileButton onChange={setFile} accept="image/png,image/jpeg">
                {(props) => (
                  <Button variant="default" size="xs" className="" {...props}>
                    Change image
                  </Button>
                )}
              </FileButton>
            </Group>
            {file && (
              <Text size="sm" align="center" mt="sm">
                Picked file: {file.name}
              </Text>
            )}
          </Center>

          <AppEditableInput
            label="Your Name"
            inputVal={userInfo.user_name}
            disabled={disabledUserName}
            valOnChange={(e) =>
              setUserInfo({ ...userInfo, user_name: e.currentTarget.value })
            }
            inputRef={refYourName}
            iconOnClick={editYourName}
          />
          <Space h={10} />
          <AppEditableInput
            type="email"
            label="Your Email"
            inputVal={userInfo.user_email}
            disabled={disabledUserEmail}
            valOnChange={(e) =>
              setUserInfo({ ...userInfo, user_email: e.currentTarget.value })
            }
            inputRef={refYourEmail}
            iconOnClick={editYourEmail}
          />
          <Space h={10} />
          <DatePicker
            dropdownType="popover"
            label="Birth Date"
            className="w-fit"
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
        </Container>
      </AppStandardModal>
    </>
  );
}
