
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { Star, Globe, Calendar, User, ExternalLink, MapPin, Briefcase, Award } from "lucide-react";

const PersonaPage = () => {
  const { username } = useParams();

  // Mock user data - in real app this would be fetched based on username
  const userData = {
    name: "Sarah Designer",
    username: "sarah_designer",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    bio: "Creative designer with 5+ years of experience in branding, web design, and mobile apps. I help businesses create memorable visual identities that connect with their audience.",
    location: "San Francisco, CA",
    joinDate: "2019-03-15",
    skills: ["Brand Design", "Web Design", "Mobile UI/UX", "Logo Design", "Illustration"],
    platforms: [
      { name: "Fiverr", username: "sarah_designer", verified: true },
      { name: "Upwork", username: "sarah.creative", verified: true },
      { name: "Freelancer", username: "sarahdesigns", verified: true }
    ],
    stats: {
      totalProjects: 150,
      averageRating: 4.9,
      totalReviews: 89,
      responseTime: "< 1 hour"
    }
  };

  const reviews = [
    {
      id: 1,
      reviewer: "John Smith",
      platform: "Fiverr",
      rating: 5,
      comment: "Exceptional work on the logo design! Sarah delivered exactly what I needed and was very professional throughout the process.",
      date: "2024-01-15",
      project: "Logo Design"
    },
    {
      id: 2,
      reviewer: "Marketing Pro LLC",
      platform: "Upwork",
      rating: 5,
      comment: "Outstanding website redesign. The new layout increased our conversion rate by 40%. Highly recommend!",
      date: "2024-01-10",
      project: "Website Redesign"
    },
    {
      id: 3,
      reviewer: "StartupCo",
      platform: "Freelancer",
      rating: 4,
      comment: "Great communication and timely delivery. The branding package was comprehensive and well-thought-out.",
      date: "2024-01-05",
      project: "Brand Identity"
    }
  ];

  const portfolioItems = [
    {
      title: "Modern Brand Identity",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      description: "Complete brand identity package for a tech startup"
    },
    {
      title: "E-commerce Website",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      description: "Responsive e-commerce platform with modern UI"
    },
    {
      title: "Mobile App Design",
      category: "UI/UX",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      description: "iOS and Android app design for fitness tracking"
    },
    {
      title: "Restaurant Branding",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
      description: "Logo and brand materials for fine dining restaurant"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getPlatformBadgeColor = (platform: string) => {
    const colors = {
      'Fiverr': 'bg-green-100 text-green-800',
      'Upwork': 'bg-blue-100 text-blue-800',
      'Freelancer': 'bg-purple-100 text-purple-800',
      '99designs': 'bg-orange-100 text-orange-800'
    };
    return colors[platform as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

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
                <p className="text-sm text-gray-600">Public Profile</p>
              </div>
            </div>
            <Badge className="bg-primary text-white">
              Verified Profile
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="border-0 shadow-xl mb-8 overflow-hidden">
          <div className="gradient-bg h-32"></div>
          <CardContent className="relative p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <img
                src={userData.profileImage}
                alt={userData.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg -mt-16 md:-mt-20"
              />
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData.name}</h1>
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{userData.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Member since {new Date(userData.joinDate).getFullYear()}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed max-w-2xl">{userData.bio}</p>
                  </div>
                  <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                    <Button className="gradient-bg text-white hover:shadow-lg transition-all duration-300">
                      Contact Me
                    </Button>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      Download Portfolio
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{userData.stats.totalProjects}</div>
              <p className="text-sm text-gray-600">Projects Completed</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{userData.stats.averageRating}</div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(userData.stats.averageRating))}
              </div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{userData.stats.totalReviews}</div>
              <p className="text-sm text-gray-600">Client Reviews</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{userData.stats.responseTime}</div>
              <p className="text-sm text-gray-600">Response Time</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Portfolio */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Briefcase className="h-6 w-6 text-primary mr-2" />
                  Portfolio
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {portfolioItems.map((item, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-lg mb-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <ExternalLink className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <Badge variant="secondary" className="mb-2">
                        {item.category}
                      </Badge>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Award className="h-6 w-6 text-primary mr-2" />
                  Client Reviews
                </h2>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{review.reviewer}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={getPlatformBadgeColor(review.platform)}>
                                {review.platform}
                              </Badge>
                              <span className="text-sm text-gray-600">{review.project}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            {renderStars(review.rating)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Connected Platforms */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Verified Platforms</h3>
                <div className="space-y-3">
                  {userData.platforms.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge className={getPlatformBadgeColor(platform.name)}>
                          {platform.name}
                        </Badge>
                        <span className="font-medium">@{platform.username}</span>
                      </div>
                      {platform.verified && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Verified
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-100 to-orange-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Ready to Work Together?</h3>
                <p className="text-gray-600 mb-4">
                  I'm always excited to take on new projects and help bring your vision to life.
                </p>
                <div className="space-y-3">
                  <Button className="w-full gradient-bg text-white hover:shadow-lg transition-all duration-300">
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                    Schedule Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-8 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PersonaPulse</span>
          </div>
          <p className="text-gray-400">
            Powered by Internet Computer Protocol - Secure, Decentralized, Reliable
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PersonaPage;
