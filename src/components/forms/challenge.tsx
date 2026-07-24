"use client";
import { ICompetition } from "@/helper/model/application";
import { FormikProps, FormikProvider } from "formik";
import { ImagePicker, LoadingLayout } from "../shared";
import {
    CustomButton,
    CustomEditor,
    CustomInput,
    CustomSelect,
    CustomStringArrayInput,
} from "../custom";
import CustomMultiSelect from "../custom/customMultipleSelect";
import CustomDateTimePicker from "../custom/customDatePicker";
import { URLS } from "@/helper/services/urls";
import { convertDataForSelect } from "@/helper/utils/convertDataForSelect";
import { useFetchData } from "@/hook/useFetchData";
import { IIndustry, ILevel, ITrack } from "@/helper/model/interest";
import { IChallenge } from "@/helper/model/challenge";
import { Switch } from "@heroui/react";
import { formatNumber } from "@/helper/utils/numberFormat";
import { useAtom } from "jotai";
import { userAtom } from "@/helper/atom/user";
import { useEffect } from "react";
import { addToast } from "@heroui/toast";

interface IProp {
    formik: FormikProps<ICompetition>;
    isLoading: boolean;
    preview?: string;
    challenge?: IChallenge;
    user?: number;
    image: File | null;
    setImage: (by: File | null) => void;
    walletBalance?: number;
    setWithWallet: (by: boolean) => void;
    edit?: boolean;
}

const PLATFORM_FEE_RATE = 0.1;

