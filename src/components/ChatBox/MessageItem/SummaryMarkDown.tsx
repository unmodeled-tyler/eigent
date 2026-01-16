import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export const SummaryMarkDown = ({
	content,
	speed = 15,
	onTyping,
	enableTypewriter = true,
}: {
	content: string;
	speed?: number;
	onTyping?: () => void;
	enableTypewriter?: boolean;
}) => {
	const [displayedContent, setDisplayedContent] = useState("");
	const [isTyping, setIsTyping] = useState(true);

	useEffect(() => {
		if (!enableTypewriter) {
			setDisplayedContent(content);
			setIsTyping(false);
			return;
		}

		setDisplayedContent("");
		setIsTyping(true);
		let index = 0;

		const timer = setInterval(() => {
			if (index < content.length) {
				setDisplayedContent(content.slice(0, index + 1));
				index++;
				if (onTyping) {
					onTyping();
				}
			} else {
				setIsTyping(false);
				clearInterval(timer);
			}
		}, speed);

		return () => clearInterval(timer);
	}, [content, speed, onTyping]);

	return (
		<div className="prose prose-sm max-w-none">
			<ReactMarkdown
				components={{
        h1: ({ children }) => (
          <h1 className="text-xl font-bold text-text-heading mb-3 flex items-center gap-2 border-b border-border-secondary pb-2">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-semibold text-text-heading mb-3 mt-4 flex items-center gap-2">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-medium text-text-body mb-2 mt-3">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="m-0 text-sm font-normal text-text-body leading-relaxed mb-3 whitespace-pre-wrap">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside text-sm text-text-body mb-3 space-y-1 ml-2">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside text-sm text-text-body mb-3 space-y-1 ml-2">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="mb-1 text-text-body leading-relaxed">{children}</li>
        ),
        code: ({ children }) => (
          <code className="bg-surface-secondary text-text-action px-2 py-1 rounded text-xs font-mono">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-surface-secondary border border-border-secondary p-3 rounded-lg text-xs overflow-x-auto mb-3">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-border-information pl-4 italic text-text-body bg-surface-secondary py-2 rounded-r-lg mb-3">
            {children}
          </blockquote>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-text-heading">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-text-body">{children}</em>
        ),
        hr: () => (
          <hr className="border-border-secondary my-4" />
        ),
				}}
			>
				{displayedContent}
			</ReactMarkdown>
		</div>
	);
};