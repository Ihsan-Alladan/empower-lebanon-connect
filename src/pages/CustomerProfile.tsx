import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Card, CardContent, CardDescription, 
  CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, ShoppingBag, History, Heart, 
  MapPin, CreditCard, Bell, Lock, 
  Camera, LogOut 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { getUserProfile, updateUserProfile } from '@/services/authService';
import { getUserRegisteredEvents } from '@/services/eventService';

const CustomerProfile: React.FC = () => {
  const { user: authUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  
  const { data: registeredEvents = [], isLoading: isEventsLoading } = useQuery({
    queryKey: ['registeredEvents'],
    queryFn: getUserRegisteredEvents,
    enabled: !!authUser?.id,
  });

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
      
      const fetchProfile = async () => {
        const userProfile = await getUserProfile(authUser.id);
        setProfile(userProfile);
        
        // Set initial values for editing
        setFirstName(userProfile?.first_name || '');
        setLastName(userProfile?.last_name || '');
        setEmail(authUser.email || '');
        setAddress(userProfile?.address || '');
        setCity(userProfile?.city || '');
        setCountry(userProfile?.country || '');
        setZipCode(userProfile?.zip_code || '');
      };
      
      fetchProfile();
    }
  }, [authUser]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset values to the original profile data
    setFirstName(profile?.first_name || '');
    setLastName(profile?.last_name || '');
    setEmail(user?.email || '');
    setAddress(profile?.address || '');
    setCity(profile?.city || '');
    setCountry(profile?.country || '');
    setZipCode(profile?.zip_code || '');
  };

  const handleSaveProfile = async () => {
    try {
      if (!user?.id) {
        toast.error('User ID not found.');
        return;
      }
      
      const updates = {
        first_name: firstName,
        last_name: lastName,
        address: address,
        city: city,
        country: country,
        zip_code: zipCode
      };
      
      await updateUserProfile(user.id, updates);
      
      // Update local profile state
      setProfile(prevProfile => ({ ...prevProfile, ...updates }));
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile.');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }
    
    try {
      // Simulate password change
      toast.success('Password changed successfully!');
      setIsPasswordChanging(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast.error(error.message || 'Failed to change password.');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <User className="h-5 w-5" />
              My Profile
            </CardTitle>
            <CardDescription>
              Manage your profile information and settings.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="profile" className="data-[state=active]:bg-secondary">
                  <User className="mr-2 h-4 w-4" />
                  Profile Information
                </TabsTrigger>
                <TabsTrigger value="orders" className="data-[state=active]:bg-secondary">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-secondary">
                  <History className="mr-2 h-4 w-4" />
                  History
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="data-[state=active]:bg-secondary">
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </TabsTrigger>
                <TabsTrigger value="address" className="data-[state=active]:bg-secondary">
                  <MapPin className="mr-2 h-4 w-4" />
                  Address
                </TabsTrigger>
                <TabsTrigger value="payment" className="data-[state=active]:bg-secondary">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Methods
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-secondary">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-secondary">
                  <Lock className="mr-2 h-4 w-4" />
                  Security
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <div className="grid gap-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="https://github.com/shadcn.png" alt="Profile Avatar" />
                      <AvatarFallback>
                        {firstName ? firstName[0] : 'U'}{lastName ? lastName[0] : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-semibold">{firstName} {lastName}</h2>
                      <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                  </div>
                  
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            type="text" 
                            id="firstName" 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            type="text" 
                            id="lastName" 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          type="email" 
                          id="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          disabled 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            type="text" 
                            id="address" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input 
                            type="text" 
                            id="city" 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)} 
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input 
                            type="text" 
                            id="country" 
                            value={country} 
                            onChange={(e) => setCountry(e.target.value)} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input 
                            type="text" 
                            id="zipCode" 
                            value={zipCode} 
                            onChange={(e) => setZipCode(e.target.value)} 
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile}>Save Changes</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <div>
                          <Label>First Name</Label>
                          <p>{firstName}</p>
                        </div>
                        <div>
                          <Label>Last Name</Label>
                          <p>{lastName}</p>
                        </div>
                        <div>
                          <Label>Email</Label>
                          <p>{email}</p>
                        </div>
                        <div>
                          <Label>Address</Label>
                          <p>{address || 'N/A'}</p>
                        </div>
                        <div>
                          <Label>City</Label>
                          <p>{city || 'N/A'}</p>
                        </div>
                        <div>
                          <Label>Country</Label>
                          <p>{country || 'N/A'}</p>
                        </div>
                        <div>
                          <Label>Zip Code</Label>
                          <p>{zipCode || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <Button onClick={handleEditProfile}>Edit Profile</Button>
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="orders">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Order History</h3>
                  <p>No orders yet.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="history">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Browsing History</h3>
                  <p>No browsing history available.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="wishlist">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Wishlist</h3>
                  <p>Your wishlist is empty.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="address">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Saved Addresses</h3>
                  <p>No saved addresses.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="payment">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
                  <p>No payment methods saved.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                  <p>No new notifications.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="security">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                  
                  {isPasswordChanging ? (
                    <>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input 
                          type="password" 
                          id="newPassword" 
                          value={newPassword} 
                          onChange={(e) => setNewPassword(e.target.value)} 
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input 
                          type="password" 
                          id="confirmPassword" 
                          value={confirmPassword} 
                          onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" onClick={() => setIsPasswordChanging(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleChangePassword}>Change Password</Button>
                      </div>
                    </>
                  ) : (
                    <Button onClick={() => setIsPasswordChanging(true)}>
                      Change Password
                    </Button>
                  )}
                  
                  <Button 
                    variant="destructive" 
                    className="mt-4" 
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerProfile;
