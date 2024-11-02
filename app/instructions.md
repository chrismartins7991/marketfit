# Product Market Fit SaaS Implementation Guide for Cursor AI

## Application Overview

This guide outlines the implementation of a Product Market Fit (PMF) SaaS application using Next.js, Shadcn, Magic UI, and Tailwind CSS. The application helps startups assess and improve their product market fit by analyzing their data and providing actionable insights.

### Key Features:
1. User authentication and membership plans
2. Data import (manual entry, file upload, CRM integration)
3. PMF score calculation
4. Strategy suggestion generation
5. Interactive dashboard
6. Notification system

## File Structure

```
pmf-saas/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth].ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── data-entry/
│   │   └── page.tsx
│   ├── suggestions/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── DataEntryForm.tsx
│   ├── FileUpload.tsx
│   ├── Navbar.tsx
│   ├── PMFScoreDisplay.tsx
│   └── SuggestionsList.tsx
├── lib/
│   ├── supabase.ts
│   ├── pmfCalculation.ts
│   └── strategySuggestions.ts
├── styles/
│   └── globals.css
├── public/
├── .env.local
├── next.config.js
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

## User Journey

1. User signs up / logs in
2. User enters startup data (manual entry or file upload)
3. System calculates PMF score
4. System generates strategy suggestions
5. User views PMF score and suggestions on dashboard
6. User receives email notification with insights

## Implementation Steps

### 1. Project Setup

```bash
# Install necessary packages
npm install @supabase/supabase-js @auth/supabase-adapter next-auth @radix-ui/react-icons class-variance-authority clsx tailwind-merge lucide-react @magic-sdk/admin @magic-sdk/react-native-expo
npm install -D @types/node @types/react @types/react-dom @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-next prettier prettier-plugin-tailwindcss tailwindcss postcss autoprefixer
```

### 2. Shadcn and Magic UI Setup

```bash
# Install Shadcn CLI
npx shadcn-ui@latest init

# Add necessary Shadcn components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add dropdown-menu
```

### 3. Authentication Setup

1. Create `app/api/auth/[...nextauth].ts`:

```typescript
import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import EmailProvider from "next-auth/providers/email"

export const authOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
}

export default NextAuth(authOptions)
```

2. Update `app/layout.tsx` to include the auth provider.

### 4. Data Entry Form

1. Create `components/DataEntryForm.tsx`:

```typescript
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'

export function DataEntryForm() {
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    const { error } = await supabase.from('startup_data').insert(data)
    setLoading(false)
    if (error) console.error('Error:', error)
    else console.log('Data submitted successfully')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('companyName')} placeholder="Company Name" />
      <Input {...register('industry')} placeholder="Industry" />
      <Input {...register('revenue')} placeholder="Revenue" type="number" />
      <Button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  )
}
```

2. Add the form to `app/data-entry/page.tsx`.

### 5. PMF Score Calculation

1. Create `lib/pmfCalculation.ts`:

```typescript
export function calculatePMFScore(data) {
  // Implement your PMF score calculation logic here
  // This is a simplified example
  const score = (data.revenue / 1000) * (data.customerSatisfaction / 10)
  return Math.min(Math.max(score, 0), 100) // Ensure score is between 0 and 100
}
```

2. Update `app/api/calculate-pmf.ts` to use this function and store results in Supabase.

### 6. Strategy Suggestion Generation

1. Create `lib/strategySuggestions.ts`:

```typescript
export function generateStrategySuggestions(pmfScore) {
  if (pmfScore < 30) {
    return [
      "Focus on customer interviews to better understand pain points",
      "Iterate on your product's core features",
      "Consider pivoting if current direction shows no traction"
    ]
  } else if (pmfScore < 70) {
    return [
      "Optimize your customer acquisition channels",
      "Improve your onboarding process to increase activation",
      "Gather more customer feedback to inform product roadmap"
    ]
  } else {
    return [
      "Scale your marketing efforts",
      "Focus on customer retention and reducing churn",
      "Explore expansion opportunities in adjacent markets"
    ]
  }
}
```

2. Create an API route to generate and store suggestions.

### 7. Dashboard Implementation

1. Create `components/PMFScoreDisplay.tsx`:

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function PMFScoreDisplay({ score }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your PMF Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{score}/100</div>
      </CardContent>
    </Card>
  )
}
```

2. Update `app/dashboard/page.tsx` to fetch and display PMF score and suggestions.

### 8. Notification System

1. Install a mailing library:

```bash
npm install nodemailer
```

2. Create an API route for sending notifications:

```typescript
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  const transporter = nodemailer.createTransport({
    // Configure your email service here
  })

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: req.body.email,
    subject: 'Your PMF Score and Suggestions',
    text: `Your PMF Score: ${req.body.score}\n\nSuggestions:\n${req.body.suggestions.join('\n')}`
  })

  res.status(200).json({ message: 'Notification sent' })
}
```

3. Call this API route after generating suggestions.

### 9. CRM Integration

1. Install a CRM library (e.g., for Salesforce):

```bash
npm install jsforce
```

2. Create a scheduled API route for CRM sync:

```typescript
import { Connection } from 'jsforce'
import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
  const conn = new Connection({
    loginUrl: process.env.SALESFORCE_LOGIN_URL
  })

  await conn.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PASSWORD)

  const result = await conn.query('SELECT Id, Name, Industry FROM Account')

  for (let record of result.records) {
    await supabase.from('startup_data').upsert({
      crm_id: record.Id,
      company_name: record.Name,
      industry: record.Industry
    })
  }

  res.status(200).json({ message: 'CRM sync completed' })
}
```

### 10. File Upload

1. Create `components/FileUpload.tsx`:

```typescript
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export function FileUpload() {
  const [file, setFile] = useState(null)

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    setFile(file)
  }

  const handleSubmit = async () => {
    if (!file) return

    const { data, error } = await supabase.storage
      .from('data-uploads')
      .upload(`${Date.now()}_${file.name}`, file)

    if (error) console.error('Upload error:', error)
    else console.log('File uploaded successfully:', data)
  }

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <Button onClick={handleSubmit}>Upload</Button>
    </div>
  )
}
```

2. Add `FileUpload` component to the data entry page.

## Environment Setup

1. Create a `.env` file in the root of your project and add the following environment variables:
