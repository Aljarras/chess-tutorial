import { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="min-h-screen w-full max-w-[480px] mx-auto bg-[#dce3d8] rounded-[5px]">
      {children}
    </div>
  );
}
