# Email Setup Guide for Audit Form

## Steps to Set Up Email Notifications

### 1. Install Dependencies
```bash
npm install resend
```

### 2. Create a Resend Account
1. Go to https://resend.com
2. Sign up for a free account
3. Verify your email address
4. Get your API key from the dashboard

### 3. Configure Environment Variables
1. Open the `.env.local` file (already created)
2. Replace `your_resend_api_key_here` with your actual Resend API key:
   ```
   RESEND_API_KEY=re_123abc456def...
   ```

### 4. Update Email Addresses
1. Open `app/api/submit-audit/route.ts`
2. Find this line (around line 140):
   ```typescript
   to: 'your-email@example.com',
   ```
3. Replace with your actual email address where you want to receive notifications

### 5. Set Up Custom Domain (Optional but Recommended)
By default, Resend uses `onboarding@resend.dev` as the sender. To use your own domain:

1. Go to Resend Dashboard → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records Resend provides to your domain's DNS settings
5. Wait for verification (usually 1-5 minutes)
6. Update the `from` addresses in `route.ts`:
   ```typescript
   from: 'Muhammad Usman <noreply@yourdomain.com>'
   ```

### 6. Test the System
1. Start your development server:
   ```bash
   npm run dev
   ```
2. Navigate to `/audit`
3. Complete the audit form
4. Check both emails:
   - User receives their results
   - You receive a notification with their details

### 7. Email Deliverability Tips
- Use a verified domain for better deliverability
- Keep the free tier limit in mind: 100 emails/day
- Check spam folders if emails don't arrive
- Consider upgrading to a paid plan if you need more emails

## What Gets Sent

### To the User:
- ✅ Their total score and tier
- ✅ Section breakdown
- ✅ Personalized recommendations
- ✅ Call-to-action to book a call
- ✅ Professional branded design

### To You (Admin):
- ✅ Contact information
- ✅ Complete audit results
- ✅ All section scores
- ✅ Detailed answers
- ✅ Quick overview for follow-up

## Troubleshooting

### Emails Not Sending?
1. Check your API key is correct in `.env.local`
2. Restart your dev server after adding the API key
3. Check the console for error messages
4. Verify your Resend account is active

### Emails Going to Spam?
1. Verify your domain with Resend
2. Set up SPF, DKIM, and DMARC records
3. Avoid spam trigger words in subject lines
4. Use a professional sender address

### Need Help?
- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com

## Alternative Email Services

If you prefer a different service, you can modify the API route:

### SendGrid
```bash
npm install @sendgrid/mail
```

### Nodemailer (Gmail)
```bash
npm install nodemailer
```

### AWS SES
```bash
npm install @aws-sdk/client-ses
```

The API route structure remains the same; just swap the email sending logic.
