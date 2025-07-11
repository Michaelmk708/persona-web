
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Shield, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

const AuthPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleInternetIdentityLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate Internet Identity login
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock user data - in real app this would come from ICP
      const userData = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: 'Demo User',
        email: 'demo@personapulse.com',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'
      };

      login(userData);
      toast({
        title: "Welcome to PersonaPulse!",
        description: "Successfully authenticated with Internet Identity",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Globe className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome to PersonaPulse</CardTitle>
            <CardDescription className="text-base">
              Sign in securely with Internet Identity to manage your portable gig persona
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-primary">Secure & Private</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Your identity is protected by the Internet Computer's cryptographic security
                  </p>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleInternetIdentityLogin}
              disabled={isLoading}
              className="w-full gradient-bg text-white py-6 text-lg hover:shadow-lg transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connecting...</span>
                </div>
              ) : (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  Sign in with Internet Identity
                </>
              )}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                New to Internet Identity?
              </p>
              <a 
                href="https://identity.ic0.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                Learn more about secure authentication →
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
