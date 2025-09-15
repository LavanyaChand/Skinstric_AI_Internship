"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
// import { toast } from "sonner"
import { z } from "zod"
import { userName } from '@/lib/validation'
import { userLocation } from '@/lib/validation'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import axios from 'axios';
import SideHeading from '../sharedComponent/SideHeading'
import BackButton from '../sharedComponent/BackButton'
import ProceedButton from '../sharedComponent/ProceedButton'
import DottedDiamonds from '../sharedComponent/DottedDiamonds'

const ENDPOINT = "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne";

const TestPage = () => {

  const [step, setStep] = useState<"name" | "city" | "loading" | "done">("name");

  // keep values across steps
  const [nameValue, setNameValue] = useState("");
  const [cityValue, setCityValue] = useState("");


  const nameForm = useForm<z.infer<typeof userName>>({
    resolver: zodResolver(userName),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  })

  const cityForm = useForm<z.infer<typeof userLocation>>({
    resolver: zodResolver(userLocation),
    defaultValues: {
      location: "",
    },
    mode: "onChange",
  })

  async function submitName(data: z.infer<typeof userName>) {
    setNameValue(data.name.trim());
    setStep("city");
  }

  async function submitCity(data: z.infer<typeof userLocation>) {
    const location = data.location.trim();
    setCityValue(location);
    setStep("loading");
    try {
      await axios.post(ENDPOINT, {
        name: nameValue,
        location,
      });

      console.log(JSON.stringify({ SUCCESS: `Added ${nameValue} from ${location}` }));

      // Simulate a small delay to see the loader  
      await new Promise((r) => setTimeout(r, 1000));
      setStep("done");
    }

    catch (err) {
      console.error("Error submitting city:", err);
      setStep("done"); // fallback to done state
    }
  }

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      
      {/* Background diamonds */}
      <DottedDiamonds />

      {/* Top-left small label */}
      <SideHeading />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        {/* NAME STEP */}
        {step === "name" && (
          <FadeIn key="name">
            <p className="text-sm text-dark-5 font-medium tracking-wider uppercase mb-1 text-center">
              Click to type
            </p>

            <Form {...nameForm}>
              <form onSubmit={nameForm.handleSubmit(submitName)}>
                <FormField
                  control={nameForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          {...field}
                          type="text"
                          autoComplete="off"
                          placeholder="Introduce Yourself"
                          className="text-5xl sm:text-6xl font-normal text-center bg-transparent 
                     border-b border-black focus:outline-none appearance-none
                     w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px]
                     text-[#1A1B1C] z-10"
                        />
                      </FormControl>
                      <FormMessage className="mt-3 text-xs" />
                    </FormItem>
                  )}
                />

                {/* hidden submit to allow Enter */}
                <button type="submit" className="sr-only" />
              </form>
            </Form>
          </FadeIn>
        )}

        {/* CITY STEP */}
        {step === "city" && (
          <FadeIn key="city">
            <p className="text-sm text-dark-5 font-medium tracking-wider uppercase mb-1 text-center">
              Click to type
            </p>

            <Form {...cityForm}>
              <form onSubmit={cityForm.handleSubmit(submitCity)}>
                <FormField
                  control={cityForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          {...field}
                          type="text"
                          autoComplete="off"
                          placeholder="Where are you from?"
                          className="text-4xl sm:text-5xl font-normal text-center bg-transparent 
                            border-b border-black focus:outline-none appearance-none
                            w-[400px] sm:w-[460px] pt-1 tracking-[-0.07em] leading-[64px]
                            text-[#1A1B1C] z-10"
                        />
                      </FormControl>
                      <FormMessage className="mt-3 text-xs" />
                    </FormItem>
                  )}
                />
                <button type="submit" className="sr-only" />
              </form>
            </Form>
          </FadeIn>
        )}

        {/* LOADING */}
        {step === "loading" && (
          <FadeIn key="loading">
            <p className=" flex items-center justify-center text-sm text-[#6C7280]">Processing submission</p>
            <div className="mt-3 flex items-center justify-center gap-2 z-10">
              <span className="loading-dot" />
              <span className="loading-dot dot-delay-1" />
              <span className="loading-dot dot-delay-2" />
            </div>
          </FadeIn>
        )}

        {/* DONE */}
        {step === "done" && (
          <FadeIn key="done">
            <div className='flex flex-col items-center gap-4'>
              <h2 className="text-2xl text-dark-2 font-semibold tracking-wide">Thank you!</h2>
              <p className="text-lg font-medium text-[#6C7280]">
                Please Click Proceed for the next step
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    
        {/* Bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-[100] bg-transparent pointer-events-none md:px-9 px-13">
        <div className="relative h-24">
          {/* left/corner */}
          <div className="absolute left-6 md:left-0 bottom-8 pointer-events-auto">
            <BackButton />
          </div>

          {/* right/corner */}
          {step === "done" && (
            <div className="absolute right-6 md:right-0 bottom-8 pointer-events-auto">
              <ProceedButton />
            </div>
          )}
        </div>
      </div>


    </div>
  );
}

/** Small fade wrapper with slight scale for the center panel */
function FadeIn({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>;
}

export default TestPage
