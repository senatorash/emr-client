import { motion } from "framer-motion";
import { useState } from "react";
import {
  LuEye,
  LuEyeOff,
  LuLoader,
  LuLock,
  LuMail,
  LuStethoscope,
} from "react-icons/lu";
import { useLoginUserMutation } from "@/lib/features/apis/AuthApi";

const LeftPanel = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { data, error }] = useLoginUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await loginUser({ email, password });
      setIsLoading(false);
      return response;
    } catch (error) {}
  };
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
            <LuStethoscope className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl">MediCare</h1>
            <p className="text-sm text-muted-foreground">
              Electronic Medical Records
            </p>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold mb-2">Welcome back</h2>
          <p className="text-muted-foreground">
            Sign in to access your dashboard and patient records.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Email address
            </label>
            <div className="relative">
              <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 hover:border-muted-foreground/50 md:text-sm pl-10"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 hover:border-muted-foreground/50 md:text-sm pl-10 pr-10"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <LuEyeOff className="h-4 w-4" />
                ) : (
                  <LuEye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0hero gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:brightness-110 active:scale-[0.98] h-12 rounded-xl px-10 text-base font-semibold w-full"
            disabled={isLoading || !email || !password}
          >
            {isLoading ? (
              <>
                <LuLoader className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
export default LeftPanel;
