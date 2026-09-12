export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-navy/10 border-y border-navy/10">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="cursor-pointer list-none font-display text-lg font-semibold text-navy marker:content-none">
            <span className="flex items-start justify-between gap-4">
              {item.question}
              <span aria-hidden="true" className="text-gold group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-navy/85">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
