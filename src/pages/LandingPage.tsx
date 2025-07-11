
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Star, Users, Zap, Globe, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Verified Identity",
      description: "Secure authentication with Internet Identity protocol"
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Portable Reviews",
      description: "Carry your reviews across all gig platforms"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Cross-Platform",
      description: "Connect Fiverr, Upwork, Freelancer and more"
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Instant Recognition",
      description: "Browser extension shows your profile everywhere"
    }
  ];

  const benefits = [
    "Build trust with verified reviews",
    "Showcase work across platforms",
    "Stand out with portable portfolio",
    "Increase client confidence"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Globe className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold gradient-text">PersonaPulse</span>
        </div>
        <Link to="/auth">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            Sign In
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-7xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your <span className="gradient-text">Portable</span><br />
            Gig Persona
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build trust across all freelancing platforms with verified reviews, 
            portable portfolios, and secure identity powered by Internet Computer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth">
              <Button size="lg" className="gradient-bg text-white px-8 py-6 text-lg hover:shadow-lg transition-all duration-300">
                Get Started with Internet Identity
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary hover:text-white">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Why Choose PersonaPulse?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform how you present yourself in the gig economy with our revolutionary platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl font-bold mb-6">Stand Out in the Gig Economy</h2>
              <p className="text-xl text-gray-600 mb-8">
                Don't let platform boundaries limit your reputation. 
                Create a unified professional identity that follows you everywhere.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Sarah Designer</h3>
                    <p className="text-sm text-gray-600">Verified across 5 platforms</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Fiverr</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Upwork</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Freelancer</span>
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your Portable Persona?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of freelancers who trust PersonaPulse to showcase their work
          </p>
          <Link to="/auth">
            <Button size="lg" className="gradient-bg text-white px-12 py-6 text-xl hover:shadow-lg transition-all duration-300">
              Start Building Now
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">PersonaPulse</span>
          </div>
          <p className="text-gray-400 mb-6">
            Powered by Internet Computer Protocol - Secure, Decentralized, Reliable
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
            <a href="#" className="hover:text-primary transition-colors">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
