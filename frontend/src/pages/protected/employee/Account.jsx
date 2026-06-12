import { useState } from "react";
import { 
  Badge, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Camera, 
  Edit3, 
  Briefcase,
  ShieldCheck
} from "lucide-react";

export default function AccountPage({
  profile,
  onUpdateProfile,
  onOpenAddEmployeeModal
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);
  const [editedTitle, setEditedTitle] = useState(profile.title);
  const [editedEmail, setEditedEmail] = useState(profile.email);
  const [editedPhone, setEditedPhone] = useState(profile.phone);
  const [editedLocation, setEditedLocation] = useState(profile.location);

  const handleSave = () => {
    onUpdateProfile({
      ...profile,
      name: editedName,
      title: editedTitle,
      email: editedEmail,
      phone: editedPhone,
      location: editedLocation
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-sans font-bold text-3xl text-[#191c1e] tracking-tight">Account Settings</h2>
          <p className="font-sans text-sm text-[#505f76] mt-1">Manage your professional identity and access details.</p>
        </div>
        <button 
          onClick={onOpenAddEmployeeModal}
          className="bg-[#142175] text-white px-5 py-2.5 rounded-lg font-sans font-semibold text-sm hover:bg-[#2e3a8c] transition-all flex items-center gap-2"
        >
          <User className="w-4 h-4 text-white" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Profile Card (Level 1 Surface) */}
      <div className="bg-white rounded-xl shadow-lg border border-[#eceef0] overflow-hidden relative">
        
        {/* Decorative Top Banner */}
        <div className="h-32 w-full bg-gradient-to-r from-[#142175] to-[#2e3a8c] relative">
          <div 
            className="absolute inset-0 opacity-20" 
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)",
              backgroundSize: "24px 24px"
            }}
          ></div>
        </div>

        {/* Card Content Wrapper */}
        <div className="px-6 sm:px-10 pb-10">
          
          {/* Avatar and Action Toolbar Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-12 mb-6">
            <div className="relative group inline-block">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-[#eceef0] overflow-hidden shadow-md relative z-10">
                <img 
                  alt="Profile headshot" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG-yv5HllRljVDL6KdRj5Ym3tUMO32r_LQNaPR9Z3W6YbaaF_Oo4uLv61GXzFSiUtKrll91QAYfEwUrn832yuknGBGGfXJWpQUC3-j1Yxnd4WggsogDWj05LOm_O8S4XOWu8vXJFMXa_PlI4y88fOEroRCRyhkBvfawX7pVqbOmvArMA_qL0owO5AQsfwQbMwORmjIPDYmdpNYEN7bJeBkVO1svh-1sYMGjxnl-e5IJgpR5EsGPlpoL4eSNO7L8VUIahXPsGrSCPI"
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                aria-label="Update avatar photo"
                onClick={() => alert("Photo capture and image upload features are available in live cloud deployment hosts.")}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#142175] text-white flex items-center justify-center shadow hover:bg-[#4b57aa] transition-colors z-20"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Toggle Editable Spec */}
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#767682] text-[#505f76] font-sans font-semibold text-sm hover:bg-[#f2f4f6] transition-colors shadow-sm"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 sm:flex-none px-4 py-2 border border-[#c6c5d3] text-[#505f76] rounded-lg font-sans text-sm hover:bg-[#f2f4f6]"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 sm:flex-none px-4 py-2 bg-[#142175] text-white rounded-lg font-sans text-sm hover:bg-[#2e3a8c]"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Identity Information View */}
          <div className="mb-8">
            {!isEditing ? (
              <>
                <h3 className="font-sans font-bold text-2xl text-[#191c1e]">{profile.name}</h3>
                <p className="font-sans text-base text-[#505f76] mt-1">{profile.title}</p>
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                <div>
                  <label className="block text-xs font-bold text-[#454651] uppercase mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={editedName} 
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#454651] uppercase mb-1">Job Title</label>
                  <input 
                    type="text" 
                    value={editedTitle} 
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full px-3 py-1.5 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="w-full h-px bg-[#c6c5d3]/50 mb-8"></div>

          {/* Details Grid Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
            
            {/* Employee ID */}
            <div className="flex flex-col gap-1">
              <span className="font-sans text-[11px] font-bold text-[#505f76] uppercase tracking-wider">Employee ID</span>
              <div className="flex items-center gap-2 text-sm text-[#191c1e] font-medium">
                <ShieldCheck className="w-4.5 h-4.5 text-[#767682]" />
                <span>{profile.employeeId}</span>
              </div>
            </div>

            {/* Role */}
            <div className="flex flex-col gap-1">
              <span className="font-sans text-[11px] font-bold text-[#505f76] uppercase tracking-wider">Default Role</span>
              <div className="flex items-center gap-2 text-sm text-[#191c1e] font-medium">
                <Briefcase className="w-4.5 h-4.5 text-[#767682]" />
                <span>{profile.role}</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <span className="font-sans text-[11px] font-bold text-[#505f76] uppercase tracking-wider">Email Address</span>
              {!isEditing ? (
                <div className="flex items-center gap-2 text-sm text-[#142175] font-semibold">
                  <Mail className="w-4.5 h-4.5 text-[#767682]" />
                  <span>{profile.email}</span>
                </div>
              ) : (
                <input 
                  type="email" 
                  value={editedEmail} 
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="px-3 py-1.5 border border-[#c6c5d3] rounded-lg text-sm w-full bg-white select-text"
                />
              )}
            </div>

            {/* Contact Phone */}
            <div className="flex flex-col gap-1">
              <span className="font-sans text-[11px] font-bold text-[#505f76] uppercase tracking-wider">Work Phone</span>
              {!isEditing ? (
                <div className="flex items-center gap-2 text-sm text-[#191c1e] font-medium">
                  <Phone className="w-4.5 h-4.5 text-[#767682]" />
                  <span>{profile.phone}</span>
                </div>
              ) : (
                <input 
                  type="text" 
                  value={editedPhone} 
                  onChange={(e) => setEditedPhone(e.target.value)}
                  className="px-3 py-1.5 border border-[#c6c5d3] rounded-lg text-sm w-full bg-white"
                />
              )}
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1 sm:col-span-2">
              <span className="font-sans text-[11px] font-bold text-[#505f76] uppercase tracking-wider">Location</span>
              {!isEditing ? (
                <div className="flex items-center gap-2 text-sm text-[#191c1e] font-medium">
                  <MapPin className="w-4.5 h-4.5 text-[#767682]" />
                  <span>{profile.location}</span>
                </div>
              ) : (
                <input 
                  type="text" 
                  value={editedLocation} 
                  onChange={(e) => setEditedLocation(e.target.value)}
                  className="px-3 py-1.5 border border-[#c6c5d3] rounded-lg text-sm w-full bg-white"
                />
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
