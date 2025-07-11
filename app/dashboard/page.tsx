'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Sparkles, 
  Copy, 
  Heart, 
  MessageCircle, 
  Share, 
  Settings, 
  CreditCard,
  History,
  User,
  LogOut,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  PlusCircle,
  Download
} from 'lucide-react';

export default function Dashboard() {
  const [businessType, setBusinessType] = useState('');
  const [tone, setTone] = useState('');
  const [platform, setPlatform] = useState('');
  const [description, setDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [userCredits, setUserCredits] = useState(47);

  const businessTypes = [
    'Restaurant', 'Fitness/Gym', 'Beauty Salon', 'Retail Store', 'Tech Startup',
    'Real Estate', 'Consulting', 'Photography', 'Bakery', 'Dental Practice',
    'Law Firm', 'Automotive', 'Interior Design', 'Pet Services', 'Fashion Brand'
  ];

  const tones = [
    'Professional', 'Casual', 'Funny', 'Inspiring', 'Educational', 'Promotional'
  ];

  const platforms = [
    { value: 'instagram', label: 'Instagram', icon: <Instagram className="h-4 w-4" /> },
    { value: 'linkedin', label: 'LinkedIn', icon: <Linkedin className="h-4 w-4" /> },
    { value: 'facebook', label: 'Facebook', icon: <Facebook className="h-4 w-4" /> },
    { value: 'twitter', label: 'Twitter', icon: <Twitter className="h-4 w-4" /> }
  ];

  const handleGenerate = async () => {
    if (!businessType || !tone || !platform) return;
    
    setGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const sampleContent = {
        caption: `🌟 Transform your business with our innovative solutions! Whether you're a ${businessType.toLowerCase()} looking to grow or just starting out, we've got you covered. Our team is dedicated to helping you achieve your goals and exceed expectations. Ready to take the next step? 💪`,
        hashtags: ['#BusinessGrowth', '#Innovation', '#Success', '#Entrepreneur', '#Growth', '#SmallBusiness', '#Digital', '#Marketing', '#Strategy', '#Goals'],
        postIdeas: [
          'Behind-the-scenes content showing your daily operations',
          'Customer success stories and testimonials',
          'Tips and tricks related to your industry',
          'Team spotlights and company culture',
          'Product or service highlights with benefits'
        ]
      };
      
      setGeneratedContent(sampleContent);
      setUserCredits(prev => prev - 1);
      setGenerating(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
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
              <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border-purple-200">
                {userCredits} Credits
              </Badge>
              <Button variant="outline" size="sm">
                <CreditCard className="h-4 w-4 mr-2" />
                Upgrade
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Content Generator */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  <CardTitle className="text-2xl">AI Content Generator</CardTitle>
                </div>
                <CardDescription>
                  Create engaging social media content tailored to your business in seconds
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-type">Business Type</Label>
                    <Select value={businessType} onValueChange={setBusinessType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          <div className="flex items-center space-x-2">
                            {p.icon}
                            <span>{p.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Additional Context (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us more about your post, product, or campaign..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={generating || !businessType || !tone || !platform}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  size="lg"
                >
                  {generating ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Generating Amazing Content...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Content (1 Credit)
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Content */}
            {generatedContent && (
              <Card className="shadow-lg border-0 mt-8">
                <CardHeader>
                  <CardTitle className="text-xl">Generated Content</CardTitle>
                  <CardDescription>
                    Your AI-generated social media content is ready!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="caption" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="caption">Caption</TabsTrigger>
                      <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
                      <TabsTrigger value="ideas">Post Ideas</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="caption" className="space-y-4">
                      <div className="relative">
                        <Textarea
                          value={generatedContent.caption}
                          readOnly
                          rows={6}
                          className="pr-12"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(generatedContent.caption)}
                          className="absolute top-2 right-2"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>Predicted engagement: High</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>Character count: {generatedContent.caption.length}</span>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="hashtags" className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {generatedContent.hashtags.map((hashtag: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer hover:bg-purple-100"
                            onClick={() => copyToClipboard(hashtag)}
                          >
                            {hashtag}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(generatedContent.hashtags.join(' '))}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy All Hashtags
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="ideas" className="space-y-4">
                      <div className="space-y-3">
                        {generatedContent.postIdeas.map((idea: string, index: number) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="bg-purple-100 text-purple-600 rounded-full p-1 flex-shrink-0">
                              <PlusCircle className="h-4 w-4" />
                            </div>
                            <p className="text-sm text-gray-700">{idea}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Credits Remaining</span>
                  <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border-purple-200">
                    {userCredits}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Content Generated</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-medium">12</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Get More Credits
                </Button>
              </CardContent>
            </Card>

            {/* Recent History */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Recent Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <Instagram className="h-5 w-5 text-purple-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Restaurant post for Instagram
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <History className="h-4 w-4 mr-2" />
                  View All History
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800">
                    💡 Be specific about your business context for better results
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    🎯 Try different tones to see what resonates with your audience
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    📊 Track your post performance to optimize future content
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}