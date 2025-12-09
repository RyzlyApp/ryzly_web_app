import { UnauthorisedLayout } from "@/components/shared";

export default function TermsOfUse() {
    return (
        <UnauthorisedLayout>
            <div className=" w-full flex justify-center " > 
                <div className=" w-full h-[80vh] flex flex-col items-center justify-center bg-white rounded-xl shadow-sm lg:max-w-[80%] max-w-full " >
                    <iframe
                        src="https://docs.google.com/document/d/e/2PACX-1vSA9ZeyZaoLJjlAoZUQIAldGrtQpy6zRy6OW2hSbXiRSg6V9XdU-kZ-bh0YzmPgo4NdtWXQESNfU2ER/pub?embedded=true"
                        className="w-full h-full py-4 "
                        allow="autoplay"
                    ></iframe>
                </div>
            </div>
        </UnauthorisedLayout>
    )
}