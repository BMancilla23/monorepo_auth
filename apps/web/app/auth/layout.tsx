import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-950">
      {children}
    </div>
  );
}
