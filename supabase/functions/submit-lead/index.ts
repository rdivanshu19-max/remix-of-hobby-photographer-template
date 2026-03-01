import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, country, city, business, project_description } = await req.json();

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Store lead in database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from("leads").insert({
      name, email, country, city, business, project_description,
    });

    if (dbError) {
      console.error("DB error:", dbError);
      throw new Error("Failed to save lead");
    }

    // Send email notification via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #eee; padding-bottom: 10px;">🎯 New Lead from Divraweb</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 8px 12px; font-weight: bold; color: #555; width: 140px;">Name</td><td style="padding: 8px 12px;">${name}</td></tr>
            <tr style="background: #f9f9f9;"><td style="padding: 8px 12px; font-weight: bold; color: #555;">Email</td><td style="padding: 8px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 12px; font-weight: bold; color: #555;">Country</td><td style="padding: 8px 12px;">${country || "Not provided"}</td></tr>
            <tr style="background: #f9f9f9;"><td style="padding: 8px 12px; font-weight: bold; color: #555;">City</td><td style="padding: 8px 12px;">${city || "Not provided"}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: bold; color: #555;">Business</td><td style="padding: 8px 12px;">${business || "Not provided"}</td></tr>
            <tr style="background: #f9f9f9;"><td style="padding: 8px 12px; font-weight: bold; color: #555;">Project</td><td style="padding: 8px 12px;">${project_description || "Not provided"}</td></tr>
          </table>
          <p style="margin-top: 20px; color: #888; font-size: 12px;">Sent from Divraweb AI Assistant</p>
        </div>
      `;

      try {
        const emailResp = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Divraweb <onboarding@resend.dev>",
            to: ["divyanshurathore2806@gmail.com"],
            subject: `New Lead: ${name} - ${business || "No business"}`,
            html: emailHtml,
          }),
        });
        
        if (!emailResp.ok) {
          const errText = await emailResp.text();
          console.error("Resend error:", errText);
        } else {
          console.log("Email sent successfully");
        }
      } catch (emailErr) {
        console.error("Email send failed:", emailErr);
      }
    } else {
      console.warn("RESEND_API_KEY not configured, skipping email");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Lead submitted successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("submit-lead error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
