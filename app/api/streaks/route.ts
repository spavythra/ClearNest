import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function GET(request: NextRequest) {
  try {
    // If Supabase is not configured, return mock data
    if (!supabase) {
      return NextResponse.json([
        {
          id: "1",
          title: "Drink Water",
          current_streak: 5,
          longest_streak: 12,
          last_completed: new Date().toISOString(),
          family_id: "demo-family"
        },
        {
          id: "2",
          title: "Exercise",
          current_streak: 3,
          longest_streak: 8,
          last_completed: new Date().toISOString(),
          family_id: "demo-family"
        }
      ])
    }

    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const { data: user, error: userError } = await supabase.auth.getUser(token)

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: streaks, error } = await supabase
      .from("streaks")
      .select("*")
      .eq("family_id", request.nextUrl.searchParams.get("family_id"))

    if (error) throw error

    return NextResponse.json(streaks)
  } catch (error) {
    console.error("Error fetching streaks:", error)
    return NextResponse.json(
      { error: "Failed to fetch streaks" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")
    const { data: user, error: userError } = await supabase!.auth.getUser(token)

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const { data: streak, error } = await supabase!
      .from("streaks")
      .insert([
        {
          family_id: body.family_id,
          name: body.name,
          description: body.description,
          daily_reset_hour: body.daily_reset_hour || 0,
          created_by: user.user.id,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(streak[0])
  } catch (error) {
    console.error("Error creating streak:", error)
    return NextResponse.json(
      { error: "Failed to create streak" },
      { status: 500 }
    )
  }
}
