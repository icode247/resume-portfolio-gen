"use server"

import { Resend } from "resend"
import { addNewsletterSubscriber } from "./database"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToNewsletter(email: string) {
  try {
    // Add to Firestore database
    await addNewsletterSubscriber(email, "website")

    // Send welcome email using Resend
    const { data, error } = await resend.emails.send({
      from: "DevFolio <notifications@resend.dev>",
      to: email,
      subject: "🚀 Welcome to DevFolio - Transform Your GitHub Into a Professional Resume!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to DevFolio</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin-bottom: 10px;">Welcome to DevFolio! 🎉</h1>
            <p style="font-size: 18px; color: #666;">Transform your GitHub profile into a professional resume</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1e293b; margin-top: 0;">What's Next?</h2>
            <ul style="padding-left: 20px;">
              <li style="margin-bottom: 8px;">📊 <strong>Connect your GitHub</strong> - Import your repositories and contributions</li>
              <li style="margin-bottom: 8px;">🎨 <strong>Generate your resume</strong> - AI-powered content creation</li>
              <li style="margin-bottom: 8px;">💼 <strong>Build your portfolio</strong> - Showcase your best projects</li>
              <li style="margin-bottom: 8px;">📤 <strong>Share & download</strong> - Get hired faster</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/generate" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Get Started Now</a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
            <h3 style="color: #1e293b;">What You'll Receive:</h3>
            <ul style="padding-left: 20px; color: #666;">
              <li>💡 Career tips and best practices</li>
              <li>🔥 Job opportunities from top companies</li>
              <li>🛠️ Developer tools and resources</li>
              <li>📈 Industry insights and trends</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #666; font-size: 14px;">
            <p>Thanks for joining our community of developers!</p>
            <p>Best regards,<br><strong>The DevFolio Team</strong></p>
            <p style="margin-top: 20px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #666; text-decoration: none;">Unsubscribe</a> | 
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/preferences?email=${encodeURIComponent(email)}" style="color: #666; text-decoration: none;">Update Preferences</a>
            </p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      throw new Error("Failed to send welcome email")
    }

    console.log("Welcome email sent successfully:", data)
    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    throw new Error("Failed to subscribe to newsletter")
  }
}

export async function sendResumeGeneratedEmail(email: string, resumeUrl: string, resumeTitle: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "DevFolio <notifications@resend.dev>",
      to: email,
      subject: "✅ Your Resume is Ready!",
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #16a34a;">Your Resume is Ready! ✅</h1>
            <p style="font-size: 18px; color: #666;">Your professional resume "${resumeTitle}" has been generated successfully</p>
          </div>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #16a34a;">
            <h2 style="color: #15803d; margin-top: 0;">What's included:</h2>
            <ul style="padding-left: 20px;">
              <li>📄 Professional resume with your GitHub data</li>
              <li>🎨 Clean, ATS-friendly design</li>
              <li>💼 Highlighted projects and skills</li>
              <li>📱 Mobile-responsive portfolio</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resumeUrl}" style="background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 10px;">View Resume</a>
            <a href="${resumeUrl}?download=true" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Download PDF</a>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #666; font-size: 14px;">
            <p>Ready to land your dream job? Share your resume with potential employers!</p>
            <p>Best regards,<br><strong>The DevFolio Team</strong></p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      throw new Error("Failed to send resume notification email")
    }

    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error("Resume email error:", error)
    throw new Error("Failed to send resume notification")
  }
}
