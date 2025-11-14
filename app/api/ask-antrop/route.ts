import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import antropContent from '@/antrop-content.json';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Swedish government agencies and organizations
const GOVERNMENT_AGENCIES = [
  'affärsverket svenska kraftnät',
  'allmänna reklamationsnämnden',
  'arbetsdomstolen',
  'arbetsförmedlingen',
  'arbetsgivarverket',
  'arbetsmiljöverket',
  'barnombudsmannen',
  'blekinge tekniska högskola',
  'bokföringsnämnden',
  'bolagsverket',
  'boverket',
  'brottsförebyggande rådet',
  'brottsoffermyndigheten',
  'centrala studiestödsnämnden',
  'diskrimineringsombudsmannen',
  'domarnämnden',
  'domstolsverket',
  'e-hälsomyndigheten',
  'ekobrottsmyndigheten',
  'ekonomistyrningsverket',
  'elsäkerhetsverket',
  'energimarknadsinspektionen',
  'etikprövningsmyndigheten',
  'exportkreditnämnden',
  'fastighetsmäklarinspektionen',
  'finansinspektionen',
  'finanspolitiska rådet',
  'folke bernadotteakademin',
  'folkhälsomyndigheten',
  'forskningsrådet för hälsa, arbetsliv och välfärd',
  'forskningsrådet för miljö, areella näringar och samhällsbyggande',
  'fortifikationsverket',
  'forum för levande historia',
  'försvarets materielverk',
  'försvarets radioanstalt',
  'försvarsexportmyndigheten',
  'försvarshögskolan',
  'försvarsmakten',
  'försvarsunderrättelsedomstolen',
  'försäkringskassan',
  'gentekniknämnden',
  'gymnastik- och idrottshögskolan',
  'göteborgs universitet',
  'harpsundsnämnden',
  'havs- och vattenmyndigheten',
  'hälso- och sjukvårdens ansvarsnämnd',
  'inspektionen för arbetslöshetsförsäkringen',
  'inspektionen för socialförsäkringen',
  'inspektionen för strategiska produkter',
  'inspektionen för vård och omsorg',
  'institutet för arbetsmarknads- och utbildningspolitisk utvärdering',
  'institutet för mänskliga rättigheter',
  'institutet för rymdfysik',
  'institutet för språk och folkminnen',
  'integritetsskyddsmyndigheten',
  'justitiekanslern',
  'jämställdhetsmyndigheten',
  'kammarkollegiet',
  'kemikalieinspektionen',
  'kommerskollegium',
  'konjunkturinstitutet',
  'konkurrensverket',
  'konstfack',
  'konstnärsnämnden',
  'konsumentverket',
  'kriminalvården',
  'kronofogdemyndigheten',
  'kronofogden',
  'kungl. biblioteket',
  'kungl. djurgårdens förvaltning',
  'kungl. hov- och slottsstaten',
  'kungl. konsthögskolan',
  'kungl. musikhögskolan i stockholm',
  'kungl. tekniska högskolan',
  'kustbevakningen',
  'kärnavfallsfonden',
  'lantmäteriet',
  'linköpings universitet',
  'linnéuniversitetet',
  'livsmedelsverket',
  'luftfartsverket',
  'luleå tekniska universitet',
  'lunds universitet',
  'läkemedelsverket',
  'länsstyrelsen',
  'länsstyrelsen i blekinge län',
  'malmö universitet',
  'marknadsdomstolen',
  'mediemyndigheten',
  'medlingsinstitutet',
  'migrationsverket',
  'mittuniversitetet',
  'moderna museet',
  'myndigheten för arbetsmiljökunskap',
  'myndigheten för delaktighet',
  'myndigheten för digital förvaltning',
  'myndigheten för familjerätt och föräldraskapsstöd',
  'myndigheten för kulturanalys',
  'myndigheten för psykologiskt försvar',
  'myndigheten för samhällsskydd och beredskap',
  'myndigheten för stöd till trossamfund',
  'myndigheten för tillgängliga medier',
  'myndigheten för tillväxtpolitiska utvärderingar och analyser',
  'myndigheten för totalförsvarsanalys',
  'myndigheten för ungdoms- och civilsamhällesfrågor',
  'myndigheten för vård- och omsorgsanalys',
  'myndigheten för yrkeshögskolan',
  'mälardalens universitet',
  'nationalmuseum',
  'naturhistoriska riksmuseet',
  'naturvårdsverket',
  'nordiska afrikainstitutet',
  'nämnden för hemslöjdsfrågor',
  'nämnden för prövning av oredlighet i forskning',
  'patentbesvärsrätten',
  'patent- och registreringsverket',
  'patentombudsnämnden',
  'pensionsmyndigheten',
  'plikt- och prövningsverket',
  'polarforskningssekretariatet',
  'polismyndigheten',
  'post- och telestyrelsen',
  'presstödsnämnden',
  'regeringskansliet',
  'regionala etikprövningsnämnden',
  'regionala etikprövningsnämnden i göteborg',
  'regionala etikprövningsnämnden i linköping',
  'regionala etikprövningsnämnden i lund',
  'regionala etikprövningsnämnden i stockholm',
  'regionala etikprövningsnämnden i umeå',
  'regionala etikprövningsnämnden i uppsala',
  'revisorsinspektionen',
  'riksantikvarieämbetet',
  'riksarkivet',
  'riksdagens ombudsmän',
  'riksdagsförvaltningen',
  'riksgälden',
  'rymdstyrelsen',
  'rådet för europeiska socialfonden i sverige',
  'rättsmedicinalverket',
  'sameskolstyrelsen',
  'sametinget',
  'sjöfartsverket',
  'skatteverket',
  'skogsstyrelsen',
  'skolforskningsinstitutet',
  'socialstyrelsen',
  'specialpedagogiska skolmyndigheten',
  'spelinspektionen',
  'statens beredning för medicinsk och social utvärdering',
  'statens centrum för arkitektur och design',
  'statens energimyndighet',
  'statens fastighetsverk',
  'statens försvarshistoriska museer',
  'statens geotekniska institut',
  'statens haverikommission',
  'statens historiska museer',
  'statens inspektion för försvarsunderrättelseverksamheten',
  'statens institutionsstyrelse',
  'statens jordbruksverk',
  'statens konstråd',
  'statens kulturråd',
  'statens maritima och transporthistoriska museer',
  'statens museer för världskultur',
  'statens musikverk',
  'statens nämnd för arbetstagares uppfinningar',
  'statens servicecenter',
  'statens skolinspektion',
  'statens skolverk',
  'statens tjänstepensionsverk',
  'statens va-nämnd',
  'statens veterinärmedicinska anstalt',
  'statens väg- och transportforskningsinstitut',
  'statistiska centralbyrån',
  'scb',
  'statskontoret',
  'stiftelsen riksbankens jubileumsfond',
  'stockholms konstnärliga högskola',
  'stockholms universitet',
  'strålsäkerhetsmyndigheten',
  'styrelsen för ackreditering och teknisk kontroll',
  'styrelsen för internationellt utvecklingssamarbete',
  'svenska institutet',
  'svenska institutet för europapolitiska studier',
  'sveriges geologiska undersökning',
  'sveriges lantbruksuniversitet',
  'sveriges meteorologiska och hydrologiska institut',
  'sveriges riksbank',
  'säkerhets- och integritetsskyddsnämnden',
  'säkerhetspolisen',
  'södertörns högskola',
  'tandvårds- och läkemedelsförmånsverket',
  'tillväxtverket',
  'totalförsvarets forskningsinstitut',
  'trafikanalys',
  'trafikverket',
  'transportstyrelsen',
  'tullverket',
  'umeå universitet',
  'universitetskanslersämbetet',
  'universitets- och högskolerådet',
  'upphandlingsmyndigheten',
  'uppsala universitet',
  'utbetalningsmyndigheten',
  'valmyndigheten',
  'vetenskapsrådet',
  'vinnova',
  'åklagarmyndigheten',
  'örebro universitet',
  'överklagandenämnden för etikprövning',
  'överklagandenämnden för studiestöd',
  'region stockholm',
  'region skåne',
  'västra götalandsregionen',
  'region uppsala',
  'stockholm stad',
  'göteborg stad',
  'malmö stad',
  'uppsala kommun',
  'ivo',
  'pts',
  'hav',
  'jo',
];

