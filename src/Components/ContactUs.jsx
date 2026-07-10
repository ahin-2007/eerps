import React, { useState } from "react";

const DIRECTORY = [
  { name: "Dr. T. Subash", role: "Principal", email: "principal@malankara.edu.in", phone: "+91 94432 10101", office: "Main Block, Room 102" },
  { name: "Rev. Fr. Franklin Jose", role: "Secretary / Correspondent", email: "secretary@malankara.edu.in", phone: "+91 94432 10102", office: "Admin Block, Room 101" },
  { name: "Mrs. A. Stella", role: "Admin Office Superintendent", email: "office@malankara.edu.in", phone: "+91 4651 228220", office: "Admin Block, Counter 2" },
  { name: "Dr. K. Rajkumar", role: "CSE Department Head", email: "hod.cse@malankara.edu.in", phone: "+91 98431 22334", office: "Science Block, CSE Dept" },
  { name: "Mr. P. Ramesh", role: "Bus/Transport Coordinator", email: "transport@malankara.edu.in", phone: "+91 94862 33445", office: "Transport Office, Bus Yard" },
  { name: "Mr. S. Albert", role: "Controller of Examinations", email: "coe@malankara.edu.in", phone: "+91 94883 44556", office: "Exam Cell, Block B" }
];

const FAQS = [
  {
    q: "How do I request a bus route change or update my bus pass?",
    a: "You can request a change in your bus route by downloading the 'Bus Route Change Request Form' from the Bus Tracking panel or visiting the Transport Coordinator at the Transport Office (Bus Yard). A revised pass will be issued, and fee updates (if any) will be adjusted in your term fee."
  },
  {
    q: "Where and how can I pay my semester exam fees?",
    a: "Semester exam fees can be paid online through the EERPS student portal under the 'Fees' module, or via net banking. Alternatively, you can pay by cash or DD at Counter 3 in the Admin Office. Be sure to retain the receipt and submit a copy to your class advisor."
  },
  {
    q: "What is the procedure to request official transcripts/bonafide certificates?",
    a: "To obtain a Bonafide Certificate or Transcript, write an application letter addressed to the Principal. Submit the letter to Counter 2 in the Admin Office. Certificates are typically processed and can be collected within 2 working days."
  },
  {
    q: "How is student attendance recorded and calculated?",
    a: "Attendance is registered hourly by respective class lecturers. You need a minimum of 75% attendance to be eligible to write the end-semester examinations. You can view your real-time attendance percentages in the Attendance tab."
  }
];

