"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";

type LineKind = "input" | "output" | "accent" | "error" | "muted";
type Line = { id: number; kind: LineKind; text: string };
type HackerTerminalProps = { open: boolean; onClose: () => void; onQuote: () => void };

const PROMPT = `guest@${siteConfig.terminalHost}:~$`;
const COMMANDS = ["help", "whoami", "ls", "services", "cat", "contact", "quote", "date", "history", "clear", "exit"];
const FILES = [...services.map((service) => service.value), "quote.sh"];
const HELP: [string, string][] = [
  ["help", "show available commands"],
  ["whoami", "who are you, really?"],
  ["ls", "list service files"],
  ["cat <service>", "read about a service"],
  ["services", "everything we test"],
  ["contact", "how to reach a human"],
  ["quote", "request a quote"],
  ["history", "show previous commands"],
  ["clear", "clear the screen"],
  ["exit", "close the terminal"],
];

let nextLineId = 0;
function makeLine(kind: LineKind, text: string): Line {
  nextLineId += 1;
  return { id: nextLineId, kind, text };
}

function welcome() {
  return [
    makeLine("accent", `${siteConfig.name} — interactive terminal`),
    makeLine("muted", "Curious? Good. Type 'help' to list commands. Press Esc to leave."),
  ];
}

export function HackerTerminal({ open, onClose, onQuote }: HackerTerminalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>(welcome);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [lines]);

  function run(input: string) {
    const [command = "", ...args] = input.split(/\s+/);
    const output: Line[] = [makeLine("input", input)];

    switch (command.toLowerCase()) {
      case "":
        break;
      case "help":
        HELP.forEach(([name, description]) => output.push(makeLine("output", `${name.padEnd(15)} ${description}`)));
        break;
      case "whoami":
        output.push(makeLine("output", "guest — a curious visitor. We like curious."));
        break;
      case "ls":
        output.push(makeLine("output", FILES.map((file) => (file.endsWith(".sh") ? file : `${file}/`)).join("  ")));
        break;
      case "services":
        services.forEach((service) =>
          output.push(
            makeLine("accent", `${service.number} ▸ ${service.name}`),
            makeLine("output", `   ${service.items.map((item) => item.label).join(" · ")}`),
          ),
        );
        break;
      case "cat": {
        const target = (args[0] ?? "").replace(/\/+$/, "").toLowerCase();
        const service = services.find((item) => item.value === target);
        if (!target) output.push(makeLine("error", "usage: cat <service>   (tip: run 'ls' first)"));
        else if (target === "quote.sh") output.push(makeLine("output", "#!/bin/sh\n# Free scoping and a quote. Run: quote"));
        else if (!service) output.push(makeLine("error", `cat: ${target}: No such file or directory`));
        else {
          output.push(makeLine("accent", service.name), makeLine("output", service.summary));
          service.items.forEach((item) => output.push(makeLine("output", `  — ${item.label}`)));
        }
        break;
      }
      case "contact":
        output.push(
          makeLine("output", `phone  ${siteConfig.phone.display}`),
          makeLine("output", `email  ${siteConfig.email}`),
        );
        break;
      case "quote":
      case "./quote.sh":
        output.push(makeLine("accent", "Launching quote request…"));
        window.setTimeout(onQuote, 400);
        break;
      case "date":
        output.push(makeLine("output", new Date().toString()));
        break;
      case "history":
        if (!history.length) output.push(makeLine("muted", "No commands yet."));
        history.forEach((entry, index) => output.push(makeLine("output", `${String(index + 1).padStart(4)}  ${entry}`)));
        break;
      case "exit":
        onClose();
        break;
      case "sudo":
        output.push(makeLine("error", "guest is not in the sudoers file. This incident will be reported. 😉"));
        break;
      case "rm":
        output.push(makeLine("error", "rm: permission denied. Nice try."));
        break;
      default:
        output.push(makeLine("error", `command not found: ${command}. Type 'help' for available commands.`));
    }
    setLines((current) => [...current, ...output].slice(-300));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = value.trim();
    if (input.toLowerCase() === "clear") setLines([]);
    else run(input);
    if (input) setHistory((current) => [...current, input].slice(-50));
    setHistoryIndex(-1);
    setValue("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp" && history.length) {
      event.preventDefault();
      const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setValue(history[next]);
    } else if (event.key === "ArrowDown" && historyIndex !== -1) {
      event.preventDefault();
      const next = historyIndex + 1;
      setHistoryIndex(next >= history.length ? -1 : next);
      setValue(next >= history.length ? "" : history[next]);
    } else if (event.key === "Tab" && value.trim()) {
      const [first, ...rest] = value.toLowerCase().split(/\s+/);
      const options =
        rest.length === 0 ? COMMANDS.filter((item) => item.startsWith(first)) : first === "cat" && rest.length === 1
          ? FILES.filter((file) => file.startsWith(rest[0])).map((file) => `cat ${file}`)
          : [];
      if (options.length === 1) {
        event.preventDefault();
        setValue(rest.length === 0 ? `${options[0]} ` : options[0]);
      }
    } else if (event.key.toLowerCase() === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="terminal-dialog"
      data-lenis-prevent
      aria-label={`${siteConfig.name} terminal`}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
        else if (!window.getSelection()?.toString()) inputRef.current?.focus();
      }}
    >
      <div className="terminal-bar">
        <div className="terminal-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>guest@{siteConfig.terminalHost} — sh</span>
        <button type="button" className="terminal-close" onClick={onClose} aria-label="Close terminal">
          esc
        </button>
      </div>
      <div className="terminal-output" ref={outputRef} role="log" aria-live="polite">
        {lines.map((entry) => (
          <div key={entry.id} className={`terminal-line is-${entry.kind}`}>
            {entry.kind === "input" && <span className="terminal-prompt">{PROMPT} </span>}
            {entry.text}
          </div>
        ))}
      </div>
      <form className="terminal-form" onSubmit={submit}>
        <span className="terminal-prompt" aria-hidden="true">{PROMPT}</span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Terminal command"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          maxLength={120}
        />
      </form>
    </dialog>
  );
}
