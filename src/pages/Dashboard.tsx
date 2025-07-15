
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload, Globe, LogOut, Star, Users, Briefcase, Link as LinkIcon } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [platforms, setPlatforms] = useState([
    { name: 'Fiverr', username: 'mike_kinuthia' },
    { name: 'Upwork', username: 'mike_kinuthia' }
  ]);
  const [portfolioItems, setPortfolioItems] = useState([
    { title: 'Brand Design Project', type: 'image', url: '#' },
    { title: 'Website Redesign', type: 'link', url: '#' }
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const handleAddPlatform = () => {
    if (selectedPlatform && username) {
      setPlatforms([...platforms, { name: selectedPlatform, username }]);
      setSelectedPlatform('');
      setUsername('');
      toast({
        title: "Platform Added",
        description: `${selectedPlatform} account linked successfully`,
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file upload
      const newItem = {
        title: file.name,
        type: 'file',
        url: URL.createObjectURL(file)
      };
      setPortfolioItems([...portfolioItems, newItem]);
      toast({
        title: "File Uploaded",
        description: `${file.name} added to your portfolio`,
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Globe className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold gradient-text">PersonaPulse</h1>
                <p className="text-sm text-gray-600">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={user.profileImage || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'} 
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout} className="border-primary text-primary hover:bg-primary hover:text-white">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h2>
          <p className="text-gray-600">Manage your portable gig persona and showcase your work across platforms</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{platforms.length}</p>
                  <p className="text-sm text-gray-600">Connected Platforms</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{portfolioItems.length}</p>
                  <p className="text-sm text-gray-600">Portfolio Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4.9</p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Platform Management */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Connected Platforms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fiverr">Fiverr</SelectItem>
                        <SelectItem value="Upwork">Upwork</SelectItem>
                        <SelectItem value="Freelancer">Freelancer</SelectItem>
                        <SelectItem value="99designs">99designs</SelectItem>
                        <SelectItem value="Toptal">Toptal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Your username"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleAddPlatform}
                  disabled={!selectedPlatform || !username}
                  className="w-full gradient-bg text-white hover:shadow-lg transition-all duration-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Platform
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Your Platforms</h4>
                {platforms.map((platform, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary" className="bg-primary text-white">
                        {platform.name}
                      </Badge>
                      <span className="font-medium">@{platform.username}</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Verified
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Management */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <span>Portfolio</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file-upload">Upload Files</Label>
                  <div className="mt-2">
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <Button
                      onClick={() => document.getElementById('file-upload')?.click()}
                      variant="outline"
                      className="w-full border-dashed border-2 border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Images or Documents
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="project-link">Add Project Link</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="project-link"
                      placeholder="https://your-project.com"
                    />
                    <Button className="gradient-bg text-white">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project..."
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Portfolio Items</h4>
                {portfolioItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        {item.type === 'image' ? '🖼️' : item.type === 'link' ? '🔗' : '📄'}
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <Badge variant="outline">
                      {item.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Share Your Persona</h3>
            <p className="text-gray-600 mb-6">Your public profile is ready to share with potential clients</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/reviews')}
                className="gradient-bg text-white hover:shadow-lg transition-all duration-300"
              >
                <Star className="h-4 w-4 mr-2" />
                View Reviews
              </Button>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => navigator.clipboard.writeText(`${window.location.origin}/persona/${user.name.toLowerCase().replace(' ', '')}`)}
              >
                <LinkIcon className="h-4 w-4 mr-2" />
                Copy Profile Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
