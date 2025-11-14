# Slack Notifications Setup Guide

## Overview
Automatic Slack notifications are sent every time someone asks a question through the Antrop Bot.

## Setup Instructions

### 1. Create Slack Incoming Webhook

1. Go to https://api.slack.com/apps
2. Click **"Create New App"** → **"From scratch"**
3. Name it: **"Antrop Bot Notifier"**
4. Choose your workspace
5. Click **"Incoming Webhooks"** in the left sidebar
6. Toggle **"Activate Incoming Webhooks"** to **On**
7. Click **"Add New Webhook to Workspace"**
8. Choose channel: **#antrop-leads** (or create a new channel)
9. Click **"Allow"**
10. Copy the **Webhook URL** (looks like: `https://hooks.slack.com/services/T.../B.../XXX...`)

### 2. Add Environment Variable

Create a `.env.local` file in the project root with:

```bash
# Anthropic API Key (existing)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Resend API Key (existing - for contact form emails)
RESEND_API_KEY=your_resend_api_key_here

# Slack Webhook URL (NEW)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

**Important:** Never commit `.env.local` to Git!

### 3. Deploy to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add new variable:
   - **Name:** `SLACK_WEBHOOK_URL`
   - **Value:** Your webhook URL from step 1
   - **Environment:** Production, Preview, Development (select all)
4. Click **Save**
5. Redeploy your project

## What Gets Notified?

Every question sends a formatted message to Slack with:

- 🎯 **Lead Type**: Regular lead or Government/Procurement inquiry
- 📍 **Company Name**: The workplace entered
- 📝 **Question**: The need/question asked
- ⏰ **Timestamp**: When the question was asked (Swedish timezone)
- 🤖 **AI Response Summary**:
  - Greeting preview
  - Number of approach suggestions
  - Number of case examples
  - Public sector indicator (if applicable)

## Message Format Example

```
🎯 Ny Lead från Antrop Bot
━━━━━━━━━━━━━━━━━━━━
📍 Företag: Spotify AB
⏰ Tid: 2025-01-15 14:30

📝 Behov:
Vi behöver hjälp med att förbättra vår användarupplevelse

🤖 AI-svar sammanfattning:
• Greeting: Hej Spotify! Så här kan vi hjälpa er att förbättra er användarupplevelse...
• Förslag på aktiviteter: 3 st
• Case-exempel: 2 st
```

For government inquiries, you'll see:
```
🏛️ Ny Upphandlingsfråga
[...same format...]
• ⚠️ Offentlig sektor: Sara Nero-svar skickat
```

## Testing

To test if notifications work:

1. Start your development server: `npm run dev`
2. Go to http://localhost:3000
3. Fill in the form with test data
4. Submit the question
5. Check your Slack channel for the notification

## Troubleshooting

### No notifications appearing?

1. **Check webhook URL**: Make sure it's correctly set in `.env.local`
2. **Restart dev server**: Environment variables require restart
3. **Check Vercel logs**: On production, check deployment logs for errors
4. **Verify channel**: Make sure the webhook is connected to the right channel

### Notifications showing but look wrong?

1. Check the console logs for any errors
2. The notification is "fire-and-forget" - it won't block the user if Slack fails

### Need to change the channel?

1. Go back to https://api.slack.com/apps
2. Select your app
3. Go to "Incoming Webhooks"
4. Delete the old webhook
5. Add a new one to the desired channel
6. Update your environment variables

## Optional: Customize Messages

To customize the Slack message format, edit:
`app/api/slack-notify/route.ts`

The `formatSlackMessage()` function controls the message structure.

## Support

For questions or issues with Slack setup, contact your dev team or check Slack API docs: https://api.slack.com/messaging/webhooks

