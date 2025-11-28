import { Suspense } from "react";
import UIBuilderContent from "./UIBuilderContent";
import { HeaderProvider } from "@/components/layout/header/HeaderContext";

export default function UIBuilderPage() {
  return (
    <HeaderProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <UIBuilderContent />
      </Suspense>
    </HeaderProvider>
  );
}

