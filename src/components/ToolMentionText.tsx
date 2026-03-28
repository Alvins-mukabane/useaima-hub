import { Fragment } from "react";
import { toolLinks } from "@/content/siteContent";

type ToolMentionTextProps = {
  text: string;
};

const toolMentionMap = {
  SocialPulse: toolLinks.socialPulse,
  FinanceAI: toolLinks.financeAI,
  KidsAI: toolLinks.kidsAI,
  EmailAI: toolLinks.emailAI,
} as const;

const toolMentionPattern = new RegExp(`\\b(${Object.keys(toolMentionMap).join("|")})\\b`, "g");

export function ToolMentionText({ text }: ToolMentionTextProps) {
  const parts = text.split(toolMentionPattern);

  return (
    <>
      {parts.map((part, index) => {
        const href = toolMentionMap[part as keyof typeof toolMentionMap];

        if (!href) {
          return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
        }

        return (
          <a
            key={`${part}-${index}`}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
          >
            {part}
          </a>
        );
      })}
    </>
  );
}
