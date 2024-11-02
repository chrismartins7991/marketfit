"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Users, Zap, PieChart, Upload, Brain, LineChart, Rocket, ArrowRight, Layers, TrendingUp, Repeat, DollarSign, Target, BarChart2, Search, Home, PencilIcon, Menu, Star, CreditCard } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { useSession } from 'next-auth/react'

const Icons = {
  github: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  linkedin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  x: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
    </svg>
  ),
  email: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
    </svg>
  ),
}

const DATA = {
  navbar: [
    { href: "/", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "#",
        icon: Icons.github,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "#",
        icon: Icons.linkedin,
      },
      X: {
        name: "X",
        url: "#",
        icon: Icons.x,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
      },
    },
  },
}

const testimonialImages = [
  "/images/caroline.jpg",
  "/images/dmitro.jpg",
  "/images/joshua.jpg",
  "/images/julien.jpg",
  "/images/pedro.jpg",
  "/images/phillipe.jpg",
  "/images/stefano.jpg",
]

const avatarImages = [
  "julien.jpg",
  "pedro.jpg",
  "phillipe.jpg",
  "stefano.jpg",
  "caroline.jpg",
  "dmitro.jpg",
  "joshua.jpg",
]

const ScrollableSection = ({ items, renderItem }: {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
}) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {items.map((item, index) => renderItem(item, index))}
      </div>
    </ScrollArea>
  )
}

const ShimmerButton = ({ children, className, shimmerColor, background, ...props }: {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  background?: string;
  [key: string]: any;
}) => {
  return (
    <Button
      className={cn(
        "relative overflow-hidden",
        className
      )}
      style={{
        background: background || "linear-gradient(45deg, #FF69B4, #4169E1)",
      }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(45deg, ${shimmerColor || '#ffffff'} 0%, transparent 100%)`,
          transform: "skewX(-45deg) translateX(-150%)",
          animation: "shimmer 2s infinite",
        }}
      />
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: skewX(-45deg) translateX(200%);
          }
        }
      `}</style>
    </Button>
  )
}

