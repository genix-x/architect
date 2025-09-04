import DashboardFlow from "../components/DashboardFlow";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <div className="p-4 bg-white border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">Music Subscription Service Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Analytics and project management canvas</p>
      </div>
      <DashboardFlow />
    </div>
  );
}
