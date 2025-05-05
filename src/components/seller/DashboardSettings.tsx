
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/components/ui/sonner';
import { 
  Save, 
  Upload, 
  Store, 
  User, 
  CreditCard,
  Bell
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const DashboardSettings: React.FC = () => {
  const { user } = useAuth();
  const [shopName, setShopName] = useState(user?.name || 'My Shop');
  const [shopDescription, setShopDescription] = useState('Passionate artisan creating handcrafted products with care and attention to detail. Every piece tells a story.');
  
  const handleSaveShopSettings = () => {
    toast.success('Shop settings saved', {
      description: 'Your shop information has been updated successfully'
    });
  };
  
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-empower-brown mb-6">Settings</h2>
      
      <Tabs defaultValue="shop" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="shop" className="flex-1 data-[state=active]:text-[#B56E4D]">
            <Store size={16} className="mr-2" />
            Shop Settings
          </TabsTrigger>
          <TabsTrigger value="account" className="flex-1 data-[state=active]:text-[#B56E4D]">
            <User size={16} className="mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex-1 data-[state=active]:text-[#B56E4D]">
            <CreditCard size={16} className="mr-2" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1 data-[state=active]:text-[#B56E4D]">
            <Bell size={16} className="mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="shop" className="animate-fade-in">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Shop Appearance</h3>
              
              <div className="mb-6">
                <Label htmlFor="shopBanner" className="block mb-2">Shop Banner</Label>
                <div className="relative h-48 bg-empower-ivory rounded-lg overflow-hidden mb-2">
                  <img 
                    src="https://images.unsplash.com/photo-1582562124811-c09040d0a901"
                    alt="Shop Banner"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="sm">
                      <Upload size={16} className="mr-2" /> Change Banner
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Recommended size: 1200 x 400 pixels</p>
              </div>
              
              <div className="mb-6">
                <Label htmlFor="shopLogo" className="block mb-2">Shop Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 bg-[#B56E4D] rounded-full overflow-hidden flex items-center justify-center text-white text-2xl font-bold">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      shopName.charAt(0).toUpperCase()
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="sm" className="w-8 h-8 p-0 flex items-center justify-center">
                        <Upload size={14} />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Shop Logo</p>
                    <p className="text-xs text-gray-500">Square image, at least 200x200 pixels</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Shop Information</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="shopName">Shop Name</Label>
                    <Input 
                      id="shopName" 
                      value={shopName} 
                      onChange={(e) => setShopName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="shopDescription">Shop Description</Label>
                    <Textarea 
                      id="shopDescription" 
                      value={shopDescription} 
                      onChange={(e) => setShopDescription(e.target.value)}
                      className="mt-1 h-24"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="shopEmail">Contact Email</Label>
                    <Input 
                      id="shopEmail" 
                      type="email"
                      defaultValue={user?.email || 'shop@example.com'}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <Button 
                  className="bg-[#B56E4D] hover:bg-[#B56E4D]/80 text-white"
                  onClick={handleSaveShopSettings}
                >
                  <Save size={16} className="mr-2" />
                  Save Shop Settings
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="account" className="animate-fade-in">
          <div className="text-center py-16">
            <User size={64} className="mx-auto text-[#B56E4D]/30 mb-6" />
            <h3 className="text-2xl font-semibold text-empower-brown mb-2">Account Settings Coming Soon</h3>
            <p className="text-empower-brown/70 max-w-md mx-auto">
              You'll soon be able to update your personal information, password, and account preferences.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="payment" className="animate-fade-in">
          <div className="text-center py-16">
            <CreditCard size={64} className="mx-auto text-[#B56E4D]/30 mb-6" />
            <h3 className="text-2xl font-semibold text-empower-brown mb-2">Payment Settings Coming Soon</h3>
            <p className="text-empower-brown/70 max-w-md mx-auto">
              You'll soon be able to set up payment methods, payout preferences, and view transaction history.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="animate-fade-in">
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Order Notifications</p>
                  <p className="text-sm text-gray-500">Get notified when you receive a new order</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Review Notifications</p>
                  <p className="text-sm text-gray-500">Get notified when a customer leaves a review</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Inventory Alerts</p>
                  <p className="text-sm text-gray-500">Get notified when a product is low in stock</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Updates</p>
                  <p className="text-sm text-gray-500">Receive tips and news about selling on EmpowEra</p>
                </div>
                <Switch />
              </div>
              
              <Button 
                className="bg-[#B56E4D] hover:bg-[#B56E4D]/80 text-white mt-4"
                onClick={() => {
                  toast.success('Notification settings saved', {
                    description: 'Your notification preferences have been updated'
                  });
                }}
              >
                Save Notification Settings
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSettings;