// Generic patterns for municipalities and regions
const GOVERNMENT_PATTERNS = ['kommun', 'stad', 'region', 'myndighet', 'myndigheten'];

// Common government agency abbreviations
const GOVERNMENT_ABBREVIATIONS = [
  'msb',
  'scb',
  'skr',
  'skl',
  'csn',
  'pts',
  'fra',
  'fmv',
  'ivo',
  'jo',
  'kth',
  'gih',
  'slu',
  'smhi',
  'sgu',
  'esv',
  'lu',
  'gu',
  'uu',
  'su',
  'ki',
  'liu',
  'umu',
  'ltu',
  'fhm',
  'iaf',
  'digg',
  'isf',
  'isp',
  'bth',
  'hav',
  'kmh',
  'nv',
  'av',
  'sbu',
];

// Procurement-related keywords
const PROCUREMENT_KEYWORDS = [
  'upphandling',
  'ramavtal',
  'direktupphandling',
  'offentlig sektor',
  'offentliga sektorn',
];

/**
 * Detects if the inquiry is related to public sector procurement
 */
function isPublicSectorProcurement(workplace: string, need: string): boolean {
  const workplaceLower = workplace.toLowerCase();
  const needLower = need.toLowerCase();

  // Check if workplace contains any government agency name
  const hasAgency = GOVERNMENT_AGENCIES.some((agency) =>
    workplaceLower.includes(agency)
  );

  // Check if workplace contains government patterns
  const hasPattern = GOVERNMENT_PATTERNS.some((pattern) =>
    workplaceLower.includes(pattern)
  );

  // Check if workplace contains common abbreviations (exact match for whole words)
  const workplaceWords = workplaceLower.split(/\s+/);
  const hasAbbreviation = GOVERNMENT_ABBREVIATIONS.some((abbr) =>
    workplaceWords.includes(abbr)
  );

  // Check if need contains procurement keywords
  const hasProcurementKeyword = PROCUREMENT_KEYWORDS.some((keyword) =>
    needLower.includes(keyword)
  );

  return hasAgency || hasPattern || hasAbbreviation || hasProcurementKeyword;
}

