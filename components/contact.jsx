'use client';
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Navbar from "./navbar";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";

// 1. Updated the Zod schema to include the phone number
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  // Added phone field - optional so it's not required
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).optional().or(z.literal('')),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must not exceed 500 characters." }),
});

export function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({ message: "", success: false });

  // 2. Updated defaultValues for the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);
    setSubmissionStatus({ message: "", success: false });
    
    // IMPORTANT: Replace these placeholder values with your actual EmailJS credentials.
    const serviceId = "YOUR_SERVICE_ID"; 
    const templateId = "YOUR_TEMPLATE_ID";
    const publicKey = "YOUR_PUBLIC_KEY";

    // 3. Updated templateParams to include the phone number
    const templateParams = {
        name: values.name,
        email: values.email,
        phone: values.phone, // Added phone number here
        subject: values.subject,
        message: values.message,
    };

    try {
        await window.emailjs.send(serviceId, templateId, templateParams, publicKey);
        setSubmissionStatus({ message: "Thank you! Your message has been sent successfully.", success: true });
        form.reset();
    } catch (error) {
        console.error("Failed to send email:", error);
        setSubmissionStatus({ message: "An error occurred. Please try again later.", success: false });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');
        .font-merriweather {
          font-family: 'Merriweather', serif;
        }
        .service-item {
          border-bottom: 1px dashed #d1d5db;
          border-left: 1px dashed #d1d5db;
        }
        .service-item:nth-child(4n+1) {
          border-left: none;
        }
        @media (max-width: 1023px) and (min-width: 768px) {
          .service-item:nth-child(2n+1) {
            border-left: none;
          }
          .service-item:nth-child(4n+1) {
            border-left: 1px dashed #d1d5db;
          }
        }
        @media (max-width: 767px) {
          .service-item {
            border-left: none;
          }
          .service-item:last-child {
            border-bottom: none;
          }
        }
        @media (min-width: 768px) {
          .service-item {
            border-bottom: none;
          }
        }
      `}</style>

      <div className="min-h-screen bg-white text-purple-950 diagonal-bg"> 
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col border-x border-dashed border-gray-300 bg-white">
        <Navbar />

        {/* Main content */}
        <main className="flex-grow">
          <section className="">
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                
                {/* Left Column: Contact Info */}
                <div className="space-y-8">
                  <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 font-merriweather">Get in Touch</h1>
                  <p className="mt-3 text-lg text-slate-600">We'd love to hear from you. Fill out the form or use the contact information below to reach us.</p>
                  <div className="space-y-6 pt-4">
                      <div className="flex items-start space-x-4"><div className="flex-shrink-0"><div className="bg-purple-600 text-white h-12 w-12 flex items-center justify-center rounded-lg"><MapPin className="h-6 w-6" /></div></div><div><h3 className="text-xl font-semibold">Our Office</h3><p className="text-slate-600">4th floor, No.22, Vairam complex, Thyagaraya Rd,<br></br>T. Nagar, Chennai, Tamil Nadu 600017, India</p></div></div>
                      <div className="flex items-start space-x-4"><div className="flex-shrink-0"><div className="bg-purple-600 text-white h-12 w-12 flex items-center justify-center rounded-lg"><Mail className="h-6 w-6" /></div></div><div><h3 className="text-xl font-semibold">Email Us</h3><p className="text-slate-600">rbalajee27@rb-co.in</p></div></div>
                      <div className="flex items-start space-x-4"><div className="flex-shrink-0"><div className="bg-purple-600 text-white h-12 w-12 flex items-center justify-center rounded-lg"><Phone className="h-6 w-6" /></div></div><div><h3 className="text-xl font-semibold">Call Us</h3><p className="text-slate-600">+91 9500080107</p></div></div>
                  </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="bg-slate-50 p-8 rounded-xl border border-dashed border-gray-300">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Your full name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      
                      {/* 4. Added the FormField for the phone number */}
                      <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone Number (Optional)</FormLabel><FormControl><Input placeholder="+91 12345 67890" {...field} /></FormControl><FormMessage /></FormItem>)} />

                      <FormField control={form.control} name="subject" render={({ field }) => (<FormItem><FormLabel>Subject</FormLabel><FormControl><Input placeholder="Regarding our services..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="message" render={({ field }) => (<FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="Please type your message here." className="resize-none" rows={5} {...field} /></FormControl><FormMessage /></FormItem>)} />
                      
                      <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white" disabled={isSubmitting}>
                        {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>) : ("Send Message")}
                      </Button>
                      
                      {submissionStatus.message && (
                        <p className={`text-center text-sm mt-4 ${submissionStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                          {submissionStatus.message}
                        </p>
                      )}
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-dashed border-gray-300">
          <div className="py-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} R Balajee & Co. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
    </div>
  );
}