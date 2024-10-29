import React from 'react'

const SupplierListSkelton = () => {
  return (
 <>
 <div className="p-6 bg-gray-50 min-h-screen">
  {/* Header Section */}
  <div className="mb-8">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Supplier Management</h1>
    </div>
  </div>

  {/* Table Section */}
  <div className="bg-white rounded-lg shadow overflow-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {Array.from({ length: 7 }).map((_, idx) => (
            <th
              key={idx}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {Array.from({ length: 5 }).map((_, idx) => (
          <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              <div className="w-20 h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
              <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
            </td>
            <td className="px-6 py-4">
              <div className="w-24 h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
              <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap flex flex-col items-center">
              <div className="w-10 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-12 h-4 bg-gray-300 rounded animate-pulse mt-1"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex gap-3">
                <div className="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

 </>
  )
}

export default SupplierListSkelton
