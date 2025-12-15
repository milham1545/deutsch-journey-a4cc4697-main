import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, LogIn, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState(""); // Ganti 'email' jadi 'identifier'
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(identifier, password);
    
    if (!error) {
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-black uppercase">Masuk Akun</CardTitle>
          <p className="text-slate-500">Lanjutkan progres belajarmu!</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Input Email ATAU Username */}
            <div className="space-y-2">
              <Label htmlFor="identifier" className="font-bold">Email atau Username</Label>
              <Input 
                id="identifier" 
                type="text" // Ganti type jadi text agar bisa input username
                placeholder="Masukkan email atau username Anda" 
                required 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="font-bold border-2 border-slate-300"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="font-bold">Password</Label>
                {/* TAMBAH INI */}
                <Link to="/forgot-password" className="text-xs font-bold text-blue-600 hover:underline">
                    Lupa Password?
                </Link>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password Anda"
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="font-bold border-2 border-slate-300 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full font-bold text-lg h-12 bg-blue-600 hover:bg-blue-700 text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] transition-all" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2" /> : <LogIn className="mr-2 h-5 w-5" />}
              Masuk
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t pt-4">
          <p className="text-sm text-slate-600 font-medium">
            Belum punya akun? <Link to="/register" className="text-blue-600 font-black hover:underline">Daftar disini</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;