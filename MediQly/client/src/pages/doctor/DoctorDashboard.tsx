import { useAuth } from "@/auth/AuthProvider";
import MainLayout from "@/components/layout/MainLayoutdoctor";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MessageSquare, Star, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const { currentDoctor } = useAuth();

  const stats = [
    {
      title: "Total Patients",
      value: "124",
      icon: Users,
      trend: "+12%",
      color: "text-blue-500",
    },
    {
      title: "Consultations",
      value: "48",
      icon: MessageSquare,
      trend: "+8%",
      color: "text-green-500",
    },
    {
      title: "Rating",
      value: "4.8",
      icon: Star,
      trend: "+0.2",
      color: "text-yellow-500",
    },
    {
      title: "Response Rate",
      value: "95%",
      icon: Activity,
      trend: "+3%",
      color: "text-purple-500",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold primary-grad">
                Welcome back, Dr. {currentDoctor?.firstName}
              </h1>
              <p className="text-gray-500 mt-1">Here's your practice overview</p>
            </div>
           
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    <p className="text-sm text-green-500 mt-1">{stat.trend}</p>
                  </div>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </Card>
            ))}
          </div>

          {/* Chat with Doctor */}
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" className="w-64">
              <Link to="/chatdoctor" className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" /> Chat with Doctor
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorDashboard;
