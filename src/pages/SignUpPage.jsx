import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SafeExitButton from '../components/SafeExitButton';

export default function SignUpPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white relative">
      {/*  Fixed Safe Exit button */}
      <SafeExitButton />

      {/*  Navbar stays at top */}
      <div className="pt-16"> {/* add padding to prevent overlap */}
        <Navbar onLoginClick={() => {}} />

        <div className="flex justify-center items-start md:items-center px-4 py-12">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 border border-pink-200">

            <h2 className="text-2xl font-bold mb-1 text-black">Sign up</h2>
            <p className="text-sm text-gray-700 mb-4">
              You're in control. Everything you share is private and encrypted
            </p>

            {/* First Name */}
            <input
              type="text"
              placeholder="First Name"
              className="w-full border border-pink-300 rounded-md px-4 py-2 mb-3"
            />

            {/* Last Name */}
            <input
              type="text"
              placeholder="Last Name"
              className="w-full border border-pink-300 rounded-md px-4 py-2 mb-3"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-pink-300 rounded-md px-4 py-2 mb-3"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-pink-300 rounded-md px-4 py-2 mb-3"
            />

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full border border-pink-300 rounded-md px-4 py-2 mb-3"
            />

            {/* Consent */}
            <label className="flex items-center text-sm mb-3">
              <input type="checkbox" className="accent-pink-400 mr-2" />
              Yes, it’s safe to connect me by email
            </label>

            {/* Create Account */}
            <button className="w-full bg-gradient-to-b from-[#eecdd5] to-[#d8aeb9] text-black font-semibold py-2 rounded-md shadow">
              Create Account
            </button>

            {/* Google Signup */}
            <button className="w-full border border-pink-300 mt-4 py-2 rounded-md flex items-center justify-center text-sm">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              Sign up with Google
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500 text-sm">Or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Anonymous chat button */}
            <button
              onClick={() => navigate('/chat')}
              className="w-full border border-pink-300 text-[#5c4140] text-sm py-2 rounded-md mb-2"
            >
              Anonymous chat with whisper
            </button>

            <p className="text-xs text-center text-gray-500 mb-4">
              Your session will be private and deleted once you exit.
            </p>

            {/* Switch to login */}
            <p className="text-center text-sm">
              Already Have an Account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[#d4948d] font-medium hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
