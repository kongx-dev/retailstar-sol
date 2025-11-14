import React, { useState } from 'react';

export interface TicketLog {
  id: string;
  wallet: string;
  action: string;
  source: string;
  amount: number;
  notes?: string;
  created_at: string;
}

interface TicketHistoryTableProps {
  logs: TicketLog[];
  loading: boolean;
  error?: string | null;
}

export default function TicketHistoryTable({ 
  logs, 
  loading, 
  error 
}: TicketHistoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'earn':
        return 'text-green-400';
      case 'spend':
        return 'text-red-400';
      case 'bonus':
        return 'text-yellow-400';
      default:
        return 'text-cyan-400';
    }
  };

  const getAmountColor = (amount: number) => {
    return amount > 0 ? 'text-green-400' : 'text-red-400';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatAmount = (amount: number) => {
    return amount > 0 ? `+${amount}` : `${amount}`;
  };

  // Pagination
  const totalPages = Math.ceil(logs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLogs = logs.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-cyan-300 mb-4">Transaction History</h3>
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-zinc-800 rounded">
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 bg-zinc-700 rounded"></div>
                <div className="h-4 w-20 bg-zinc-700 rounded"></div>
                <div className="h-4 w-16 bg-zinc-700 rounded"></div>
              </div>
              <div className="h-4 w-12 bg-zinc-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-cyan-300 mb-4">Transaction History</h3>
        <div className="text-center py-8">
          <p className="text-red-400 mb-2">Failed to load transaction history</p>
          <p className="text-zinc-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-cyan-300 mb-4">Transaction History</h3>
        <div className="text-center py-8">
          <p className="text-zinc-400 mb-2">No transactions yet</p>
          <p className="text-zinc-500 text-sm">Your ticket transactions will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-cyan-300 mb-4">Transaction History</h3>
      
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left py-3 px-4 text-zinc-400 font-medium">Action</th>
              <th className="text-left py-3 px-4 text-zinc-400 font-medium">Source</th>
              <th className="text-left py-3 px-4 text-zinc-400 font-medium">Amount</th>
              <th className="text-left py-3 px-4 text-zinc-400 font-medium">Date</th>
              <th className="text-left py-3 px-4 text-zinc-400 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.map((log) => (
              <tr key={log.id} className="border-b border-zinc-800 hover:bg-zinc-800/30">
                <td className="py-3 px-4">
                  <span className={`font-medium ${getActionColor(log.action)}`}>
                    {log.action}
                  </span>
                </td>
                <td className="py-3 px-4 text-zinc-300">{log.source}</td>
                <td className="py-3 px-4">
                  <span className={`font-semibold ${getAmountColor(log.amount)}`}>
                    {formatAmount(log.amount)} RT
                  </span>
                </td>
                <td className="py-3 px-4 text-zinc-400 text-sm">
                  {formatDate(log.created_at)}
                </td>
                <td className="py-3 px-4 text-zinc-400 text-sm">
                  {log.notes || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {currentLogs.map((log) => (
          <div key={log.id} className="bg-zinc-800/50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className={`font-medium ${getActionColor(log.action)}`}>
                  {log.action}
                </span>
                <span className="text-zinc-400 text-sm">from {log.source}</span>
              </div>
              <span className={`font-semibold ${getAmountColor(log.amount)}`}>
                {formatAmount(log.amount)} RT
              </span>
            </div>
            <div className="text-zinc-400 text-sm mb-1">
              {formatDate(log.created_at)}
            </div>
            {log.notes && (
              <div className="text-zinc-500 text-sm">{log.notes}</div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-zinc-700 text-zinc-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-600"
          >
            Previous
          </button>
          
          <span className="text-zinc-400 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-zinc-700 text-zinc-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}






