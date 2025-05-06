
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings, Coffee } from 'lucide-react';

const Account = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-coffee-darker mb-8 flex items-center gap-3">
        <User className="h-8 w-8" />
        My Account
      </h1>
      
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={16} />
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Coffee size={16} />
              Coffee Preferences
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="john.doe@example.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                
                <Button className="mt-4 bg-coffee-dark hover:bg-coffee-darker">
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Coffee Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Your saved preferences will be applied to your coffees by default.
                </p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Coffee Strength</Label>
                    <div className="flex gap-4 flex-wrap">
                      {['Mild', 'Medium', 'Strong', 'Extra Strong'].map((strength) => (
                        <Button 
                          key={strength} 
                          variant={strength === 'Medium' ? 'default' : 'outline'}
                          className={strength === 'Medium' ? 'bg-coffee-dark hover:bg-coffee-darker' : ''}
                        >
                          {strength}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Milk Preference</Label>
                    <div className="flex gap-4 flex-wrap">
                      {['None', 'Regular', 'Oat', 'Almond', 'Soy'].map((milk) => (
                        <Button 
                          key={milk} 
                          variant={milk === 'Regular' ? 'default' : 'outline'}
                          className={milk === 'Regular' ? 'bg-coffee-dark hover:bg-coffee-darker' : ''}
                        >
                          {milk}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="mt-4 bg-coffee-dark hover:bg-coffee-darker">
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage your account settings and preferences.
                </p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Change Password</Label>
                    <Input id="password" type="password" placeholder="New password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                  </div>
                  
                  <Button className="mt-4 bg-coffee-dark hover:bg-coffee-darker">
                    Update Password
                  </Button>
                  
                  <div className="border-t pt-4 mt-6">
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
