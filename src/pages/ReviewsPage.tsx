
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { Star, ArrowLeft, Globe, Calendar, User, ExternalLink } from "lucide-react";

const ReviewsPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      reviewer: "John Smith",
      platform: "Fiverr",
      rating: 5,
      comment: "Exceptional work on the logo design! Sarah delivered exactly what I needed and was very professional throughout the process.",
      date: "2024-01-15",
      project: "Logo Design",
      verified: true
    },
    {
      id: 2,
      reviewer: "Marketing Pro LLC",
      platform: "Upwork",
      rating: 5,
      comment: "Outstanding website redesign. The new layout increased our conversion rate by 40%. Highly recommend!",
      date: "2024-01-10",
      project: "Website Redesign",
      verified: true
    },
    {
      id: 3,
      reviewer: "StartupCo",
      platform: "Freelancer",
      rating: 4,
      comment: "Great communication and timely delivery. The branding package was comprehensive and well-thought-out.",
      date: "2024-01-05",
      project: "Brand Identity",
      verified: true
    },
    {
      id: 4,
      reviewer: "E-commerce Plus",
      platform: "Upwork",
      rating: 5,
      comment: "Perfect mobile app design! Users love the new interface. Will definitely work with Sarah again.",
      date: "2023-12-28",
      project: "Mobile App UI",
      verified: true
    },
    {
      id: 5,
      reviewer: "TechStart Inc",
      platform: "Fiverr",
      rating: 5,
      comment: "Creative and modern design solutions. Sarah understood our vision perfectly and executed it flawlessly.",
      date: "2023-12-20",
      project: "Product Design",
      verified: true
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const platformCounts = reviews.reduce((acc, review) => {
    acc[review.platform] = (acc[review.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
              <Link to="/dashboard" className="text-primary hover:text-primary/80">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <Globe className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold gradient-text">PersonaPulse</h1>
                <p className="text-sm text-gray-600">Reviews</p>
              </div>
            </div>
            <Link to="/dashboard">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Reviews & Ratings</h2>
          <p className="text-gray-600">Verified reviews from clients across all platforms</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{totalReviews}</div>
              <p className="text-sm text-gray-600 mb-2">Total Reviews</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{Object.keys(platformCounts).length}</div>
              <p className="text-sm text-gray-600 mb-2">Platforms</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-gray-600 mb-2">Verified</p>
            </CardContent>
          </Card>
        </div>

        {/* Platform Breakdown */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Reviews by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(platformCounts).map(([platform, count]) => (
                <div key={platform} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge className={getPlatformBadgeColor(platform)}>
                      {platform}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{count}</div>
                    <div className="text-sm text-gray-600">reviews</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">All Reviews</h3>
          {reviews.map((review) => (
            <Card key={review.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{review.reviewer}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getPlatformBadgeColor(review.platform)}>
                          {review.platform}
                        </Badge>
                        {review.verified && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {renderStars(review.rating)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h5 className="font-medium text-primary mb-2">Project: {review.project}</h5>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                      This review is verified and cannot be edited
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View on {review.platform}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-100 to-orange-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Showcase Your Reviews</h3>
              <p className="text-gray-600 mb-6">
                Your verified reviews are now part of your portable persona. 
                Share them across all platforms to build trust with new clients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button className="gradient-bg text-white hover:shadow-lg transition-all duration-300">
                    Manage Profile
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => {
                    const profileUrl = `${window.location.origin}/persona/demo-user`;
                    navigator.clipboard.writeText(profileUrl);
                  }}
                >
                  Share Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
