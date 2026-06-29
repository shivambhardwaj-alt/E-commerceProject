import React from "react";

const Faqs = () => {
    const [openIndex, setOpenIndex] = React.useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    }

    const faqs = [
  {
    question: "How long does delivery take?",
    answer: "Orders are usually delivered within 3-7 business days, depending on your location."
  },
  {
    question: "What is your return policy?",
    answer: "You can return or exchange eligible items within 7 days of delivery."
  },
  {
    question: "How do I choose the right size?",
    answer: "Please check the size guide on the product page before placing your order."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI, debit/credit cards, net banking, and wallets."
  },
  {
    question: "Can I track my order?",
    answer: "Yes, once your order is shipped, you will receive a tracking link or tracking ID."
  },
  {
    question: "Are your winter clothes warm enough for heavy cold?",
    answer: "Yes, our winter collection is designed to provide comfort and warmth for cold weather."
  },
  {
    question: "Do you offer exchanges for size issues?",
    answer: "Yes, size exchanges are available for eligible products based on our exchange policy."
  },
  {
    question: "How can I contact support?",
    answer: "You can reach our support team through the contact page or email us for help."
  }
];

    return (
        <>
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
                    * {
                        font-family: "Poppins", sans-serif;
                    }
                `}
            </style>
            
            <section className='w-full flex flex-col items-center justify-center py-16 px-4'>
                <div className='w-full max-w-5xl'>
                    <div className='mb-10'>
                        <h2 className='text-3xl font-semibold text-neutral-900 text-center md:text-start mb-4'>Most asked FAQ's</h2>
                        <p className='text-neutral-800 max-w-[416px] text-sm text-center md:text-start mx-auto md:mx-0'>We're here to help you and solve doubts. Find answers to the most common questions below.</p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
                        {faqs.map((faq, index) => (
                            <div key={index} onClick={() => toggleFAQ(index)} className={`bg-slate-50 p-3.5 rounded-lg cursor-pointer transition-all duration-300 border border-slate-200 hover:bg-slate-100 ${openIndex === index ? 'row-span-2' : ''}`}>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm font-medium text-neutral-800'>{faq.question}</span>
                                    <div className={`text-slate-400 p-1 rounded transition-colors ${openIndex === index ? 'bg-slate-200 text-slate-500' : 'hover:bg-slate-300 hover:text-slate-500'}`}>
                                        {openIndex === index ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus"><path d="M5 12h14"/></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                                        )}
                                    </div>
                                </div>
                                <div className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className='overflow-hidden'>
                                        <p className='text-sm text-neutral-600 leading-relaxed'>
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}


export default Faqs;