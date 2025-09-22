"use client"
import { Button, ButtonProps } from "@heroui/react"
import clsx from "clsx"

type HeroVariants = "solid" | "flat" | "bordered" | "ghost"

type CustomVariants =
  | HeroVariants
  | "customGradient"
  | "customDanger"
  | "primary"
  | "auth"
  | "outline"
  | "secondary"
  | "warning"

interface IProps {
  children: React.ReactNode
  type?: "submit" | "button"
  variant?: CustomVariants
  color?: ButtonProps["color"]
  size?: "sm" | "md" | "lg"
  fontSize?: string
  fullWidth?: boolean
  rounded?: "full" | "lg" | "md" | "sm" | "none"
  isDisabled?: boolean
  isLoading?: boolean
  onClick?: () => void
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode,
  height?: string
}

export default function CustomButton({
  children,
  variant = "primary",
  color = "primary",
  rounded = "full",
  size = "md",
  fontSize = "14px",
  fullWidth = false,
  isDisabled = false,
  isLoading = false,
  type,
  onClick,
  startIcon,
  endIcon,
  height
}: IProps) {
  // Tailwind-based custom variants
  const customClasses = clsx({
    "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90":
      variant === "customGradient",
    "bg-red-600 text-white hover:bg-red-700": variant === "customDanger",
    "bg-neonblue-600 text-white hover:bg-neonblue-600": variant === "primary",
    "bg-neonblue-200 text-violet-500 hover:bg-neonblue-200": variant === "secondary",
    "bg-violet-500 text-white hover:bg-violet-500": variant === "auth",
    "bg-white text-[#161925] border border-[#E8E7ED] hover:bg-white":
      variant === "outline",
    "bg-warning-700 text-white hover:bg-warning-700":
        variant === "warning",
  })

  // Ensure HeroUI only gets its valid variants
  const heroVariant: HeroVariants = (["solid", "flat", "bordered", "ghost"].includes(
    variant
  )
    ? variant
    : "primary") as HeroVariants

  return (
    <Button
      variant={heroVariant}
      color={color}
      size={size}
      type={type}
      style={{
        height: height ?? "40px",
        fontSize: fontSize
      }}
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
  )
}
