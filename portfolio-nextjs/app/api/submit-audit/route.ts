import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { auditSections } from '@/lib/audit-data';

const resend = new Resend(process.env.RESEND_API_KEY);

// Map question IDs to their full questions
const getQuestionDetails = (questionId: string) => {
  for (const section of auditSections) {
    const question = section.questions.find(q => q.id === questionId);
    if (question) {
      return {
        sectionTitle: section.title,
        question: question.question,
        value: question.options.length - 1, // max value
      };
    }
  }
  return null;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contact, answers, totalScore, tier } = body;

    console.log('Submitting audit for:', contact.email); // Debug log

    // Calculate section scores
    const sections = [
      { id: 'reporting', name: 'Client Reporting', questions: ['q1', 'q2', 'q3'] },
      { id: 'delivery', name: 'Service Delivery', questions: ['q4', 'q5', 'q6'] },
      { id: 'onboarding', name: 'Client Onboarding', questions: ['q7', 'q8', 'q9'] },
      { id: 'growth', name: 'Business Growth', questions: ['q10', 'q11', 'q12'] },
    ];

    const sectionScores = sections.map(section => {
      const score = section.questions.reduce((sum, q) => sum + (answers[q] ?? 0), 0);
      return { name: section.name, score, max: section.questions.length * 2 };
    });

    // Email to the user
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #0a1f27; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #163d48 0%, #2e7d8f 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .score-box { background: white; border: 2px solid #2e7d8f; border-radius: 10px; padding: 20px; margin: 20px 0; text-align: center; }
            .score-number { font-size: 48px; font-weight: bold; color: #163d48; }
            .tier-badge { display: inline-block; padding: 10px 20px; background: #2e7d8f; color: white; border-radius: 20px; font-weight: bold; margin: 10px 0; }
            .section { background: white; border-left: 4px solid #2e7d8f; padding: 15px; margin: 10px 0; border-radius: 5px; }
            .section-name { font-weight: bold; color: #163d48; margin-bottom: 5px; }
            .section-score { color: #2e7d8f; font-weight: bold; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #2e7d8f 0%, #163d48 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your Agency Operations Audit Results</h1>
              <p>Thank you for completing the assessment, ${contact.name}!</p>
            </div>
            <div class="content">
              <div class="score-box">
                <div class="score-number">${totalScore}/24</div>
                <div class="tier-badge">${tier.label}</div>
                <p style="color: #476b76; margin-top: 15px;">${tier.description}</p>
              </div>

              <h2 style="color: #163d48; margin-top: 30px;">Your Information</h2>
              <div class="section">
                <div style="margin-bottom: 10px;"><strong style="color: #163d48;">Name:</strong> ${contact.name}</div>
                <div style="margin-bottom: 10px;"><strong style="color: #163d48;">Agency:</strong> ${contact.agency}</div>
                ${contact.linkedinUrl ? `<div style="margin-bottom: 10px;"><strong style="color: #163d48;">LinkedIn:</strong> <a href="${contact.linkedinUrl}" style="color: #2e7d8f; text-decoration: none;">${contact.linkedinUrl}</a></div>` : ''}
              </div>

              <h2 style="color: #163d48; margin-top: 30px;">Section Breakdown</h2>
              ${sectionScores.map(section => `
                <div class="section">
                  <div class="section-name">${section.name}</div>
                  <div class="section-score">${section.score}/${section.max} points</div>
                </div>
              `).join('')}

              <h2 style="color: #163d48; margin-top: 30px;">Next Steps</h2>
              <p>${tier.recommendation}</p>

              <div style="text-align: center;">
                <a href="https://cal.com/muhammad-usman-ops/free-operations-audit" class="cta-button">
                  📅 Book Your Free 30-Min Audit Call
                </a>
              </div>

              <p style="margin-top: 30px;">During this call, we'll:</p>
              <ul>
                <li>Map your current workflow and identify bottlenecks</li>
                <li>Show you exactly how to eliminate manual work</li>
                <li>Provide tactical insights you can implement immediately</li>
                <li>Create a roadmap to eliminate operational bottlenecks</li>
              </ul>
            </div>
            <div class="footer">
              <p><strong>Muhammad Usman</strong> - Agency Operations Automation Expert</p>
              <p>Helping agencies eliminate 40+ hours/week of manual work</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email to you (admin notification)
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #0a1f27; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #163d48; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #2e7d8f; }
            .label { font-weight: bold; color: #163d48; display: inline-block; width: 120px; }
            .section { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 New Audit Submission</h1>
            </div>
            <div class="content">
              <h2>Contact Information</h2>
              <div class="info-box">
                <div><span class="label">Name:</span> ${contact.name}</div>
                <div><span class="label">Agency:</span> ${contact.agency}</div>
                <div><span class="label">Email:</span> <a href="mailto:${contact.email}">${contact.email}</a></div>
                ${contact.linkedinUrl ? `<div><span class="label">LinkedIn:</span> <a href="${contact.linkedinUrl}" style="color: #2e7d8f; text-decoration: none;" target="_blank">${contact.linkedinUrl}</a></div>` : ''}
              </div>

              <h2>Results Summary</h2>
              <div class="info-box">
                <div><span class="label">Total Score:</span> ${totalScore}/24</div>
                <div><span class="label">Tier:</span> ${tier.label}</div>
              </div>

              <h2>Section Scores</h2>
              ${sectionScores.map(section => `
                <div class="section">
                  <strong>${section.name}:</strong> ${section.score}/${section.max} points
                </div>
              `).join('')}

              <h2>Detailed Answers</h2>
              ${Object.entries(answers).map(([questionId, value]) => {
                const details = getQuestionDetails(questionId);
                if (!details) return '';
                
                const scoreLabel = value === 2 ? '✅ Fully Automated' : value === 1 ? '⚠️ Partially Automated' : '❌ Manual';
                
                return `
                  <div class="section">
                    <div style="color: #163d48; font-weight: bold; margin-bottom: 8px;">
                      ${details.sectionTitle}
                    </div>
                    <div style="color: #476b76; margin-bottom: 8px; font-size: 14px;">
                      ${details.question}
                    </div>
                    <div style="color: #2e7d8f; font-weight: bold;">
                      ${scoreLabel} (${value}/2 points)
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </body>
      </html>
    `;

    console.log('Sending email to user:', contact.email);

    // TEMPORARY: Using resend.dev while custom domain is being verified
    // Once muhammad-usman-ops.vercel.app is verified in Resend, switch to:
    // from: 'Muhammad Usman <noreply@muhammad-usman-ops.vercel.app>'
    
    // Send email to the user
    const userEmailResult = await resend.emails.send({
      from: 'Muhammad Usman <onboarding@resend.dev>',
      // from: 'Muhammad Usman <noreply@muhammad-usman-ops.vercel.app>', // Use this after domain verification
      to: contact.email,
      subject: `Your Agency Operations Audit Results - ${totalScore}/24`,
      html: userEmailHtml,
    });

    console.log('User email result:', userEmailResult);

    console.log('Sending email to admin: shanisticdev@gmail.com');

    // Send notification to you
    const adminEmailResult = await resend.emails.send({
      from: 'Audit System <onboarding@resend.dev>',
      // from: 'Audit System <audit@muhammad-usman-ops.vercel.app>', // Use this after domain verification
      to: 'shanisticdev@gmail.com',
      subject: `New Audit Submission: ${contact.name} (${contact.agency}) - ${totalScore}/24`,
      html: adminEmailHtml,
    });

    console.log('Admin email result:', adminEmailResult);

    return NextResponse.json({ 
      success: true,
      userEmail: userEmailResult,
      adminEmail: adminEmailResult
    });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send emails', details: error },
      { status: 500 }
    );
  }
}
