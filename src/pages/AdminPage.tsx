import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Loader2, UploadCloud, Database, ShieldAlert, CheckCircle, 
  FileJson, LogOut, Plus, Trash2, Edit2, Search, Layers, BookOpen, Crown 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Tipe Data
type Level = { id: string; title: string; description: string };
type Lesson = { id: string; title: string; slug: string; level_id: string; order_index: number };
type Vocab = { id: string; german: string; indonesian: string; example: string; lesson_id: string };

const AdminPage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingRole, setIsCheckingRole] = useState(true);
  
  const [levels, setLevels] = useState<Level[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [vocabs, setVocabs] = useState<Vocab[]>([]);
  
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [jsonInput, setJsonInput] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formType, setFormType] = useState<"level" | "lesson" | "vocab">("vocab");
  
  const [formData, setFormData] = useState({
    id: "", title: "", description: "", slug: "", order_index: 0,
    german: "", indonesian: "", example: ""
  });

  // 1. CEK ROLE
  useEffect(() => {
    const checkRole = async () => {
      if (!user) { setIsCheckingRole(false); return; }
      const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      if (data?.role === "admin") {
        setIsAdmin(true);
        fetchLevels();
      }
      setIsCheckingRole(false);
    };
    checkRole();
  }, [user]);

  // 2. FETCH DATA
  const fetchLevels = async () => {
    const { data } = await supabase.from("levels").select("*").order("id");
    if (data) setLevels(data);
  };

  const fetchLessons = async (levelId: string) => {
    setIsLoadingData(true);
    const { data } = await supabase.from("lessons").select("*").eq("level_id", levelId).order("order_index");
    if (data) setLessons(data);
    setIsLoadingData(false);
  };

  const fetchVocabs = async (lessonId: string) => {
    setIsLoadingData(true);
    const { data } = await supabase.from("vocabularies").select("*").eq("lesson_id", lessonId).order("german");
    if (data) setVocabs(data);
    setIsLoadingData(false);
  };

  useEffect(() => {
    if (selectedLevelId) {
      fetchLessons(selectedLevelId);
      setSelectedLessonId(null);
      setVocabs([]);
    }
  }, [selectedLevelId]);

  useEffect(() => {
    if (selectedLessonId) fetchVocabs(selectedLessonId);
  }, [selectedLessonId]);

  // 3. CRUD LOGIC
  const handleSave = async () => {
    setIsUploading(true);
    try {
      let error = null;
      if (formType === "vocab") {
        if (!selectedLessonId) throw new Error("Pilih Bab dulu!");
        const payload = { german: formData.german, indonesian: formData.indonesian, example: formData.example, lesson_id: selectedLessonId };
        if (editingItem) {
            const { error: err } = await supabase.from("vocabularies").update(payload).eq("id", editingItem.id);
            error = err;
        } else {
            const { error: err } = await supabase.from("vocabularies").insert(payload);
            error = err;
        }
        if (!error) fetchVocabs(selectedLessonId);
      } else if (formType === "lesson") {
        if (!selectedLevelId) throw new Error("Pilih Level dulu!");
        const payload = { title: formData.title, slug: formData.slug, order_index: formData.order_index, level_id: selectedLevelId };
        if (editingItem) {
            const { error: err } = await supabase.from("lessons").update(payload).eq("id", editingItem.id);
            error = err;
        } else {
            const { error: err } = await supabase.from("lessons").insert(payload);
            error = err;
        }
        if (!error) fetchLessons(selectedLevelId);
      }
      if (error) throw error;
      toast({ title: "Berhasil! ✅", description: "Data berhasil disimpan." });
      setDialogOpen(false);
      resetForm();
    } catch (err: any) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, type: "vocab" | "lesson") => {
    if (!confirm("Yakin hapus? Gak bisa balik lagi lho.")) return;
    try {
        if (type === "vocab") {
            await supabase.from("vocabularies").delete().eq("id", id);
            if (selectedLessonId) fetchVocabs(selectedLessonId);
        } else if (type === "lesson") {
            await supabase.from("lessons").delete().eq("id", id);
            if (selectedLevelId) fetchLessons(selectedLevelId);
        }
        toast({ title: "Terhapus 🗑️", description: "Data sudah hilang." });
    } catch (err) { console.error(err); }
  };

  const openEditDialog = (item: any, type: "vocab" | "lesson") => {
    setFormType(type);
    setEditingItem(item);
    setFormData({ ...formData, ...item });
    setDialogOpen(true);
  };

  const openCreateDialog = (type: "vocab" | "lesson") => {
    setFormType(type);
    setEditingItem(null);
    resetForm();
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ id: "", title: "", description: "", slug: "", order_index: 0, german: "", indonesian: "", example: "" });
  };

  const handleJsonImport = async () => {
    if (!jsonInput) return;
    setIsUploading(true);
    try {
        const data = JSON.parse(jsonInput);
        if (!data.level_id || !data.title || !data.slug) throw new Error("JSON invalid.");
        const { data: lesson, error } = await supabase.from("lessons").insert({
            level_id: data.level_id, slug: data.slug, title: data.title, order_index: 99
        }).select().single();
        if (error) throw error;
        if (data.vocabulary?.length) {
            const vocabPayload = data.vocabulary.map((v: any) => ({ lesson_id: lesson.id, german: v.german, indonesian: v.indonesian, example: v.example }));
            await supabase.from("vocabularies").insert(vocabPayload);
        }
        toast({ title: "Import Sukses! 🎉", description: "Materi berhasil masuk." });
        setJsonInput("");
    } catch (e: any) {
        toast({ variant: "destructive", title: "Gagal Import", description: e.message });
    } finally {
        setIsUploading(false);
    }
  };

  if (isCheckingRole) return <div className="h-screen flex items-center justify-center bg-yellow-50"><Loader2 className="animate-spin h-10 w-10 text-black"/></div>;
  if (!user || !isAdmin) return (
    <div className="h-screen flex flex-col items-center justify-center bg-red-50 p-4 text-center">
        <ShieldAlert className="h-16 w-16 text-red-600 mb-4" />
        <h1 className="text-3xl font-black text-red-600 uppercase mb-2">Restricted Access</h1>
        <p className="text-slate-600 font-medium">Halaman ini hanya untuk Sultan Admin.</p>
        <Button className="mt-6 border-2 border-black font-bold" onClick={() => navigate("/")}>Balik ke Home</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-yellow-50 font-sans pb-20">
      
      {/* HEADER KEREN */}
      <div className="bg-white border-b-4 border-black sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-black text-yellow-400 p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Crown className="w-6 h-6 fill-current" />
            </div>
            <div>
                <h1 className="text-2xl font-black uppercase tracking-tighter">Admin<span className="text-blue-600">Panel</span></h1>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Markas Besar Konten</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold hidden md:inline-block bg-slate-100 px-3 py-1 rounded border-2 border-slate-200">
                👮 {user.email}
            </span>
            <Button variant="destructive" size="sm" className="font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1" onClick={() => { signOut(); navigate("/login"); }}>
                <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        <Tabs defaultValue="manage" className="space-y-8">
            <div className="flex justify-center">
                <TabsList className="bg-white border-2 border-black p-1 h-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <TabsTrigger value="manage" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-black text-sm uppercase px-6 py-2 border border-transparent data-[state=active]:border-black">
                        <Database className="w-4 h-4 mr-2" /> Manage Database (CRUD)
                    </TabsTrigger>
                    <TabsTrigger value="import" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black font-black text-sm uppercase px-6 py-2 border border-transparent data-[state=active]:border-black">
                        <FileJson className="w-4 h-4 mr-2" /> Import JSON
                    </TabsTrigger>
                </TabsList>
            </div>

            {/* --- TAB 1: MANAGE DATABASE --- */}
            <TabsContent value="manage" className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                
                {/* 1. FILTER CARD */}
                <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                    <CardHeader className="bg-slate-50 border-b-2 border-black pb-3">
                        <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-slate-500">
                            <Search className="w-4 h-4" /> Filter Konten
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="font-bold text-lg">Pilih Level</Label>
                            <Select onValueChange={(val) => setSelectedLevelId(val)}>
                                <SelectTrigger className="border-2 border-black font-bold h-12 text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <SelectValue placeholder="-- LEVEL --" />
                                </SelectTrigger>
                                <SelectContent className="border-2 border-black font-bold">
                                    {levels.map(l => <SelectItem key={l.id} value={l.id} className="focus:bg-blue-100 cursor-pointer">{l.id} - {l.title}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold text-lg">Pilih Bab (Lesson)</Label>
                            <Select 
                                disabled={!selectedLevelId} 
                                onValueChange={(val) => setSelectedLessonId(val)}
                                value={selectedLessonId || ""}
                            >
                                <SelectTrigger className="border-2 border-black font-bold h-12 text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <SelectValue placeholder={isLoadingData ? "Loading..." : "-- BAB / TOPIK --"} />
                                </SelectTrigger>
                                <SelectContent className="border-2 border-black font-bold">
                                    {lessons.map(l => <SelectItem key={l.id} value={l.id} className="focus:bg-green-100 cursor-pointer">{l.title}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. LESSON LIST (Muncul jika Level dipilih) */}
                {selectedLevelId && !selectedLessonId && (
                    <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                        <CardHeader className="flex flex-row items-center justify-between border-b-4 border-black bg-blue-50 py-4">
                            <CardTitle className="text-xl font-black uppercase flex items-center gap-2">
                                <Layers className="w-6 h-6 text-blue-600" /> Daftar Bab di {selectedLevelId}
                            </CardTitle>
                            <Button onClick={() => openCreateDialog("lesson")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none">
                                <Plus className="w-5 h-5 mr-1"/> Tambah Bab
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b-2 border-black bg-slate-100 hover:bg-slate-100">
                                        <TableHead className="text-black font-black uppercase w-[100px]">Urutan</TableHead>
                                        <TableHead className="text-black font-black uppercase">Judul Bab</TableHead>
                                        <TableHead className="text-black font-black uppercase">Slug</TableHead>
                                        <TableHead className="text-black font-black uppercase text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {lessons.length === 0 ? (
                                        <TableRow><TableCell colSpan={4} className="text-center py-10 font-bold text-slate-400">Belum ada bab. Buat baru yuk!</TableCell></TableRow>
                                    ) : (
                                        lessons.map(ls => (
                                            <TableRow key={ls.id} className="border-b border-slate-200 hover:bg-blue-50 font-medium">
                                                <TableCell className="text-center bg-slate-50 font-black border-r border-slate-200">#{ls.order_index}</TableCell>
                                                <TableCell className="text-lg">{ls.title}</TableCell>
                                                <TableCell className="font-mono text-xs text-slate-500">{ls.slug}</TableCell>
                                                <TableCell className="text-right space-x-2">
                                                    <Button variant="outline" size="sm" onClick={() => openEditDialog(ls, "lesson")} className="border-2 border-black hover:bg-yellow-200"><Edit2 className="w-4 h-4"/></Button>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(ls.id, "lesson")} className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-none"><Trash2 className="w-4 h-4"/></Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {/* 3. VOCAB LIST (Muncul jika Lesson dipilih) */}
                {selectedLessonId && (
                    <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                        <CardHeader className="flex flex-row items-center justify-between border-b-4 border-black bg-green-50 py-4">
                            <CardTitle className="text-xl font-black uppercase flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-green-600" /> Kosakata (Vocab)
                            </CardTitle>
                            <Button onClick={() => openCreateDialog("vocab")} className="bg-green-500 hover:bg-green-600 text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none">
                                <Plus className="w-5 h-5 mr-1"/> Tambah Kata
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            {isLoadingData ? (
                                <div className="p-20 flex justify-center"><Loader2 className="animate-spin w-10 h-10 text-green-500"/></div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b-2 border-black bg-slate-100 hover:bg-slate-100">
                                            <TableHead className="text-black font-black uppercase w-1/3">Jerman</TableHead>
                                            <TableHead className="text-black font-black uppercase w-1/3">Indonesia</TableHead>
                                            <TableHead className="text-black font-black uppercase w-1/4 hidden md:table-cell">Contoh</TableHead>
                                            <TableHead className="text-black font-black uppercase text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {vocabs.length === 0 ? (
                                            <TableRow><TableCell colSpan={4} className="text-center py-10 font-bold text-slate-400">Kosong. Tambah data manual atau import JSON.</TableCell></TableRow>
                                        ) : (
                                            vocabs.map(v => (
                                                <TableRow key={v.id} className="border-b border-slate-200 hover:bg-green-50 font-medium">
                                                    <TableCell className="text-lg font-bold text-blue-800">{v.german}</TableCell>
                                                    <TableCell className="text-lg">{v.indonesian}</TableCell>
                                                    <TableCell className="italic text-slate-500 hidden md:table-cell">{v.example}</TableCell>
                                                    <TableCell className="text-right space-x-2">
                                                        <Button variant="outline" size="sm" onClick={() => openEditDialog(v, "vocab")} className="border-2 border-black hover:bg-yellow-200"><Edit2 className="w-4 h-4"/></Button>
                                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(v.id, "vocab")} className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-none"><Trash2 className="w-4 h-4"/></Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                )}
            </TabsContent>

            {/* --- TAB 2: IMPORT JSON --- */}
            <TabsContent value="import">
                <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                    <CardHeader className="bg-yellow-50 border-b-4 border-black">
                        <CardTitle className="text-xl font-black uppercase flex items-center gap-2">
                            <FileJson className="w-6 h-6 text-yellow-600"/> Import Massal (JSON)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-sm font-bold text-slate-500 mb-2 uppercase">Paste Kode JSON dari Gemini di sini:</p>
                        <Textarea 
                            placeholder='{ "title": "...", "vocabulary": [...] }' 
                            className="font-mono text-xs h-[300px] border-4 border-slate-200 focus-visible:ring-0 focus-visible:border-black bg-slate-50 p-4 rounded-xl"
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                        />
                        <Button 
                            className="w-full mt-6 h-14 text-lg font-black bg-black hover:bg-slate-800 text-white border-4 border-transparent hover:border-yellow-400"
                            onClick={handleJsonImport}
                            disabled={isUploading || !jsonInput}
                        >
                            {isUploading ? <><Loader2 className="animate-spin mr-2"/> PROSES...</> : <><UploadCloud className="mr-2"/> IMPORT SEKARANG</>}
                        </Button>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>

        {/* --- DIALOG FORM (CREATE/EDIT) --- */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase flex items-center gap-2">
                        {editingItem ? <Edit2 className="w-6 h-6 text-yellow-500"/> : <Plus className="w-6 h-6 text-green-600"/>}
                        {editingItem ? "Edit Data" : "Tambah Baru"}
                    </DialogTitle>
                    <DialogDescription className="font-bold text-slate-400 uppercase tracking-widest text-xs">
                        {formType === "vocab" ? "Pastikan ejaan Jerman benar!" : "Buat bab baru yang menarik."}
                    </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                    {/* FORM VOCAB */}
                    {formType === "vocab" && (
                        <>
                            <div className="space-y-1">
                                <Label className="font-black uppercase text-xs">Bahasa Jerman</Label>
                                <Input className="border-2 border-black font-bold focus-visible:ring-green-500" value={formData.german} onChange={e => setFormData({...formData, german: e.target.value})} placeholder="Contoh: der Apfel" />
                            </div>
                            <div className="space-y-1">
                                <Label className="font-black uppercase text-xs">Bahasa Indonesia</Label>
                                <Input className="border-2 border-black font-bold" value={formData.indonesian} onChange={e => setFormData({...formData, indonesian: e.target.value})} placeholder="Contoh: Apel" />
                            </div>
                            <div className="space-y-1">
                                <Label className="font-black uppercase text-xs">Contoh Kalimat</Label>
                                <Textarea className="border-2 border-black font-medium" value={formData.example} onChange={e => setFormData({...formData, example: e.target.value})} placeholder="Contoh: Ich esse einen Apfel." />
                            </div>
                        </>
                    )}

                    {/* FORM LESSON */}
                    {formType === "lesson" && (
                        <>
                            <div className="space-y-1">
                                <Label className="font-black uppercase text-xs">Judul Bab</Label>
                                <Input className="border-2 border-black font-bold focus-visible:ring-blue-500" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Contoh: Essen & Trinken" />
                            </div>
                            <div className="space-y-1">
                                <Label className="font-black uppercase text-xs">Slug (ID Unik - Huruf Kecil)</Label>
                                <Input className="border-2 border-black font-mono text-sm bg-slate-50" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="Contoh: essen_trinken" />
                            </div>
                            <div className="space-y-1">
                                <Label className="font-black uppercase text-xs">Urutan (Angka)</Label>
                                <Input type="number" className="border-2 border-black font-bold" value={formData.order_index} onChange={e => setFormData({...formData, order_index: parseInt(e.target.value)})} />
                            </div>
                        </>
                    )}
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-2 border-black font-bold flex-1">Batal</Button>
                    <Button onClick={handleSave} disabled={isUploading} className="bg-black hover:bg-slate-800 text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none flex-1">
                        {isUploading ? <Loader2 className="animate-spin w-4 h-4"/> : (editingItem ? "SIMPAN" : "BUAT")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

      </div>
    </div>
  );
};

export default AdminPage;