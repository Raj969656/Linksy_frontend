import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import MotionWrapper from "../components/ui/MotionWrapper";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Analytics() {
  const { shortId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/analytics/${shortId}`).then((res) => setData(res.data));
  }, []);

  if (!data) return <p className="p-10">Loading...</p>;

  const chartData = {
    labels: data.visitHistory.map((_, i) => `Click ${i + 1}`),
    datasets: [
      {
        label: "Clicks",
        data: data.visitHistory.map((_, i) => i + 1),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <MotionWrapper>
        <h1 className="text-4xl font-bold mb-6">Analytics</h1>
        <p className="mb-4">
          Total Clicks: <b>{data.totalClicks}</b>
        </p>
      </MotionWrapper>

      <MotionWrapper>
        <div className="bg-white p-6 rounded-xl shadow max-w-3xl">
          <Bar data={chartData} />
        </div>
      </MotionWrapper>
    </div>
  );
}
