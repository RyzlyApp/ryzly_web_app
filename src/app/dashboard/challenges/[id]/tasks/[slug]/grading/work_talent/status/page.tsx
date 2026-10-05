"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { CustomButton } from "@/components/custom";
import { RiDownloadLine, RiFileTextLine } from "react-icons/ri";

export default function WorkTalentStatusPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = useParams();
    // Use query parameter to mock status for UI development
    const status = searchParams.get("mockStatus") || "accepted"; // 'accepted' or 'declined'
    const talentName = "Joy";

    const isAccepted = status === "declined";

    // Hardcoded mock data based on the form values
    const mockData = {
        timeline: "2 Weeks",
        description: "We're looking to create a sleek and secure mobile banking app tailored for digital-first users. The project should feature modern UI designs and intuitive navigation to ensure seamless money management, real-time insights, and build strong user trust—all within a beautifully crafted interface.",
        deliverables: ["User Flows", "UI Design", "User Personas"],
        files: ["prd.pdf", "brandguideline.pdf"],
        amount: 200000,
        declineReason: "I am currently overbooked for the next two weeks and cannot commit to this project timeline.",
    };

    const platformFee = mockData.amount * 0.1;
    const totalEscrow = mockData.amount + platformFee;

    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(num).replace("NGN", "₦");
    };

    return (
        <div className="w-full h-fit max-h-full bg-white rounded-2xl p-6 lg:p-10 overflow-y-auto">
            <h1 className="text-[28px] font-bold text-gray-900 mb-8">
                {isAccepted ? "Invitation Accepted" : "Invitation Declined"}
            </h1>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                
                {/* Left Column - Details */}
                <div className="flex-1 flex flex-col gap-6 w-full border border-gray-100 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] rounded-2xl p-8 bg-white">
                    <p className="text-[14px] font-medium text-gray-500 leading-relaxed">
                        {isAccepted 
                            ? `${talentName} has reviewed and accepted the terms of the engagement. The project is now ready to move forward to the funding stage.`
                            : `${talentName} has reviewed and declined the terms of the engagement.`
                        }
                    </p>

                    {!isAccepted && (
                        <div className="mt-2 flex flex-col gap-3 items-start">
                            <h3 className="font-semibold text-gray-700">Reason</h3>
                            <p className="text-[14px] text-gray-500 leading-relaxed">
                                {mockData.declineReason}
                            </p>
                            <div className="mt-2">
                                <CustomButton onClick={() => router.push(`/dashboard/challenges/${params.id}/tasks/${params.slug}/submission`)}>Choose Another Person</CustomButton>
                            </div>
                        </div>
                    )}

                    <div className="mt-4 flex flex-col gap-2">
                        <h3 className="font-semibold text-gray-700">Timeline</h3>
                        <p className="text-2xl font-bold text-[#596AFE]">{mockData.timeline}</p>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                        <h3 className="font-semibold text-gray-700">Description</h3>
                        <p className="text-[14px] text-gray-500 leading-relaxed">
                            {mockData.description}
                        </p>
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
                        <h3 className="font-semibold text-gray-700">Deliverables</h3>
                        <ul className="flex flex-col gap-2">
                            {mockData.deliverables.map((item, idx) => (
                                <li key={idx} className="text-[14px] text-gray-500">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
                        <h3 className="font-semibold text-gray-700">Project Files</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockData.files.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-[#F8F9FE] rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <RiFileTextLine size={20} className="text-[#1C1C36]" />
                                        <span className="text-[13px] font-bold text-[#1C1C36]">{file}</span>
                                    </div>
                                    <button 
                                        type="button" 
                                        className="text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        <RiDownloadLine size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Summary */}
                <div className="w-full lg:w-[350px]">
                    <div className="sticky top-6 flex flex-col gap-6">
                        
                        <div className="border border-gray-100 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] rounded-2xl p-6 bg-white">
                            <h3 className="font-bold text-gray-900 text-[18px] mb-8">Summary</h3>
                            
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-[13px] font-bold text-gray-800">Amount</p>
                                <p className="text-[13px] font-bold text-gray-900">{formatCurrency(mockData.amount)}</p>
                            </div>
                            
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-[13px] font-bold text-gray-800">Platform fee (10%)</p>
                                <p className="text-[13px] font-bold text-gray-900">{formatCurrency(platformFee)}</p>
                            </div>
                            
                            <div className="flex justify-between items-center mb-8 pt-6 border-t border-gray-100">
                                <p className="text-[13px] font-bold text-gray-800">Total To Escrow</p>
                                <p className="text-2xl font-bold text-[#596AFE]">{formatCurrency(totalEscrow)}</p>
                            </div>

                            <div className="bg-[#7A88FE]/10 p-5 rounded-xl mb-8 flex flex-col gap-3">
                                <p className="text-[13px] text-[#1C1C36] leading-[1.6]">
                                    To activate this agreement, the total amount will be securely held in escrow until the deliverables are approved.
                                </p>
                            </div>

                            {isAccepted && (
                                <CustomButton fullWidth height="48px">
                                    Fund Escrow
                                </CustomButton>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
