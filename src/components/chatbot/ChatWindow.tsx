import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Loader2, ArrowLeft, Moon, Sun } from "lucide-react";
import { LeadForm } from "./LeadForm";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chatbot`;
const FORM_SUBMITTED_KEY = "divraweb_form_submitted";
const FORM_OFFERED_KEY = "divraweb_form_offered";
const MESSAGES_KEY = "divraweb_chat_messages";
const CHAT_THEME_KEY = "divraweb_chat_theme";

interface ChatWindowProps {
  onClose: () => void;
}

function hasSubmittedForm(): boolean {
  return localStorage.getItem(FORM_SUBMITTED_KEY) === "true";
}

function hasOfferedForm(): boolean {
  return localStorage.getItem(FORM_OFFERED_KEY) === "true";
}

function loadMessages(): Message[] {
  try {
    const saved = localStorage.getItem(MESSAGES_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [
    {
      role: "assistant",
      content:
        "Hi there! 👋 I'm Divyanshu's AI assistant. How can I help you today? Whether you need a website, web app, or just want to learn about our services — I'm here to help!",
    },
  ];
}

function loadChatTheme(): "light" | "dark" {
  return (localStorage.getItem(CHAT_THEME_KEY) as "light" | "dark") || "light";
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  const [chatTheme, setChatTheme] = useState<"light" | "dark">(loadChatTheme);
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(hasSubmittedForm);
  const [formOffered, setFormOffered] = useState(hasOfferedForm);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Persist messages
  useEffect(() => {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const toggleChatTheme = () => {
    const next = chatTheme === "dark" ? "light" : "dark";
    setChatTheme(next);
    localStorage.setItem(CHAT_THEME_KEY, next);
  };

  const isDark = chatTheme === "dark";

  // Theme classes scoped to chat only
  const bg = isDark ? "bg-[#1a1a2e]" : "bg-white";
  const headerBg = isDark ? "bg-[#16213e]" : "bg-primary";
  const headerText = isDark ? "text-gray-100" : "text-primary-foreground";
  const msgBg = isDark ? "bg-[#0f3460]" : "bg-secondary";
  const msgText = isDark ? "text-gray-200" : "text-secondary-foreground";
  const userBubble = isDark ? "bg-[#e94560] text-white" : "bg-primary text-primary-foreground";
  const inputBg = isDark ? "bg-[#16213e] text-gray-200 placeholder:text-gray-500" : "bg-secondary text-secondary-foreground placeholder:text-muted-foreground";
  const borderColor = isDark ? "border-[#0f3460]" : "border-border";
  const btnBg = isDark ? "bg-[#e94560] text-white" : "bg-primary text-primary-foreground";

  const offerForm = useCallback(() => {
    if (formSubmitted || formOffered) return;
    localStorage.setItem(FORM_OFFERED_KEY, "true");
    setFormOffered(true);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "I'd love to connect you with Divyanshu! Would you like to fill out a quick contact form so he can get back to you? Just reply **yes** or **no**.",
      },
    ]);
  }, [formSubmitted, formOffered]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    // Check if user is responding to form offer
    if (formOffered && !formSubmitted && !showForm) {
      const lower = text.toLowerCase();
      if (["yes", "yeah", "sure", "ok", "okay", "yep", "y"].some((w) => lower.includes(w))) {
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: text }]);
        setShowForm(true);
        return;
      }
      if (["no", "nah", "nope", "n", "not now", "later"].some((w) => lower.includes(w))) {
        setInput("");
        setMessages((prev) => [
          ...prev,
          { role: "user", content: text },
          { role: "assistant", content: "No problem! Feel free to ask me anything else. 😊" },
        ]);
        return;
      }
    }

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!resp.ok || !resp.body) throw new Error("Failed to get response");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Offer form once after a few messages, only if not already submitted/offered
      if (!formSubmitted && !formOffered && messages.length >= 3) {
        if (
          assistantSoFar.toLowerCase().includes("form") ||
          assistantSoFar.toLowerCase().includes("fill out") ||
          assistantSoFar.toLowerCase().includes("get back to you")
        ) {
          setTimeout(() => offerForm(), 1500);
        }
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I had trouble responding. Please try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSuccess = () => {
    localStorage.setItem(FORM_SUBMITTED_KEY, "true");
    setFormSubmitted(true);
    setShowForm(false);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Thank you! 🎉 Your details have been submitted. Divyanshu will reach out to you soon!",
      },
    ]);
  };

  if (showForm) {
    return (
      <div className={`flex flex-col h-full ${bg}`}>
        <div className={`flex items-center gap-3 px-4 py-3 border-b ${borderColor} ${headerBg} ${headerText}`}>
          <button onClick={() => setShowForm(false)} className="hover:opacity-70 transition-opacity">
            <ArrowLeft className="size-5" />
          </button>
          <div className="flex-1">
            <h3 className="font-medium text-sm">Get in Touch</h3>
            <p className="text-xs opacity-80">Fill out the form below</p>
          </div>
        </div>
        <LeadForm onSuccess={handleFormSuccess} chatTheme={chatTheme} />
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${bg}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${borderColor} ${headerBg} ${headerText}`}>
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
            D
          </div>
          <div>
            <h3 className="font-medium text-sm">Divraweb Assistant</h3>
            <p className="text-xs opacity-80">Typically replies instantly</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleChatTheme}
            className="size-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
            aria-label="Toggle chat theme"
          >
            {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
          </button>
          {!formSubmitted && (
            <button
              onClick={() => {
                if (!formOffered) {
                  offerForm();
                } else {
                  setShowForm(true);
                }
              }}
              className="text-xs px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              Contact Form
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? `${userBubble} rounded-br-md`
                  : `${msgBg} ${msgText} rounded-bl-md`
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className={`${msgBg} rounded-2xl rounded-bl-md px-4 py-2.5`}>
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className={`border-t ${borderColor} p-3`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className={`flex-1 ${inputBg} rounded-full px-4 py-2.5 text-sm outline-none border ${borderColor}`}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`size-10 rounded-full ${btnBg} flex items-center justify-center disabled:opacity-50 hover:opacity-90 transition-opacity`}
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
