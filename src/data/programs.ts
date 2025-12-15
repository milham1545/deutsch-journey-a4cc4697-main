export interface Requirement {
  id: string;
  label: string;
  note?: string;
}

export interface UsefulLink {
  label: string;
  url: string;
  description: string;
}

export interface ProgramDetail {
  id: string;
  title: string;
  category?: string; // health, tech, business, gastro, craft, logistics, science
  description: string;
  salary: string;
  duration: string;
  source?: string;
  whatYouLearn: string[];
  requirements: Requirement[];
  usefulLinks?: UsefulLink[];
}

export const programs: Record<string, ProgramDetail> = {
  // ==========================================
  // --- 1. JALUR NON-AUSBILDUNG ---
  // ==========================================
  aupair: {
    id: "aupair",
    title: "Au Pair",
    description: "Program pertukaran budaya tinggal bersama keluarga Jerman (Gastfamilie).",
    salary: "€280/bulan (Uang Saku)",
    duration: "12 Bulan (Maksimal)",
    whatYouLearn: ["Bahasa Jerman Sehari-hari", "Budaya Jerman", "Kemandirian"],
    requirements: [
      { id: "ap_pass", label: "Paspor Asli", note: "Masa berlaku min. 1 tahun + 2 halaman kosong" },
      { id: "ap_a1", label: "Sertifikat Bahasa A1", note: "Wajib Goethe Institut / ÖSD" },
      { id: "ap_cv", label: "Lebenslauf (CV)", note: "Format Tabel Jerman, ada Foto, Tanda Tangan" },
      { id: "ap_mot", label: "Motivationsschreiben", note: "Surat motivasi untuk Gastfamilie" },
      { id: "ap_contract", label: "Au Pair Vertrag", note: "Kontrak asli yang ditandatangani kedua pihak" },
      { id: "ap_ins", label: "Bukti Asuransi Kesehatan", note: "Biasanya dibayarkan oleh Gastfamilie" },
      { id: "ap_inv", label: "Surat Undangan (Einladung)", note: "Dari Gastfamilie" },
      { id: "ap_form", label: "Formulir Visa Nasional", note: "Diisi via VIDEX (Web Kedutaan)" }
    ]
  },
  fsj: {
    id: "fsj",
    title: "FSJ / BFD (Sosial)",
    description: "Kerja sosial sukarela (Gap Year) di institusi sosial Jerman.",
    salary: "€450 - €600/bulan",
    duration: "12 - 18 Bulan",
    whatYouLearn: ["Pengalaman Sosial", "Bahasa Kerja", "Empati"],
    requirements: [
      { id: "fsj_pass", label: "Paspor Asli", note: "Masa berlaku min. 18 bulan" },
      { id: "fsj_b1", label: "Sertifikat Bahasa B1", note: "Goethe/ÖSD/Telc (Disarankan)" },
      { id: "fsj_cv", label: "Lebenslauf (CV)", note: "Jelaskan pengalaman sosial/volunteering" },
      { id: "fsj_mot", label: "Motivationsschreiben", note: "Alasan memilih bidang sosial" },
      { id: "fsj_ijazah", label: "Ijazah Terakhir + Transkrip", note: "Translate Tersumpah (Sworn)" },
      { id: "fsj_contract", label: "FSJ Vereinbarung", note: "Kontrak dari Träger (Yayasan)" },
      { id: "fsj_zav", label: "Surat ZAV (Jika ada)", note: "Persetujuan dari Jobcenter Jerman" },
      { id: "fsj_visa", label: "Formulir Visa Nasional", note: "2 Rangkap" }
    ]
  },

  foj: {
    id: "foj",
    category: "social",
    title: "FÖJ (Lingkungan)",
    description: "Sukarelawan di bidang ekologi/alam (Hutan, Pertanian Organik, Konservasi Hewan).",
    salary: "€400 - €550/bulan",
    duration: "12 - 18 Bulan",
    source: "foj.de",
    whatYouLearn: ["Pertanian Organik", "Konservasi Alam", "Kerja Outdoor"],
    requirements: [
      { id: "foj_pass", label: "Paspor" },
      { id: "foj_b1", label: "Sertifikat B1" },
      { id: "foj_cv", label: "CV (Minat Alam)" },
      { id: "foj_mot", label: "Motivation Letter" },
      { id: "foj_contract", label: "Kontrak Träger FOJ" }
    ]
  },

  studienkolleg: {
    id: "studienkolleg",
    title: "Studienkolleg",
    description: "Kelas penyetaraan akademik wajib sebelum kuliah S1 bagi lulusan SMA Indo.",
    salary: "Biaya Sendiri",
    duration: "1 Tahun",
    whatYouLearn: ["Jerman Akademik", "Matematika/Sains"],
    requirements: [
      { id: "sk_pass", label: "Paspor Asli", note: "Berlaku min. 1 tahun" },
      { id: "sk_b2", label: "Sertifikat Bahasa B2", note: "Wajib untuk ujian masuk (Aufnahme)" },
      { id: "sk_ijazah", label: "Ijazah SMA & SKHUN", note: "Legalisir Kemenkumham/Kemenlu + Translate" },
      { id: "sk_zul", label: "Zulassungsbescheid", note: "Surat Diterima/Undangan Ujian dari Kampus" },
      { id: "sk_block", label: "Blocked Account", note: "Bukti dana €11.904 di Bank Jerman" },
      { id: "sk_ins", label: "Asuransi Kesehatan", note: "Travel Insurance / Public Health Insurance" }
    ]
  },
  studium: {
    id: "studium",
    title: "Studium (Kuliah S1)",
    description: "Kuliah Universitas di Jerman. Gratis SPP (Negeri), bayar biaya hidup sendiri.",
    salary: "Biaya Sendiri",
    duration: "3-4 Tahun",
    whatYouLearn: ["Teori Akademik", "Riset"],
    requirements: [
      { id: "stu_pass", label: "Paspor Asli" },
      { id: "stu_c1", label: "Sertifikat C1 / TestDaF", note: "Skor minimal TDN 4" },
      { id: "stu_aps", label: "Sertifikat APS", note: "Wajib validasi ijazah via APS India/China/Indo" },
      { id: "stu_hzb", label: "Ijazah SMA/S1", note: "Translate Tersumpah & Legalisir" },
      { id: "stu_loa", label: "Letter of Acceptance (LoA)", note: "Bukti diterima universitas" },
      { id: "stu_block", label: "Blocked Account", note: "Bukti dana €11.904/tahun" }
    ]
  },
  sprachschule: {
    id: "sprachschule",
    title: "Kursus Bahasa",
    description: "Visa khusus belajar bahasa intensif di Jerman.",
    salary: "Biaya Sendiri",
    duration: "6-12 Bulan",
    whatYouLearn: ["Bahasa Jerman Intensif"],
    requirements: [
      { id: "spr_pass", label: "Paspor Asli" },
      { id: "spr_daftar", label: "Bukti Pendaftaran Kursus", note: "Minimal 18 jam pelajaran/minggu" },
      { id: "spr_bayar", label: "Bukti Pembayaran", note: "Kwitansi lunas dari tempat kursus" },
      { id: "spr_cv", label: "Lebenslauf & Motivasi", note: "Kenapa harus belajar di Jerman?" },
      { id: "spr_block", label: "Blocked Account", note: "Jaminan hidup selama kursus" }
    ]
  },

  // ==========================================
  // --- 2. AUSBILDUNG GENERAL (BASE DATA) ---
  // ==========================================
  // --- AUSBILDUNG GENERAL (TANPA CHECKLIST, TAPI ADA LINK) ---
  aus_general: {
    id: "aus_general",
    title: "Info Umum Ausbildung",
    description: "Portal informasi mengenai sistem Ausbildung. Gunakan link di bawah ini untuk mencari lowongan (Stellenangebote) dan detail setiap jurusan.",
    salary: "Rata-rata €1.000/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Pencarian Kerja", "Sistem Vokasi", "Persiapan Dokumen"],
    requirements: [], // KOSONGKAN CHECKLIST
    usefulLinks: [ // FIELD BARU
        { 
            label: "Ausbildung.de", 
            url: "https://www.ausbildung.de", 
            description: "Portal pencarian Ausbildung terbesar dengan tampilan modern." 
        },
        { 
            label: "Azubiyo", 
            url: "https://www.azubiyo.de", 
            description: "Cari lowongan berdasarkan kecocokan minat dan bakatmu." 
        },
        { 
            label: "Bundesagentur für Arbeit", 
            url: "https://www.arbeitsagentur.de/jobsuche/", 
            description: "Portal resmi pemerintah Jerman. Data paling lengkap dan valid." 
        },
        { 
            label: "Make it in Germany", 
            url: "https://www.make-it-in-germany.com/en/study-training/training-in-germany/find", 
            description: "Panduan resmi untuk pelamar internasional." 
        },
        { 
            label: "Lehrstellen Radar", 
            url: "https://www.lehrstellen-radar.de", 
            description: "Khusus mencari Ausbildung sektor Handwerk (Teknik/Kerajinan)." 
        }
    ]
  },

  // ==========================================
  // --- KATEGORI: KESEHATAN (GESUNDHEIT) ---
  // ==========================================
  aus_pflege: {
    id: "aus_pflege",
    category: "health",
    title: "Pflegefachmann/frau (Perawat)",
    description: "Merawat pasien di RS atau Panti Lansia. Gaji tertinggi dan paling banyak dicari.",
    salary: "€1.340 - €1.503/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Anatomi Tubuh", "Tindakan Medis", "Dokumentasi"],
    requirements: [
      { id: "pf_pass", label: "Paspor Asli", note: "Berlaku panjang (3 tahun disarankan)" },
      { id: "pf_b2", label: "Sertifikat Bahasa B2", note: "Wajib B2 lengkap (4 Teil)" },
      { id: "pf_ijazah", label: "Ijazah SMA/SMK", note: "Translate Tersumpah + Legalisir" },
      { id: "pf_cv", label: "Lebenslauf (CV)", note: "Jelaskan pengalaman medis/magang" },
      { id: "pf_aner", label: "Penyetaraan (Anerkennung)", note: "Surat Defizitbescheid (Jika diminta)" },
      { id: "pf_mcu", label: "Medical Check Up", note: "Surat Dokter Sehat Fisik & Mental" },
      { id: "pf_masern", label: "Bukti Vaksin Campak", note: "Wajib (Masernschutzimpfung)" },
      { id: "pf_pol", label: "SKCK (Führungszeugnis)", note: "Polres/Polda + Translate Jerman" },
      { id: "pf_contract", label: "Kontrak Ausbildung", note: "Dari Rumah Sakit atau Panti Lansia" },
      { id: "pf_zav", label: "Surat Persetujuan ZAV", note: "Lampiran wajib untuk Visa" }
    ]
  },
  aus_ata: {
    id: "aus_ata",
    category: "health",
    title: "Anästhesietechnische Assistenten (ATA)",
    description: "Asisten dokter bius. Menyiapkan obat bius dan memonitor pasien saat operasi.",
    salary: "€1.190 - €1.350/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Farmakologi Anestesi", "Monitoring Pasien", "Teknologi Medis"],
    requirements: [
      { id: "ata_b2", label: "Sertifikat Bahasa B2", note: "Istilah medis kompleks" },
      { id: "ata_bio", label: "Nilai Biologi & Kimia", note: "Nilai raport harus bagus" },
      { id: "ata_praktikum", label: "Bukti Praktikum/Magang", note: "Pengalaman di RS sangat membantu" },
      { id: "ata_mcu", label: "Medical Check Up", note: "Bebas penyakit menular" },
      { id: "ata_pol", label: "SKCK + Translate", note: "Catatan kepolisian bersih" },
      { id: "ata_pass", label: "Paspor & Dokumen Visa", note: "Lengkap sesuai checklist Kedutaan" }
    ]
  },
  aus_physio: {
    id: "aus_physio",
    category: "health",
    title: "Physiotherapeut/in",
    description: "Terapis fisik untuk rehabilitasi pasien.",
    salary: "€1.065 - €1.250/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Anatomi Otot", "Teknik Pijat/Terapi", "Rehabilitasi"],
    requirements: [
      { id: "phy_b2", label: "Sertifikat Bahasa B2", note: "Komunikasi intens dengan pasien" },
      { id: "phy_ijazah", label: "Ijazah SMA (Abitur)", note: "Disetarakan (Anabin)" },
      { id: "phy_mcu", label: "Surat Sehat Dokter", note: "Kondisi fisik prima untuk memijat/mengangkat" },
      { id: "phy_pol", label: "SKCK + Translate" },
      { id: "phy_contract", label: "Kontrak Sekolah + RS", note: "Pastikan sekolahnya gratis/digaji" }
    ]
  },
  aus_mfa: {
    id: "aus_mfa",
    category: "health",
    title: "Medizinische Fachangestellte (MFA)",
    description: "Asisten dokter di klinik praktek.",
    salary: "€960 - €1.100/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Admin Klinik", "Ambil Darah/EKG", "Layanan Pasien"],
    requirements: [
      { id: "mfa_b2", label: "Sertifikat Bahasa B2", note: "Penting untuk resepsionis" },
      { id: "mfa_cv", label: "CV Europass", note: "Sertakan pengalaman customer service" },
      { id: "mfa_mcu", label: "Medical Check Up" },
      { id: "mfa_masern", label: "Vaksin Campak", note: "Wajib di sektor kesehatan" },
      { id: "mfa_contract", label: "Kontrak Klinik (Praxis)", note: "Tandatangan Dokter & Siswa" }
    ]
  },

  // ==========================================
  // --- KATEGORI: TEKNIK & IT (TECHNIK) ---
  // ==========================================
  aus_it_app: {
    id: "aus_it_app",
    category: "tech",
    title: "Fachinformatiker - App Dev",
    description: "Programmer/Developer. Membuat software, aplikasi, dan database.",
    salary: "€1.050 - €1.250/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Coding (Java/C#/JS)", "Database SQL", "Software Testing"],
    requirements: [
      { id: "it_b2", label: "Sertifikat Bahasa B2", note: "Inggris C1 nilai plus" },
      { id: "it_porto", label: "Portofolio Coding", note: "Github/Project Link (Sangat Penting!)" },
      { id: "it_cv", label: "CV Kreatif/Modern", note: "Tunjukkan skill teknis di CV" },
      { id: "it_ijazah", label: "Ijazah & Transkrip", note: "Nilai Matematika harus bagus" },
      { id: "it_pass", label: "Paspor & Dokumen Visa" },
      { id: "it_contract", label: "Kontrak Perusahaan IT" }
    ]
  },
  aus_it_sys: {
    id: "aus_it_sys",
    category: "tech",
    title: "Fachinformatiker - SysAdmin",
    description: "Admin Jaringan. Mengurus server, kabel, wifi, dan hardware.",
    salary: "€1.050 - €1.250/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Server Admin", "Cyber Security", "Jaringan"],
    requirements: [
      { id: "sys_b2", label: "Sertifikat Bahasa B2" },
      { id: "sys_skill", label: "Skill Hardware", note: "Bisa rakit PC/Troubleshooting" },
      { id: "sys_cv", label: "CV Europass" },
      { id: "sys_ijazah", label: "Transkrip Nilai", note: "Fokus di TIK dan Matematika" },
      { id: "sys_contract", label: "Kontrak Kerja" },
      { id: "sys_zav", label: "Persetujuan ZAV" }
    ]
  },
  aus_kfz: {
    id: "aus_kfz",
    category: "tech",
    title: "Kfz-Mechatroniker (Mobil)",
    description: "Mekanik mobil modern. Mesin, rem, dan elektronik.",
    salary: "€900 - €1.150/bulan",
    duration: "3.5 Tahun",
    whatYouLearn: ["Diagnosa Mesin", "Sistem Elektronik", "Servis Berkala"],
    requirements: [
      { id: "kfz_b2", label: "Sertifikat B2", note: "Istilah teknik otomotif sulit" },
      { id: "kfz_sim", label: "SIM A (Mobil)", note: "Nilai plus jika bisa menyetir" },
      { id: "kfz_fisik", label: "Keterangan Sehat", note: "Siap kerja kotor dan fisik" },
      { id: "kfz_ijazah", label: "Ijazah SMK Otomotif", note: "Disukai jurusan relevan" },
      { id: "kfz_contract", label: "Kontrak Bengkel" },
      { id: "kfz_zav", label: "Surat ZAV Visa" }
    ]
  },
  aus_elektroniker: {
    id: "aus_elektroniker",
    category: "tech",
    title: "Elektroniker für Betriebstechnik",
    description: "Teknisi listrik industri pabrik besar.",
    salary: "€1.000 - €1.250/bulan",
    duration: "3.5 Tahun",
    whatYouLearn: ["Instalasi Listrik", "Sistem Kontrol", "Maintenance"],
    requirements: [
      { id: "ele_b2", label: "Sertifikat Bahasa B2" },
      { id: "ele_warna", label: "Tes Buta Warna", note: "Wajib lolos (kabel warna-warni)" },
      { id: "ele_math", label: "Nilai Fisika/Math", note: "Harus di atas rata-rata" },
      { id: "ele_cv", label: "CV Europass" },
      { id: "ele_contract", label: "Kontrak Industri" },
      { id: "ele_pass", label: "Paspor & Visa" }
    ]
  },
  aus_zerspanung: {
    id: "aus_zerspanung",
    category: "tech",
    title: "Zerspanungsmechaniker (CNC)",
    description: "Operator mesin CNC presisi untuk logam.",
    salary: "€1.050 - €1.200/bulan",
    duration: "3.5 Tahun",
    whatYouLearn: ["Program CNC", "Membaca Gambar Teknik", "Logam"],
    requirements: [
      { id: "zer_b2", label: "Sertifikat Bahasa B2" },
      { id: "zer_math", label: "Nilai Matematika", note: "Paham geometri/ukuran presisi" },
      { id: "zer_teliti", label: "Tes Ketelitian", note: "Kerja dengan mikrometer" },
      { id: "zer_ijazah", label: "Ijazah SMK Mesin", note: "Nilai plus" },
      { id: "zer_contract", label: "Kontrak Pabrik" },
      { id: "zer_zav", label: "Surat ZAV" }
    ]
  },

  // ==========================================
  // --- KATEGORI: BISNIS (KAUFMÄNNISCH) ---
  // ==========================================
  aus_bank: {
    id: "aus_bank",
    category: "business",
    title: "Bankkaufmann/-frau",
    description: "Bankir profesional. Kredit, investasi, layanan nasabah.",
    salary: "€1.150 - €1.300/bulan",
    duration: "2.5 - 3 Tahun",
    whatYouLearn: ["Sistem Keuangan", "Kredit & Saham", "Akuntansi"],
    requirements: [
      { id: "bk_c1", label: "Sertifikat C1", note: "Wajib! Bahasa hukum/bank sulit" },
      { id: "bk_math", label: "Nilai Ekonomi/Math", note: "Sangat penting" },
      { id: "bk_cv", label: "CV Formal", note: "Penampilan rapi & profesional" },
      { id: "bk_skck", label: "SKCK (Polizeiliches Führungszeugnis)", note: "Rekam jejak bersih finansial" },
      { id: "bk_contract", label: "Kontrak Bank" },
      { id: "bk_zav", label: "Persetujuan ZAV" }
    ]
  },
  aus_buero: {
    id: "aus_buero",
    category: "business",
    title: "Kaufmann/-frau für Büromanagement",
    description: "Admin kantor. Surat, jadwal, pembukuan.",
    salary: "€980 - €1.150/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["MS Office Expert", "Korespondensi", "Pembukuan"],
    requirements: [
      { id: "bu_c1", label: "Sertifikat C1", note: "Komunikasi lisan & tulis lancar" },
      { id: "bu_komp", label: "Sertifikat Komputer", note: "Word, Excel, PowerPoint" },
      { id: "bu_cv", label: "CV Europass" },
      { id: "bu_ijazah", label: "Ijazah SMA/S1", note: "Translate Tersumpah" },
      { id: "bu_contract", label: "Kontrak Kerja" },
      { id: "bu_visa", label: "Dokumen Visa Lengkap" }
    ]
  },
  aus_industrie_kauf: {
    id: "aus_industrie_kauf",
    category: "business",
    title: "Industriekaufmann/-frau",
    description: "Admin perusahaan pabrik. Supply chain, HR, Sales.",
    salary: "€1.050 - €1.250/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Supply Chain", "HR & Payroll", "Sales Marketing"],
    requirements: [
      { id: "ik_c1", label: "Sertifikat C1", note: "Bahasa bisnis tingkat lanjut" },
      { id: "ik_ijazah", label: "Ijazah dengan nilai bagus" },
      { id: "ik_cv", label: "CV Profesional" },
      { id: "ik_contract", label: "Kontrak Industri" },
      { id: "ik_zav", label: "Persetujuan ZAV" }
    ]
  },

  // ==========================================
  // --- KATEGORI: HANDWERK & KONSTRUKSI ---
  // ==========================================
  aus_anlagen: {
    id: "aus_anlagen",
    category: "craft",
    title: "Anlagenmechaniker SHK (Plumbing)",
    description: "Teknisi sanitasi, pipa, pemanas, dan AC.",
    salary: "€900 - €1.100/bulan",
    duration: "3.5 Tahun",
    whatYouLearn: ["Instalasi Pipa", "Sistem Pemanas", "Teknologi Air"],
    requirements: [
      { id: "shk_b1", label: "Sertifikat B1/B2" },
      { id: "shk_fisik", label: "Keterangan Sehat", note: "Fisik kuat angkat beban" },
      { id: "shk_ijazah", label: "Ijazah SMK Teknik" },
      { id: "shk_cv", label: "CV Europass" },
      { id: "shk_contract", label: "Kontrak Handwerk" },
      { id: "shk_pass", label: "Paspor & Visa" }
    ]
  },
  aus_gleis: {
    id: "aus_gleis",
    category: "craft",
    title: "Gleisbauer/in (Rel Kereta)",
    description: "Membangun rel kereta api. Kerja outdoor & fisik berat.",
    salary: "€1.100 - €1.350/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Konstruksi Rel", "Alat Berat", "Beton & Besi"],
    requirements: [
      { id: "gl_b1", label: "Sertifikat B1" },
      { id: "gl_fisik", label: "Surat Sehat Dokter", note: "Sangat vital (Outdoor/Berat)" },
      { id: "gl_ijazah", label: "Ijazah SMA/SMK" },
      { id: "gl_contract", label: "Kontrak Perusahaan Konstruksi" },
      { id: "gl_zav", label: "Surat ZAV" }
    ]
  },
  aus_tischler: {
    id: "aus_tischler",
    category: "craft",
    title: "Tischler/in (Tukang Kayu)",
    description: "Pengrajin kayu. Furnitur, jendela, interior.",
    salary: "€850 - €1.050/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Pengolahan Kayu", "Desain Furnitur", "Mesin Potong"],
    requirements: [
      { id: "ti_b1", label: "Sertifikat B1" },
      { id: "ti_porto", label: "Foto Karya (Opsional)", note: "Jika pernah buat kerajinan kayu" },
      { id: "ti_math", label: "Matematika Dasar", note: "Untuk ukur presisi" },
      { id: "ti_contract", label: "Kontrak Tischlerei" },
      { id: "ti_visa", label: "Dokumen Visa" }
    ]
  },
  aus_gaertner: {
    id: "aus_gaertner",
    category: "craft",
    title: "Gärtner/in (Tukang Kebun)",
    description: "Ahli taman dan lanskap.",
    salary: "€900 - €1.100/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Botani", "Desain Lanskap", "Teknik Tanam"],
    requirements: [
      { id: "ga_b1", label: "Sertifikat B1" },
      { id: "ga_alam", label: "Minat Alam", note: "Tidak alergi serbuk sari" },
      { id: "ga_fisik", label: "Fisik Prima", note: "Kerja Outdoor segala cuaca" },
      { id: "ga_contract", label: "Kontrak Gartenbau" },
      { id: "ga_zav", label: "Surat ZAV" }
    ]
  },
  aus_baeckerei: {
    id: "aus_baeckerei",
    category: "craft",
    title: "Bäckereifachverkäufer/in",
    description: "Sales di toko roti. Display dan melayani pelanggan.",
    salary: "€800 - €950/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Service Pelanggan", "Presentasi Produk", "Higiene"],
    requirements: [
      { id: "bk_b1", label: "Sertifikat B1", note: "Komunikasi dasar lancar" },
      { id: "bk_health", label: "Rote Karte (Infektionsschutz)", note: "Sertifikat kesehatan pangan" },
      { id: "bk_cv", label: "CV dengan Foto" },
      { id: "bk_contract", label: "Kontrak Toko Roti" },
      { id: "bk_pass", label: "Paspor" }
    ]
  },

  // ==========================================
  // --- KATEGORI: LOGISTIK & TRANSPORT ---
  // ==========================================
  aus_lager: {
    id: "aus_lager",
    category: "logistics",
    title: "Fachkraft für Lagerlogistik",
    description: "Manajer gudang. Stok, forklift, pengiriman.",
    salary: "€950 - €1.150/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Manajemen Gudang", "Forklift", "Logistik"],
    requirements: [
      { id: "lag_b1", label: "Sertifikat B1" },
      { id: "lag_ijazah", label: "Ijazah SMA/SMK" },
      { id: "lag_cv", label: "CV Europass" },
      { id: "lag_teliti", label: "Ketelitian", note: "Penting untuk hitung stok" },
      { id: "lag_contract", label: "Kontrak Logistik" },
      { id: "lag_zav", label: "Surat ZAV" }
    ]
  },
  aus_driver: {
    id: "aus_driver",
    category: "logistics",
    title: "Berufskraftfahrer/in (Supir)",
    description: "Pengemudi truk logistik atau bus.",
    salary: "€1.000 - €1.200/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["SIM Truk/Bus (C/D)", "Mekanika", "Navigasi"],
    requirements: [
      { id: "drv_b1", label: "Sertifikat B1" },
      { id: "drv_sim", label: "SIM A/B Indonesia", note: "Wajib punya SIM Mobil dulu" },
      { id: "drv_mcu", label: "Tes Mata & Kesehatan", note: "Syarat mutlak supir" },
      { id: "drv_contract", label: "Kontrak Spedition" },
      { id: "drv_zav", label: "Surat ZAV" }
    ]
  },
  aus_eisenbahner: {
    id: "aus_eisenbahner",
    category: "logistics",
    title: "Eisenbahner (Masinis)",
    description: "Mengemudikan kereta api kargo/penumpang (Lokführer).",
    salary: "€1.100 - €1.300/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Operasional Kereta", "Sinyal", "Teknik Lokomotif"],
    requirements: [
      { id: "bahn_b2", label: "Sertifikat B2", note: "Bahasa teknis komunikasi radio" },
      { id: "bahn_psiko", label: "Tes Psikologi & Medis", note: "Wajib lulus tes ketat (DB)" },
      { id: "bahn_cv", label: "CV Lengkap" },
      { id: "bahn_contract", label: "Kontrak Deutsche Bahn/Swasta" },
      { id: "bahn_visa", label: "Dokumen Visa" }
    ]
  },

  // ==========================================
  // --- KATEGORI: HOTEL & RESTO (GASTRO) ---
  // ==========================================
  aus_hotel: {
    id: "aus_hotel",
    category: "gastro",
    title: "Hotelfachmann/frau",
    description: "Manajemen hotel. Front Office, Housekeeping, Service.",
    salary: "€1.000 - €1.150/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Sistem Reservasi", "Standar Service", "Event"],
    requirements: [
      { id: "hot_b1", label: "Sertifikat B1/B2" },
      { id: "hot_eng", label: "Bahasa Inggris", note: "Nilai plus besar" },
      { id: "hot_health", label: "Rote Karte (Infektionsschutz)", note: "Sertifikat kesehatan" },
      { id: "hot_cv", label: "CV dengan Foto Profesional" },
      { id: "hot_contract", label: "Kontrak Hotel" },
      { id: "hot_zav", label: "Surat ZAV" }
    ]
  },
  aus_koch: {
    id: "aus_koch",
    category: "gastro",
    title: "Koch/Köchin (Koki)",
    description: "Juru masak profesional.",
    salary: "€950 - €1.100/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Teknik Masak", "Higiene", "Menu Planning"],
    requirements: [
      { id: "koch_b1", label: "Sertifikat B1" },
      { id: "koch_health", label: "Rote Karte (Infektionsschutz)", note: "Wajib untuk kerja dapur" },
      { id: "koch_fisik", label: "Keterangan Sehat", note: "Kuat berdiri lama/panas" },
      { id: "koch_cv", label: "CV Europass" },
      { id: "koch_contract", label: "Kontrak Restoran" },
      { id: "koch_zav", label: "Surat ZAV" }
    ]
  },
  aus_sys_gastro: {
    id: "aus_sys_gastro",
    category: "gastro",
    title: "Fachmann Systemgastronomie",
    description: "Manajemen resto cepat saji (Mcd/Starbucks).",
    salary: "€1.000 - €1.150/bulan",
    duration: "3 Tahun",
    whatYouLearn: ["Manajemen Shift", "Quality Control", "Marketing"],
    requirements: [
      { id: "sys_b1", label: "Sertifikat B1" },
      { id: "sys_org", label: "Skill Organisasi", note: "Suka mengatur tim" },
      { id: "sys_health", label: "Rote Karte" },
      { id: "sys_contract", label: "Kontrak Franchise" },
      { id: "sys_visa", label: "Dokumen Visa" }
    ]
  },
  
  // ==========================================
  // --- KATEGORI: SAINS & LAB (SCIENCE) ---
  // ==========================================
  aus_chemie: {
    id: "aus_chemie",
    category: "science",
    title: "Chemielaborant/in",
    description: "Laboran kimia. Analisis zat di industri farmasi/kosmetik.",
    salary: "€1.100 - €1.300/bulan",
    duration: "3.5 Tahun",
    whatYouLearn: ["Analisis Kimia", "Instrumen Lab", "Sintesis Zat"],
    requirements: [
      { id: "che_b2", label: "Sertifikat B2", note: "Bahasa ilmiah" },
      { id: "che_nilai", label: "Nilai Kimia/Fisika", note: "Wajib Bagus" },
      { id: "che_teliti", label: "Tes Ketelitian Lab" },
      { id: "che_cv", label: "CV Lengkap" },
      { id: "che_contract", label: "Kontrak Industri Kimia" },
      { id: "che_zav", label: "Surat ZAV" }
    ]
  },
  aus_bio: {
    id: "aus_bio",
    category: "science",
    title: "Biologielaborant/in",
    description: "Laboran biologi. Riset sel, bakteri, tanaman.",
    salary: "€1.050 - €1.250/bulan",
    duration: "3.5 Tahun",
    whatYouLearn: ["Mikrobiologi", "Genetika", "Kultur Sel"],
    requirements: [
      { id: "bio_b2", label: "Sertifikat B2" },
      { id: "bio_nilai", label: "Nilai Biologi", note: "Sangat penting" },
      { id: "bio_ijazah", label: "Ijazah SMA IPA", note: "Disarankan jurusan IPA" },
      { id: "bio_contract", label: "Kontrak Lab Riset" },
      { id: "bio_pass", label: "Paspor & Visa" }
    ]
  }
};