import { AppShell } from "@mantine/core";
import AppHeader from "../components/AppHeader";
import AppSideBar from "../components/AppSideBar";
interface Props {
  children: JSX.Element[] | JSX.Element;
}

export default function AppContainer({ children }: Props) {
  return (
    <AppShell
      className="w-screen"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<AppSideBar />}
      header={<AppHeader />}
    >
      {children}
    </AppShell>
  );
}
