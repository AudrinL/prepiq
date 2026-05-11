"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

export function MaintenanceBanner() {
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // In a real app, this subscribes to SSE channel "platform:all"
    // Event "MAINTENANCE_MODE" { active, message }
    
    // Mocking SSE for now
    const handleMaintenanceEvent = (event: any) => {
      const data = JSON.parse(event.data);
      if (data.type === 'MAINTENANCE_MODE') {
        setActive(data.active);
        setMessage(data.message || "Platform is undergoing maintenance.");
      }
    };
    
    // window.addEventListener("sse_maintenance", handleMaintenanceEvent);
    // return () => window.removeEventListener("sse_maintenance", handleMaintenanceEvent);
  }, []);

  if (!active) return null;

  return (
    <div className="bg-amber-500 text-black px-4 py-3 flex items-center justify-center gap-3 w-full font-medium z-50">
      <AlertTriangle size={20} />
      <span>{message}</span>
    </div>
  );
}
