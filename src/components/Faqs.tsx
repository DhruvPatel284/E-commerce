import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
const Faqs = () => {
  return (
    <div className="w-[95%]">
      <p className="md:text-xl ml-8 font-semibold flex items-center">
        <HelpCircle className="mr-2" />
        Frequently Asked Questions
      </p>
      <div className="mt-4 ">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What payment methods do you accept?
            </AccordionTrigger>
            <AccordionContent>
              We accept major credit and debit cards (Visa, MasterCard, American
              Express), PayPal, and other local payment methods.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I track my order?</AccordionTrigger>
            <AccordionContent>
              Once your order is shipped, you will receive a tracking number and
              a link to track your package&apos;s progress.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              We offer a hassle-free return policy within 10 days of receiving
              your order. Please refer to our Returns & Exchanges page for
              detailed information.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              How long will it take to receive my order?
            </AccordionTrigger>
            <AccordionContent>
              Delivery times vary depending on your location and the shipping
              method you choose. Estimated delivery times are provided during
              checkout.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
};

export default Faqs;