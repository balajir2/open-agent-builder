import { ReactNode } from "react";

export default function HeaderWrapper({ children }: { children: ReactNode }) {
  return (
    <header className="py-16 px-16">
      {children}
    </header>
  );
}
