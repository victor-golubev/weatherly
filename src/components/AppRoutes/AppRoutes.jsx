import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const SearchHistoryPage = lazy(() =>
  import("../../pages/SearchHistoryPage/SearchHistoryPage")
);

function AppRoutes() {
  return (
    <Suspense fallback={<p>Загрузка страницы...</p>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<SearchHistoryPage />} />
        <Route path="*" element={<p>Страница не найдена</p>} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
