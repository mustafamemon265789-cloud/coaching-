'use client'

import { useState } from 'react'
import { useToast } from '@/components/admin/ToastProvider'
import { Save, Globe, Phone, Mail, MapPin, MessageCircle, Hash, Type, FileText } from 'lucide-react'

type Settings = Record<string, string>

const defaultSettings: Settings = {
  instituteName: 'Sir Azan Coaching Center',
  tagline: 'Excellence in Education, Rooted in Values',
  heroHeadline: 'Unlock Your Academic Potential with Expert Guidance',
  heroSubheadline: 'Personalized coaching for Matric, Intermediate, and Competitive Exams across Pakistan',
  primaryPhone: '+92 333 1234567',
  secondaryPhone: '+92 333 7654321',
  email: 'info@azancoaching.edu.pk',
  address: 'Main Boulevard, Block B, near Al-Faisal Market, Gulberg III, Lahore, Punjab',
  whatsappNumber: '+92 333 1234567',
  facebookUrl: 'https://facebook.com/azancoaching',
  twitterUrl: 'https://twitter.com/azancoaching',
  instagramUrl: 'https://instagram.com/azancoaching',
  youtubeUrl: 'https://youtube.com/@azancoaching',
  studentsEnrolled: '1200+',
  successRate: '98%',
  numberOfBranches: '3',
  yearsOfExcellence: '10+',
}

const inputCls = 'rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1A3C8F] focus:ring-1 focus:ring-[#1A3C8F] outline-none w-full'

export default function SettingsPage() {
  const { showToast } = useToast()
  const [settings, setSettings] = useState<Settings>({ ...defaultSettings })

  const update = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    showToast('success', 'All settings saved successfully.')
  }


  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>

      {/* Section 1 — Brand & Identity */}
      <section className="rounded-xl border bg-white shadow-sm p-6 space-y-5">
        <div className="flex items-center gap-2 text-[#1A3C8F] font-semibold text-lg">
          <Globe size={20} />
          <h2>Brand &amp; Identity</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><Type size={14} />Institute Name</label>
            <input className={inputCls} value={settings.instituteName} onChange={e => update('instituteName', e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><Type size={14} />Tagline</label>
            <input className={inputCls} value={settings.tagline} onChange={e => update('tagline', e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><Type size={14} />Hero Headline</label>
            <input className={inputCls} value={settings.heroHeadline} onChange={e => update('heroHeadline', e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><Type size={14} />Hero Subheadline</label>
            <input className={inputCls} value={settings.heroSubheadline} onChange={e => update('heroSubheadline', e.target.value)} />
          </div>
        </div>
      </section>

      {/* Section 2 — Contact Info */}
      <section className="rounded-xl border bg-white shadow-sm p-6 space-y-5">
        <div className="flex items-center gap-2 text-[#1A3C8F] font-semibold text-lg">
          <Phone size={20} />
          <h2>Contact Info</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><Phone size={14} />Primary Phone</label>
            <input className={inputCls} value={settings.primaryPhone} onChange={e => update('primaryPhone', e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><Phone size={14} />Secondary Phone</label>
            <input className={inputCls} value={settings.secondaryPhone} onChange={e => update('secondaryPhone', e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><Mail size={14} />Email</label>
            <input className={inputCls} value={settings.email} onChange={e => update('email', e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><MessageCircle size={14} />WhatsApp Number</label>
            <input className={inputCls} value={settings.whatsappNumber} onChange={e => update('whatsappNumber', e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><MapPin size={14} />Address</label>
            <textarea className={inputCls} rows={3} value={settings.address} onChange={e => update('address', e.target.value)} />
          </div>
        </div>
        <div className="pt-2">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Social Media Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><Hash size={14} />Facebook URL</label>
              <input className={inputCls} value={settings.facebookUrl} onChange={e => update('facebookUrl', e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><Hash size={14} />Twitter URL</label>
              <input className={inputCls} value={settings.twitterUrl} onChange={e => update('twitterUrl', e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><Hash size={14} />Instagram URL</label>
              <input className={inputCls} value={settings.instagramUrl} onChange={e => update('instagramUrl', e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><Hash size={14} />YouTube URL</label>
              <input className={inputCls} value={settings.youtubeUrl} onChange={e => update('youtubeUrl', e.target.value)} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Home Page Stats */}
      <section className="rounded-xl border bg-white shadow-sm p-6 space-y-5">
        <div className="flex items-center gap-2 text-[#1A3C8F] font-semibold text-lg">
          <FileText size={20} />
          <h2>Home Page Stats</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><Hash size={14} />Students Enrolled</label>
            <input className={inputCls} value={settings.studentsEnrolled} onChange={e => update('studentsEnrolled', e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><Hash size={14} />Success Rate</label>
            <input className={inputCls} value={settings.successRate} onChange={e => update('successRate', e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><Hash size={14} />Number of Branches</label>
            <input className={inputCls} value={settings.numberOfBranches} onChange={e => update('numberOfBranches', e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700"><Hash size={14} />Years of Excellence</label>
            <input className={inputCls} value={settings.yearsOfExcellence} onChange={e => update('yearsOfExcellence', e.target.value)} />
          </div>
        </div>
      </section>


      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#1A3C8F] hover:bg-[#15306e] text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm"
        >
          <Save size={16} />
          Save All Settings
        </button>
      </div>
    </div>
  )
}
