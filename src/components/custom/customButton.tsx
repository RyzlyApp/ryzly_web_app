"use client"
import { Button } from "@heroui/react";
import clsx from "clsx";

interface IProps {
    children: React.ReactNode;
    variant?:
    | "solid"
    | "flat"
    | "bordered"
    | "ghost"
    | "customGradient"
    | "customDanger"
    | "primary"
    | "auth"
    | "outline";
    color?: string;
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    rounded?: "full" | "lg" | "md" | "sm" | "none";
    isDisabled?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

export default function CustomButton({
    children,
    variant = "solid",
    color = "primary",
    rounded = "full",
    size = "md",
    fullWidth = false,
    isDisabled = false,
    isLoading = false,
    onClick,
    startIcon,
    endIcon,
}: IProps) {
    // 🎨 Tailwind-based custom variants
    const customClasses = clsx({
        "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90":
            variant === "customGradient",
        "bg-red-600 text-white":
            variant === "customDanger",
        "bg-blue-600 text-white ":
            variant === "primary",
        " bg-violet-500 text-white":
            variant === "auth",
        " bg-white text-primarytext border-gray-400 border ":
            variant === "outline",
    });

    return (
        <Button
            variant={
                ["customGradient", "customDanger"].includes(variant)
                    ? "solid"
                    : (variant as any)
            }
            color={color as any}
            size={size}
            radius={rounded}
            fullWidth={fullWidth}
            isDisabled={isDisabled || isLoading}
            isLoading={isLoading}
            onClick={onClick}
            startContent={startIcon}
            endContent={endIcon}
            className={customClasses}
        >
            {children}
        </Button>
    );
}
