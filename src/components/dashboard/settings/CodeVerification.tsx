// components/dashboard/settings/VerificationCode.tsx
import React, { useState, useRef, useEffect } from "react";

interface VerificationCodeProps {
  onClose: () => void;
  email: string;
}

const VerificationCode: React.FC<VerificationCodeProps> = ({
  onClose,
  email,
}) => {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newCode = [...code];
      for (let i = 0; i < pastedData.length; i++) {
        if (i < 6) {
          newCode[i] = pastedData[i];
        }
      }
      setCode(newCode);

      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      console.log("Verification code:", verificationCode);
      onClose();
    }
  };

  return (
    <div className="">
      <h4 className="text-lg font-bold mb-2">Enter verification code</h4>
      <p className="text-xs text-gray-600 mb-6">
        Enter the 6-digit code sent to {email}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#5160E7] focus:border-transparent"
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 w-full cursor-pointer bg-[#5160E7] text-white rounded-full hover:bg-[#4451c9]"
          >
            Verify
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <button className="text-xs text-[#5160E7] hover:underline">
          Resend code
        </button>
      </div>
    </div>
  );
};

export default VerificationCode;
