import { Navbar } from "./components/Navbar/Navbar";
import { Layout } from "./layout/Layout/Layout";
import { Routes, Route } from "react-router-dom";

import { DashboardPage } from "./pages/DashboardPage";
import { LiveMatchesPage } from "./pages/LiveMatchesPage";
import { FixturesPage } from "./pages/FixturesPage";

const App = () => {
  return (
    <Layout className="flex min-h-dvh relative overflow-hidden">
      <Navbar />

      <main className="p-4 w-full h-full">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/live" element={<LiveMatchesPage />} />
          <Route path="/fixtures" element={<FixturesPage />} />
        </Routes>
      </main>
    </Layout>
  );
};

export default App;
