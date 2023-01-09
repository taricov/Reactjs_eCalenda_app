import { Group, Avatar, Text, Accordion, Modal } from "@mantine/core";
import { useAtom } from "jotai";
import {
  availableIntegrationsAtom,
  integrationModalOpen,
} from "../store/jotai";

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

function MantineAccordion() {
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

export default function ModalIntegration() {
  const [integrationOpen, setIntegrationOpened] = useAtom(integrationModalOpen);

  return (
    <>
      <Modal
        opened={integrationOpen}
        onClose={() => setIntegrationOpened(false)}
        classNames={{ title: "text-2xl font-bold" }}
        title="Manage Integrations"
        fullScreen
      >
        <MantineAccordion />
      </Modal>
    </>
  );
}
