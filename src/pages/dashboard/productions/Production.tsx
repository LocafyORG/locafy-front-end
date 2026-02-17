import { Paper } from "@components/Container";
import { CSpinner } from "@coreui/react";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { getProductionById } from "@api/productions/ProductionsApi";
import Cheems from "@assets/img/under-development.webp";
import { DASHBOARD } from "@constants/Routes";
import {
  FaCamera,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaEdit,
  FaShareAlt,
  FaArrowLeft,
  FaClock,
  FaTag,
  FaInfoCircle,
} from "react-icons/fa";

export function Production() {
  const { productionId } = useParams<{ productionId: string }>();
  const navigate = useNavigate();

  const {
    data: production,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getProductionById(productionId || ""),
    queryKey: ["production", { productionId }],
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <CSpinner />
          <p className="text-gray-600">Loading production details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center min-h-screen">
        <div className="text-center">
          <FaInfoCircle className="text-red-500 text-4xl mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-red-600">
            Error loading production
          </h1>
          <p className="text-gray-600 mt-2">Failed to load production data.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr?: string) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : "Not specified";

  return (
    <>
      <DashboardPageHeader
        title={production?.title || "Production Details"}
        leftButtons={[
          {
            children: (
              <span className="flex items-center gap-2">
                <FaArrowLeft /> BACK
              </span>
            ),
            onClick: () => navigate("/dashboard/productions"),
            className:
              "flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition",
          },
        ]}
        buttons={[
          {
            children: (
              <span className="flex items-center gap-2">
                <FaShareAlt /> SHARE
              </span>
            ),
            onClick: () => {
              // Implement share logic here
            },
            className:
              "flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition",
          },
          {
            children: (
              <span className="flex items-center gap-2">
                <FaEdit /> EDIT PRODUCTION
              </span>
            ),
            onClick: () => {
              if (production?.productionId) {
                navigate(
                  `${DASHBOARD.EDIT_PRODUCTION}/${production.productionId}`,
                );
              }
            },
            className:
              "flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition",
          },
        ]}
      />

      <div className="max-w-6xl mx-auto mt-8">
        {/* Hero Section */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden mb-8">
          <div className="relative">
            <img
              src={Cheems}
              alt={production?.title || "Production Image"}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center gap-3 mb-2">
                <FaCamera className="text-2xl" />
                <h1 className="text-4xl font-bold">{production?.title}</h1>
              </div>
              {production?.description && (
                <p className="text-lg opacity-90 max-w-2xl">
                  {production.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Production Details */}
            <Paper className="p-6 bg-white shadow-xl rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <FaInfoCircle className="text-blue-500 text-xl" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Production Details
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <FaCalendarAlt className="text-green-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Created Date
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(production?.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <FaClock className="text-orange-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Last Updated
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(production?.lastUpdated)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <FaTag className="text-purple-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Production ID
                    </p>
                    <p className="text-lg font-semibold text-gray-900 font-mono">
                      {production?.productionId}
                    </p>
                  </div>
                </div>
              </div>
            </Paper>

            {/* Description */}
            {production?.description && (
              <Paper className="p-6 bg-white shadow-xl rounded-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {production.description}
                </p>
              </Paper>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Paper className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Status</h3>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500 dark:border-green-400">
                <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full"></div>
                <span className="font-semibold text-green-700 dark:text-green-300">Active</span>
              </div>
            </Paper>

            {/* Quick Actions */}
            <Paper className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition">
                  <FaMapMarkerAlt className="text-blue-500 dark:text-blue-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    View Locations
                  </span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition">
                  <FaUsers className="text-green-500 dark:text-green-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-200">Manage Team</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition">
                  <FaCalendarAlt className="text-purple-500 dark:text-purple-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-200">Schedule</span>
                </button>
              </div>
            </Paper>

            {/* Metadata */}
            <Paper className="p-6 bg-white shadow-xl rounded-xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Metadata</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">File Size:</span>
                  <span className="font-medium">2.4 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Resolution:</span>
                  <span className="font-medium">1920x1080</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Format:</span>
                  <span className="font-medium">MP4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium">3:45</span>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
}
