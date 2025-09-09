"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
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
// import { Input } from "@/components/ui/input"
import arrowLeft from '../../public/icons/arrowLeft.svg';
import arrowRight from '../../public/icons/arrowRight.svg'
import axios from 'axios';
import Link from 'next/link'


const ENDPOINT = "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne";


function BackCorner() {
  return (
    <Link
      href="/"
      className="fixed left-9 bottom-8 flex items-center text-sm font-semibold uppercase tracking-wide text-dark-2 group"
    >
      {/* diamond */}
      <div
        className="diamond-44 grid place-items-center transition-transform duration-300
                   group-hover:scale-110"
      >
        {/* arrow */}
        <span
          className="-rotate-45 text-sm leading-none transition-transform duration-300
                     group-hover:scale-90"
        >
          <Image src={arrowLeft} alt="" />
        </span>
      </div>

      <span className="ml-6">Back</span>
    </Link>
  );
}


function ProceedCorner() {
  return (
    <div className="fixed right-9 bottom-8 flex items-center text-sm font-semibold uppercase tracking-wide text-dark-2 group">
      <span className="mr-6">Proceed</span>
      <Link href="/result">
        <div className="diamond-44 grid place-items-center transition-transform duration-300
                   group-hover:scale-110">
          <span className="-rotate-45 leading-none transition-transform duration-300
                     group-hover:scale-90">
            <Image
              src={arrowRight}
              alt=""
            />
          </span>
        </div>
      </Link>
    </div>
  );
}


const TestPage = () => {

  // const navigate = useNavigate();

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

      // Simulate a small delay to see the loader
      await new Promise((r) => setTimeout(r, 1000));
      setStep("done");
    }

    catch (err) {
      console.error("Error submitting city:", err);
      setStep("done"); // fallback to done state for demo
    }
  }

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* BG diamonds */}
      {/* <DottedDiamonds /> */}

      {/* Top-left small label */}
      <div className="fixed top-16 left-9">
        <p className="font-semibold text-[12px]">TO START ANALYSIS</p>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center mb-40 w-full h-full">
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
            <div className="mx-auto grid place-items-center">
              <div className="diamond dotted size-[520px] rotate-45 mb-10" />
            </div>
            <p className=" flex items-center justify-center text-sm text-[#6C7280]">Processing submission</p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="dot" />
              <span className="dot animation-delay-100" />
              <span className="dot animation-delay-200" />
            </div>
          </FadeIn>
        )}

        {/* DONE */}
        {step === "done" && (
          <FadeIn key="done">
            <div className='flex flex-col items-center gap-4'>
              <h2 className="text-2xl text-dark-2 font-semibold tracking-wide">Thank you!</h2>
              <p className="text-lg font-medium text-[#6C7280]">
                Please Click Proceed
              </p>

            </div>
            <ProceedCorner />
          </FadeIn>
        )}
      </div>

      {/* Back corner always visible */}
      <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
        <BackCorner />
      </div>

      {/* OPTIONAL: If you want a visible “Next” button for typing-less flows: */}
      {step === "name" && (
        <button
          onClick={nameForm.handleSubmit(submitName)}
          className="sr-only"
          aria-hidden
        />
      )}
      {step === "city" && (
        <button
          onClick={cityForm.handleSubmit(submitCity)}
          className="sr-only"
          aria-hidden
        />
      )}
    </div>
  );
}

/** Small fade wrapper with slight scale for the center panel */
function FadeIn({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>;
}

export default TestPage
