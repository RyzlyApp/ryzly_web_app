"use client";

import { useSearchParams } from "next/navigation";
import { WorkTalentForm } from "@/components/forms";

export default function WorkWithTalentPage() {
    const searchParams = useSearchParams();
    
    // In a real implementation, you'd fetch the talent details using this ID
    const userId = searchParams.get("userId");
    
    return (
        <div className="w-full h-fit max-h-full overflow-y-auto bg-white rounded-2xl p-6">
            <WorkTalentForm talentName="Joy" />
        </div>
    );
}
