"use client"
import React, { useEffect, useState } from 'react';
import { useFormikContext, getIn } from 'formik';
import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";


interface IProps {
    name: string;                 // 👈 full formik path (e.g. productTypeData[0].ticketType)
    height?: string;
    placeholder?: string;
    label?: string;
    type?: React.HTMLInputTypeAttribute;
    hasFrontIcon?: boolean;
    hasBackIcon?: boolean;
    icon?: React.ReactNode;
    iconback?: React.ReactNode;
    textarea?: boolean;
    disabled?: boolean;
    editor?: boolean
}

export default function TicketFormInput({
    name,
    label, 
}: IProps) {
    // 👇 Hook into Formik
    const { values, errors, touched, setFieldValue } = useFormikContext();

    // Safely pull value, error, touched
    const value = getIn(values, name);
    const error = getIn(errors, name);
    const isTouched = getIn(touched, name);

    const [editorState, setEditorState] = useState(EditorState.createEmpty());



    // Load Formik's string into the editor on mount
    useEffect(() => {
        if (value) {
            const blocksFromHtml = htmlToDraft(value);
            if (blocksFromHtml) {
                const { contentBlocks, entityMap } = blocksFromHtml;
                const contentState = ContentState.createFromBlockArray(
                    contentBlocks,
                    entityMap
                );
                setEditorState(EditorState.createWithContent(contentState));
            }
        }
    }, [value]);

    const onEditorStateChange = (state: EditorState) => {
        setEditorState(state);
        // convert Draft.js content to HTML string
        const html = draftToHtml(convertToRaw(state.getCurrentContent()));
        setFieldValue(name, html);
    };

    console.log(values);


    return (
        <div className="w-full flex flex-col gap-0.5">
            {label && (
                <p className="text-sm text-gray-700 font-medium">{label}</p>
            )}

            <Editor
                editorState={editorState}
                toolbar={{
                    options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "fontFamily",
                        "list",
                        "textAlign",
                        "colorPicker",
                        "link",
                        "embedded",
                        "emoji",
                        "image",
                        "remove",
                        "history",
                    ],
                    inline: { options: ["bold", "italic", "underline", "strikethrough", "monospace"] },
                    list: { options: ["unordered", "ordered", "indent", "outdent"] },
                    textAlign: { options: ["left", "center", "right", "justify"] },
                    link: { options: ["link", "unlink"] },
                    history: { options: ["undo", "redo"] },
                    image: {
                        urlEnabled: true,
                        uploadEnabled: true,
                        alignmentEnabled: true,
                        previewImage: true,
                        inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                        alt: { present: true, mandatory: false },
                    },
                }}
                // toolbarStyle={{ backgroundColor: secondaryBackgroundColor, color: "black" }}
                // editorStyle={{ backgroundColor: secondaryBackgroundColor, color: headerTextColor }}
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange} />

            {/* Error message */}
            {isTouched && error && (
                <p className="text-xs text-red-600 font-medium ml-2">{error}</p>
            )}
        </div>
    );
}

