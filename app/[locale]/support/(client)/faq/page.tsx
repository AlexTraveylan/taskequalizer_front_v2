"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { footerSupportItems } from "@/lib/app-types"
import { useScopedI18n } from "@/locales/client"
import Link from "next/link"

type FAQKeyPossible =
  | "question1"
  | "answer1"
  | "question2"
  | "answer2"
  | "question3"
  | "answer3"
  | "question4"
  | "answer4"
  | "question5"
  | "answer5"
  | "question6"
  | "answer6"

type FAQItem = {
  questionI18nKey: FAQKeyPossible
  answerI18nKey: FAQKeyPossible
}

const faqs: FAQItem[] = [
  {
    questionI18nKey: "question1",
    answerI18nKey: "answer1",
  },
  {
    questionI18nKey: "question2",
    answerI18nKey: "answer2",
  },
  {
    questionI18nKey: "question3",
    answerI18nKey: "answer3",
  },
  {
    questionI18nKey: "question4",
    answerI18nKey: "answer4",
  },
  {
    questionI18nKey: "question5",
    answerI18nKey: "answer5",
  },
  {
    questionI18nKey: "question6",
    answerI18nKey: "answer6",
  },
]

export default function FAQPage() {
  const scopedT = useScopedI18n("faq")

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">{scopedT("title")}</h1>

        <div className="max-w-3xl mx-auto p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{scopedT(faq.questionI18nKey)}</AccordionTrigger>
                <AccordionContent>{scopedT(faq.answerI18nKey)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            {scopedT("noResponseLabel")}{" "}
            <Link href={footerSupportItems.Contact.href} className="text-primary hover:underline">
              {scopedT("contactLinkMessage")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
