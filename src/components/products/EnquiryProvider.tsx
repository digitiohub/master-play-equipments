"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { createContext, useCallback, useContext, useState } from "react";
import { X } from "lucide-react";
import { EnquiryForm } from "./EnquiryForm";
import { site, waLink } from "@/lib/site";
import { MessageCircle, Phone } from "lucide-react";

const Ctx = createContext<{ open: (product?: string) => void }>({ open: () => {} });
export const useEnquiry = () => useContext(Ctx);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ open: boolean; product: string; n: number }>({ open: false, product: "", n: 0 });
  const open = useCallback((product = "") => setState((s) => ({ open: true, product, n: s.n + 1 })), []);
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <Dialog.Root open={state.open} onOpenChange={(o) => setState((s) => ({ ...s, open: o }))}>
        <Dialog.Portal>
          <Dialog.Overlay className="overlay fixed inset-0 z-[80] bg-navy-deep/70 backdrop-blur-[2px]" />
          <Dialog.Content aria-describedby={undefined} className="drawer fixed inset-y-0 right-0 z-[81] flex w-full max-w-[34rem] flex-col overflow-y-auto bg-paper shadow-2xl">
            <div className="flex items-start justify-between gap-4 bg-navy px-6 py-6 text-white sm:px-9">
              <div>
                <p className="eyebrow text-lime">Quick enquiry</p>
                <Dialog.Title className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">{state.product ? <>Enquire about <span className="text-orange">{state.product}</span></> : "Request a quotation"}</Dialog.Title>
              </div>
              <Dialog.Close aria-label="Close enquiry form" className="grid size-10 shrink-0 place-items-center rounded-full border border-white/25 transition hover:bg-orange hover:text-navy-deep"><X className="size-5" /></Dialog.Close>
            </div>
            <div className="flex-1 px-6 py-8 sm:px-9">
              <EnquiryForm key={state.n} compact defaultProduct={state.product} source={state.product ? `drawer:${state.product}` : "drawer"} />
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-navy/10 pt-6 text-sm">
                <a className="inline-flex items-center gap-2 font-medium text-navy hover:text-orange-ink" href={site.phoneHref}><Phone className="size-4" aria-hidden />{site.phone}</a>
                <a className="inline-flex items-center gap-2 font-medium text-navy hover:text-orange-ink" target="_blank" rel="noopener noreferrer" href={waLink(state.product ? `Hello Master Play Equipments, I'd like to enquire about: ${state.product}` : undefined)}><MessageCircle className="size-4" aria-hidden />WhatsApp</a>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Ctx.Provider>
  );
}
