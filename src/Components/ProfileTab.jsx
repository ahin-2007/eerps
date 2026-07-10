import React, { useState } from "react";

export default function ProfileTab() {
  const [profileTab, setProfileTab] = useState("personal");

  // Profile data state
  const [personalDetails, setPersonalDetails] = useState({
    name: "Arun Kumar",
    regNo: "902324104005",
    dept: "Computer Science & Engineering",
    batch: "2024 - 2028",
    sem: "4th Semester",
    dob: "October 14, 2006",
    bloodGroup: "O +ve",
    email: "arun.cse@malankara.edu.in",
    phone: "+91 98451 98451",
    parentsPhone: "+91 94432 94432",
    address: "12/4B, College Road, Marthandam, Kanyakumari - 629165"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({ ...personalDetails });

  // Skills tag manager state
  const [skills, setSkills] = useState(["React.js", "JavaScript", "HTML & CSS", "Python", "Data Structures", "MySQL"]);
  const [newSkill, setNewSkill] = useState("");

  // Password reset state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditToggle = () => {
    if (isEditing) {
      // Save details
      setPersonalDetails({ ...editedDetails });
      setIsEditing(false);
      alert("Personal profile details updated successfully!");
    } else {
      setEditedDetails({ ...personalDetails });
      setIsEditing(true);
    }
  };

  const handleInputChange = (field, val) => {
    setEditedDetails({ ...editedDetails, [field]: val });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill) return;
    if (skills.includes(newSkill)) {
      alert("Skill already exists!");
      return;
    }
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    alert("Password updated successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const academicGpas = [
    { semester: "Semester 1", gpa: "8.12", status: "Cleared", credits: "22" },
    { semester: "Semester 2", gpa: "8.40", status: "Cleared", credits: "20" },
    { semester: "Semester 3", gpa: "8.25", status: "Cleared", credits: "24" },
    { semester: "Semester 4", gpa: "In Progress", status: "Ongoing", credits: "--" }
  ];

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {/* Avatar */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-100 border-2 border-blue-600 flex items-center justify-center text-blue-700 font-extrabold text-2xl md:text-3xl shadow-sm uppercase shrink-0">
            {personalDetails.name.split(" ").map((n) => n[0]).join("")}
          </div>
          
          <div className="space-y-1">
            <h1 className="text-base md:text-lg font-bold text-gray-800 leading-tight">{personalDetails.name}</h1>
            <p className="text-xs text-blue-600 font-semibold">{personalDetails.dept} · {personalDetails.sem}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-[10px] text-gray-450 mt-1">
              <span>🆔 Reg No: {personalDetails.regNo}</span>
              <span className="hidden sm:inline">•</span>
              <span>📅 Batch: {personalDetails.batch}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3.5 shrink-0 w-full md:w-auto">
          <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center">
            <p className="text-[10px] font-semibold text-green-700 uppercase tracking-wider mb-0.5">Attendance</p>
            <p className="font-extrabold text-green-800 text-sm md:text-base">86.4%</p>
            <p className="text-[9px] text-green-600 mt-0.5">Required min: 75%</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
            <p className="text-[10px] font-semibold text-blue-700 uppercase tracking-wider mb-0.5">CGPA Score</p>
            <p className="font-extrabold text-blue-800 text-sm md:text-base">8.25</p>
            <p className="text-[9px] text-blue-600 mt-0.5">Top 15% of Batch</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-100 rounded-xl p-1.5 shadow-sm flex flex-wrap gap-1">
        {[
          { id: "personal", label: "Personal Details 👤" },
          { id: "academic", label: "Academic Record 📈" },
          { id: "skills", label: "Skills & Projects 🛠️" },
          { id: "settings", label: "Security Settings ⚙️" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setProfileTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex-1 md:flex-initial ${
              profileTab === tab.id
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Sections */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        
        {/* Personal Details */}
        {profileTab === "personal" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
              <h3 className="font-bold text-gray-800 text-sm">Personal Information</h3>
              <button
                onClick={handleEditToggle}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors border border-blue-100"
              >
                {isEditing ? "✓ Save Profile" : "✏️ Edit Profile"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <p className="text-gray-400">Date of Birth:</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedDetails.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 bg-gray-50 focus:bg-white text-xs"
                  />
                ) : (
                  <p className="font-semibold text-gray-700">{personalDetails.dob}</p>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-gray-400">Blood Group:</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedDetails.bloodGroup}
                    onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 bg-gray-50 focus:bg-white text-xs"
                  />
                ) : (
                  <p className="font-semibold text-gray-700">{personalDetails.bloodGroup}</p>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-gray-400">Student Email Address:</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedDetails.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 bg-gray-50 focus:bg-white text-xs"
                  />
                ) : (
                  <p className="font-semibold text-gray-700">{personalDetails.email}</p>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-gray-400">Contact Number:</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedDetails.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 bg-gray-50 focus:bg-white text-xs"
                  />
                ) : (
                  <p className="font-semibold text-gray-700">{personalDetails.phone}</p>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-gray-400">Parent / Guardian Contact:</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedDetails.parentsPhone}
                    onChange={(e) => handleInputChange("parentsPhone", e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 bg-gray-50 focus:bg-white text-xs"
                  />
                ) : (
                  <p className="font-semibold text-gray-700">{personalDetails.parentsPhone}</p>
                )}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <p className="text-gray-400">Residential Address:</p>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={editedDetails.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 bg-gray-50 focus:bg-white text-xs"
                  />
                ) : (
                  <p className="font-semibold text-gray-700 leading-relaxed">{personalDetails.address}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Academic Record */}
        {profileTab === "academic" && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 text-sm border-b border-gray-50 pb-3">Semester Wise Performance</h3>
            
            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                    <th className="p-3">Semester</th>
                    <th className="p-3">Credits Earned</th>
                    <th className="p-3">SGPA GPA</th>
                    <th className="p-3 text-right">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {academicGpas.map((gpaItem, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="p-3 font-semibold text-gray-700">{gpaItem.semester}</td>
                      <td className="p-3 text-gray-500">{gpaItem.credits}</td>
                      <td className="p-3 text-blue-600 font-bold">{gpaItem.gpa}</td>
                      <td className="p-3 text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          gpaItem.status === "Cleared"
                            ? "bg-green-50 text-green-600 border border-green-100"
                            : "bg-blue-50 text-blue-600 border border-blue-100"
                        }`}>
                          {gpaItem.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Certificates List */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3 mt-2">
              <p className="text-xs font-semibold text-gray-700">Co-curricular & Certifications:</p>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <span>🥇</span>
                  <span><strong>Web Development Bootcamp Certificate</strong> (Udemy, 2025)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🥇</span>
                  <span><strong>Python Foundations Specialist</strong> (Infosys Springboard, 2025)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🏆</span>
                  <span><strong>Runner up in Web Design Event</strong> (National Symposium MechFiesta, 2025)</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Skills & Projects */}
        {profileTab === "skills" && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 text-sm border-b border-gray-50 pb-3">Technical Skills Manager</h3>
            
            <p className="text-gray-400 text-xs">Add tags representing your skills. These will show on your profile cell.</p>
            
            {/* Skills tags list */}
            <div className="flex flex-wrap gap-2 py-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-500 hover:bg-blue-100 w-4 h-4 rounded-full flex items-center justify-center text-[10px] transition"
                    title="Remove Skill"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            {/* Add Skill form */}
            <form onSubmit={handleAddSkill} className="flex gap-2 max-w-sm pt-2">
              <input
                type="text"
                placeholder="e.g. Node.js, AWS, Tailwind CSS"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white flex-1 transition"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition shrink-0"
              >
                Add Skill
              </button>
            </form>

            <div className="h-px bg-gray-100 my-4" />

            <h3 className="font-bold text-gray-800 text-sm">Key Mini-Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-xs">
              {[
                { title: "Smart Attendance Manager", desc: "Built a React and Firebase dashboard tracking student attendance with secure QR-codes.", tech: "React · Firebase · Tailwind" },
                { title: "Campus Ride Sharing Web App", desc: "A Node.js and SQL scheduling web app allowing students to coordinate carpools.", tech: "Node.js · MySQL · CSS" }
              ].map((proj, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 space-y-2.5">
                  <div>
                    <p className="font-bold text-gray-800">{proj.title}</p>
                    <p className="text-gray-500 text-[11px] mt-0.5 leading-relaxed">{proj.desc}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-blue-600 bg-white border border-blue-50 px-2 py-0.5 rounded-lg w-fit block">
                    {proj.tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Settings */}
        {profileTab === "settings" && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 text-sm border-b border-gray-50 pb-3">Update Account Password</h3>
            
            <form onSubmit={handleChangePassword} className="space-y-3.5 max-w-sm text-xs">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 focus:bg-white transition"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-xl transition shadow-sm"
              >
                Change Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
