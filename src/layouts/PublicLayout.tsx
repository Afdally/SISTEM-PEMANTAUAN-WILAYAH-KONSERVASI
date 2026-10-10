import { Outlet, useLocation } from "react-router";
import AppHeader from "../components/layout/AppHeader";
import SiteFooter from "../components/layout/SiteFooter";
import SimulationNotice from "../components/layout/SimulationNotice";

export default function PublicLayout() {
  const { pathname } = useLocation();
  const isGis = pathname === "/gis";

  return (
    <div className={`min-h-screen bg-page text-ink${isGis ? " gis-app-shell" : ""}`}>
      <a className="skip-link" href="#main-content">Lewati ke konten utama</a>
      <AppHeader />
      {!isGis && <SimulationNotice />}
      <Outlet />
      {!isGis && <SiteFooter />}
    </div>
  );
}

