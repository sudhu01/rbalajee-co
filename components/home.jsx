'use client'
import Link from "next/link";
import Navbar from "./navbar";
import { Faqs } from "./faqs";
import { motion, useInView } from "framer-motion"; 
import { useRef, useEffect } from "react";
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
  const footerRef = useRef(null);
  const isInView = useInView(servicesRef, { once: true, amount: 0.5 });

  useEffect(() => {
    // Inject LEI badge script directly into footer element
    const scriptId = 'lei-badge-script';
    
    if (!footerRef.current) {
      console.error('Footer ref not available');
      return;
    }

    if (document.getElementById(scriptId)) {
      console.log('LEI badge script already exists');
      return;
    }

    console.log('Creating and injecting LEI badge script into footer...');
    
    // Create script element
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    script.src = 'https://leiadmin.com/leibadge.js?color=dark&size=small&place=sticky&lei=98450054BBXFZE2EC750';
    
    script.addEventListener('load', () => {
      console.log('✓ LEI badge script loaded successfully');
      
      // Check if badge container is created after script loads
      const checkBadge = () => {
        // Find badge container with shadowRoot
        const allDivs = Array.from(document.querySelectorAll('div'));
        let badgeContainer = null;
        let badgeShadowRoot = null;
        
        for (const div of allDivs) {
          if (div.shadowRoot) {
            const badgeInside = div.shadowRoot.querySelector('.leibadge');
            if (badgeInside) {
              badgeContainer = div;
              badgeShadowRoot = div.shadowRoot;
              break;
            }
          }
        }
        
        if (!badgeContainer) {
          console.warn('⚠ Badge container not found - script may have failed to initialize');
          console.log('This is likely because document.currentScript is null when script executes');
          console.log('Attempting to manually trigger badge initialization...');
          
          // Try to manually call leibadge function if available
          if (typeof window.leibadge === 'function') {
            console.log('Calling leibadge() function manually...');
            try {
              window.leibadge();
              // Check again after manual call
              setTimeout(checkBadge, 500);
            } catch (e) {
              console.error('Error calling leibadge():', e);
            }
          } else {
            console.log('leibadge function not available on window');
            console.log('The script may need document.currentScript to work properly');
            console.log('Checking if script functions are available...');
            
            // Check if script has loaded its functions
            console.log('Available window properties:', Object.keys(window).filter(k => k.includes('lei') || k.includes('badge')));
            
            // If DOMContentLoaded already fired, the script might not have initialized
            if (document.readyState === 'complete') {
              console.log('DOM already loaded - script initialization might have missed DOMContentLoaded event');
              console.log('The badge script waits for DOMContentLoaded, but it may have already fired');
            }
          }
          return;
        }
        
        console.log('✓ Badge container found!', badgeContainer);
        
        // Check and populate LEI code if missing
        setTimeout(() => {
          const leiCodeElement = badgeShadowRoot.querySelector('.leibadge-code');
          const currentLeiCode = leiCodeElement?.innerText || leiCodeElement?.textContent;
          
          if (!currentLeiCode || currentLeiCode.trim() === '') {
            console.log('LEI code not populated, manually setting it...');
            if (leiCodeElement) {
              const leiCode = '98450054BBXFZE2EC750';
              leiCodeElement.textContent = leiCode;
              leiCodeElement.href = `https://www.legalentityidentifier.co.uk/leicert/?lei=${leiCode}`;
              console.log('✓ LEI code manually populated:', leiCode);
            }
          } else {
            console.log('✓ LEI code already populated:', currentLeiCode);
          }
        }, 1000);
      };
      
      // Check immediately and after delays
      setTimeout(checkBadge, 500);
      setTimeout(checkBadge, 2000);
      setTimeout(checkBadge, 5000);
    });
    
    script.addEventListener('error', (e) => {
      console.error('✗ Failed to load LEI badge script:', e);
      // Fallback: try loading from body if footer doesn't work
      const fallbackScript = document.createElement('script');
      fallbackScript.id = scriptId + '-fallback';
      fallbackScript.src = script.src;
      document.body.appendChild(fallbackScript);
    });
    
    // Append to document.body to ensure proper execution
    // Scripts need to be in head or body to execute properly
    // The badge will appear sticky on the page regardless
    document.body.appendChild(script);
    console.log('Script element appended to body for execution');
    
    // Add a comment marker in footer to show association
    if (footerRef.current) {
      const comment = document.createComment(' LEI Badge Script loaded by footer component ');
      footerRef.current.appendChild(comment);
    }

    return () => {
      const script = document.getElementById(scriptId);
      if (script?.parentNode) {
        script.parentNode.removeChild(script);
      }
      const fallback = document.getElementById(scriptId + '-fallback');
      if (fallback?.parentNode) {
        fallback.parentNode.removeChild(fallback);
      }
    };
  }, []);

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
              
              <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl font-merriweather px-2">
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

              <p className="mx-auto max-w-3xl text-sm text-slate-600 sm:text-base lg:text-[17px] px-2">
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
                  <div className="hidden sm:block flex-grow border-t border-dashed border-gray-300"></div>
                  
                  <motion.h2
                    // Adjusted text size for mobile
                    className="text-slate-900 mx-auto sm:mx-4 flex-shrink rounded-full border border-gray-300 px-3 py-1.5 text-[10px] leading-tight font-semibold font-mono sm:flex-shrink-0 sm:px-4 sm:py-1 sm:text-sm md:px-6 md:py-2 md:text-base lg:text-xl"
                  >
                    {isInView ? (
                        <AnimatedText delay={1} className="inline-block">
                          Our AI-Enhanced Services Include
                        </AnimatedText>
                    ) : (
                        <span className="opacity-0">Our AI-Enhanced Services Include</span>
                    )}
                  </motion.h2>

                  <div className="hidden sm:block flex-grow border-t border-dashed border-gray-300"></div>
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
          <footer className="" ref={footerRef}>
            <div className="py-6 text-center text-xs text-slate-500 sm:py-8 sm:text-sm"> 
              © {new Date().getFullYear()} R Balajee & Co. All rights reserved.
            </div>
            {/* LEI Badge Script - injected directly into footer via useEffect */}
          </footer>
        </div>
      </div>
    </div>
  );
}