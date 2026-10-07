/** Renders text where `backtick` segments are shown as inline code. */
export function FixText({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, index) =>
        index % 2 === 1 ? (
          <code key={index} className="break-words rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[12.5px] text-zinc-100">
            {part}
          </code>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}
