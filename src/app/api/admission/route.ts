import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest } from 'next/server'
import { addAdmission, type LocalAdmission } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { student_name, father_name, phone, email, class_applying, branch_id, course_id, branch_name, course_name } = body

    if (!student_name || !father_name || !phone || !class_applying) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const phoneRegex = /^03\d{9}$/
    if (!phoneRegex.test(phone)) {
      return Response.json({ error: 'Invalid Pakistani phone number (03XXXXXXXXX)' }, { status: 400 })
    }

    // Prepare admission data (omitting id as it is handled by database defaults)
    const admissionData: Omit<LocalAdmission, 'id'> = {
      student_name: student_name.trim(),
      father_name: father_name.trim(),
      phone: phone.replace(/\D/g, ''), // Keep only digits
      email: email?.trim() || null,
      class_applying: class_applying,
      branch_id: branch_id || null,
      course_id: course_id || null,
      message: `Branch: ${branch_name || 'N/A'}, Course: ${course_name || 'N/A'}`,
      status: 'pending',
      applied_at: new Date().toISOString(),
    }

    // Use the db.ts function which properly handles database defaults
    await addAdmission(admissionData)

    return Response.json({ success: true }, { status: 201 })
  } catch (error: any) {
    console.error('Admission submission error:', error)
    return Response.json({ error: error.message || 'Failed to submit admission' }, { status: 500 })
  }
}
