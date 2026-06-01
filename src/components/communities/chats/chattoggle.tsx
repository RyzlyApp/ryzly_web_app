// components/ChatFloatingButton.tsx
"use client";

import { Button } from '@heroui/react';
import { RiChat3Line } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useCommunityChat } from '../hook/useCommunityChat';
import { usePathname } from 'next/navigation';

export function ChatToggle() {
    const pathname = usePathname();
    const { toggleChat, isExpanded } = useCommunityChat();

    const showButton = pathname?.match(/^\/dashboard\/communities\/[^/]+$/) && !isExpanded;
    
    if (!showButton) return null;

    return (
        <>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="fixed bottom-20 right-4 z-50 lg:hidden"
            >
                <Button
                    isIconOnly
                    onPress={toggleChat}
                    className="bg-[#5160E7] text-white rounded-full shadow-lg w-14 h-14"
                >
                    <RiChat3Line size={24} />
                </Button>
            </motion.div>

        </>
    );
}