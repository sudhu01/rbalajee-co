'use client'
import Link from "next/link";
import Navbar from "./navbar";
import { Faqs } from "./faqs";
import { motion, useInView } from "framer-motion"; 
import { useRef } from "react";
import AnimatedText from "./ui/animatedtext";
import StarAnimationText from "./ui/starAnimationText";
import { Roboto } from "next/font/google";
import { Handshake, Book, ChartColumnBig, Compass, CircleDollarSign, ShieldCheck, ChartPie, Lightbulb } from "lucide-react";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function HomePage() {
  const features = [
    {
      title: "Internal & Statutory Audit",
      icon: Handshake,
      description:
        "Our Internal Audit services provide assurance that operations and processes perform as intended, thereby facilitating better corporate governance. Our Statutory Audit services provide assurance on the level of compliance of operations and processes with applicable laws and regulations.",
    },
    {
      title: "Book-keeping & Reconciliations",
      icon: Book,
      description:
        "We provide high quality reliable book-keeping and reconciliation services across platforms. We support daily, weekly, monthly and annual reconciliations depending on the volume of transactions and sensitivity. This helps organizations maintain records and mitigate risk of error / fraud",
    },
    {
      title: "Financial Planning & Reporting",
      icon: ChartColumnBig,
      description:
        "We provide functional and operational insight that help understand what happened and what needs to be done. Our reports help understand cash flow and performance better and identify levers for growth. We offer customized solutions as well.",
    },
    {
      title: "Strategic Advisory Services",
      icon: Compass,
      description:
        "We apply relevant approaches to identify business improvement opportunities, streamline processes, reduce cost and maximize bottom line. Depending on the nature of the industry, current needs and organisational philosophy, we focus on one or more levers - cost, quality, customer satisfaction, safety.",
    },
    {
      title: "Income Tax and GST Consulting",
      icon: CircleDollarSign,
      description:
        "We help prepare and file returns and advise on tax planning opportunities provided by law.",
    },
    {
      title: "ISO Quality Consulting & Audit",
      icon: ShieldCheck,
      description:
        "We provide guidance on achieving and retaining ISO 9001:2015 Quality Certification by training, coaching, audit support services, inter alia.",
    },
    {
      title: "Data Analytics",
      icon: ChartPie,
      description:
        "We use current technology and tools to understand numbers, trends and patterns to produce actionable insight for business decisions.",
    },
    {
      title: "Business Transformation",
      icon: Lightbulb,
      description:
        "We provide consulting services on transformation of organizational set up, new product, service and market opportunities, digitization of processes and brand value enhancement",
    },
  ];

  const servicesRef = useRef(null);
  const isInView = useInView(servicesRef, { once: true, amount: 0.5 });

  return (
    <div className="min-h-screen bg-white text-purple-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');
        .font-merriweather {
          font-family: 'Merriweather', serif;
        }
        /* Mobile-first approach: service items have only bottom border by default (col-1) */
        .service-item {
          border-bottom: 1px dashed #d1d5db;
          border-left: none; /* Ensure no left border on mobile */
        }
        
        /* Cleanup for a single column on small screens */
        @media (max-width: 767px) {
          .service-item:last-child {
            border-bottom: none; /* Last item doesn't need a bottom border */
          }
        }
        
        /* Tablet view (md:grid-cols-2) border logic */
        @media (min-width: 768px) {
          .service-item {
            border-bottom: 1px dashed #d1d5db; /* Re-add bottom border for all for consistency */
            border-left: 1px dashed #d1d5db; /* Left border starts for grid-cols-2/4 */
          }
          /* Remove border for items in the first column (1st, 3rd, 5th, etc.) */
          .service-item:nth-child(2n+1) { 
            border-left: none;
          }
          /* Remove bottom border for the last row in a 2-column layout. */
          /* Assuming 8 items: 7th and 8th item (2n+7, 2n+8) */
          .service-item:nth-last-child(-n+2) {
            border-bottom: none;
          }
        }

        /* Desktop view (lg:grid-cols-4) border logic */
        @media (min-width: 1024px) {
          .service-item {
            border-bottom: none; /* Remove all bottom borders for the 4-column layout */
          }
          /* Re-add left border for items that are not the first in their row (2nd, 3rd, 4th, 6th, etc.) */
          .service-item:nth-child(2n+1) {
            border-left: 1px dashed #d1d5db; /* Re-add left border for odd items in 4-column */
          }
          /* Remove left border for items in the first column (1st, 5th, 9th, etc.) */
          .service-item:nth-child(4n+1) {
            border-left: none;
          }
        }
      `}</style>
      
      <div className="min-h-screen bg-white text-purple-950 diagonal-bg"> 
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col border-x border-dashed border-gray-300 bg-white">
          <Navbar />

          <main>
            <div className="bg-white relative">
            <div
              className="absolute inset-0 z-0 opacity-90"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
                  radial-gradient(circle 500px at 20% 80%, rgba(139,92,246,0.3), transparent),
                  radial-gradient(circle 500px at 80% 20%, rgba(59,130,246,0.3), transparent)
                `,
                backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
              }}
            />
            <section className="relative z-10 border-b border-dashed border-gray-300 px-4 py-16 text-center sm:px-6 sm:py-24">
              
              <h1 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl font-merriweather">
                <AnimatedText delay={0} className="inline-block">
                  Your Trusted Partner in
                </AnimatedText> 
                
                <motion.span 
                  className="text-emerald-600 inline-block"
                  initial={{ x: -20, opacity: 0, filter: "blur(5px)" }}
                  animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.7, type: "spring", damping: 12, stiffness: 100 }}
                >
                  &nbsp;Growth
                </motion.span>
              </h1>

              <p className="mx-auto max-w-3xl text-base text-slate-600 sm:text-lg">
                <AnimatedText delay={0.5} speed={0.01}>
                  We provide AI-powered financial, consulting and business transformation
                  services to help small and medium enterprises scale
                </AnimatedText>
              </p>

              {/* Button */}
              <button data-slot="button" className="mt-8 cursor-pointer select-none inline-flex items-center duration-200 justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-purple-950 text-primary-foreground hover:bg-purple-900 button-highlighted-shadow h-8 px-4 py-2 has-[&>svg]:px-2.5">
                <span><Link href="/contact">Reach out to us</Link></span>
                <svg height="18" width="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="-rotate-45">
                  <g fill="currentColor">
                    <path d="M9 1C4.589 1 1 4.589 1 9C1 13.411 4.589 17 9 17C13.411 17 17 13.411 17 9C17 4.589 13.411 1 9 1Z" fill="currentColor" opacity="0.4"></path>
                    <path d="M8.47 11.72C8.177 12.013 8.177 12.488 8.47 12.781C8.616 12.927 8.808 13.001 9 13.001C9.192 13.001 9.384 12.928 9.53 12.781L12.78 9.53103C13.073 9.23803 13.073 8.76299 12.78 8.46999L9.53 5.21999C9.237 4.92699 8.762 4.92699 8.469 5.21999C8.176 5.51299 8.176 5.98803 8.469 6.28103L10.439 8.251H1.75C1.336 8.251 1 8.587 1 9.001C1 9.415 1.336 9.751 1.75 9.751H10.439L8.469 11.721L8.47 11.72Z" fill="currentColor"></path>
                  </g>
                </svg>
              </button>
            </section>
            </div>

            <section className={`border-b border-dashed border-gray-300 bg-white ${roboto.className}`}>
              <div className="px-4 pt-10 pb-8 sm:px-6 sm:pt-12 sm:pb-12"> {/* Adjusted mobile padding */}
                <div className="flex items-center text-center" ref={servicesRef}> 
                  <div className="flex-grow border-t border-dashed border-gray-300"></div>
                  
                  <motion.h2
                    // Adjusted text size for mobile
                    className=" text-slate-900 mx-4 flex-shrink-0 rounded-full border border-gray-300 px-4 py-1 text-base font-semibold font-mono sm:px-6 sm:py-2 sm:text-xl"
                  >
                    {isInView ? (
                        <AnimatedText delay={1} className="inline-block">
                          Our AI-Enhanced Services Include
                        </AnimatedText>
                    ) : (
                        <span className="opacity-0">Our AI-Enhanced Services Include</span>
                    )}
                  </motion.h2>

                  <div className="flex-grow border-t border-dashed border-gray-300"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 border-t border-dashed border-gray-300 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="service-item p-6 sm:p-8 text-center" // Adjusted mobile padding
                  >
                    <feature.icon className="mx-auto mb-2 h-7 w-7 sm:h-8 sm:w-8 text-purple-950" /> {/* Slightly smaller icon on mobile */}
                    <h4 className="mb-2 text-base font-semibold sm:text-[16px]"> {/* Adjusted title size */}
                      {feature.title}
                    </h4>
                    <p className="text-slate-600 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-b border-dashed border-gray-300 bg-white">
              <div className="min-h-[300px] w-full relative text-center">
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #7c3aed 100%)",
                }}
              />
                <h4 className="relative top-4 z-10 font-bold font-mono text-purple-950 border-b border-dashed border-gray-300 pb-4">However we are not limited to just this,</h4>
                <StarAnimationText
                  preText="We provide"
                  magicText="customized solutions"
                  postText="tailored to your business needs."
                />
            </div>
            </section>
          
            <section className="border-b border-dashed border-gray-300 bg-white"> 
              <h1 className="font-mono font-bold text-slate-900 py-4 text-center">Frequently Asked Questions</h1>
              <Faqs />
            </section>
          </main>

          {/* Footer */}
          <footer className="">
            <div className="py-6 text-center text-xs text-slate-500 sm:py-8 sm:text-sm"> 
              © {new Date().getFullYear()} R Balajee & Co. All rights reserved.
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}