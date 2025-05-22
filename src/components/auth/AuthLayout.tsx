
import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  footerText?: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  footerText
}) => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 container flex items-center justify-center py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>
            
            <Card className="border-empower-terracotta/20">
              {children}
              
              {footerText && (
                <CardFooter className="flex flex-col space-y-2 border-t p-4">
                  <div className="text-sm text-muted-foreground">
                    {footerText}
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default AuthLayout;
