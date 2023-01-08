import { Modal, ModalProps, useMantineTheme } from "@mantine/core";

const SiteCompModal = ({ opened, setOpened, children }: any) => {
  const theme = useMantineTheme();

  return (
    <Modal
      classNames={{
        modal:
          "bg-gradient-to-r from-skin-hue2 to-skin-hue0 w-11/12 overflow-auto h-3/4 p-0",
      }}
      className="overflow-scroll h-auto"
      opened={opened}
      onClose={setOpened}
      overlayColor={theme.colors.dark[9]}
      centered
      withCloseButton={false}
      overlayOpacity={0.75}
      overlayBlur={0}
    >
      {children}
    </Modal>
  );
};

export default SiteCompModal;
