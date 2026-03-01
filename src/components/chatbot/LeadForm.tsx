import { useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LeadFormProps {
  onSuccess: () => void;
  chatTheme?: "light" | "dark";
}

export function LeadForm({ onSuccess, chatTheme = "light" }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    city: "",
    business: "",
    project_description: "",
  });

  const isDark = chatTheme === "dark";

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("submit-lead", {
        body: form,
      });
      if (error) throw error;
      onSuccess();
    } catch (err) {
      console.error("Lead submit error:", err);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = isDark
    ? "w-full bg-[#16213e] text-gray-200 rounded-lg px-3 py-2 text-sm outline-none placeholder:text-gray-500 border border-[#0f3460] focus:ring-2 focus:ring-[#e94560]"
    : "w-full bg-secondary rounded-lg px-3 py-2 text-sm outline-none placeholder:text-muted-foreground border border-border focus:ring-2 focus:ring-ring";

  const labelClass = isDark ? "text-xs font-medium text-gray-400 mb-1 block" : "text-xs font-medium text-muted-foreground mb-1 block";

  return (
    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-3">
      <div>
        <label className={labelClass}>
          Name <span className="text-red-500">*</span>
        </label>
        <input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" className={inputClass} maxLength={100} />
      </div>
      <div>
        <label className={labelClass}>
          Email <span className="text-red-500">*</span>
        </label>
        <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="your@email.com" className={inputClass} maxLength={255} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Country</label>
          <input value={form.country} onChange={(e) => update("country", e.target.value)} placeholder="Country" className={inputClass} maxLength={100} />
        </div>
        <div>
          <label className={labelClass}>City</label>
          <input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="City" className={inputClass} maxLength={100} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Business</label>
        <input value={form.business} onChange={(e) => update("business", e.target.value)} placeholder="Your business or company name" className={inputClass} maxLength={200} />
      </div>
      <div>
        <label className={labelClass}>What do you want to build?</label>
        <textarea value={form.project_description} onChange={(e) => update("project_description", e.target.value)} placeholder="Tell us about your project..." className={`${inputClass} min-h-[80px] resize-none`} maxLength={1000} />
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !form.name.trim() || !form.email.trim()}
        className={`w-full rounded-lg py-2.5 text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 ${isDark ? "bg-[#e94560] text-white" : "bg-primary text-primary-foreground"}`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}
