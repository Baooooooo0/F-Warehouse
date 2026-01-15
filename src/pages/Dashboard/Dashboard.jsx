import React from 'react';
import '../../styles/dashboard.css';

const Dashboard = () => {
  const statsCards = [
    {
      title: 'Tổng giá trị tồn kho',
      value: '$124,500',
      change: '+12%',
      changeType: 'positive',
      icon: 'trending_up',
      iconColor: 'text-green-500'
    },
    {
      title: 'Kho đang hoạt động',
      value: '12',
      change: 'Ổn định',
      changeType: 'neutral',
      icon: 'warehouse',
      iconColor: 'text-primary'
    },
    {
      title: 'Mặt hàng sắp hết',
      value: '45',
      change: '+5%',
      changeType: 'warning',
      icon: 'warning',
      iconColor: 'text-orange-500'
    },
    {
      title: 'Đơn hàng đang chờ',
      value: '8',
      change: '-2%',
      changeType: 'negative',
      icon: 'local_shipping',
      iconColor: 'text-blue-400'
    }
  ];

  const lowStockItems = [
    {
      name: 'Wireless Mouse',
      sku: 'WM-001',
      quantity: 5,
      threshold: 15,
      status: 'Nguy cấp',
      statusColor: 'red',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBprt3qPDr2X18Ggs6veLmnd6KON4Flpkn7OwY57aUfrmKufhjFNp15j0YhBfduRV5zOvIDnkkIXTfGECRjzhe9DgkoBgdcj5xgUtk8blo04mBR2TU_2__KF3aOFNKxrmX0BEtCa25qg4xdBNyh9vblpjKCvs74hsJ_4sodbC2rcoIhXcrZnshLonRuR3PkBDsJF5qHvRwNIGrFrY6ZK0uDaVNz45pdV0c1nLPzwacoOzTfWCpDQaEJmcI3wwhmC0R2FNh8FOoNfvq6'
    },
    {
      name: 'USB-C Cable',
      sku: 'UC-299',
      quantity: 2,
      threshold: 20,
      status: 'Nguy cấp',
      statusColor: 'red',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-M3kEz7vXouNvHhvY84E1ogzWFc5AyQYz-zI4RIP6gqQAVWaFNVWv1Bb63BIbdVnrCW4wPm9p_OYYVgIZUdjqW6u3RNwclY0iPx33jXJpUqG5eVeB4E-cODhS5taAbreAxuXKUXMgXGrg906l328DjtWDEQww1uz14XZp8EMuRmYaXlzzOAESKig7rU0-NmZfOxlQA3NE8bYe5_wAQd_S48rAeMC7NIUzgb_yRqWXrubnZmprOomjUymXxUFEt5O2V0NKIZwfAe9i'
    },
    {
      name: 'Monitor Stand',
      sku: 'MS-550',
      quantity: 8,
      threshold: 12,
      status: 'Sắp hết',
      statusColor: 'orange',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz-RYWKBZrMs0JfHa5XiDik3QodGkJ6AlRhEbHw8Etaxp7Z9SVOjEFTAGg-Ljxb9WwrXbkgdkFAUZKr5wWLgf8u0OG4jaf5NzHocjEIoObnsv2qIUo8pIm3E54RrREur0-KOTeMLlKwIU25zNiY--WhICixj2ahTW_QJql4DNzhX4OnW-lbSSAzMZAK5JDs0bQ6LXxLRnEaeNQlzKi8Z5vBhQ8BrKpISOLYb2-GyNKOId8X5P7LAGkWvSbjNMevH8BH2NATLRcf8zU'
    },
    {
      name: 'HDMI Adapter',
      sku: 'HA-101',
      quantity: 0,
      threshold: 30,
      status: 'Hết hàng',
      statusColor: 'red',
      icon: 'block',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3pdyiGgaC1HrKRaojdAVLNF2hVSztdob1jxUoDkY_TVw5gr-CrFqA1ex6MLepAjuyvwRfTq5aoYAoQHYci9ZJrLsbVF-byT9Mu8zljsjTqUxHsn4-fnjJ-yiWsSrwFJBkxRApPSVw8gJDsAHtvCsUuxdCFM7S_mDCxJEZuIg_DUATlTDqrKG5PuaiBZKyCltzEMQLjnW8OmMLTOkWJ8HHecyPUT0S3mV6dUfF3q5NHOEv38_K9a-dt8rGvJJ9LfavHnGhbu4Lg9SB'
    },
    {
      name: 'Ergo Keyboard',
      sku: 'EK-888',
      quantity: 4,
      threshold: 10,
      status: 'Sắp hết',
      statusColor: 'orange',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx7CcF2CuwBgzdho4M6Y01WHEVN8mHGhbM-s9gXqTWC5BaeH1LCie4xA5vo-vyBXJE3sQgMdTMdwoqwpo8YqNtEagRkjqHIAIPlY3_7Vj4flNKoQ-RZZ0ZiTMfu6UqiQVVwDD7nmEK1G4RU0xMg3rMmq7mPeuU_WJ0vJBEtdZdnvgUT48lyCHqNaSmxc96gYU_4CkOktoRZ121Bu9iaVMhEwErLB0IE2w1IkFuS1a9rXRsnjAaVfSMnsp4goqHYGFnRPDXzSIV3gBZ'
    }
  ];

  const bestSelling = [
    { name: 'Noise Cancelling Headphones', units: '1.204 sản phẩm đã bán', revenue: '+$24k', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxoGHtDSduqNZddhTyEIqRCcPb_JZT8ZxL8WAb5WLT-bRVc7jiA_V6WDWVv_1oQ7xUDuJBvkQatBfV8eJb43h45dg5eHKNJiXBaCck5fjgFZ2Xb0AprTQTfBIYO85hT_Ox-NvpObeSGZpaIk9P0Ht9Klf-N3k-nJKmHxqu43F2oWI0CD5A7W7QMTMwuYQtXED_I7XT2gc86sJAeyLuYOk_e2Qq6V1r9iGa7qtscm4QydaCnJu-YCeWVrCDLXTiY3-KHrS48W3SFXcX' },
    { name: 'Smart Watch Series 5', units: '985 sản phẩm đã bán', revenue: '+$18k', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbeAzCPlygIe8yHCe0WjMQNPO81wk0KAcPR5_UKfCpsIVAVNWTzkKsO3iz1H8h1g9KRfTC1rUuKCNAI1nCjh-fX5kcRL5zQJJzMR4dQRxaS04tw9pxy4vE0pGhfE888LXcUJhCW0Thhzgy9KvF2tqMoixdp_SigwIgoh9KLxzj-J779cvLGTijJ9BE6u7I9RK1ay50JwBw5J9owO5C7540ixw2FxdMMER5C1wCew6vyyTTq-3SqyqNRxdHG0kiUS5WoIAl0ZC_Ar_j' },
    { name: 'Mechanical Keyboard', units: '850 sản phẩm đã bán', revenue: '+$12k', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjbTpGGA67VXNwgqm0B-HU4EK-ufEvvpyctRTkIMfEl2ovzEM4ZNP3n038Gd_516_b4rag92_K9B3CBuzmXkHAI3rosHspcNlbd-eYReMooMzZbsE_phfOg5EbicKyhijPF-pqhxYjsbHfY50Rvcp5uw23N2elzGYjHLC8VUOEr8fklT-YIqx4DXfBiOGOH5XGB2bIsEHkARXLRzEWgGpnkDKir4PklSJ68aXSRykaeuNR09kqWQ0Zx_9BL891e73BqAmtfycBb93w' }
  ];

  const leastSelling = [
    { name: 'Old Gen Webcam', lastSale: '45 ngày trước' },
    { name: 'VGA Cable', lastSale: '62 ngày trước' },
    { name: 'Phone Case (iPhone 6)', lastSale: '90 ngày trước' }
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((stat, index) => (
            <div key={index} className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <span className={`material-symbols-outlined ${stat.iconColor}`}>{stat.icon}</span>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <span className={`mb-1 text-xs font-medium ${
                  stat.changeType === 'positive' ? 'text-green-500' :
                  stat.changeType === 'warning' ? 'text-orange-500' :
                  stat.changeType === 'negative' ? 'text-red-400' :
                  'text-slate-500'
                }`}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          {/* Low Stock Alerts Table */}
          <div className="flex flex-col gap-4 xl:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="material-symbols-outlined text-orange-500">warning</span>
                Cảnh báo tồn kho thấp
              </h3>
              <a className="group flex items-center gap-1 text-sm font-medium text-primary hover:text-blue-600 transition-colors" href="#">
                Xem tất cả cảnh báo
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_right_alt</span>
              </a>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-medium">Tên sản phẩm</th>
                      <th className="px-6 py-4 font-medium">Số lượng</th>
                      <th className="px-6 py-4 font-medium">Ngưỡng</th>
                      <th className="px-6 py-4 font-medium">Trạng thái</th>
                      <th className="px-6 py-4 font-medium text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {lowStockItems.map((item, index) => (
                      <tr key={index} className="group hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          <div className="flex items-center gap-3">
                            <div 
                              className="h-10 w-10 rounded-lg bg-slate-100 bg-cover bg-center border border-slate-200"
                              style={{ backgroundImage: `url('${item.image}')` }}
                            />
                            <div className="flex flex-col">
                              <span>{item.name}</span>
                              <span className="text-xs font-normal text-slate-500">SKU: {item.sku}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-base font-bold text-slate-900">{item.quantity}</span>
                          <span className="text-xs text-slate-500 ml-1">đơn vị</span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          <span className="text-sm">{item.threshold}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                            item.statusColor === 'red' ? 'bg-red-500/10 text-red-600 ring-red-600/20' :
                            'bg-orange-500/10 text-orange-600 ring-orange-600/20'
                          }`}>
                            {item.icon ? (
                              <span className="material-symbols-outlined text-[14px]">{item.icon}</span>
                            ) : (
                              <span className={`h-1.5 w-1.5 rounded-full ${
                                item.statusColor === 'red' ? 'bg-red-500' : 'bg-orange-500'
                              }`}></span>
                            )}
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-300 focus:ring-2 focus:ring-primary focus:ring-offset-2">
                            Đặt thêm
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-6 xl:col-span-1">
            {/* Best Selling Products */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-900">Sản phẩm bán chạy</h3>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-4">
                  {bestSelling.map((product, index) => (
                    <div key={index} className="flex items-center gap-3 border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                      <div 
                        className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-100 bg-cover bg-center"
                        style={{ backgroundImage: `url('${product.image}')` }}
                      />
                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-medium text-slate-900">{product.name}</span>
                        <span className="text-xs text-slate-500">{product.units}</span>
                      </div>
                      <span className="text-sm font-bold text-green-600">{product.revenue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Least Selling Products */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-900">Sản phẩm bán chậm</h3>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-4">
                  {leastSelling.map((product, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                        <span className="material-symbols-outlined">trending_down</span>
                      </div>
                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-medium text-slate-900">{product.name}</span>
                        <span className="text-xs text-slate-500">Lần bán cuối: {product.lastSale}</span>
                      </div>
                      <button className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
