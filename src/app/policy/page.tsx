"use client";
import { UnauthorisedLayout } from "@/components/shared";

export default function TermsOfUse() {
    return (
        <UnauthorisedLayout>
            <div className=" w-full flex justify-center " >
                <div className=" w-full h-[80vh] flex flex-col bg-white rounded-xl shadow-sm lg:max-w-[80%] max-w-full " >
                    <iframe
                        src="https://docs.google.com/document/d/e/2PACX-1vQfJaroGVz-B74_KYhF8AeM_0e06RVXTvq-wZvGfpcaMHPB3j2_UJdToKzPmPNvQ-Hzcjll_W_SSbiT/pub?embedded=true"
                        className="w-full h-full py-4"
                        allow="autoplay"
                    ></iframe>
                </div>
            </div>
        </UnauthorisedLayout>
    )
}