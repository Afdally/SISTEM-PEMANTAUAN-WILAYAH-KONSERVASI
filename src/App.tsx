import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import PublicLayout from "./layouts/PublicLayout";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

const GisPage = lazy(() => import("./pages/GisPage"));
const ReporterLayout = lazy(() => import("./layouts/ReporterLayout"));
const CreateReportPage = lazy(() => import("./pages/reporter/CreateReportPage"));
const ReportHistoryPage = lazy(() => import("./pages/reporter/ReportHistoryPage"));
const ReportDetailPage = lazy(() => import("./pages/reporter/ReportDetailPage"));
const ReporterLoginPage = lazy(() => import("./pages/reporter/ReporterLoginPage"));
const AdminGuard = lazy(() => import("./components/admin/AdminGuard"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminReportsPage = lazy(() => import("./pages/admin/AdminReportsPage"));
const AdminReportDetailPage = lazy(() => import("./pages/admin/AdminReportDetailPage"));
const AdminCategoryPage = lazy(() => import("./pages/admin/AdminCategoryPage"));
const AdminRegionPage = lazy(() => import("./pages/admin/AdminRegionPage"));

function RouteLoading() {
  return <div className="page-shell py-16 text-sm font-semibold text-slate-600" role="status">Memuat halaman…</div>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="gis" element={<Suspense fallback={<RouteLoading />}><GisPage /></Suspense>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="pelapor/login" element={<Suspense fallback={<RouteLoading />}><ReporterLoginPage /></Suspense>} />
      <Route path="pelapor" element={<Suspense fallback={<RouteLoading />}><ReporterLayout /></Suspense>}>
        <Route index element={<CreateReportPage />} />
        <Route path="buat-laporan" element={<CreateReportPage />} />
        <Route path="riwayat" element={<ReportHistoryPage />} />
        <Route path="riwayat/:id" element={<ReportDetailPage />} />
      </Route>
      <Route path="admin/login" element={<Suspense fallback={<RouteLoading />}><AdminLoginPage /></Suspense>} />
      <Route element={<Suspense fallback={<RouteLoading />}><AdminGuard /></Suspense>}>
        <Route path="admin" element={<Suspense fallback={<RouteLoading />}><AdminLayout /></Suspense>}>
          <Route index element={<Suspense fallback={<RouteLoading />}><AdminDashboardPage /></Suspense>} />
          <Route path="laporan" element={<Suspense fallback={<RouteLoading />}><AdminReportsPage /></Suspense>} />
          <Route path="laporan/:id" element={<Suspense fallback={<RouteLoading />}><AdminReportDetailPage /></Suspense>} />
          <Route path="wilayah" element={<Suspense fallback={<RouteLoading />}><AdminRegionPage /></Suspense>} />
          <Route path="kategori" element={<Suspense fallback={<RouteLoading />}><AdminCategoryPage /></Suspense>} />
        </Route>
      </Route>
    </Routes>
  );
}

