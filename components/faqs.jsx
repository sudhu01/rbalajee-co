import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { merriweather } from "@/app/layout"
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export function Faqs() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue=""
    >
      <AccordionItem value="item-1" className={"shadow-lg"}>
        <AccordionTrigger className={`${merriweather.className} font-semibold hover:cursor-pointer px-4 text-[16px]`}>What do we mean by AI?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p className={`${poppins.className} px-6`}>
            AI (Artificial Intelligence) refers to the simulation of human
            intelligence in machines. These systems come in many forms, from simple
            rule-based algorithms to complex networks that can learn and
            adapt to situations.
          </p>
          <p className={`${poppins.className} px-6`}>
            They provide benefits in areas of repetition, data analysis, and personal assistance.
            Keeping it simple, our services make the most of the benefits offered by AI to provide you with solutions
            in a fraction of the time it would take normally, while maintaining the same level of quality.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className={"shadow-lg"}>
        <AccordionTrigger className={`${merriweather.className} font-semibold hover:cursor-pointer px-4 text-[16px]`}>Where is AI used in our services?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p className={`${poppins.className} px-6`}>
            We leverage AI in each and every service we offer.
            The primary uses of AI are in:
          </p>
          <ul className={`${poppins.className} px-8 font-semibold`}>
            <li>Data Analysis</li>
            <li>Process Automation</li>
            <li>Data Mining</li>
          </ul>
          <p className={`${poppins.className} px-6`}>
            However that being said, we understand that AI is not perfect. At every level we have
            manual verification to ensure that we maintain the quality of our services.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
