import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, RefreshCw, CheckCircle, Circle, ArrowRight, Loader2 } from "lucide-react";
import { getLevelsFromDB, Level } from "@/data/lessons";
import { loadProgress, clearProgress, clearLevelProgress } from "@/utils/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ProgressPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { toast } = useToast();

  // 2. Tambahkan State untuk menyimpan data dari Database
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);

  const [progressByLevel, setProgressByLevel] = useState<
    Record<string, Record<string, string>>
  >({});

  // 3. Effect untuk ambil data Level dari DB saat halaman dibuka
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getLevelsFromDB();
      setLevels(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // 4. Effect untuk memuat Progress (Jalan setelah 'levels' sudah terisi)
  useEffect(() => {
    if (levels.length > 0) {
        const data: Record<string, Record<string, string>> = {};
        levels.forEach((level) => {
          data[level.id] = loadProgress(level.id);
        });
        setProgressByLevel(data);
    }
  }, [levels, refreshKey]);

  const handleClearAll = () => {
    clearProgress();
    setRefreshKey((prev) => prev + 1);
    toast({
      title: "Progress direset",
      description: "Semua progress pembelajaran telah dihapus.",
    });
  };

  const handleClearLevel = (levelId: string) => {
    clearLevelProgress(levelId);
    setRefreshKey((prev) => prev + 1);
    toast({
      title: `Progress ${levelId} direset`,
      description: `Progress untuk level ${levelId} telah dihapus.`,
    });
  };

  const getTotalStats = () => {
    let completed = 0;
    let total = 0;
    levels.forEach((level) => {
      level.subSections.forEach((sub) => {
        total++;
        if (progressByLevel[level.id]?.[sub.id] === "done") {
          completed++;
        }
      });
    });
    return { completed, total };
  };

  const stats = getTotalStats();

  // Tampilan Loading
  if (loading) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-2" />
            <p className="text-slate-500 font-medium">Menghitung progresmu...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b-4 border-foreground bg-secondary">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-foreground text-background px-4 py-2">PROGRESS</span>
              </h1>
              <p className="text-muted-foreground">
                Pantau kemajuan belajar bahasa Jermanmu
              </p>
            </div>

            <div className="border-4 border-foreground bg-card p-6 text-center min-w-[200px]">
              <p className="text-sm text-muted-foreground mb-2">Total Progress</p>
              <p className="text-4xl font-bold">
                {stats.completed}/{stats.total}
              </p>
              <div className="mt-3 h-3 bg-accent border border-foreground">
                <div
                  className="h-full bg-foreground transition-all"
                  style={{
                    width: stats.total > 0 ? `${(stats.completed / stats.total) * 100}%` : "0%",
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% selesai
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress by Level */}
      <section className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {levels.length === 0 ? (
             <div className="text-center py-10 text-slate-500">Belum ada data materi.</div>
          ) : (
            levels.map((level) => {
                const levelProgress = progressByLevel[level.id] || {};
                const completedCount = level.subSections.filter(
                (sub) => levelProgress[sub.id] === "done"
                ).length;
                const progressPercent = level.subSections.length > 0 
                    ? (completedCount / level.subSections.length) * 100 
                    : 0;

                return (
                <div key={level.id} className="border-4 border-foreground bg-card">
                    {/* Level Header */}
                    <div className="p-6 border-b-2 border-foreground bg-secondary">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold bg-foreground text-background w-14 h-14 flex items-center justify-center">
                            {level.id}
                        </span>
                        <div>
                            <h2 className="text-xl font-bold">{level.title}</h2>
                            <p className="text-sm text-muted-foreground">
                            {completedCount}/{level.subSections.length} sub-bab selesai
                            </p>
                        </div>
                        </div>

                        <div className="flex items-center gap-2">
                        <Link to={`/level/${level.id}`}>
                            <Button variant="outline" size="sm">
                            Buka Level
                            <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </Link>
                        
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <RefreshCw size={16} />
                            </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="border-4 border-foreground">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Reset Progress {level.id}?</AlertDialogTitle>
                                <AlertDialogDescription>
                                Semua progress untuk level {level.id} akan dihapus. Tindakan ini tidak dapat dibatalkan.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleClearLevel(level.id)}>
                                Reset
                                </AlertDialogAction>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 h-2 bg-accent border border-foreground">
                        <div
                        className="h-full bg-foreground transition-all"
                        style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    </div>

                    {/* Sub-sections */}
                    <div className="p-4 grid gap-2">
                    {level.subSections.map((sub) => {
                        const isComplete = levelProgress[sub.id] === "done";
                        return (
                        <Link
                            key={sub.id}
                            to={`/level/${level.id}`}
                            className={cn(
                            "flex items-center gap-3 px-4 py-3 border-2 border-foreground transition-all hover:bg-accent",
                            isComplete ? "bg-accent" : "bg-background"
                            )}
                        >
                            {isComplete ? (
                            <CheckCircle size={20} className="text-foreground" />
                            ) : (
                            <Circle size={20} className="text-muted-foreground" />
                            )}
                            <span className={cn("font-medium", !isComplete && "text-muted-foreground")}>
                            {sub.title}
                            </span>
                            {isComplete && (
                            <span className="ml-auto text-xs font-mono bg-foreground text-background px-2 py-1">
                                SELESAI
                            </span>
                            )}
                        </Link>
                        );
                    })}
                    </div>
                </div>
                );
            })
          )}
        </div>

        {/* Clear All Button */}
        <div className="mt-8 text-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="lg">
                <Trash2 size={18} className="mr-2" />
                Reset Semua Progress
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-4 border-foreground">
              <AlertDialogHeader>
                <AlertDialogTitle>Reset Semua Progress?</AlertDialogTitle>
                <AlertDialogDescription>
                  Semua progress pembelajaran akan dihapus dari semua level. Tindakan ini tidak dapat dibatalkan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearAll}>
                  Reset Semua
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
    </div>
  );
};

export default ProgressPage;