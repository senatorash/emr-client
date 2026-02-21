import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  LuEye,
  LuEyeOff,
  LuLoader,
  LuLock,
  LuMail,
  LuStethoscope,
} from "react-icons/lu";
import { useLoginUserMutation } from "@/lib/features/apis/AuthApi";
import { toast } from "sonner";

const LeftPanel = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [
    loginUser,
    { isLoading: loadingState, data, isError, error, isSuccess },
  ] = useLoginUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setIsLoading(false);
      return;
    }
    try {
      await loginUser({ email, password });
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (isError && error) {
      // FetchBaseQueryError
      if ("data" in error && error.data) {
        const errData = error.data as { message?: string };
        toast.error(errData.message || "Request failed");
        return;
      }

      // SerializedError
      if ("error" in error) {
        toast.error(error.error || "Network error");
        return;
      }

      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, error, data]);
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="gradient-primary flex h-12 w-12 items-center justify-center rounded-xl">
            <LuStethoscope className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">MediCare</h1>
            <p className="text-sm text-muted-foreground">
              Electronic Medical Records
            </p>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="mb-8">
          <h2 className="font-display mb-2 text-3xl font-bold">Welcome back</h2>
          <p className="text-muted-foreground">
            Sign in to access your dashboard and patient records.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Email address
            </label>
            <div className="relative">
              <LuMail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <LuLock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 pr-10 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
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
            className="[&_svg]:shrink-0hero gradient-primary inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-10 text-base font-semibold whitespace-nowrap text-primary-foreground shadow-lg ring-offset-background transition-all duration-200 hover:shadow-xl hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4"
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
