import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { createUserActor } from "../icp/icpConnect";  // Connects to the backend canister 



interface Platform {
  name: string;
  username: string;
}

function Enroll() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });
  
  const [platforms, setPlatforms] = useState<Platform[]>([
    { name: '', username: '' }
  ]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle platform input changes
  const handlePlatformChange = (index: number, field: keyof Platform, value: string) => {
    const updatedPlatforms = [...platforms];
    updatedPlatforms[index] = {
      ...updatedPlatforms[index],
      [field]: value
    };
    setPlatforms(updatedPlatforms);
  };

  // Add new platform field
  const addPlatform = () => {
    setPlatforms([...platforms, { name: '', username: '' }]);
  };

  // Remove a platform field
  const removePlatform = (index: number) => {
    if (platforms.length > 1) {
      const updatedPlatforms = platforms.filter((_, i) => i !== index);
      setPlatforms(updatedPlatforms);
    }
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!formData.firstName || !formData.lastName) {
        throw new Error('First name and last name are required');
      }

      if (platforms.some(p => !p.name || !p.username)) {
        throw new Error('All platform fields must be filled');
      }

      // Prepare payload
      const payload = {
        user: {
          ...formData,
          userId: user?.id, // Assuming your auth context provides user id
        },
        platforms
      };

      // Here you would call your backend canister
      // Example:
      // const response = await window.canister.enrollUser(payload);
      
      // Mock success response
      toast({
        title: "Success!",
        description: "You have been enrolled successfully.",
        variant: "default",
      });

      // Redirect after successful enrollment
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to enroll",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            ENROLL TO PORTABLE PERSONA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <Globe className="h-12 w-12 text-primary mb-4 mx-auto" />
              <p className="text-gray-600 mb-6">
                Input your details to enroll to portable persona
              </p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Platform Accounts</Label>
                  {platforms.map((platform, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        placeholder="Platform name"
                        value={platform.name}
                        onChange={(e) => handlePlatformChange(index, 'name', e.target.value)}
                        required
                      />
                      <Input
                        placeholder="Username"
                        value={platform.username}
                        onChange={(e) => handlePlatformChange(index, 'username', e.target.value)}
                        required
                      />
                      {platforms.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removePlatform(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={addPlatform}
                  >
                    Add Another Platform
                  </Button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enrolling..." : "Enroll"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Enroll;