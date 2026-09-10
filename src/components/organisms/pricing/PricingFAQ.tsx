import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I use Relay for free?",
    answer:
      "Yes. Relay Basic is designed to give you the core workspace experience without requiring a paid plan.",
  },
  {
    question: "What does Relay Plus include?",
    answer:
      "Relay Plus includes everything in Relay Basic along with RelayAI, AI-powered assistance, advanced search and additional collaboration capabilities.",
  },
  {
    question: "Can I upgrade from Basic to Plus later?",
    answer:
      "Yes. You can start with Relay Basic and upgrade to Relay Plus whenever you need the additional capabilities.",
  },
  {
    question: "Is RelayAI included with Plus?",
    answer:
      "Yes. RelayAI is included as part of the Relay Plus experience.",
  },
];

export const PricingFAQ = () => {
  return (
    <section className="px-6 py-24">

      <div className="mx-auto max-w-3xl">

        <div className="mb-10 text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-violet-500">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Questions? We've got answers.
          </h2>

        </div>

        <Accordion type="single" collapsible>

          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
            >

              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>

            </AccordionItem>
          ))}

        </Accordion>

      </div>

    </section>
  );
};