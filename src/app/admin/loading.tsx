import React from "react";

export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-28 bg-slate-900/80 rounded-2xl border border-slate-800"></div>

      {/* 4 KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-900/60 rounded-2xl border border-slate-800"></div>
        ))}
      </div>

      {/* Charts Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-80 bg-slate-900/60 rounded-2xl border border-slate-800"></div>
        <div className="lg:col-span-4 h-80 bg-slate-900/60 rounded-2xl border border-slate-800"></div>
      </div>

      {/* Bottom Table Skeleton */}
      <div className="h-64 bg-slate-900/60 rounded-2xl border border-slate-800"></div>
    </div>
  );
}