export async function POST(request: NextRequest) {
  try {
    const { workplace, need } = await request.json();

    if (!workplace || !need) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if this is a public sector procurement inquiry
    if (isPublicSectorProcurement(workplace, need)) {
      // Return specialized response for public sector procurement
      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 400,
        temperature: 0.7,
        messages: [
          {
            role: 'user',
            content: `Generera två korta avsnitt för en myndighet/offentlig organisation som undrar om upphandling:

1. nextSteps: Två konkreta nästa steg. Varje steg ska ha en kort rubrik (2-4 ord) och EXAKT EN beskrivande mening om att kontakta Sara Nero för upphandlingsfrågor.

2. closing: En kort uppmuntrande avslutning (1 mening).

Returnera ENDAST valid JSON i exakt detta format:
{
  "nextSteps": [
    {"title": "string", "description": "string"},
    {"title": "string", "description": "string"}
  ],
  "closing": "string"
}`,
          },
        ],
      });

      const firstBlock = message.content[0];
      if (firstBlock.type !== 'text') {
        throw new Error('Expected text response from AI');
      }
      let responseText = firstBlock.text;

      // Remove markdown code blocks if present
      const jsonMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
      if (jsonMatch) {
        responseText = jsonMatch[1];
      }

      // Parse JSON response
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseText.trim());
      } catch {
        console.error('Failed to parse Claude response as JSON:', responseText);
        throw new Error('Invalid response format from AI');
      }

      // Return hardcoded response with AI-generated nextSteps and closing
      const publicSectorResponse = {
        greeting: '>Det här är en fråga som bäst besvaras av en människa',
        understanding:
          'På Antrop har vi lång erfarenhet av att leverera rätt kompetenser inom våra ramavtal och skapa långsiktiga partnerskap. För frågor om våra befintliga ramavtal, inbjudningar till direktupphandlingar, samt frågor om hur du inom offentlig sektor kan upphandla vår kompetens, hör av dig till vår affärschef Sara Nero, sara.nero@antrop.se.',
        approach: [],
        caseExamples: [],
        nextSteps: parsedResponse.nextSteps || [],
        closing: parsedResponse.closing || 'Vi ser fram emot att höra från dig!',
        hideContactForm: true,
      };

      // Send Slack notification (fire-and-forget)
      sendSlackNotification(workplace, need, publicSectorResponse).catch((error) => {
        console.error('Failed to send Slack notification:', error);
      });

      return NextResponse.json(publicSectorResponse);
    }

    const systemPrompt = `Du är en AI-assistent för designbyrån Antrop. Din uppgift är att hjälpa potentiella kunder förstå hur Antrop kan hjälpa dem.

FÖRETAGSINFORMATION:
${JSON.stringify(antropContent.company, null, 2)}

TJÄNSTER:
${JSON.stringify(antropContent.services, null, 2)}

CASE:
${JSON.stringify(antropContent.cases, null, 2)}

INSTRUKTIONER:
1. Analysera användarens arbetsplats och behov
2. Skapa ett inspirerande, pedagogiskt svar med professionell ton
3. Strukturera svaret i följande format:
   - greeting: En hälsning i formatet ">Hej [Företagsnamn]! Så här kan vi hjälpa er [grammatiskt korrekt formulering av behovet]." Anpassa formuleringen så den blir grammatiskt korrekt oavsett hur användaren uttryckte sig. Exempel: ">Hej Spotify! Så här kan vi hjälpa er att bygga en app.", ">Hej Google! Så här kan vi hjälpa er med er kundresa."
   - understanding: Knyt an till kundens bransch och Antrops erfarenhet av den eller närliggande branscher. Visa branschförståelse och relevant kompetens. (2-3 meningar)
   - approach: Tre förslag på aktiviteter (t.ex. kvalitativ research). Varje aktivitet ska ha en kort rubrik (2-4 ord) och EXAKT EN beskrivande mening
   - caseExamples: 1-3 relevanta case från CASE-listan ovan. Välj fler case om flera är relevanta för kundens behov. (inkludera namn, kort beskrivning och URL från varje case)
   - nextSteps: 2-3 konkreta nästa steg. Varje steg ska ha en kort rubrik (2-4 ord) och EXAKT EN beskrivande mening
   - closing: Avslutande uppmuntran (1 mening)

4. Returnera ENDAST valid JSON i exakt detta format:
{
  "greeting": "string",
  "understanding": "string",
  "approach": [
    {"title": "string", "description": "string"},
    {"title": "string", "description": "string"},
    {"title": "string", "description": "string"}
  ],
  "caseExamples": [
    {
      "name": "string",
      "description": "string",
      "url": "string"
    }
  ],
  "nextSteps": [
    {"title": "string", "description": "string"},
    {"title": "string", "description": "string"}
  ],
  "closing": "string"
}`;

    const userMessage = `Vi på ${workplace} behöver hjälp med: ${need}.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1200,
      temperature: 0.7,
      system: [
        {
          type: 'text',
          text: systemPrompt,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    const firstBlock = message.content[0];
    if (firstBlock.type !== 'text') {
      throw new Error('Expected text response from AI');
    }
    let responseText = firstBlock.text;

    // Remove markdown code blocks if present
    const jsonMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    if (jsonMatch) {
      responseText = jsonMatch[1];
    }

    // Parse JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText.trim());
    } catch {
      console.error('Failed to parse Claude response as JSON:', responseText);
      throw new Error('Invalid response format from AI');
    }

    // Send Slack notification (fire-and-forget)
    sendSlackNotification(workplace, need, parsedResponse).catch((error) => {
      console.error('Failed to send Slack notification:', error);
    });

    return NextResponse.json(parsedResponse);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error calling Claude API:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate response',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * Sends a Slack notification about the new lead (fire-and-forget)
 */
async function sendSlackNotification(
  workplace: string,
  need: string,
  response: any
): Promise<void> {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    await fetch(`${baseUrl}/api/slack-notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workplace,
        need,
        response,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    // Log but don't throw - this is fire-and-forget
    console.error('Slack notification error:', error);
  }
}
