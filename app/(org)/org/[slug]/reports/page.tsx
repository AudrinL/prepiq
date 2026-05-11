"use client";

import { useState } from "react";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { FileText, Download, Calendar, Filter, FileSpreadsheet, CheckSquare } from "lucide-react";

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Custom Reports</h1>
        <p className="text-muted-foreground">Generate and export detailed candidate performance data.</p>
      </div>

      <Card className="p-8 border-[var(--border)]">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-[var(--border)] pb-4">
          <FileText size={20} className="text-primary" /> Report Builder
        </h2>

        <div className="space-y-8">
          {/* Date Range */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2"><Calendar size={16} /> Date Range</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Start Date</label>
                <Input type="date" defaultValue="2025-01-01" />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">End Date</label>
                <Input type="date" defaultValue="2025-12-31" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2"><Filter size={16} /> Filter By</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Campaign</label>
                <select className="flex h-10 w-full rounded-md border border-[var(--border)] bg-background px-3 py-2 text-sm">
                  <option value="all">All Campaigns</option>
                  <option value="1">Q1 2025 Graduate Assessment</option>
                  <option value="2">Engineering Team Aptitude</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Test Type</label>
                <select className="flex h-10 w-full rounded-md border border-[var(--border)] bg-background px-3 py-2 text-sm">
                  <option value="all">All Tests</option>
                  <option value="num">Numerical Reasoning</option>
                  <option value="verb">Verbal Reasoning</option>
                  <option value="abs">Abstract Reasoning</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Points */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2"><CheckSquare size={16} /> Data Points to Include</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Candidate Name", "Candidate Email", "Campaign Name", 
                "Test Name", "Completion Date", "Total Time Taken", 
                "Overall Score (%)", "Correct Answers", "Incorrect Answers", 
                "Skipped Questions", "Percentile Rank", "Violations Logged"
              ].map((point, i) => (
                <label key={i} className="flex items-center gap-2 p-3 border border-[var(--border)] rounded-lg cursor-pointer hover:bg-[var(--surface-subtle)] transition-colors">
                  <input type="checkbox" defaultChecked className="text-primary rounded focus:ring-primary" />
                  <span className="text-sm">{point}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Format & Export */}
          <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Export Format</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="format" defaultChecked className="text-primary focus:ring-primary" />
                  <span className="text-sm font-medium flex items-center gap-1"><FileSpreadsheet size={16} className="text-emerald-500" /> CSV</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="format" className="text-primary focus:ring-primary" />
                  <span className="text-sm font-medium flex items-center gap-1"><FileText size={16} className="text-red-500" /> PDF Summary</span>
                </label>
              </div>
            </div>
            
            <Button size="lg" onClick={handleExport} disabled={loading} className="w-full sm:w-auto gap-2">
              {loading ? "Generating Report..." : (
                <>
                  <Download size={18} /> Generate & Download
                </>
              )}
            </Button>
          </div>

          {success && (
            <div className="p-4 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-lg text-sm text-center animate-in fade-in">
              Your report has been generated successfully and the download has started.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
