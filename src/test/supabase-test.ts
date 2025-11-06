// Simple test to verify Supabase connection and data fetching
import { supabase } from "@/integrations/supabase/client";

export const testSupabaseConnection = async () => {
  try {
    console.log("🔗 Testing Supabase connection...");
    
    // Test 1: Basic connection
    const { data: healthCheck, error: healthError } = await supabase
      .from("users")
      .select("count")
      .limit(1);
    
    if (healthError) {
      console.error("❌ Supabase connection failed:", healthError);
      return false;
    }
    
    console.log("✅ Supabase connection successful");
    
    // Test 2: Test tournaments query
    const { data: tournaments, error: tournamentsError } = await supabase
      .from("tournaments")
      .select("id, title, status")
      .eq("status", "upcoming")
      .limit(3);
    
    if (tournamentsError) {
      console.error("❌ Tournaments query failed:", tournamentsError);
      return false;
    }
    
    console.log("✅ Tournaments query successful:", tournaments);
    
    // Test 3: Test users query  
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, display_name, rank")
      .eq("role", "player")
      .limit(3);
    
    if (usersError) {
      console.error("❌ Users query failed:", usersError);
      return false;
    }
    
    console.log("✅ Users query successful:", users);
    
    return true;
  } catch (error) {
    console.error("❌ Test failed with exception:", error);
    return false;
  }
};

// Auto-run test in dev mode
if (import.meta.env.DEV) {
  testSupabaseConnection();
}