
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  Palette, 
  ImagePlus, 
  Trash2, 
  MoveVertical, 
  Text, 
  Info, 
  Target, 
  Layers, 
  Quote, 
  CircleDollarSign, 
  Users, 
  Save, 
  Eye 
} from "lucide-react";

const HomeDesign: React.FC = () => {
  const [saving, setSaving] = useState(false);
  
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Home page settings saved successfully!");
    }, 1500);
  };
  
  const handlePreview = () => {
    window.open("/", "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-empower-brown">Home Design</h1>
          <p className="text-muted-foreground">Customize your website's homepage appearance and content.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handlePreview}
            className="flex gap-2"
          >
            <Eye size={16} />
            <span className="hidden md:inline">Preview Homepage</span>
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={saving} 
            className="flex gap-2"
          >
            <Save size={16} />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="slider">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-4">
          <TabsTrigger value="slider" className="flex gap-1 items-center">
            <ImagePlus size={14} />
            <span className="hidden md:inline">Slider</span>
          </TabsTrigger>
          <TabsTrigger value="intro" className="flex gap-1 items-center">
            <Text size={14} />
            <span className="hidden md:inline">Intro</span>
          </TabsTrigger>
          <TabsTrigger value="about" className="flex gap-1 items-center">
            <Info size={14} />
            <span className="hidden md:inline">About Us</span>
          </TabsTrigger>
          <TabsTrigger value="mission" className="flex gap-1 items-center">
            <Target size={14} />
            <span className="hidden md:inline">Mission</span>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex gap-1 items-center">
            <Layers size={14} />
            <span className="hidden md:inline">Services</span>
          </TabsTrigger>
          <TabsTrigger value="testimonials" className="flex gap-1 items-center">
            <Quote size={14} />
            <span className="hidden md:inline">Testimonials</span>
          </TabsTrigger>
          <TabsTrigger value="values" className="flex gap-1 items-center">
            <CircleDollarSign size={14} />
            <span className="hidden md:inline">Values</span>
          </TabsTrigger>
          <TabsTrigger value="collaborators" className="flex gap-1 items-center">
            <Users size={14} />
            <span className="hidden md:inline">Collaborators</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Slider Images Section */}
        <TabsContent value="slider">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImagePlus size={18} /> Slider Images
              </CardTitle>
              <CardDescription>
                Add up to 5 images for your home page slider. Recommended size: 1920x800px.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="border rounded-md p-4 relative">
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <ImagePlus className="text-muted-foreground" />
                      </div>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>Slide {index}</Label>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                        <Input type="file" accept=".jpg,.jpeg,.png" />
                        <Input placeholder="Link URL (optional)" />
                        <div className="flex justify-between items-center">
                          <Button variant="outline" size="sm" className="flex gap-1 items-center">
                            <MoveVertical size={14} /> Reorder
                          </Button>
                          <Button variant="outline" size="sm">Preview</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="border border-dashed rounded-md p-4 flex flex-col items-center justify-center h-[230px]">
                    <Button variant="outline" className="flex gap-2">
                      <ImagePlus size={14} />
                      Add New Slide
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">(2 slots remaining)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Intro Paragraph Section */}
        <TabsContent value="intro">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Text size={18} /> Introduction Section
              </CardTitle>
              <CardDescription>
                Set the welcome message and introduction paragraph for your homepage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="intro-title">Section Title</Label>
                  <Input id="intro-title" defaultValue="Welcome to EmpowEra" />
                </div>
                <div>
                  <Label htmlFor="intro-text">Introduction Text</Label>
                  <Textarea 
                    id="intro-text" 
                    placeholder="Write an engaging introduction..." 
                    className="min-h-[200px]"
                    defaultValue="EmpowEra is dedicated to empowering women through education and economic opportunities. Our platform connects learners with instructors and provides a marketplace for women entrepreneurs."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Format text using the toolbar. Maximum 500 characters.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="intro-enabled" defaultChecked />
                  <Label htmlFor="intro-enabled">Enable intro section</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* About Us Section */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info size={18} /> About Us Section
              </CardTitle>
              <CardDescription>
                Tell your visitors about your organization and mission.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="about-title">Section Title</Label>
                <Input id="about-title" defaultValue="About EmpowEra" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="about-text">About Text</Label>
                  <Textarea 
                    id="about-text" 
                    className="min-h-[200px]"
                    defaultValue="EmpowEra is a social enterprise dedicated to the economic empowerment of women worldwide. We provide educational resources, skills development, and marketplace opportunities to help women achieve financial independence."
                  />
                </div>
                <div>
                  <Label className="mb-2 block">About Image</Label>
                  <div className="border rounded-md p-4">
                    <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center">
                      <ImagePlus className="text-muted-foreground" />
                    </div>
                    <Input type="file" accept=".jpg,.jpeg,.png" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended size: 600x400px
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="video-url">Video Embed URL (optional)</Label>
                    <Input id="video-url" placeholder="https://www.youtube.com/embed/..." />
                    <p className="text-xs text-muted-foreground mt-1">
                      YouTube or Vimeo embed URL
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Mission Section */}
        <TabsContent value="mission">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target size={18} /> Our Mission
              </CardTitle>
              <CardDescription>
                Explain your organization's purpose and mission.
              </CardDescription>  
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="mission-title">Mission Title</Label>
                <Input id="mission-title" defaultValue="Our Mission & Vision" />
              </div>
              <div>
                <Label htmlFor="mission-text">Mission Text</Label>
                <Textarea 
                  id="mission-text" 
                  className="min-h-[200px]"
                  defaultValue="To create economic and educational opportunities for women worldwide, with a focus on developing regions. We envision a world where all women have access to the resources they need to achieve financial independence."
                />
              </div>
              <div>
                <Label className="mb-2 block">Background Image</Label>
                <div className="border rounded-md p-4">
                  <div className="aspect-[3/1] bg-muted rounded-md mb-2 flex items-center justify-center">
                    <ImagePlus className="text-muted-foreground" />
                  </div>
                  <Input type="file" accept=".jpg,.jpeg,.png" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Recommended size: 1920x600px
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="mission-animation">Animation Style</Label>
                <select 
                  id="mission-animation" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="none">None</option>
                  <option value="fade-in">Fade In</option>
                  <option value="slide-up">Slide Up</option>
                  <option value="zoom-in">Zoom In</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* More tab content would be added here for the remaining tabs */}
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers size={18} /> Our Services
              </CardTitle>
              <CardDescription>
                Showcase the services your organization provides.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((index) => (
                    <Card key={index} className="border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex justify-between items-center">
                          <span>Service {index}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                            <Trash2 size={14} />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-0">
                        <div>
                          <Label htmlFor={`service-icon-${index}`}>Icon</Label>
                          <select 
                            id={`service-icon-${index}`} 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="education">Education</option>
                            <option value="shopping">Shopping</option>
                            <option value="community">Community</option>
                            <option value="support">Support</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor={`service-title-${index}`}>Title</Label>
                          <Input id={`service-title-${index}`} placeholder="Service Title" defaultValue={`Service ${index}`} />
                        </div>
                        <div>
                          <Label htmlFor={`service-desc-${index}`}>Description</Label>
                          <Textarea 
                            id={`service-desc-${index}`} 
                            placeholder="Service description" 
                            className="h-20"
                            defaultValue="Short description of this service offering."
                          />
                        </div>
                        <div>
                          <Label htmlFor={`service-color-${index}`}>Background Color</Label>
                          <div className="flex gap-2">
                            <Input id={`service-color-${index}`} type="color" defaultValue="#ffffff" className="w-16 h-10" />
                            <Input id={`service-color-hex-${index}`} defaultValue="#ffffff" className="flex-1" />
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <Button variant="outline" size="sm" className="flex gap-1 items-center">
                            <MoveVertical size={14} /> Reorder
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="flex justify-center items-center border border-dashed rounded-md p-8 h-full">
                    <Button variant="outline" className="flex gap-2">
                      <Layers size={14} />
                      Add New Service
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Additional tabs would be implemented similarly */}
      </Tabs>
    </div>
  );
};

export default HomeDesign;
