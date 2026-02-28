"use client";

import { useState } from 'react';

const presets = [55000, 100000, 300000, 500000];

function formatVND(n: number) {
  return (n / 1000).toFixed(0) + 'k VND';
}

const paymentMethods = [
  { id: 'qr', label: 'QR Code', icon: '📱' },
  { id: 'card', label: 'Card', icon: '💳' },
  { id: 'momo', label: 'Momo', icon: '💜' },
];

const recentDonors = [
  { name: 'Hà Linh', amount: 100000, time: '2 phút trước', initial: 'HL' },
  { name: 'Jane Doe', amount: 300000, time: '15 phút trước', initial: 'JD' },
  { name: 'Nguyễn Tú', amount: 55000, time: '1 giờ trước', initial: 'NT' },
];

type FormState = 'idle' | 'loading' | 'success';

export default function DonationForm() {
  const [tab, setTab] = useState<'one-time' | 'monthly'>('one-time');
  const [selected, setSelected] = useState(100000);
  const [custom, setCustom] = useState('');
  const [payment, setPayment] = useState('qr');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const effectiveAmount = custom ? parseInt(custom) || 0 : selected;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormState('loading');
    await new Promise((r) => setTimeout(r, 1500));
    setFormState('success');
  };

  if (formState === 'success') {
    return (
      <section id="donation-form" className="w-full bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 md:p-14">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🐾</div>
            <h2 className="font-heading font-black text-[28px] text-gray-900 mb-3">Thank You!</h2>
            <p className="font-menu text-gray-500 text-[15px] mb-6 leading-relaxed">
              Your donation of <strong className="text-[#F07C3D]">{effectiveAmount.toLocaleString('vi-VN')} VND</strong> is being processed. You&apos;ll receive a confirmation email shortly.
            </p>
            <p className="font-menu text-gray-400 text-[13px] mb-8">Donation ID: <strong>#DON-{Date.now().toString().slice(-6)}</strong></p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/" className="font-heading bg-[#F07C3D] hover:bg-[#F07C3D] text-white px-8 py-3 rounded-xl font-bold text-[14px] transition">
                Back to Home
              </a>
              <button onClick={() => setFormState('idle')} className="font-heading border-2 border-gray-200 hover:border-orange-300 text-gray-700 px-8 py-3 rounded-xl font-bold text-[14px] transition">
                Donate Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="donation-form" className="w-full bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="text-center mb-10">
          <h2 className="font-heading font-black text-[26px] md:text-[32px] text-gray-900 mb-2">Make a Donation</h2>
          <p className="font-menu text-gray-400 text-[15px]">Every contribution makes a real difference in a pet&apos;s life.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT: FORM */}
          <form onSubmit={handleSubmit} noValidate className="flex-1 space-y-6">
            {/* Card: Frequency + Amount */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                {(['one-time', 'monthly'] as const).map((t) => (
                  <button key={t} type="button" onClick={() => setTab(t)}
                    className={`flex-1 py-2.5 rounded-xl font-heading font-bold text-[14px] border-2 transition-all
                      ${tab === t ? 'bg-[#F07C3D] border-[#F07C3D] text-white shadow-sm' : 'border-gray-200 text-gray-600 hover:border-orange-200'}`}>
                    {t === 'one-time' ? 'One-time' : 'Monthly'}
                  </button>
                ))}
              </div>

              {/* Preset amounts */}
              <div className="flex flex-wrap gap-2.5 mb-4">
                {presets.map((amt) => (
                  <button key={amt} type="button"
                    onClick={() => { setSelected(amt); setCustom(''); }}
                    className={`px-4 py-2 rounded-xl font-heading font-bold text-[13px] border-2 transition-all
                      ${selected === amt && !custom ? 'bg-[#F07C3D] border-[#F07C3D] text-white' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>
                    {formatVND(amt)}
                  </button>
                ))}
              </div>

              <input type="number" placeholder="Custom amount (VND)" value={custom}
                onChange={(e) => { setCustom(e.target.value); setSelected(0); }}
                className="w-full border-2 border-gray-200 focus:border-orange-400 rounded-xl px-4 py-3 font-menu text-[14px] text-gray-700 outline-none transition"
              />
            </div>

            {/* Card: Your Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h3 className="font-heading font-bold text-gray-800 text-[16px] mb-5 flex items-center gap-2">
                <span className="w-6 h-6 bg-orange-100 text-[#F07C3D] rounded-full flex items-center justify-center text-[12px] font-black">2</span>
                Your Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <input type="text" placeholder="Full Name *" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full border-2 rounded-xl px-4 py-3 font-menu text-[14px] text-gray-700 outline-none transition ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-orange-400'}`}
                  />
                  {errors.name && <p className="text-red-400 text-[12px] mt-1 font-menu">{errors.name}</p>}
                </div>
                <div>
                  <input type="email" placeholder="Email Address *" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full border-2 rounded-xl px-4 py-3 font-menu text-[14px] text-gray-700 outline-none transition ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-orange-400'}`}
                  />
                  {errors.email && <p className="text-red-400 text-[12px] mt-1 font-menu">{errors.email}</p>}
                </div>
                <div>
                  <input type="tel" placeholder="Phone Number *" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`w-full border-2 rounded-xl px-4 py-3 font-menu text-[14px] text-gray-700 outline-none transition ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-orange-400'}`}
                  />
                  {errors.phone && <p className="text-red-400 text-[12px] mt-1 font-menu">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <textarea placeholder="Message (optional)" value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    className="w-full border-2 border-gray-200 focus:border-orange-400 rounded-xl px-4 py-3 font-menu text-[14px] text-gray-700 outline-none transition resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Card: Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h3 className="font-heading font-bold text-gray-800 text-[16px] mb-5 flex items-center gap-2">
                <span className="w-6 h-6 bg-orange-100 text-[#F07C3D] rounded-full flex items-center justify-center text-[12px] font-black">3</span>
                Payment Method
              </h3>
              <div className="flex gap-3">
                {paymentMethods.map((m) => (
                  <button key={m.id} type="button" onClick={() => setPayment(m.id)}
                    className={`flex-1 py-3.5 rounded-xl border-2 flex flex-col items-center gap-1.5 font-heading text-[13px] font-bold transition-all
                      ${payment === m.id ? 'border-[#F07C3D] bg-orange-50 text-[#F07C3D]' : 'border-gray-200 text-gray-600 hover:border-orange-200'}`}>
                    <span className="text-xl">{m.icon}</span>
                    {m.label}
                    {payment === m.id && (
                      <span className="w-4 h-4 bg-[#F07C3D] rounded-full flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="white"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* RIGHT: SUMMARY + RECENT DONORS */}
          <div className="w-full lg:w-[320px] flex flex-col gap-5 lg:sticky lg:top-6">
            {/* Donation Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-heading font-bold text-gray-800 text-[16px] mb-5">Donation Summary</h3>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between font-menu text-[14px]">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-bold text-gray-800">{effectiveAmount.toLocaleString('vi-VN')} VND</span>
                </div>
                <div className="flex justify-between font-menu text-[14px]">
                  <span className="text-gray-500">Frequency</span>
                  <span className="font-bold text-gray-800 capitalize">{tab === 'one-time' ? 'One-time' : 'Monthly'}</span>
                </div>
                <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-menu text-[15px]">
                  <span className="text-gray-700 font-semibold">Total</span>
                  <span className="font-black text-[#F07C3D] text-[17px]">{effectiveAmount.toLocaleString('vi-VN')} VND</span>
                </div>
              </div>
              <button
                type="submit"
                form="donate-form"
                onClick={handleSubmit as any}
                disabled={formState === 'loading' || effectiveAmount <= 0}
                className="w-full bg-[#F07C3D] hover:bg-[#F07C3D] disabled:opacity-50 disabled:cursor-not-allowed transition text-white font-heading font-bold py-3.5 rounded-xl text-[15px] shadow hover:shadow-md"
              >
                {formState === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/><path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>
                    Processing...
                  </span>
                ) : 'Complete Donation'}
              </button>
            </div>

            {/* Recent Donors */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-heading font-bold text-gray-800 text-[15px] mb-4">Recent Donors</h3>
              <div className="space-y-3.5">
                {recentDonors.map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-orange-100 text-[#F07C3D] rounded-full flex items-center justify-center font-heading font-black text-[12px] flex-shrink-0">
                      {d.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-menu font-semibold text-gray-800 text-[13px] truncate">{d.name}</p>
                      <p className="font-menu text-gray-400 text-[11px]">{d.time}</p>
                    </div>
                    <span className="font-heading font-bold text-[#F07C3D] text-[13px] flex-shrink-0">
                      +{(d.amount / 1000).toFixed(0)}k
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
