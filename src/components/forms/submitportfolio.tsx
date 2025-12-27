"use client";

import { useEffect, useState } from "react";
import { FormikProvider } from "formik";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { RiDeleteBin2Line } from "react-icons/ri";

import { ImagePicker, LoadingLayout, ModalLayout } from "../shared";
import { CustomButton, CustomEditor, CustomInput } from "../custom";
import useSubmitChallenge from "@/hook/useSubmitChallenge";
import { useFetchData } from "@/hook/useFetchData";
import { userAtom } from "@/helper/atom/user";
import { IChallenge, IPortfolioDetails } from "@/helper/model/challenge";
import { isDateExpired } from "@/helper/utils/isDateExpired";

export default function SubmitPortfolio({
    allGraded,
    item,
}: {
    allGraded: boolean;
    item: IChallenge;
}) {
    const [user] = useAtom(userAtom);
    const router = useRouter();
    const { id } = useParams() as { id: string };

    const [editId, setEditID] = useState("");

    const { data: portfolio = [], isLoading: loadingPortfolio } =
        useFetchData<IPortfolioDetails[]>({
            name: "portfolio",
            endpoint: "/portfolio",
            params: { challengeID: id },
        });

    const { data: challenge, isLoading: loadingChallenge } = useFetchData<IChallenge>(
        {
            endpoint: `/challenge/single/${id}`,
            name: "challengedetails",
            params: { userId: user?.data?._id },
        }
    );

    const { formikPortifolio, isLoading, setIsOpen, isOpen, image, setImage } = useSubmitChallenge(
        "",
        user?.data?._id,
        editId,
        true
    );

    /** Prefill when editing */
    useEffect(() => {
        if (portfolio.length > 0) {
            const existing = portfolio[0];
            formikPortifolio.setValues({
                ...formikPortifolio.values,
                title: item?.title || challenge?.title || "",
                description: existing.description || "",
                links: existing.links || [],
                tools: existing.tools || [],
            });

            setEditID(existing._id);
        }
    }, [portfolio]);

    /** Set static fields based on challenge */
    useEffect(() => {
        if (!loadingChallenge && challenge) {
            formikPortifolio.setFieldValue("title", challenge.title); 
        }
    }, [challenge, loadingChallenge]);

    /** Reusable remove handler */
    const handleRemove = (field: "links" | "tools", index: number) => {
        const updated = [...formikPortifolio.values[field]];
        updated.splice(index, 1);
        formikPortifolio.setFieldValue(field, updated);
    };

    const hasPortfolio = portfolio.length > 0;

    return (
        <LoadingLayout loading={loadingPortfolio || loadingChallenge}>
            {(isDateExpired(item?.endDate) && allGraded) && (
                <>
                    {/* Desktop */}
                    <div className="hidden w-full justify-end pt-4 lg:flex">
                        <CustomButton onClick={() => setIsOpen(true)}>
                            {hasPortfolio ? "Edit" : "Create"} Portfolio
                        </CustomButton>
                    </div>

                    {/* Mobile */}
                    <div className="w-full justify-end pt-4 lg:hidden">
                        <CustomButton
                            onClick={() => router.push(`/dashboard/challenges/${id}/portfolio`)}
                        >
                            {hasPortfolio ? "Edit" : "Create"} Portfolio
                        </CustomButton>
                    </div>
                </>
            )}

            <ModalLayout
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Create Portfolio"
            >
                <FormikProvider value={formikPortifolio}>
                    <form
                        onSubmit={formikPortifolio.handleSubmit}
                        className="flex h-full w-full flex-col gap-4 lg:h-[680px]"
                    >
                        <div className=" w-full h-fit " >
                            <div className="h-[300px] w-full lg:h-[300px]">
                                <ImagePicker
                                    preview={portfolio[0]?.url ?? ""}
                                    type="image"
                                    image={image as File}
                                    setImage={setImage}
                                />
                            </div>
                        </div>

                        <div className="flex w-full flex-col gap-3">
                            <CustomInput name="title" label="Title" disabled />

                            {/* <CustomInput
                                name="description"
                                label="Description"
                                placeholder="Write a short description about your work"
                                textarea
                            /> */}

                            <CustomEditor name="description" placeholder="Write a short description about your work" />

                            {/* LINKS */}
                            <FieldList
                                title="Links"
                                values={formikPortifolio.values.links}
                                onRemove={(index) => handleRemove("links", index)}
                                onAdd={() =>
                                    formikPortifolio.setFieldValue("links", [
                                        ...formikPortifolio.values.links,
                                        { link: "", name: "" },
                                    ])
                                }
                                renderInput={(index) => (
                                    <>
                                        <CustomInput
                                            name={`links[${index}].name`}
                                            label="Link Name"
                                            placeholder="Portfolio / GitHub / Website"
                                        />
                                        <CustomInput
                                            name={`links[${index}].link`}
                                            label="URL"
                                            placeholder="https://example.com"
                                        />
                                    </>
                                )}
                            />

                            {/* TOOLS */}
                            <FieldList
                                title="Tools"
                                values={formikPortifolio.values.tools}
                                onRemove={(index) => handleRemove("tools", index)}
                                onAdd={() =>
                                    formikPortifolio.setFieldValue("tools", [
                                        ...formikPortifolio.values.tools,
                                        "",
                                    ])
                                }
                                renderInput={(index) => (
                                    <CustomInput
                                        name={`tools[${index}]`}
                                        label="Tool"
                                        placeholder="React, Figma, Tailwind..."
                                    />
                                )}
                            />

                            {/* SUBMIT */}
                            <div className="mt-auto flex w-full justify-end pb-4">
                                <CustomButton type="submit" isLoading={isLoading}>
                                    Submit
                                </CustomButton>
                            </div>
                        </div>
                    </form>
                </FormikProvider>
            </ModalLayout>
        </LoadingLayout>
    );
}

/** ✅ Reusable list form block */
function FieldList({
    title,
    values,
    renderInput,
    onAdd,
    onRemove,
}: {
    title: string;
    values: any[];
    renderInput: (index: number) => React.ReactNode;
    onAdd: () => void;
    onRemove: (index: number) => void;
}) {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">{title}</p>

            {values?.map((_, index) => (
                <div
                    key={index}
                    className="flex w-full flex-col gap-2 rounded-2xl p-3 shadow"
                >
                    <div className="flex w-full items-center justify-between"> 

                        {values.length > 1 && (
                            <button type="button" onClick={() => onRemove(index)}>
                                <RiDeleteBin2Line color="red" />
                            </button>
                        )}
                    </div>

                    {renderInput(index)}
                </div>
            ))}

            <div className="w-[100px]">
                <CustomButton type="button" onClick={onAdd}>
                    Add {title}
                </CustomButton>
            </div>
        </div>
    );
}
