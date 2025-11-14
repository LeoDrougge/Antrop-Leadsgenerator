import { NextRequest, NextResponse } from 'next/server';

interface SlackNotificationPayload {
  workplace: string;
  need: string;
  response: {
    greeting: string;
    understanding: string;
    approach: { title: string; description: string }[];
    caseExamples: { name: string; description: string; url: string }[];
    nextSteps: { title: string; description: string }[];
    closing: string;
    hideContactForm?: boolean;
  };
  timestamp?: string;
}

function formatSlackMessage(data: SlackNotificationPayload): object {
  const { workplace, need, response, timestamp } = data;
  
  // Check if this is a public sector inquiry
  const isPublicSector = response.hideContactForm === true;
  
  // Format timestamp in Swedish timezone
  const time = timestamp 
    ? new Date(timestamp).toLocaleString('sv-SE', { 
        timeZone: 'Europe/Stockholm',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    : new Date().toLocaleString('sv-SE', { 
        timeZone: 'Europe/Stockholm',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });

  // Truncate greeting for preview
  const greetingPreview = response.greeting.length > 100 
    ? response.greeting.substring(0, 100) + '...'
    : response.greeting;

  // Build message blocks
  const blocks = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: isPublicSector ? '🏛️ Ny Upphandlingsfråga' : '🎯 Ny Lead från Antrop Bot',
        emoji: true
      }
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*📍 Företag:*\n${workplace}`
        },
        {
          type: 'mrkdwn',
          text: `*⏰ Tid:*\n${time}`
        }
      ]
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*📝 Behov:*\n${need}`
      }
    },
    {
      type: 'divider'
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*🤖 AI-svar sammanfattning:*`
      }
    }
  ];

  // Add response summary
  const summaryItems = [
    `• *Greeting:* ${greetingPreview.replace(/^>/, '')}`,
    `• *Förslag på aktiviteter:* ${response.approach.length} st`,
    `• *Case-exempel:* ${response.caseExamples.length} st`
  ];

  if (isPublicSector) {
    summaryItems.push(`• *⚠️ Offentlig sektor:* Sara Nero-svar skickat`);
  }

  blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: summaryItems.join('\n')
    }
  });

  return {
    blocks,
    text: `Ny lead från ${workplace}: ${need.substring(0, 50)}...` // Fallback text
  };
}

export async function POST(request: NextRequest) {
  try {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn('SLACK_WEBHOOK_URL not configured, skipping notification');
      return NextResponse.json(
        { message: 'Slack webhook not configured' },
        { status: 200 }
      );
    }

    const payload: SlackNotificationPayload = await request.json();

    if (!payload.workplace || !payload.need || !payload.response) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format message for Slack
    const slackMessage = formatSlackMessage(payload);

    // Send to Slack
    const slackResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    });

    if (!slackResponse.ok) {
      const errorText = await slackResponse.text();
      console.error('Slack webhook failed:', errorText);
      return NextResponse.json(
        { error: 'Failed to send Slack notification', details: errorText },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error sending Slack notification:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}

