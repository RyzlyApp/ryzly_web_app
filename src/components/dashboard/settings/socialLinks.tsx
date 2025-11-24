import useProfile from "@/hook/useProfile"
import { FormikProvider } from "formik";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa6";
import { RiAddLine, RiEditLine } from "react-icons/ri"
import SocialInput from "./socialInput";
import { textLimit } from "@/helper/utils/textlimit";


export default function SocialLink() {


    // "facebookUsername": string,
    // "twitterUsername": string,
    // "instagramUsername": string,
    // "LinkedinUsername": string,
    // "tiktokUsername": string,
    const socials = [
        {
            title: "Facebook",
            icon: FaFacebookF,
            name: "facebookUsername"
        },
        {
            title: "Twitter",
            icon: FaTwitter,
            name: "twitterUsername"
        },
        {
            title: "Instagram",
            icon: FaInstagram,
            name: "instagramUsername"
        },
        {
            title: "LinkedIn",
            icon: FaLinkedinIn,
            name: "LinkedinUsername"
        },
        {
            title: "TikTok",
            icon: FaTiktok,
            name: "tiktokUsername"
        },
    ];

    const { formik, isLoading, links, setLinks } = useProfile()

    console.log(formik.values);


    return (
        <FormikProvider value={formik} >
            <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-6 ">
                <h4 className=" block text-sm font-bold mb-3">Socials</h4>
                <div className=" w-full flex flex-col gap-4 " >
                    <div className=" w-full flex flex-col pb-2 gap-4 " >
                        {socials?.map((item, index) => {
                            return (
                                <div className=" w-full flex flex-col gap-2 " >
                                    <div key={index} className=" flex justify-between items-center w-full "  >
                                        <div className=" flex items-center gap-2 " >
                                            <div className=" w-fit " >
                                                <item.icon size={"20px"} />
                                            </div>
                                            <p className=" font-medium text-sm " >{item?.title}</p>
                                        </div>
                                        <div className=" flex items-center gap-2 " >
                                            {/* <button className=" text-neonblue-600 text-xs " >View</button> */}
                                            <button onClick={() => setLinks(item?.name)} className=" w-8 h-8 rounded-full flex text-neonblue-600 justify-center items-center " >
                                                <RiEditLine size={"18px"} />
                                            </button>
                                        </div>
                                    </div>
                                    {links === item?.name ? (
                                        <SocialInput name={item?.name} setIsOpen={setLinks} formik={formik} isLoading={isLoading} />
                                    ) : (
                                        <>
                                            {(() => {
                                                type FormikValues = typeof formik.values;
                                                const key = item?.name as keyof FormikValues;
                                                return <a href={formik.values[key] + ""} className=" text-xs pl-5 text-neonblue-500 " target="_blank" >{textLimit(formik.values[key] + "", 20)}</a>
                                            })()}
                                        </>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </FormikProvider>
    )
}