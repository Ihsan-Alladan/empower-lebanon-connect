
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Package, 
  Calendar, 
  DollarSign, 
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data for charts
const userActivityData = [
  { name: 'Jan', users: 45 },
  { name: 'Feb', users: 52 },
  { name: 'Mar', users: 49 },
  { name: 'Apr', users: 63 },
  { name: 'May', users: 71 },
  { name: 'Jun', users: 83 },
  { name: 'Jul', users: 78 },
  { name: 'Aug', users: 94 },
];

const donationData = [
  { name: 'Jan', amount: 2400 },
  { name: 'Feb', amount: 1398 },
  { name: 'Mar', amount: 3800 },
  { name: 'Apr', amount: 3908 },
  { name: 'May', amount: 4800 },
  { name: 'Jun', amount: 3800 },
  { name: 'Jul', amount: 4300 },
  { name: 'Aug', amount: 5300 },
];

const categoryDistributionData = [
  { name: 'Handmade', value: 42 },
  { name: 'Technology', value: 28 },
  { name: 'Art', value: 15 },
  { name: 'Other', value: 15 },
];

const COLORS = ['#1EAEDB', '#33C3F0', '#87CEEB', '#0A2463'];

// Card variants for animation
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    }
  })
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-empower-brown mb-6">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { title: 'Total Users', value: '1,284', icon: <Users className="text-empower-terracotta" />, change: '+12%' },
            { title: 'Active Courses', value: '87', icon: <BookOpen className="text-empower-terracotta" />, change: '+5%' },
            { title: 'Shop Products', value: '153', icon: <Package className="text-empower-terracotta" />, change: '+8%' },
            { title: 'Upcoming Events', value: '12', icon: <Calendar className="text-empower-terracotta" />, change: '+2' },
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{item.title}</p>
                    <p className="text-2xl font-bold">{item.value}</p>
                    <div className="flex items-center text-xs text-green-500 mt-1">
                      <TrendingUp size={12} />
                      <span className="ml-1">{item.change}</span>
                    </div>
                  </div>
                  <div className="bg-slate-100 p-3 rounded-full">
                    {item.icon}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={cardVariants}
          custom={4}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#1EAEDB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          variants={cardVariants}
          custom={5}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={donationData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => `$${value}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#1EAEDB" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          variants={cardVariants}
          custom={6}
          initial="hidden"
          animate="visible"
          className="lg:col-span-1"
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Course Categories</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value} courses`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          variants={cardVariants}
          custom={7}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Latest Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: 'Emily Johnson', action: 'registered as a new user', time: '5 minutes ago' },
                  { user: 'Michael Smith', action: 'submitted a new course', time: '2 hours ago' },
                  { user: 'Sarah Wilson', action: 'made a donation of $250', time: '5 hours ago' },
                  { user: 'David Brown', action: 'registered for Women in Tech workshop', time: '1 day ago' },
                  { user: 'Jessica Miller', action: 'added 3 products to the shop', time: '2 days ago' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start space-x-4 p-3 rounded-md hover:bg-slate-50 transition-colors">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <Users size={16} className="text-empower-terracotta" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
