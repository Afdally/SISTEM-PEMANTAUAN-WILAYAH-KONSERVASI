import AnalyticsSection from "../components/dashboard/AnalyticsSection";
import LatestReports from "../components/dashboard/LatestReports";
import SummaryOverview from "../components/dashboard/SummaryOverview";
import TopSpecies from "../components/dashboard/TopSpecies";

export default function DashboardPage() {
  return (
    <main id="main-content" className="pb-4 pt-7">
      <h1 className="sr-only">Dashboard Pemantauan Pesisir Kabupaten Muna</h1>
      <SummaryOverview />
      <AnalyticsSection />
      <LatestReports />
      <TopSpecies />
    </main>
  );
}

