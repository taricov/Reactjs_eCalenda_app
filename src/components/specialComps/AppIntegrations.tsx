import { Group, Avatar, Text, Accordion, Modal } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useAtom } from "jotai";
import { availableIntegrationsAtom, isOpen } from "../../store/jotai";

//========== Integration Component =================================

export default function ModalIntegration() {
  const [isOpened, setIsOpened] = useAtom(isOpen);

  useHotkeys([
    [
      "mod+i",
      () =>
        setIsOpened({
          ...isOpened,
          integration_modal: !isOpened.integration_modal,
        }),
    ],
  ]);
  return (
    <>
      <Modal
        opened={isOpened.integration_modal}
        onClose={() => setIsOpened({ ...isOpened, integration_modal: false })}
        classNames={{ title: "text-2xl font-bold" }}
        title="Manage Integrations"
        fullScreen
      >
        <IntegrationAccordion />
      </Modal>
    </>
  );
}

//========== Building Integration Component =================================

interface AccordionLabelProps {
  label: string;
  image: string;
  description: string;
}

function AccordionLabel({ label, image, description }: AccordionLabelProps) {
  return (
    <Group noWrap>
      <Avatar src={image} radius="xl" size="lg" />
      <div>
        <Text>{label}</Text>
        <Text size="sm" color="dimmed" weight={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

function IntegrationAccordion() {
  const items = availableIntegrationsAtom.map((item) => (
    <Accordion.Item value={item.id} key={item.label}>
      <Accordion.Control disabled={item.disabled}>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <>{item.children()}</>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion chevronPosition="right" variant="contained">
      {items}
    </Accordion>
  );
}
