import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, Rocket } from "lucide-react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const validateForm = () => {
    if (!name || name.trim().length < 2) {
      toast({
        title: "Invalid Name",
        description: "Name must be at least 2 characters.",
        variant: "destructive",
      });
      return false;
    }
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }
    if (!password || password.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters.",
        variant: "destructive",
      });
      return false;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    const { error } = await signUp(email, password, name);

    if (error) {
      setIsLoading(false);
      toast({
        title: "Signup Failed",
        description: error.message || "Unable to create account. Please try again.",
        variant: "destructive",
      });
    } else {
      setShowSuccess(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10 max-w-md text-center text-white animate-fade-in">
          <Rocket className="w-20 h-20 mx-auto mb-6 animate-float" />
          <h1 className="text-4xl font-bold mb-4">Join BizPilot Today</h1>
          <p className="text-xl opacity-90">
            Manage your business effortlessly with BizPilot.
          </p>
          <div className="mt-8 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-brand-highlight" />
              <span>Free to get started</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-brand-highlight" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-brand-highlight" />
              <span>Setup in under 2 minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background relative">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-accent/10 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        <div className="w-full max-w-md animate-fade-in">
          <div className="glass-card rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <h2 className="text-3xl font-bold gradient-text">BizPilot</h2>
              </Link>
              <p className="text-muted-foreground mt-2">Create your account</p>
            </div>

            {showSuccess ? (
              <div className="text-center py-8 animate-scale-in">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce-subtle" />
                <p className="text-lg font-medium">Securing your workspace...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  variant="hero"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Login
                  </Link>
                </div>
              </form>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;