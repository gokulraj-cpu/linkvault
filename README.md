# LinkVault

A team link directory powered by Slack. Mention `@save` with any link in a public channel and it gets automatically saved, AI-categorized, and made searchable for everyone.

## Architecture

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Netlify Functions (serverless)
- **Database**: Supabase (PostgreSQL)
- **AI**: Claude API for automatic link categorization
- **Slack**: Bot with Events API for capturing links
- **Realtime**: Supabase Realtime for live updates

## Setup

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase/schema.sql`
3. Go to Settings > API and copy your **Project URL** and **anon public key**
4. Also copy the **service_role secret key** (for server-side functions)
5. In Supabase Dashboard > Database > Replication, enable realtime for the `links` table

### 2. Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps) and create a new app
2. Under **OAuth & Permissions**, add these Bot Token Scopes:
   - `app_mentions:read`
   - `channels:read`
   - `chat:write`
   - `users:read`
3. Install the app to your workspace and copy the **Bot User OAuth Token**
4. Under **Basic Information**, copy the **Signing Secret**
5. Under **Event Subscriptions**:
   - Enable events
   - Set the Request URL to `https://your-netlify-site.netlify.app/api/slack-events`
   - Subscribe to bot events: `app_mention`
6. Name your bot `save` so users can mention `@save`

### 3. Environment Variables

Create a `.env` file (copy from `.env.example`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
SLACK_SIGNING_SECRET=your-slack-signing-secret
ANTHROPIC_API_KEY=sk-ant-your-key
```

### 4. Deploy to Netlify

1. Push this repo to GitHub
2. Connect it to Netlify
3. Set the build command to `npm run build` and publish directory to `dist`
4. Add all environment variables from step 3 in Netlify's Environment Variables settings
5. Deploy!
6. Update the Slack Event Subscription URL with your Netlify URL

### 5. Local Development

```bash
npm install
npm run dev
```

For testing Netlify Functions locally, use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify dev
```

## How It Works

1. Someone shares a link in Slack and mentions `@save`
2. The Slack bot receives the event via webhook
3. The bot extracts the URL, fetches page metadata (title, description, image)
4. Claude AI categorizes the link into one of 10 categories and suggests tags
5. The link is stored in Supabase with all metadata
6. The web app shows all links in a searchable, filterable directory
7. New links appear in realtime via Supabase subscriptions

## Features

- Full-text search across titles, descriptions, URLs, channels, and people
- 10 AI-powered categories with automatic classification
- Filter by category, Slack channel, or tags
- Realtime updates when new links are saved
- Responsive design for desktop and mobile
- Pagination for large collections
- Loading skeletons for smooth UX
