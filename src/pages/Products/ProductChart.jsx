import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProductChart = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productId = searchParams.get('id');

  // Demo data - in production, fetch this from API using productId
  const [chartData, setChartData] = useState({
    productId: productId || "12345",
    productName: "Sản phẩm Demo",
    monthlySales: [
      { month: "2025-01", revenue: 24000000 },
      { month: "2025-02", revenue: 27000000 },
      { month: "2025-03", revenue: 32000000 },
      { month: "2025-04", revenue: 30000000 },
      { month: "2025-05", revenue: 38000000 },
      { month: "2025-06", revenue: 44000000 },
      { month: "2025-07", revenue: 42000000 },
      { month: "2025-08", revenue: 52000000 },
      { month: "2025-09", revenue: 60000000 },
      { month: "2025-10", revenue: 56000000 },
      { month: "2025-11", revenue: 66000000 },
      { month: "2025-12", revenue: 76000000 }
    ]
  });

  // Process data for chart
  const months = chartData.monthlySales.map(item => {
    const [year, month] = item.month.split('-');
    return `T${parseInt(month)}`;
  });

  const revenues = chartData.monthlySales.map(item => item.revenue / 1000000); // Convert to millions

  // Calculate Month-over-Month growth percentage
  const growthPct = revenues.map((v, i) => {
    if (i === 0) return 0;
    const prev = revenues[i - 1];
    return prev === 0 ? 0 : ((v - prev) / prev) * 100;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Doanh thu (triệu ₫)',
        data: revenues,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.25,
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'y',
      },
      {
        label: '% tăng trưởng MoM',
        data: growthPct,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.25,
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'y2',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            if (label.includes('%')) {
              return `${label}: ${value.toFixed(1)}%`;
            }
            return `${label}: ${value.toFixed(1)}`;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Doanh thu (triệu ₫)',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString('vi-VN')
        }
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: '% tăng trưởng',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: (value) => value.toFixed(0) + '%'
        }
      },
    },
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Biểu đồ bán hàng theo tháng
              </h1>
              <p className="text-sm text-slate-500">
                Sản phẩm: <span className="font-medium text-slate-700">{chartData.productName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Chart Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Doanh thu & Tốc độ tăng trưởng
            </h3>
            <p className="text-sm text-slate-500">
              Theo dõi doanh thu và tỷ lệ tăng trưởng theo tháng
            </p>
          </div>

          <div style={{ height: '420px' }}>
            <Line data={data} options={options} />
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Tổng doanh thu</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              ₫{chartData.monthlySales.reduce((sum, item) => sum + item.revenue, 0).toLocaleString('vi-VN')}
            </p>
            <p className="mt-1 text-xs text-slate-500">12 tháng</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Trung bình/tháng</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              ₫{(chartData.monthlySales.reduce((sum, item) => sum + item.revenue, 0) / chartData.monthlySales.length).toFixed(0).toLocaleString('vi-VN')}
            </p>
            <p className="mt-1 text-xs text-slate-500">Doanh thu TB</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Tháng cao nhất</p>
            <p className="mt-2 text-2xl font-bold text-green-600">
              ₫{Math.max(...chartData.monthlySales.map(item => item.revenue)).toLocaleString('vi-VN')}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {months[chartData.monthlySales.findIndex(item => item.revenue === Math.max(...chartData.monthlySales.map(i => i.revenue)))]}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Tăng trưởng tổng</p>
            <p className="mt-2 text-2xl font-bold text-blue-600">
              {(((chartData.monthlySales[chartData.monthlySales.length - 1].revenue - chartData.monthlySales[0].revenue) / chartData.monthlySales[0].revenue) * 100).toFixed(1)}%
            </p>
            <p className="mt-1 text-xs text-slate-500">So với tháng đầu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductChart;
