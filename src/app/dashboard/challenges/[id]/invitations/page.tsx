"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { CustomButton } from "@/components/custom";
import { RiDownloadLine, RiFileTextLine } from "react-icons/ri";

export default function TalentInvitationPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = useParams();

    // Mock state for UI ('pending' or 'accepted')
    const status = searchParams.get("mockStatus") || "pending";
    const isAccepted = status === "accepted";

    const mockData = {
        challengeName: "Build a weather app widget",
        timeline: "2 Weeks",
        description: "We're looking to create a sleek and secure mobile banking app tailored for digital-first users. The project should feature modern UI designs and intuitive navigation to ensure seamless money management, real-time insights, and build strong user trust—all within a beautifully crafted interface.",
        deliverables: ["User Flows", "UI Design", "User Personas"],
        files: ["prd.pdf", "brandguideline.pdf"],
        amount: 220000,
    };

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
                You've been invited to work with a host
            </h1>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                
                {/* Left Column - Details */}
                <div className="flex-1 flex flex-col gap-6 w-full border border-gray-100 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] rounded-2xl p-8 bg-white">
                    
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                            <p className="text-[14px] font-medium text-gray-500">Reference Challenge</p>
                            <p className="text-[16px] font-bold text-gray-900">{mockData.challengeName}</p>
                        </div>
                        <button 
                            onClick={() => router.push(`/dashboard/challenges/${params.id}`)}
                            className="border border-[#596AFE] text-[#596AFE] px-6 py-2 rounded-full font-medium text-sm hover:bg-[#EEF0FF] transition-colors"
                        >
                            View Challenge
                        </button>
                    </div>

                    <div className="flex gap-16 mt-2">
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] font-medium text-gray-500">Amount</p>
                            <p className="text-[28px] font-bold text-[#596AFE]">{formatCurrency(mockData.amount)}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] font-medium text-gray-500">Timeline</p>
                            <p className="text-[28px] font-bold text-[#596AFE]">{mockData.timeline}</p>
                        </div>
                    </div>

                    <div className="mt-2 flex flex-col gap-2">
                        <h3 className="font-semibold text-gray-700">Description</h3>
                        <p className="text-[14px] text-gray-500 leading-relaxed">
                            {mockData.description}
                        </p>
                    </div>

                    <div className="mt-2 flex flex-col gap-3">
                        <h3 className="font-semibold text-gray-700">Deliverables</h3>
                        <ul className="flex flex-col gap-2">
                            {mockData.deliverables.map((item, idx) => (
                                <li key={idx} className="text-[14px] text-gray-500">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-2 flex flex-col gap-3">
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

                {/* Right Column - Actions / Timeline */}
                <div className="w-full lg:w-[380px]">
                    <div className="sticky top-6">
                        
                        {isAccepted ? (
                            <div className="flex flex-col gap-6">
                                <h3 className="font-bold text-gray-900 text-[18px]">Timeline</h3>
                                <div className="bg-[#EEF0FF] p-6 rounded-2xl">
                                    <p className="text-[#1C1C36] text-[14px] leading-relaxed">
                                        This project will start counting once the founder funds the escrow
                                    </p>
                                </div>
                                <div className="flex justify-between mt-2 px-2">
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="text-[#596AFE] font-bold text-xl">14 days</p>
                                        <p className="text-gray-500 text-sm">Days</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="text-[#596AFE] font-bold text-xl">0</p>
                                        <p className="text-gray-500 text-sm">Hours</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="text-[#596AFE] font-bold text-xl">0</p>
                                        <p className="text-gray-500 text-sm">Minutes</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="text-[#596AFE] font-bold text-xl">0</p>
                                        <p className="text-gray-500 text-sm">Seconds</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                <h3 className="font-bold text-gray-900 text-[18px]">Actions</h3>
                                
                                <CustomButton fullWidth height="52px">
                                    Accept Invitation
                                </CustomButton>
                                
                                <CustomButton fullWidth variant="outline" height="52px">
                                    Request Changes
                                </CustomButton>

                                <button className="text-red-500 font-medium text-[15px] mt-2 hover:text-red-600 transition-colors">
                                    Decline Invitation
                                </button>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}
