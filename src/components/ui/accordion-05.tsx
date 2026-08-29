import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { PlusIcon } from "lucide-react";
import { cn } from "../../lib/utils"; 

export interface AccordionItemData {
  id: string;
  title: string;
  content: string;
}

export const defaultAccordionItems: AccordionItemData[] = [
  {
    id: "1",
    title: "Who am I?",
    content:
      "I’m Ali Imam — a designer and creative developer focused on building digital experiences that are minimal, meaningful, and timeless.",
  },
  {
    id: "2",
    title: "What do I design?",
    content:
      "I create clean, functional interfaces, brand systems, and digital products. My work blends simplicity with clarity and usability.",
  },
  {
    id: "3",
    title: "My design approach",
    content:
      "For me, design isn’t just visuals — it’s how something feels and works. I focus on clarity, detail, and storytelling in every project.",
  },
  {
    id: "4",
    title: "Beyond design",
    content:
      "I bridge design and development, turning ideas into interactive experiences with modern tools and technology.",
  },
  {
    id: "5",
    title: "What inspires me",
    content:
      "Minimalism, architecture, and everyday details. I believe great design is found in the small things we often overlook.",
  },
  {
    id: "6",
    title: "Who I work with",
    content:
      "I collaborate with startups, brands, and individuals who value thoughtful design and want to create lasting impact.",
  },
  {
    id: "7",
    title: "My toolkit",
    content:
      "Figma, Next.js, and modern frameworks are part of my process — but for me, tools always serve the idea, not the other way around.",
  },
  {
    id: "8",
    title: "Let’s connect",
    content:
      "You can reach me through contact@aliimam.in or on social platforms. I’m always open to new projects, collaborations, and conversations.",
  },
];

export interface Accordion05Props {
  items?: AccordionItemData[];
  defaultValue?: string;
  className?: string;
}

export function Accordion05({ items = defaultAccordionItems, defaultValue = "5", className }: Accordion05Props) {
  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      <Accordion type="single" defaultValue={defaultValue} collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="last:border-b border-gray-200">
            <AccordionTrigger className="text-left pl-6 md:pl-14 overflow-hidden text-gray-400 duration-200 hover:no-underline cursor-pointer -space-y-6 data-[state=open]:space-y-0 data-[state=open]:text-gray-900 [&>svg]:hidden">
              <div className="flex flex-1 items-start gap-4">
                <p className="text-xs font-mono font-medium opacity-60">{item.id}</p>
                <h1
                  className="uppercase relative text-left text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight"
                >
                  {item.title}
                </h1>
              </div>
            </AccordionTrigger>

            <AccordionContent className="text-gray-600 leading-relaxed pb-6 pl-6 md:px-20 text-sm sm:text-base">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Accordion05;
