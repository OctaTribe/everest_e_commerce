"use client";

import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ADMIN_MONTHLY_REVENUE_CHART,
  ADMIN_CATEGORY_SALES_CHART,
} from "@/data/admin-mock-data";
import { formatNPR } from "@/lib/formatters";

export function MonthlyRevenueChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-slate-500 font-mono">
        Loading Revenue Metrics...
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={ADMIN_MONTHLY_REVENUE_CHART} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B45309" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#7F1D1D" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
          <YAxis
            stroke="#64748B"
            fontSize={11}
            tickLine={false}
            tickFormatter={(val) => `रू${val}L`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-xl text-xs font-mono shadow-xl space-y-1">
                    <div className="font-bold text-white">{data.month} (2083 BS)</div>
                    <div className="text-amber-400 font-bold">
                      Revenue: NPR {data.revenueLakhs} Lakhs
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      Units Manufactured: {data.units} Units
                    </div>
                    <div className="text-emerald-400 text-[11px]">
                      B2B Tenders: {data.b2bOrders} Orders
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="revenueLakhs"
            stroke="#B45309"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategorySalesChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-slate-500 font-mono">
        Loading Category Breakdown...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ADMIN_CATEGORY_SALES_CHART}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={4}
              dataKey="share"
            >
              {ADMIN_CATEGORY_SALES_CHART.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0F172A" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-900 border border-slate-700 p-2 rounded-xl text-xs font-mono shadow-xl">
                      <div className="font-bold text-white">{data.name}</div>
                      <div className="text-amber-400 font-bold">{data.share}% Market Share</div>
                      <div className="text-slate-300">{formatNPR(data.revenueNpr)}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
        {ADMIN_CATEGORY_SALES_CHART.map((cat) => (
          <div key={cat.name} className="flex items-center gap-1.5 p-1.5 bg-slate-950 rounded-lg border border-slate-800">
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: cat.color }}></span>
            <div className="truncate text-slate-300">
              <span className="text-white font-bold">{cat.share}%</span> {cat.name.split(" ")[0]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
