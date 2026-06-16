import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from "lucide-react";
import { TbBrandMinecraft } from "react-icons/tb";
import { useAuth } from "../protected/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegistering) {
      setError("Registration is currently disabled. Please contact the administrator.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("Please fill out all credentials.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      // useAuth.login updates the state, and App.jsx will automatically redirect
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid terminal credentials provided.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb] p-4 relative overflow-hidden font-sans">
      {/* Decorative Grid Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#c6c5d3_1px,transparent_1px)] [background-size:16px_16px] opacity-35 pointer-events-none"></div>
      
      {/* Abstract geometric accents for high-end feel */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#142175]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#ba1a1a]/5 blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-[460px] relative z-10">
        {/* Brand Banner Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#142175] flex items-center justify-center text-white shadow-lg shadow-[#142175]/25 border border-white/10 mb-3 animate-pulse">
            <TbBrandMinecraft className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-[#142175] tracking-tight leading-none">Inv-NET</h2>
          <p className="text-xs text-[#505f76] font-medium mt-2">Enterprise Access and Unified Inventory Gateway</p>
        </div>

        {/* Auth card container */}
        <div className="bg-white rounded-2xl border border-[#c6c5d3]/40 shadow-xl overflow-hidden p-8">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-[#191c1e]">
              {isRegistering ? "Register Operator Profile" : "Operator Authentication"}
            </h3>
            <p className="text-xs text-[#767682] mt-1">
              {isRegistering 
                ? "Create domain security entity inside unified database." 
                : "Provide domain security credentials to initialize session."}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-[#ba1a1a] font-medium flex items-start gap-2.5">
              <span className="mt-0.5">⚠️</span>
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <>
                {/* Full name input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-extrabold text-[#454651] uppercase tracking-wider">FULL NAME</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 w-4 h-4 text-[#767682]" />
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (error) setError("");
                      }}
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#c6c5d3] bg-white outline-none focus:ring-2 focus:ring-[#142175] text-sm text-[#191c1e] transition-all"
                    />
                  </div>
                </div>


              </>
            )}

            {/* Email / Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold text-[#454651] uppercase tracking-wider">EMAIL ADDRESS / PHONE NUMBER</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-[#767682]" />
                <input 
                  type="text" 
                  required
                  placeholder="email@domain.com or +1 (555) 000-0000"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#c6c5d3] bg-white outline-none focus:ring-2 focus:ring-[#142175] text-sm text-[#191c1e] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold text-[#454651] uppercase tracking-wider">SECRET PASSWORD</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-[#767682]" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#c6c5d3] bg-white outline-none focus:ring-2 focus:ring-[#142175] text-sm text-[#191c1e] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 p-1 hover:text-[#142175] text-[#767682] rounded"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isRegistering && (
              /* Confirm Password input */
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-[#454651] uppercase tracking-wider">CONFIRM PASSWORD</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-4 h-4 text-[#767682]" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (error) setError("");
                    }}
                    className="w-full pl-10 pr-10 py-2 rounded-xl border border-[#c6c5d3] bg-white outline-none focus:ring-2 focus:ring-[#142175] text-sm text-[#191c1e] transition-all"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#142175] hover:bg-[#2e3a8c] text-white py-3 rounded-xl font-bold text-sm tracking-wide shadow-md shadow-[#142175]/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{isRegistering ? "Creating Profile..." : "Verifying Terminal Access..."}</span>
                </>
              ) : (
                <>
                  <span>{isRegistering ? "Register Profile" : "Login"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle view link */}
          <div className="mt-5 text-center text-xs">
            <span className="text-[#767682]">
              {isRegistering 
                ? "Already have an operator account? " 
                : "New personnel inside terminal wing? "}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
              }}
              className="text-[#142175] hover:underline font-bold"
            >
              {isRegistering ? "Login Here" : "Register Operator"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