export default function ChallengeForm({
    formik,
    isLoading,
    preview,
    challenge,
    user,
    image,
    setImage,
    walletBalance = 0,
    setWithWallet,
    edit,
}: IProp) {
    const { data = [], isLoading: loading } = useFetchData<ITrack[]>({
        name: "interest",
        endpoint: URLS.TRACK,
    });

    const { data: level = [], isLoading: loadinglevel } = useFetchData<
        ILevel[]
    >({ name: "level", endpoint: URLS.LEVEL });

    const { data: industry = [], isLoading: loadingindustry } = useFetchData<
        IIndustry[]
    >({ name: "industry", endpoint: URLS.INDUSTRY });

    const options = convertDataForSelect(data, ["name", "_id"]);
    const leveloptions = convertDataForSelect(level, ["name", "_id"]);
    const industryoptions = convertDataForSelect(industry, ["name", "_id"]);

    const changeHandler = () => {
        formik.setFieldValue("isPublic", !formik.values?.isPublic);
    };

    const [userData] = useAtom(userAtom);

    // --- Derived summary figures (previously hardcoded) ---
    const totalRewardPool = Number(formik.values?.winnerPrice) || 0;
    const winnerSlots = Number(formik.values?.numberOfWinners) || 0;
    const individualReward =
        winnerSlots > 0 ? totalRewardPool / winnerSlots : 0;
    const platformFee = totalRewardPool * PLATFORM_FEE_RATE;
    const totalToEscrow = totalRewardPool + platformFee;
    const insufficientFunds = totalToEscrow > walletBalance;

    const listNumber = Array.from({ length: 10 }, (_, i) => ({
        label: String(i + 1),
        value: String(i + 1),
    }));

    const challengeType = [
        { label: "Leaning", value: "Leaning" },
        { label: "Opportunity", value: "Opportunity" },
        { label: "Work Simulation", value: "Work Simulation" },
    ];

    // ---------------- Scroll-to-error helpers ----------------

    /**
     * Finds the DOM node for a (possibly nested, e.g. "address.city") formik
     * field name and scrolls/focuses it. Tries the common ways a `name` prop
     * ends up in the DOM: a `name` attribute, an `id`, or a `data-field`
     * attribute, in that order.
     */
    const scrollToField = (fieldName: string) => {
        const selectors = [
            `[name="${fieldName}"]`,
            `#${CSS.escape(fieldName)}`,
            `[data-field="${fieldName}"]`,
        ];

        let el: HTMLElement | null = null;
        for (const selector of selectors) {
            el = document.querySelector(selector);
            if (el) break;
        }

        if (!el) return;

        el.scrollIntoView({ behavior: "smooth", block: "center" });

        // Focus if focusable, without re-triggering the scroll we just did.
        if (typeof el.focus === "function") {
            el.focus({ preventScroll: true });
        }
    };

    const scrollToFirstError = (errors: Record<string, unknown>) => {
        const firstErrorKey = Object.keys(errors)[0];
        if (!firstErrorKey) return;
        scrollToField(firstErrorKey);
    };

    const handleSubmit = async (item: boolean) => {

        if(individualReward < 10000) {
            addToast({
                title: "Error",
                description: "Reward per winner must be at least ₦10,000.",
                color: "danger", // or "error" depending on your UI library
            });
            return
        }
        setWithWallet(item);

        const errors = await formik.validateForm();
        const errorKeys = Object.keys(errors);

        if (errorKeys.length > 0) {
            // Mark all errored fields as touched so their inline error
            // messages actually render before we scroll to them.
            formik.setTouched(
                errorKeys.reduce(
                    (acc, key) => ({ ...acc, [key]: true }),
                    {} as Record<string, boolean>,
                ),
                false,
            );

            // Wait a tick for the touched/error UI to paint before measuring
            // element positions to scroll to.
            requestAnimationFrame(() => scrollToFirstError(errors));
            return;
        }

        formik.handleSubmit();
    };

    console.log(formik.values.numberOfWinners);

    useEffect(() => {
        if (userData?.data?.userType === "organization") {
            formik.setFieldValue("type", "Opportunity");
            formik.setFieldValue("participationFee", "0");
        } else {
            formik.setFieldValue("type", "Leaning");
        }
    }, [userData?.data?.userType]);

    useEffect(() => {
        if (Number(challenge?.numberOfWinners) > 0) {
            formik.setFieldValue(
                "numberOfWinners",
                challenge?.numberOfWinners + "",
            );
        } else {
            if (formik.values?.winnerPrice === "0") {
                formik.setFieldValue("numberOfWinners", "0");
            } else {
                formik.setFieldValue("numberOfWinners", "");
            }
        }
    }, [challenge]);

    console.log(challenge?.numberOfWinners);

    return (
        // <div className=" w-full flex flex-col items-center ">
        <FormikProvider value={formik}>
            <div className="  w-full max-w-[1000px] h-full flex lg:flex-row overflow-y-auto flex-col gap-4 ">
                <div className=" w-full flex flex-col gap-4 p-4 lg:overflow-y-auto rounded-2xl bg-white ">
                    <div className=" w-full h-[240px] ">
                        <ImagePicker
                            image={image}
                            setImage={setImage}
                            preview={preview}
                        />
                    </div>
                    <CustomInput
                        name="title"
                        label="Title"
                        placeholder="What's the title of the challenge?"
                    />

                    <CustomEditor
                        name="description"
                        label="Description"
                        placeholder="Briefly describe the challenge"
                    />
                    <CustomInput
                        name="winnerPrice"
                        label="Winning prize"
                        placeholder="0.00"
                        type="number"
                        disabled={
                            challenge?._id
                                ? true
                                : Number(user) > 0
                                  ? true
                                  : false
                        }
                        startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">
                                    ₦
                                </span>
                            </div>
                        }
                    />
                    {userData?.data?.userType !== "organization" &&
                        Number(formik.values?.winnerPrice) > 0 && (
                            <CustomSelect
                                isDisabled={challenge?._id ? true : false}
                                name="numberOfWinners"
                                label="Number of Winners"
                                placeholder="Select Number Of Winners"
                                options={listNumber}
                            />
                        )}
                    {userData?.data?.userType === "organization" && (
                        <CustomSelect
                            name="numberOfWinners"
                                isDisabled={challenge?._id ? true : false}
                            label="Number of Winners"
                            placeholder="Select Number Of Winners"
                            options={listNumber}
                        />
                    )}
                    {userData?.data?.userType !== "organization" && (
                        <CustomInput
                            name="participationFee"
                            label="Participation fee"
                            placeholder="0.00"
                            type="number"
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">
                                        ₦
                                    </span>
                                </div>
                            }
                        />
                    )}

                    <CustomDateTimePicker
                        name="startDate"
                        withTime={false}
                        label="Start Date"
                    />
                    <CustomDateTimePicker
                        name="endDate"
                        withTime={false}
                        label="End Date"
                    />

                    {/* <CustomSelect
                        name="type"
                        label="Challenge Type"
                        options={challengeType}
                        placeholder="Select Challenge Type"
                    /> */}
                    <LoadingLayout loading={loadinglevel}>
                        <CustomSelect
                            name="level"
                            label="Level"
                            options={leveloptions}
                            placeholder="Select a level"
                        />
                    </LoadingLayout>

                    {userData?.data?.userType !== "organization" && (
                        <CustomInput
                            name="meetingLink"
                            label="Meeting Link"
                            placeholder=""
                            type="url"
                        />
                    )}
                    <LoadingLayout loading={loadingindustry}>
                        <CustomSelect
                            name="industry"
                            label="Industry"
                            placeholder="Select a industry"
                            options={industryoptions}
                        />
                    </LoadingLayout>
                    <CustomStringArrayInput
                        name="tags"
                        label="Tags (5 max)"
                        placeholder="Tags (5 max)"
                    />
                    <LoadingLayout loading={loading}>
                        <CustomMultiSelect
                            name="tracks"
                            single={true}
                            label="Categories"
                            placeholder="Select a Categories"
                            options={options}
                        />
                    </LoadingLayout>
                    <Switch
                        isSelected={formik?.values?.isPublic}
                        onChange={changeHandler}
                    >
                        isPublic
                    </Switch>
                    {preview && (
                        <div className=" w-full h-fit flex justify-end ">
                            <CustomButton
                                height="50"
                                onClick={() => handleSubmit(false)}
                                isLoading={isLoading}
                                // isDisabled={insufficientFunds}
                            >
                                {preview
                                    ? "Update Challenge"
                                    : "Create Challenge"}
                            </CustomButton>
                        </div>
                    )}
                </div>
                {!edit && (
                    <div className=" lg:w-fit w-full ">
                        <div className=" lg:w-[400px] w-full bg-white rounded-2xl shadow p-4 gap-3 flex flex-col ">
                            <p className=" font-bold ">Summary</p>
                            <div className=" w-full grid grid-cols-2 gap-4 pb-2 border-b border-b-[#3F4BB41A] ">
                                <p className=" font-medium text-xs ">
                                    Total Reward pool
                                </p>
                                <p className=" font-semibold text-xs text-right ">
                                    {formatNumber(totalRewardPool)}
                                </p>
                                <p className=" font-medium text-xs ">
                                    Winner Slot(s)
                                </p>
                                <p className=" font-semibold text-xs text-right ">
                                    {winnerSlots || 0}
                                </p>
                            </div>
                            <div className=" w-full flex flex-col border-b pb-3 border-b-[#3F4BB41A] ">
                                <div className=" w-full h-[56px] rounded-2xl bg-[#74748014] p-3 flex justify-between items-center ">
                                    <p className=" text-sm font-semibold ">
                                        Individual Reward
                                    </p>
                                    <p className=" text-2xl font-bold ">
                                        {formatNumber(individualReward)}
                                    </p>
                                </div>
                            </div>
                            <div className=" w-full flex flex-col gap-4 pb-2 border-b border-b-[#3F4BB41A] ">
                                <div className=" w-full flex justify-between items-center ">
                                    <p className=" font-medium text-xs ">
                                        Platform fee ({PLATFORM_FEE_RATE * 100}
                                        %)
                                    </p>
                                    <p className=" font-semibold text-xs ">
                                        {formatNumber(platformFee)}
                                    </p>
                                </div>
                                <div className=" w-full flex justify-between items-center ">
                                    <p className=" font-medium text-sm ">
                                        Total To Escrow
                                    </p>
                                    <p
                                        className={`font-bold text-2xl ${
                                            insufficientFunds
                                                ? " text-primary "
                                                : "text-primary"
                                        }`}
                                    >
                                        {formatNumber(totalToEscrow)}
                                    </p>
                                </div>
                            </div>
                            {/* <div className=" w-full flex flex-col p-4 gap-3 border border-[#3F4BB41A] rounded-2xl ">
                                <p className=" text-xs ">
                                    Kindly ensure you're fit for and have the
                                    necessary skills required for this challenge
                                </p>
                                <p className=" text-xs ">
                                    Wallet balance:{" "}
                                    <span className=" font-medium ">
                                        {formatNumber(walletBalance)}
                                    </span>
                                </p>
                            </div> */}
                            {/* {!edit && (
                                    <CustomButton
                                        height="50"
                                        fullWidth
                                        isDisabled={totalToEscrow > walletBalance}
                                        variant="outline"
                                        onClick={() => handleSubmit(true)}
                                        isLoading={isLoading}
                                        // isDisabled={insufficientFunds}
                                    >
                                        {"Pay With Wallet"}
                                    </CustomButton>
                                )} */}
                            <CustomButton
                                height="50"
                                fullWidth
                                onClick={() => handleSubmit(false)}
                                isLoading={isLoading}
                                // isDisabled={insufficientFunds}
                            >
                                {preview
                                    ? "Update Challenge"
                                    : "Create Challenge"}
                            </CustomButton>
                        </div>
                    </div>
                )}
            </div>
        </FormikProvider>
        // </div>
    );
}
