import { Suspense } from "react";
import UIUserWorkflowsContent from "./UIUserWorkflowsContent";
import { HeaderProvider } from "@/components/shared/header/HeaderContext";

export default function UIBuilderPage() {
  return (
    <HeaderProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <UIUserWorkflowsContent />
      </Suspense>
    </HeaderProvider>
  );
}

