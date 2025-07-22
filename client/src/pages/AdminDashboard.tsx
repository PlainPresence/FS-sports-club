import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useBookings } from '@/hooks/useBookings';
import { useAuthContext } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import BlockSlotModal from '@/components/BlockSlotModal';
import BlockDateModal from '@/components/BlockDateModal';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { logout } = useAuth();
  const { user } = useAuthContext();
  const [dateFilter, setDateFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [showBlockSlotModal, setShowBlockSlotModal] = useState(false);
  const [showBlockDateModal, setShowBlockDateModal] = useState(false);
  
  const { bookings, loading: bookingsLoading, refetch } = useBookings({
    dateFilter,
    searchFilter,
  });

  useEffect(() => {
    if (!user) {
      setLocation('/admin-access-sptp2024');
    }
  }, [user, setLocation]);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      setLocation('/admin-login');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to logout. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDateFilter = (date: string) => {
    setDateFilter(date);
  };

  const handleSearch = (query: string) => {
    setSearchFilter(query);
  };

  const handleBlockSlot = () => {
    setShowBlockSlotModal(true);
  };

  const handleBlockDate = () => {
    setShowBlockDateModal(true);
  };

  const handleModalSuccess = () => {
    refetch();
  };

  const handleExportData = () => {
    // TODO: Implement data export
    toast({
      title: 'Export Started',
      description: 'Your data export will begin shortly.',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTimeSlot = (timeSlot: string) => {
    return timeSlot.replace('-', ' - ').replace(/(\d{2}):(\d{2})/g, (match, hour, minute) => {
      const h = parseInt(hour);
      return `${h > 12 ? h - 12 : h || 12}:${minute} ${h >= 12 ? 'PM' : 'AM'}`;
    });
  };

  if (!user) {
    return <LoadingSpinner />;
  }

  // Calculate stats
  const today = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(booking => booking.date === today);
  const todayRevenue = todayBookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);
  const confirmedBookings = bookings.filter(booking => booking.paymentStatus === 'success');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-gray-600 mt-2">Manage bookings and facility availability</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Logged in as</div>
                    <div className="font-semibold">{user.email}</div>
                  </div>
                  <Button 
                    onClick={handleLogout}
                    variant="destructive"
                    className="px-4 py-2"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-calendar-check text-primary text-xl"></i>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{todayBookings.length}</div>
                  <div className="text-sm text-gray-600">Today's Bookings</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-rupee-sign text-green-600 text-xl"></i>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">₹{todayRevenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Today's Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-check-circle text-amber-600 text-xl"></i>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{confirmedBookings.length}</div>
                  <div className="text-sm text-gray-600">Confirmed Bookings</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-blue-600 text-xl"></i>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">₹{bookings.reduce((sum, b) => sum + (b.amount || 0), 0).toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-lg mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={handleBlockSlot}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 h-auto font-semibold transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-ban mr-2"></i>
                  Block Time Slot
                </Button>
                
                <Button 
                  onClick={handleBlockDate}
                  variant="destructive"
                  className="px-6 py-3 h-auto font-semibold transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-calendar-times mr-2"></i>
                  Block Full Date
                </Button>
                
                <Button 
                  onClick={handleExportData}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 h-auto font-semibold transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-download mr-2"></i>
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bookings Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">All Bookings</h2>
                <div className="mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  <Input 
                    type="date"
                    value={dateFilter}
                    onChange={(e) => handleDateFilter(e.target.value)}
                    className="h-10"
                    placeholder="Filter by date"
                  />
                  <Input 
                    type="text"
                    value={searchFilter}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search by phone or booking ID"
                    className="h-10 md:w-64"
                  />
                </div>
              </div>

              {bookingsLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="lg" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Booking ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sport</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bookings.map((booking: any) => (
                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.bookingId}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{booking.fullName}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{booking.mobile}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 capitalize">{booking.sportType}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{formatDate(booking.date)}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{formatTimeSlot(booking.timeSlot)}</td>
                          <td className="px-6 py-4 text-sm font-medium text-green-600">₹{booking.amount}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              booking.paymentStatus === 'success' 
                                ? 'bg-green-100 text-green-800'
                                : booking.paymentStatus === 'pending'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {booking.paymentStatus === 'success' ? 'Confirmed' : 
                               booking.paymentStatus === 'pending' ? 'Pending' : 'Failed'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {bookings.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No bookings found matching your criteria.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Modals */}
        <BlockSlotModal
          isOpen={showBlockSlotModal}
          onClose={() => setShowBlockSlotModal(false)}
          onSuccess={handleModalSuccess}
        />
        
        <BlockDateModal
          isOpen={showBlockDateModal}
          onClose={() => setShowBlockDateModal(false)}
          onSuccess={handleModalSuccess}
        />
      </div>
    </div>
  );
}
