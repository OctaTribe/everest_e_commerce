"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Dashboard Error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-8 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-800 flex items-center justify-center text-red-400 mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-black text-white font-heading">
            Operations System Disruption
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            An unexpected error occurred on the Birgunj management interface. Error reference:{" "}
            <span className="font-mono text-amber-400">{error.digest || "ERR_SYS_ADMIN_500"}</span>
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Connection</span>
          </button>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs border border-slate-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Dashboard Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
