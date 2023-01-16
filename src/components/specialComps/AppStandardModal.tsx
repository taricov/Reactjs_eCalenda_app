import { Modal } from "@mantine/core";
import React from "react";

interface Props {
  modalOpned: boolean;
  modalCloser: () => void;
  children: React.ReactNode[];
  title: string;
  Xwidth?: number;
}

export default function AppStandardModal({
  modalOpned,
  modalCloser,
  children,
  title,
  Xwidth = 6,
}: Props) {
  return (
    <>
      <Modal
        withinPortal={false}
        opened={modalOpned}
        onClose={modalCloser}
        centered
        title={title}
        className={`md:w-${Xwidth}/12 mx-auto w-full`}
        classNames={{
          close:
            "bg-none text-app-color-100 dark:hover:bg-app-color-50 dark:hover:bg-opacity-5 hover:bg-app-color-600 transition duration-200 mx-5 outline-none",
          title: "mx-4 text-app-color-100 dark:text-app-color-100 font-bold",
          modal: "p-0 overflow-hidden",
          header:
            "mb-0 py-4 bg-app-color-500 dark:bg-opacity-10 dark:bg-app-color-50 shadow-lg",
        }}
      >
        {children}
      </Modal>
    </>
  );
}
