import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { student_name, father_name, phone, email, class_applying, branch_id, course_id, branch_name, course_name, message } = body

    if (!student_name || !father_name || !phone || !class_applying) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const phoneRegex = /^03\d{9}$/
    if (!phoneRegex.test(phone)) {
      return Response.json({ error: 'Invalid Pakistani phone number (03XXXXXXXXX)' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('admissions')
      .insert({
        student_name,
        father_name,
        phone,
        email: email || null,
        class_applying,
        branch_id: branch_id || null,
        course_id: course_id || null,
        message: message || `Branch: ${branch_name || 'N/A'}, Course: ${course_name || 'N/A'}`,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ success: true, data }, { status: 201 })
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
