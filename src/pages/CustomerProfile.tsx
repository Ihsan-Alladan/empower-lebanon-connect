
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserProfile, updateUserProfile } from '@/services/authService';
import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CustomerProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  });
  const [userProfile, setUserProfile] = useState<any>(null);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile(user.id);
        if (profile) {
          setUserProfile(profile);
          setProfileData({
            firstName: profile.first_name || '',
            lastName: profile.last_name || '',
            email: user.email || '',
            bio: profile.bio || '',
            address: '',
            city: '',
            country: '',
            zipCode: ''
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Could not load profile data");
      }
    };
    
    fetchUserProfile();
  }, [user, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = async () => {
    if (!user) return;
    
    try {
      const updates = {
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        bio: profileData.bio
      };
      
      await updateUserProfile(user.id, updates);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
      
      // Refresh user profile
      const updatedProfile = await getUserProfile(user.id);
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };
  
  if (!user || !userProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userProfile.avatar_url || ''} alt="User avatar" />
                      <AvatarFallback>
                        {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4">{profileData.firstName} {profileData.lastName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('profile')}
                    >
                      Profile Settings
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('orders')}
                    >
                      Order History
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab('courses')}
                    >
                      My Courses
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-red-500 hover:text-red-700"
                      onClick={handleLogout}
                    >
                      Log Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="w-full md:w-3/4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={profileData.firstName}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={profileData.lastName}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            value={profileData.email}
                            disabled
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Input
                            id="bio"
                            name="bio"
                            value={profileData.bio}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        
                        {isEditing ? (
                          <div className="flex space-x-2">
                            <Button onClick={handleSaveProfile}>Save Changes</Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setIsEditing(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">No orders found.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="courses">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">You are not enrolled in any courses.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default CustomerProfile;
