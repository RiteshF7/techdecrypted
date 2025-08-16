import { supabase } from "../../../utils/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log('Testing Supabase connection...');
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    
    // Test 1: Basic connection
    console.log('Test 1: Testing basic connection...');
    const { data: basicTest, error: basicError } = await supabase
      .from('views')
      .select('count')
      .limit(1);
    
    if (basicError) {
      console.error('Basic connection test failed:', basicError);
      return NextResponse.json({ 
        status: 'error', 
        message: 'Basic connection failed',
        error: basicError.message,
        code: basicError.code
      });
    }
    
    console.log('Basic connection successful, data:', basicTest);
    
    // Test 2: Check if views table has data
    console.log('Test 2: Checking views table...');
    const { data: viewsData, error: viewsError } = await supabase
      .from('views')
      .select('*');
    
    if (viewsError) {
      console.error('Views table query failed:', viewsError);
      return NextResponse.json({ 
        status: 'partial_error', 
        message: 'Basic connection works but views table query failed',
        basicConnection: 'success',
        viewsTableError: viewsError.message,
        code: viewsError.code
      });
    }
    
    console.log('Views table query successful, rows:', viewsData?.length || 0);
    
    // Test 3: Check if view_analytics table works
    console.log('Test 3: Checking view_analytics table...');
    const { data: analyticsData, error: analyticsError } = await supabase
      .from('view_analytics')
      .select('*')
      .limit(1);
    
    if (analyticsError) {
      console.error('View_analytics table query failed:', analyticsError);
      return NextResponse.json({ 
        status: 'partial_error', 
        message: 'Basic connection and views table work, but view_analytics table failed',
        basicConnection: 'success',
        viewsTable: 'success',
        analyticsTableError: analyticsError.message,
        code: analyticsError.code
      });
    }
    
    console.log('View_analytics table query successful, rows:', analyticsData?.length || 0);
    
    // All tests passed
    return NextResponse.json({ 
      status: 'success', 
      message: 'All Supabase connections working',
      viewsTableRows: viewsData?.length || 0,
      analyticsTableRows: analyticsData?.length || 0,
      sampleData: {
        views: viewsData?.slice(0, 2) || [],
        analytics: analyticsData?.slice(0, 2) || []
      }
    });
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: error.message 
    });
  }
}