export default function ContactUs() {
  // Support Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDept, setFormDept] = useState("Admin Office");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Search State for staff directory
  const [searchQuery, setSearchQuery] = useState("");

  // FAQ state
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setFormName("");
      setFormEmail("");
      setFormDept("Admin Office");
      setFormSubject("");
      setFormMessage("");

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    alert(`Copied email address: ${email}`);
  };

  const filteredDirectory = DIRECTORY.filter((staff) => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 rounded-2xl p-5 md:p-6 text-white relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-xl md:text-2xl font-bold">Contact & Support Center 📞</h1>
          <p className="text-gray-300 text-xs md:text-sm mt-1">
            Need assistance? Reach out to administrative departments or locate office contacts.
          </p>
        </div>
      </div>

      {/* Main Grid: Contact Form + Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Contact Info and Details */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-800 text-sm">General Information</h3>
            
            <div className="space-y-3 text-xs text-gray-600">
              <div className="flex gap-2.5">
                <span className="text-lg">🏛️</span>
                <div>
                  <p className="font-semibold text-gray-700">Campus Address</p>
                  <p className="mt-0.5 leading-relaxed">Malankara Catholic College,<br />Mariagiri, Nellimoodu (P.O),<br />Kanyakumari District, Tamil Nadu - 629153</p>
                </div>
              </div>

              <div className="flex gap-2.5">
                <span className="text-lg">📞</span>
                <div>
                  <p className="font-semibold text-gray-700">Phone Numbers</p>
                  <p className="mt-0.5 leading-relaxed">+91 4651 228220 (General Office)<br />+91 4651 228222 (Admissions Helpdesk)</p>
                </div>
              </div>

              <div className="flex gap-2.5">
                <span className="text-lg">✉️</span>
                <div>
                  <p className="font-semibold text-gray-700">Email Addresses</p>
                  <p className="mt-0.5 leading-relaxed">info@malankara.edu.in<br />admission@malankara.edu.in</p>
                </div>
              </div>

              <div className="flex gap-2.5">
                <span className="text-lg">🕒</span>
                <div>
                  <p className="font-semibold text-gray-700">Working Hours</p>
                  <p className="mt-0.5 leading-relaxed">Monday - Friday: 9:00 AM - 4:00 PM<br />Saturday: 9:00 AM - 1:00 PM (Admin office only)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Mockup */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-2">
            <h3 className="font-bold text-gray-800 text-xs md:text-sm">Campus Location</h3>
            <div className="w-full h-36 bg-blue-50 border border-blue-100 rounded-lg relative overflow-hidden flex flex-col items-center justify-center text-center p-4">
              <span className="text-2xl mb-1">📍</span>
              <p className="font-bold text-blue-900 text-xs">MCC Mariagiri Campus</p>
              <p className="text-[10px] text-blue-600 mt-0.5">Located near Nellimoodu Junction, Kanyakumari</p>
              <button 
                onClick={() => window.open("https://maps.google.com", "_blank")}
                className="mt-3 bg-blue-600 text-white font-semibold text-[10px] px-3 py-1.5 rounded hover:bg-blue-700 transition"
              >
                Open in Google Maps ↗
              </button>
            </div>
          </div>
        </div>

        {/* Send support ticket */}
        <div className="md:col-span-7 bg-white border border-gray-100 rounded-xl p-4 md:p-5 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Send a Support Ticket</h3>
            <p className="text-gray-400 text-xs mt-0.5">Have a question or issue? Submit a ticket directly to the concerned cell.</p>
          </div>

          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-xs font-medium animate-in fade-in duration-200">
              ✓ Support request submitted successfully! Our office will get back to you within 24 working hours.
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arun Kumar"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="arun@domain.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Department *</label>
                <select
                  value={formDept}
                  onChange={(e) => setFormDept(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition"
                >
                  <option>Admin Office</option>
                  <option>Exam Cell</option>
                  <option>Transport Desk</option>
                  <option>Placement Officer</option>
                  <option>Technical Support</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Query on bus route change"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Detailed Message *</label>
              <textarea
                required
                rows={4}
                placeholder="Describe your issue or query in detail..."
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting Ticket...
                </>
              ) : (
                "Submit Support Ticket ✉️"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Directory & Collapsible FAQ Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Office Directory */}
        <div className="md:col-span-6 bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="font-bold text-gray-800 text-sm">Key Staff Directory</h3>
            <input
              type="text"
              placeholder="Search staff directory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition"
            />
          </div>

          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {filteredDirectory.length > 0 ? (
              filteredDirectory.map((staff, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-100 rounded-lg p-3 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-gray-700">{staff.name}</p>
                    <span className="text-[10px] font-semibold text-blue-750 bg-blue-50 px-2 py-0.5 rounded-full">
                      {staff.role}
                    </span>
                  </div>
                  <p className="text-gray-450 text-[10px]">📍 Office: {staff.office}</p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-gray-100 mt-1.5">
                    <span className="text-gray-600 font-medium">📞 {staff.phone}</span>
                    <button
                      onClick={() => handleCopyEmail(staff.email)}
                      className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 bg-white border border-gray-150 px-2 py-1 rounded"
                    >
                      ✉️ Copy Email
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 text-xs py-6">No matching contacts found.</p>
            )}
          </div>
        </div>

        {/* FAQs */}
        <div className="md:col-span-6 bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-3.5">
          <h3 className="font-bold text-gray-800 text-sm">Frequently Asked Questions</h3>
          
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {FAQS.map((faq, idx) => {
              const isExpanded = expandedFAQ === idx;
              return (
                <div key={idx} className="border border-gray-100 rounded-lg overflow-hidden transition-all">
                  <button
                    onClick={() => setExpandedFAQ(isExpanded ? null : idx)}
                    className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left text-xs font-semibold text-gray-700 flex justify-between items-center transition"
                  >
                    <span>{faq.q}</span>
                    <span className="text-gray-450 shrink-0 ml-2">{isExpanded ? "▲" : "▼"}</span>
                  </button>
                  {isExpanded && (
                    <div className="p-4 bg-white text-xs text-gray-600 leading-relaxed border-t border-gray-100 animate-in slide-in-from-top-1 duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
