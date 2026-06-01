import React from 'react';

interface RichTextRendererProps {
    content: string;
    className?: string;
    fallback?: string;
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({
    content,
    className = '',
    fallback = 'No description',
}) => {
    if (!content) {
        return <span className={className}>{fallback}</span>;
    }

    // Check if content contains HTML tags
    const containsHtml = /<[a-z][\s\S]*>/i.test(content);

    if (!containsHtml) {
        return <span className={className}>{content}</span>;
    }

    // Remove potentially dangerous content (basic sanitization)
    const sanitized = content
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+="[^"]*"/g, '')
        .replace(/on\w+='[^']*'/g, '');
    
    

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitized }}
        />
    );
};