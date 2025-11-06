import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Trophy, Gift, Download, Smartphone, Star, Award, Zap } from 'lucide-react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

interface UserData {
  id: string;
  display_name: string | null;
  rank: string | null;
  elo_rating: number | null;
  avatar_url: string | null;
}

const UserProfile = () => {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get('ref');
  
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setError('User ID not provided');
        setLoading(false);
        return;
      }

      try {
        // Try to find user by UUID first, then by custom ID/username
        let { data, error: fetchError } = await supabase
          .from('users')
          .select('id, display_name, rank, elo_rating, avatar_url')
          .eq('id', userId)
          .maybeSingle();

        // If not found by UUID, try searching by username or custom ID
        if (!data && userId) {
          const { data: userData, error: usernameError } = await supabase
            .from('users')
            .select('id, display_name, rank, elo_rating, avatar_url')
            .or(`username.eq.${userId},id.ilike.%${userId}%`)
            .limit(1)
            .maybeSingle();
          
          data = userData;
          fetchError = usernameError;
        }

        if (fetchError) throw fetchError;
        
        setUser(data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    // Track referral click for server-side matching
    const trackReferralClick = async () => {
      if (refCode && userId) {
        try {
          // Get device fingerprint
          const fp = await FingerprintJS.load();
          const result = await fp.get();
          const fingerprint = result.visitorId;
          
          // Get IP and User Agent (IP will be captured by backend)
          const userAgent = navigator.userAgent;
          const sourceUrl = window.location.href;
          
          console.log('🔍 Tracking referral click:', { refCode, userId, fingerprint });
          
          // Call Supabase RPC to track click
          const { data, error } = await supabase.rpc('track_referral_click', {
            p_referral_code: refCode,
            p_target_user_id: userId,
            p_device_fingerprint: fingerprint,
            p_ip_address: '', // Will be captured by backend from request
            p_user_agent: userAgent,
            p_source_url: sourceUrl,
            p_utm_params: null
          });
          
          if (error) {
            console.error('❌ Error tracking referral:', error);
          } else {
            console.log('✅ Referral click tracked:', data);
          }
        } catch (err) {
          console.error('❌ Error getting fingerprint:', err);
        }
      }
    };
    
    trackReferralClick();
    
    // Also store in localStorage as backup
    if (refCode) {
      localStorage.setItem('saboarena_referral_code', refCode);
      localStorage.setItem('saboarena_referral_timestamp', Date.now().toString());
    }

    // Try to open app with deep link
    if (userId || refCode) {
      const deepLinkBase = `saboarena://user/${userId}`;
      const deepLink = refCode ? `${deepLinkBase}?ref=${refCode}` : deepLinkBase;
      
      // Attempt to open the app
      window.location.href = deepLink;
      
      // If app doesn't open, user will stay on this page
      setTimeout(() => {
        console.log('App not detected, staying on landing page');
      }, 2000);
    }
  }, [userId, refCode]);

  const appStoreUrl = 'https://apps.apple.com/us/app/sabo-arena/id6753811170';
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.saboarena.app';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading profile...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>{error || 'User not found'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayRefCode = refCode;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl relative z-10 border-0 bg-white/95 backdrop-blur-sm">
        {/* Hero Header with Avatar */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-t-xl"></div>
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            {user.avatar_url ? (
              <img 
                src={user.avatar_url} 
                alt={user.display_name || 'User'} 
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
                <span className="text-white text-5xl font-bold">
                  {user.display_name ? user.display_name.charAt(0).toUpperCase() : <User className="w-16 h-16 text-white" />}
                </span>
              </div>
            )}
          </div>
        </div>

        <CardHeader className="text-center pt-20 pb-4">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {user.display_name || 'SABO Player'}
          </CardTitle>
          <CardDescription className="text-lg mt-3">
            <div className="flex items-center justify-center gap-3 mt-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="font-semibold text-gray-700">{user.rank || 'Người mới'}</span>
            </div>
            <div className="mt-2">
              <Badge variant="secondary" className="text-base px-4 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 border-amber-300">
                ⭐ ELO: {user.elo_rating || 1000}
              </Badge>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 px-6 pb-6">
          {displayRefCode && (
            <Card className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-2 border-green-300 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center justify-center gap-2 text-emerald-800">
                  <Gift className="w-6 h-6" />
                  Bạn được mời tham gia SABO Arena!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Mã giới thiệu của bạn:</p>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 py-4 bg-white rounded-xl border-2 border-dashed border-purple-400 shadow-inner">
                    {displayRefCode}
                  </div>
                </div>
                
                {/* Reward badges */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg p-3 border border-amber-300">
                    <div className="text-2xl font-bold text-amber-900">50 SPA</div>
                    <div className="text-xs text-amber-800 font-medium">Thưởng khởi đầu</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg p-3 border border-purple-300">
                    <div className="text-2xl font-bold text-purple-900">+50 SPA</div>
                    <div className="text-xs text-purple-800 font-medium">Thưởng giới thiệu</div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-center shadow-lg">
                  <div className="text-white font-bold text-lg">🎉 TỔNG CỘNG 100 SPA! 🎉</div>
                  <div className="text-green-100 text-sm mt-1">Hoàn thành đăng ký để nhận thưởng</div>
                </div>

                <div className="text-center text-xs text-gray-500 mt-2">
                  💡 Người giới thiệu bạn cũng nhận thêm 50 SPA
                </div>
              </CardContent>
            </Card>
          )}

          {!displayRefCode && (
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-blue-900 mb-2">50 SPA</div>
                <p className="text-sm text-blue-700">Thưởng chào mừng khi hoàn thành đăng ký!</p>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3 mt-6">
            <p className="text-center text-sm text-gray-700 font-bold uppercase tracking-wide">
              Tải ứng dụng ngay
            </p>
            
            <Button 
              onClick={() => window.location.href = appStoreUrl}
              className="w-full bg-black hover:bg-gray-900 text-white py-7 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              size="lg"
            >
              <Smartphone className="w-6 h-6 mr-3" />
              <div className="text-left">
                <div className="text-xs opacity-80">Tải miễn phí trên</div>
                <div className="text-base font-bold">App Store</div>
              </div>
            </Button>
            
            <Button 
              onClick={() => window.location.href = playStoreUrl}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-7 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              size="lg"
            >
              <Download className="w-6 h-6 mr-3" />
              <div className="text-left">
                <div className="text-xs opacity-90">Tải miễn phí trên</div>
                <div className="text-base font-bold">Google Play</div>
              </div>
            </Button>
          </div>

          <div className="pt-6 border-t-2 border-gray-200 mt-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50">
                <Trophy className="w-10 h-10 mx-auto text-amber-600 mb-2" />
                <p className="text-xs text-gray-700 font-bold">Thi đấu</p>
                <p className="text-xs text-gray-500">Xếp hạng ELO</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50">
                <Gift className="w-10 h-10 mx-auto text-purple-600 mb-2" />
                <p className="text-xs text-gray-700 font-bold">Thưởng SPA</p>
                <p className="text-xs text-gray-500">Đổi quà hấp dẫn</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                <User className="w-10 h-10 mx-auto text-blue-600 mb-2" />
                <p className="text-xs text-gray-700 font-bold">Cộng đồng</p>
                <p className="text-xs text-gray-500">Kết nối tay cơ</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