// Define the BatmanIcon component
function BatmanIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 8l3.5 2 2-3L12 3l3.5 4 2 3L21 8c-.7 3.8-2.5 7.2-5 9.5-1.5 1.4-3.3 2.5-5.3 3.2-.4.1-.7.2-1.1.3H14c-2.6-.4-5-1.5-7-3.2C4.5 15.2 2.7 11.8 2 8l1 .1zM12 6l-1.75 2 1.75 3 1.75-3L12 6z" />
    </svg>
  )
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isYearly, setIsYearly] = useState(true)
  const router = useRouter()
  const [isBatCaveMode, setIsBatCaveMode] = useState(false)
  const { data: session } = useSession()

  const uspItems = [
    { icon: Brain, title: "AI-Powered Segmentation", description: "Advanced algorithms provide accurate customer segmentation based on your data" },
    { icon: Zap, title: "Real-Time PMF Score", description: "Get an up-to-the-minute Product-Market Fit score for quick decision-making" },
    { icon: Rocket, title: "Startup-Focused", description: "Tailored for the unique needs and challenges of early-stage startups" },
    { icon: TrendingUp, title: "Growth Strategies", description: "Receive actionable strategies to improve your Product-Market Fit" },
    { icon: Layers, title: "Data Integration", description: "Seamlessly integrate with your existing customer feedback and analytics tools" },
    { icon: LineChart, title: "Trend Analysis", description: "Identify patterns and trends in your customer data over time" },
    { icon: BarChart2, title: "Customizable Dashboards", description: "Visualize your PMF journey with user-friendly, customizable dashboards" },
    { icon: DollarSign, title: "Cost-Effective Solution", description: "Achieve Product-Market Fit without breaking the bank" },
    { icon: Target, title: "Actionable Insights", description: "Get specific recommendations to improve your product and target the right customers" },
    { icon: Repeat, title: "Continuous Learning", description: "Our AI adapts and improves as you gather more customer data" },
  ]

  const handleGetFreeAnalysis = () => {
    localStorage.setItem('fromLanding', 'true')
    router.push('/data-entry')
  }

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');

  // Add console log to debug (remove in production)
  console.log('Stripe Key:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  const initiateCheckout = async (priceId: string) => {
    const stripe = await stripePromise;
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });
    const session = await response.json();
    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: session.id });
    }
  };

  const plans = [
    {
      name: "LITE PLAN",
      price: isYearly ? "€68" : "€98",
      period: "/month",
      features: [
        "PMF Level Score",
        "Dashboard w/ Key Metrics for PMF",
        "AI Strategies",
      ],
      action: "Get a Free PMF Score Analysis",
      onClick: () => router.push('/data-entry'),
    },
    {
      name: "LITE XL PLAN",
      price: isYearly ? "€125" : "€179",
      period: "/month",
      features: [
        "PMF Level Score",
        "Dashboard w/ Key Metrics for PMF",
        "AI Strategies",
        "Persona & Problem Definition",
      ],
      action: "Get a Free PMF Score Analysis",
      onClick: () => router.push('/data-entry'),
    },
    {
      name: "STARTUP PLAN",
      price: "",
      period: "",
      features: [
        "PMF Level Score",
        "Dashboard w/ Key Metrics for PMF",
        "CRM Integration for Live Data",
        "Metrics Breakdown",
        "AI Strategies",
        "Persona & Problem Definition",
        "Visual Roadmap",
        "Community Access",
      ],
      action: "Learn More",
      onClick: () => router.push('/contact'),
    },
    {
      name: "SCALE UP PLAN",
      price: "",
      period: "",
      features: [
        "Lifetime Access to Web App Features",
        "PMF Level Score",
        "Dashboard w/ Key Metrics for PMF",
        "Metrics Breakdown",
        "AI Strategies",
        "Persona & Problem Definition",
        "Visual Roadmap",
        "Community Access",
      ],
      action: "Learn More",
      onClick: () => router.push('/contact'),
    },
  ];

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isBatCaveMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    )}>
      <header className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-60",
        isBatCaveMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/craiyon-logo.png"  
              alt="MARKETFIT Logo"
              width={200}
              height={200}
              className="h-10 w-auto"
            />
          </Link>
          <div className="hidden lg:flex items-center space-x-4">
            {DATA.navbar.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleGetFreeAnalysis}
              className={cn(
                isBatCaveMode ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500' : 'bg-pink-600 text-white hover:bg-pink-700'
              )}
            >
              Get a Free Score Analysis
            </Button>
            {session && (
              <Button 
                onClick={() => router.push('/dashboard')}
                className={cn(
                  isBatCaveMode ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                )}
              >
                Go to Dashboard
              </Button>
            )}
            <Button
              className="lg:hidden"
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center space-x-2">
              <span className={`text-xs sm:text-sm font-medium ${isBatCaveMode ? 'text-gray-300' : 'text-gray-700'}`}>Bat Cave Mode</span>
              <Switch
                checked={isBatCaveMode}
                onCheckedChange={setIsBatCaveMode}
                className={cn(
                  "data-[state=checked]:bg-yellow-400",
                  isBatCaveMode ? "bg-gray-600" : "bg-gray-200"
                )}
              />
              <BatmanIcon className={`h-6 w-6 ${isBatCaveMode ? 'text-yellow-400' : 'text-gray-400'}`} />
            </div>
          </div>
        </div>
      </header>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b">
          <nav className="container py-4">
            {DATA.navbar.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-2 text-sm font-medium text-gray-700 hover:text-pink-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button className="w-full mt-4" onClick={handleGetFreeAnalysis}>
              Get a Free Score Analysis
            </Button>
          </nav>
        </div>
      )}
      <main className="flex-1">
        <section className={cn(
          "w-full py-12 md:py-16 lg:py-20 xl:py-24 -mt-14 relative z-10",
          isBatCaveMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
        )}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-14 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-normal tracking-normal leading-tight [500px]:text-[2.75rem] sm:text-5xl md:text-[3.5rem] lg:text-6xl lg:leading-[1.2]">
                  <span className="text-black">AI-Powered </span>
                  <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent font-bold">Product-Market Fit </span>
                  <span className="text-black">for </span>
                  <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent font-bold">Startups</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Achieve Product-Market Fit faster with our AI-driven customer segmentation tool. <strong>Analyze, strategize, and grow</strong> with confidence.
                </p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 pr-48"
                  />
                  <ShimmerButton
                    shimmerColor="#ffffff"
                    background="linear-gradient(45deg, #FF69B4, #4169E1)"
                    className="absolute right-1 top-1 bottom-1 shadow-2xl"
                    onClick={handleGetFreeAnalysis}
                  >
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white">
                      Get a Free Score Analysis
                    </span>
                  </ShimmerButton>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-600">Trusted by 250+ Startup Founders</p>
                  <div className="flex -space-x-2">
                    {avatarImages.map((src, index) => (
                
                      <Image
                        key={index}
                        src={`/images/${src}`}
                        alt={`Avatar ${index + 1}`}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-pink-600 flex-shrink-0" />
                    <span>No card required</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart className="w-5 h-5 text-pink-600 flex-shrink-0" />
                    <span>PMF Score in minutes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-pink-600 flex-shrink-0" />
                    <span>Actionable strategies</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md bg-gradient-to-br from-pink-100 to-blue-100 h-64 flex items-center justify-center rounded-lg shadow-lg">
                  MARKETFIT Demo Placeholder
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Key Features</h2>
            <div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
              {[
                { icon: Zap, title: "Instant PMF Score", description: "Upload your data and get your Product-Market Fit score in minutes" },
                { icon: Brain, title: "AI-Driven Insights", description: "Receive tailored strategies to improve your PMF based on AI analysis" },
                { icon: Users, title: "Customer Segmentation", description: "Automatically segment your customers for targeted improvements" },
                { icon: BarChart, title: "Growth Tracking", description: "Monitor your PMF progress over time with visual analytics" }
              ].map((feature, index) => (
                <Card key={index} className={cn(
                  "bg-opacity-80 backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-60 border-0 shadow-lg",
                  isBatCaveMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                )}>
                  <CardHeader>
                    <feature.icon className="h-10 w-10 mb-2 text-pink-500" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-pink-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Card className={cn(
              "bg-opacity-80 backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-60 border-0 shadow-lg",
              isBatCaveMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
            )}>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-black text-center">Your Path to Product-Market Fit</CardTitle>
              </CardHeader>
              <div className="flex justify-between items-center my-8">
                {['Customer Feedback', 'AI Analysis', 'PMF Score'].map((step, index) => (
                  <Card key={index} className="w-1/4 bg-gradient-to-r from-pink-100 to-blue-100">
                    <CardContent className="p-4">
                      <p className="text-center font-semibold text-gray-800">{step}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center">
                <svg className="w-full h-24" viewBox="0 0 100 24">
                  <line x1="12.5" y1="0" x2="12.5" y2="24" stroke="#FF69B4" strokeWidth="0.5"/>
                  <line x1="50" y1="0" x2="50" y2="24" stroke="#4169E1" strokeWidth="0.5"/>
                  <line x1="87.5" y1="0" x2="87.5" y2="24" stroke="#FF69B4" strokeWidth="0.5"/>
                </svg>
              </div>
              <Card className="mt-4 bg-gradient-to-r from-pink-200 to-blue-200">
                <CardContent className="p-4">
                  <p className="text-center font-bold text-gray-800">Achieve Product-Market Fit</p>
                </CardContent>
              </Card>
            </Card>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">Why Choose MARKETFIT?</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {uspItems.map((item, index) => (
                <Card key={index} className={cn(
                  "bg-opacity-80 backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-60 border-0 shadow-lg",
                  isBatCaveMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                )}>
                  <CardHeader>
                    <item.icon className="h-10 w-10 mb-2 text-pink-500" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-pink-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">How It Works</h2>
            <div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
              {[
                { icon: Upload, title: "Upload Data", description: "Input your customer feedback and metrics" },
                { icon: Brain, title: "AI Analysis", description: "Our AI segments customers and analyzes feedback" },
                { icon: PieChart, title: "Get PMF Score", description: "Receive your Product-Market Fit score" },
                { icon: Rocket, title: "Implement Strategies", description: "Apply AI-generated strategies to improve PMF" }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white">
                    {index + 1}
                  </div>
                  <step.icon className="h-10 w-10 mt-4 mb-2 text-pink-500" />
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-gray-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">What Our Customers Say</h2>
            <div className="relative w-full overflow-hidden">
              <ScrollableSection
                items={[
                  { name: "Caroline", quote: "MARKETFIT <b>revolutionized our approach</b> to finding product-market fit. The <b>AI-driven insights</b> have been invaluable for our growth strategy." },
                  { name: "Dmitro", quote: "The <b>speed and accuracy</b> of MARKETFIT's PMF score have given us a <b>competitive edge</b>. It's like having a data science team dedicated to our product-market fit." },
                  { name: "Joshua", quote: "MARKETFIT's <b>actionable strategies</b> have significantly improved our product iterations. We can now present <b>data-driven decisions</b> to our investors with confidence." },
                  { name: "Julien", quote: "With MARKETFIT, we've seen a <b>40% improvement</b> in our product-market fit score. The <b>customer segmentation</b> is spot-on." },
                  { name: "Pedro", quote: "The <b>ease of use</b> is remarkable. We're making <b>smarter product decisions</b> faster than ever before." },
                  { name: "Phillipe", quote: "MARKETFIT has become an <b>essential tool</b> for our product team. The <b>ROI in time and resources saved</b> is incredible." },
                  { name: "Stefano", quote: "The <b>customizable dashboards</b> allow us to focus on the PMF metrics that matter most to our business. It's been a <b>game-changer</b> for our startup." }
                ]}
                renderItem={(item: { name: string; quote: string }, index: number) => (
                  <Card key={index} className={cn(
                    "bg-opacity-80 backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-60 border-0 shadow-lg w-[400px] flex-shrink-0",
                    isBatCaveMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                  )}>
                    <CardHeader className="flex items-center">
                      <Image 
                        src={testimonialImages[index % testimonialImages.length]}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover mb-4"
                        style={{ width: '80px', height: '80px' }}
                      />
                      <CardTitle>{item.name}</CardTitle>
                      <div className="flex text-pink-400 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="italic" dangerouslySetInnerHTML={{ __html: `"${item.quote}"` }}></p>
                    </CardContent>
                  </Card>
                )}
              />
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-pink-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Pricing Plans</h2>
            <div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
              {plans.map((plan, index) => (
                <Card key={index} className={cn(
                  "bg-opacity-80 backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-60 shadow-lg",
                  plan.popular ? 'border-2 border-pink-500 relative' : 'border-0',
                  isBatCaveMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                )}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-pink-500 text-white px-2 py-1 text-xs font-bold rounded-bl">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="text-3xl font-bold">
                      {plan.price}
                      <span className="text-xl font-normal text-gray-500">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600"
                      onClick={plan.onClick}
                    >
                      {plan.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-pink-900 to-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Ready to Achieve Product-Market Fit?</h2>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-8">
              Start your journey to faster growth and success with AI-powered insights today.
            </p>
            <ShimmerButton
              shimmerColor="#ffffff"
              background="linear-gradient(45deg, #FF69B4, #4169E1)"
              className="shadow-2xl"
              onClick={handleGetFreeAnalysis}
            >
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                Get a Free Score Analysis
              </span>
            </ShimmerButton>
          </div>
        </section>
      </main>
      <footer className={cn(
        "w-full py-6",
        isBatCaveMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="hover:text-pink-600">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-pink-600">Pricing</Link></li>
                <li><Link href="#" className="hover:text-pink-600">Case Studies</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-pink-600">About Us</Link></li>
                <li><Link href="#" className="hover:text-pink-600">Careers</Link></li>
                <li><Link href="#" className="hover:text-pink-600">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-pink-600">Documentation</Link></li>
                <li><Link href="#" className="hover:text-pink-600">Support</Link></li>
                <li><Link href="#" className="hover:text-pink-600">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-pink-600">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-pink-600">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-pink-600">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Image
                src="/images/craiyon-logo.png"  // Updated path
                alt="MARKETFIT Logo"
                width={24}
                height={24}
                className="h-6 w-auto"
              />
              
            </div>
            <div className="flex space-x-4">
              {Object.values(DATA.contact.social).map(({ name, url, icon: Icon }) => (
                <Link key={name} href={url} className="text-gray-400 hover:text-pink-600">
                  <Icon className="h-6 w-6" />
                  <span className="sr-only">{name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            © 2024 MARKETFIT. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
