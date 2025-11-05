import { useState } from "react";
import { Link2, MousePointerClick, Sparkles, TrendingUp } from "lucide-react";
import Navbar from "../components/Navbard";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import URLForm from "../components/URLForm";
import URLList from "../components/URLList";

const Dashboard = () => {
  const [urls, setUrls] = useState([
    {
      id: 1,
      shortCode: "abc123",
      shortUrl: "https://shortify.com/abc123",
      originalUrl:
        "https://www.example.com/very/long/url/that/needs/shortening",
      clicks: 42,
      createdAt: new Date().toISOString(),
      aiGenerated: false,
    },
    {
      id: 2,
      shortCode: "xyz789",
      shortUrl: "https://shortify.com/xyz789",
      originalUrl: "https://github.com/user/repository/blob/main/README.md",
      clicks: 128,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      aiGenerated: true,
    },
  ]);
  const [stats, setStats] = useState({
    totalUrls: 2,
    totalClicks: 170,
    aiGenerated: 1,
    growth: 12,
  });

  const handleURLCreated = (newUrl) => {
    setUrls([newUrl, ...urls]);
    setStats((prev) => ({
      ...prev,
      totalUrls: prev.totalUrls + 1,
      aiGenerated: newUrl.aiGenerated ? prev.aiGenerated + 1 : prev.aiGenerated,
    }));
  };

  const statsData = [
    {
      icon: Link2,
      label: "Total URLs",
      value: stats.totalUrls,
      change: stats.growth,
      index: 0,
    },
    {
      icon: MousePointerClick,
      label: "Total Clicks",
      value: stats.totalClicks,
      change: 8,
      index: 1,
    },
    {
      icon: Sparkles,
      label: "AI Generated",
      value: stats.aiGenerated,
      change: 24,
      index: 2,
    },
    {
      icon: TrendingUp,
      label: "Growth Rate",
      value: stats.growth,
      change: 5,
      index: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Sidebar />

      <div className="lg:pl-72">
        <Navbar />

        <main className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <URLForm onURLCreated={handleURLCreated} />

          <URLList urls={urls} loading={false} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
