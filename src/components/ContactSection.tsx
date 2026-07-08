"use client";

import { CONTACTS, contactItems } from "@/data/contacts";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function ContactSection() {
  return (
    <section id="contacts" className="py-24">
      <div className="section-shell">
        <Reveal>
          <div className="glass-panel relative overflow-hidden rounded-[28px] p-8 sm:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(110,231,249,0.18),transparent_32%),radial-gradient(circle_at_82%_65%,rgba(188,167,255,0.14),transparent_34%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div>
                <p className="mb-3 text-sm font-medium text-cyan-100/80">Контакты</p>
                <h2 className="font-display text-3xl font-semibold tracking-normal text-white sm:text-5xl">
                  Открыт к junior, trainee, технической поддержке, QA и автоматизации.
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                  Интересны задачи, где важны внимательность, техническое мышление, работа с
                  логикой продукта и готовность быстро разбираться в новых инструментах.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {contactItems.map((contact) =>
                  contact.type === "email" ? (
                    <a
                      key={contact.label}
                      href={contact.href}
                      aria-label={`Отправить письмо на ${CONTACTS.email}`}
                      className="inline-flex w-full items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.055] px-5 py-4 text-left font-semibold text-white transition hover:border-cyan-200/40 hover:bg-white/10"
                    >
                      {contact.label}
                      <ArrowUpRight size={18} />
                    </a>
                  ) : (
                    <a
                      key={contact.label}
                      href={contact.href}
                      aria-label={`Открыть ${contact.label}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.055] px-5 py-4 font-semibold text-white transition hover:border-cyan-200/40 hover:bg-white/10"
                    >
                      {contact.label}
                      <ArrowUpRight size={18} />
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
