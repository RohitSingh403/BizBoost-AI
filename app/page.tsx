'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Target, TrendingUp, Users, ArrowRight, Star, Sparkles, Brain, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Content Generation",
      description: "Generate engaging social media content using advanced GPT-4 technology tailored to your business."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Multi-Platform Support",
      description: "Create content optimized for Instagram, LinkedIn, Facebook, and Twitter with platform-specific formatting."
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Smart Hashtag Suggestions",
      description: "Get relevant, trending hashtags that boost your content's discoverability and engagement."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Tone Customization",
      description: "Choose from professional, casual, funny, or inspiring tones to match your brand voice."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Business-Specific Content",
      description: "Tailored content for restaurants, gyms, salons, retail stores, and 50+ business types."
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Instant Results",
      description: "Generate complete social media posts in seconds, not hours. Save time and boost productivity."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      business: "Cafe Owner",
      content: "BizBoost AI helped me create a month's worth of Instagram content in just 30 minutes. My engagement has increased by 200%!",
      rating: 5
    },
    {
      name: "Mike Chen",
      business: "Fitness Coach",
      content: "The AI understands my fitness brand perfectly. Every post feels authentic and drives real results for my coaching business.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      business: "Boutique Owner",
      content: "I used to spend hours brainstorming content ideas. Now I generate beautiful posts effortlessly and focus on my customers.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: isYearly ? 19 : 29,
      originalPrice: isYearly ? 29 : 39,
      credits: 50,
      features: [
        "50 AI-generated posts per month",
        "Instagram & Facebook support",
        "Basic hashtag suggestions",
        "Email support",
        "Content history"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: isYearly ? 39 : 59,
      originalPrice: isYearly ? 59 : 79,
      credits: 200,
      features: [
        "200 AI-generated posts per month",
        "All social platforms",
        "Advanced hashtag research",
        "Priority support",
        "Content calendar",
        "Brand voice customization",
        "Analytics insights"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: isYearly ? 79 : 119,
      originalPrice: isYearly ? 119 : 159,
      credits: 500,
      features: [
        "500 AI-generated posts per month",
        "All platforms + scheduling",
        "AI content optimization",
        "24/7 priority support",
        "Team collaboration",
        "Advanced analytics",
        "Custom integrations",
        "Dedicated account manager"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                BizBoost AI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border-purple-200">
            ✨ AI-Powered Social Media Content Generator
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Engaging
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Social Media Content </span>
            in Seconds
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Stop struggling with content creation. Let AI generate professional social media posts, captions, and hashtags 
            tailored to your business in just a few clicks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3">
                Start Creating Content
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              Watch Demo
            </Button>
          </div>
          <div className="mt-8 flex justify-center items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              3 free credits to start
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Small Businesses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create professional social media content that drives engagement and grows your business.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm">
                <CardHeader>
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Small Business Owners
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how BizBoost AI is helping businesses create better content and grow their social media presence.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription className="text-purple-600 font-medium">
                    {testimonial.business}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Choose the plan that fits your business needs. All plans include our AI content generator and core features.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm ${!isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isYearly ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
              <span className={`text-sm ${isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Yearly
              </span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Save 30%
              </Badge>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-purple-500 shadow-lg scale-105' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/{isYearly ? 'year' : 'month'}</span>
                    {isYearly && (
                      <div className="text-sm text-gray-500 line-through">
                        ${plan.originalPrice}/{isYearly ? 'year' : 'month'}
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-center mt-2">
                    {plan.credits} AI-generated posts per month
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 ${plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                      : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Social Media?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of small businesses already using BizBoost AI to create engaging content that converts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-3">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">BizBoost AI</span>
              </div>
              <p className="text-gray-400">
                AI-powered social media content generator for small businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BizBoost AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}