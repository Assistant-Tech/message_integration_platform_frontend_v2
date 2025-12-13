import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/auth.store";
import { useMfaStore } from "@/app/store/mfa.store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, Users, Activity, TrendingUp, Database } from "lucide-react";
import RecoveryPhrasesModal from "../../component/mfa/RecoveryCodesModal";
import { Loading } from "@/app/components/common";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user: profile, logout } = useAuthStore();
  const { recoveryPhrases } = useMfaStore();
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);

  useEffect(() => {
    if (recoveryPhrases?.length > 0) {
      setShowRecoveryModal(true);
    }
  }, [recoveryPhrases]);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  // Static data for charts
  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [65, 78, 90, 120, 145, 180],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const userDistributionData = {
    labels: ["Active", "Inactive", "Pending", "Suspended"],
    datasets: [
      {
        data: [450, 120, 80, 35],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(251, 191, 36, 0.8)",
          "rgba(156, 163, 175, 0.8)",
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(239, 68, 68)",
          "rgb(251, 191, 36)",
          "rgb(156, 163, 175)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const activityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Active Users",
        data: [320, 380, 410, 395, 450, 280, 190],
        backgroundColor: "rgba(139, 92, 246, 0.8)",
        borderColor: "rgb(139, 92, 246)",
        borderWidth: 2,
      },
    ],
  };

  const monthlyRevenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [12500, 15200, 18900, 22100, 26500, 31200],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: "685",
      change: "+12%",
      color: "blue",
      trend: "up",
    },
    {
      icon: Activity,
      label: "Active Today",
      value: "450",
      change: "+5%",
      color: "green",
      trend: "up",
    },
    {
      icon: TrendingUp,
      label: "Growth Rate",
      value: "24%",
      change: "+3%",
      color: "purple",
      trend: "up",
    },
    {
      icon: Database,
      label: "Total Sessions",
      value: "12.4K",
      change: "+18%",
      color: "orange",
      trend: "up",
    },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  if (!profile) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-white to-grey-light p-4 md:p-8">
      <div>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-grey">Admin Dashboard</h1>
            <p className="text-grey mt-1">Welcome back, {profile.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 bg-danger hover:bg-danger-dark text-white rounded-lg flex items-center gap-2 transition-colors hover:shadow-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "bg-information",
              green: "bg-green-500",
              purple: "bg-purple-500",
              orange: "bg-orange-500",
            };
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 hover:shadow-sm transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`${colorClasses[stat.color as keyof typeof colorClasses]} p-3 rounded-lg shadow-md`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>
                  <span className="text-primary text-sm font-semibold bg-base-white px-2 py-1 rounded">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-grey-medium text-sm font-medium">
                  {stat.label}
                </h3>
                <p className="text-3xl font-bold text-grey mt-1">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-xl p-6 mb-8 border-l-4 border-information hover:shadow-sm transition-shadow">
          <h2 className="text-xl font-bold text-grey mb-4 flex items-center gap-2">
            <Users size={24} className="text-information" />
            Your Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-base-white to-information-light p-4 rounded-lg border border-information">
              <p className="text-grey-medium text-sm font-medium mb-1">
                User ID
              </p>
              <p className="text-grey font-semibold break-all">{profile.id}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <p className="text-grey-medium text-sm font-medium mb-1">
                Email Address
              </p>
              <p className="text-grey font-semibold break-all">
                {profile.email}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <p className="text-grey-medium text-sm font-medium mb-1">
                Verification Status
              </p>
              <p className="text-grey font-semibold">
                {profile.isVerified ? "✅ Verified" : "❌ Not Verified"}
              </p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth Chart */}
          <div className="bg-white rounded-xl p-6 hover:shadow-sm transition-shadow">
            <h2 className="text-xl font-bold text-grey mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-information" />
              User Growth Trend
            </h2>
            <div className="h-80">
              <Line data={userGrowthData} options={chartOptions} />
            </div>
          </div>

          {/* User Distribution Pie Chart */}
          <div className="bg-white rounded-xl p-6 hover:shadow-sm transition-shadow">
            <h2 className="text-xl font-bold text-grey mb-4 flex items-center gap-2">
              <Users size={20} className="text-green-500" />
              User Distribution
            </h2>
            <div className="h-80 flex items-center justify-center">
              <Pie data={userDistributionData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Bottom Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Bar Chart */}
          <div className="bg-white rounded-xl p-6 hover:shadow-sm transition-shadow">
            <h2 className="text-xl font-bold text-grey mb-4 flex items-center gap-2">
              <Activity size={20} className="text-purple-500" />
              Weekly Activity
            </h2>
            <div className="h-80">
              <Bar data={activityData} options={chartOptions} />
            </div>
          </div>

          {/* Monthly Revenue Chart */}
          <div className="bg-white rounded-xl p-6 hover:shadow-sm transition-shadow">
            <h2 className="text-xl font-bold text-grey mb-4 flex items-center gap-2">
              <Database size={20} className="text-green-500" />
              Monthly Revenue
            </h2>
            <div className="h-80">
              <Line data={monthlyRevenueData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {showRecoveryModal && (
        <RecoveryPhrasesModal
          codes={recoveryPhrases}
          onClose={() => setShowRecoveryModal(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
