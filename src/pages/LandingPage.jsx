import {
  //   BookOpen,
  PlayCircle,
  Clock,
  FileText,
  Users,
  CheckCircle,
  //   Award,
  Shield,
  Monitor,
  AlertCircle,
  ChevronRight,
  Star,
  Target,
  Zap,
  BarChart3,
} from "lucide-react";
import Swal from "sweetalert2";

const LandingPage = ({ onStartExam }) => {
  const handleStartExam = async () => {
    const result = await Swal.fire({
      title: "Mulai Ujian?",
      text: "Pastikan Anda sudah siap. Waktu ujian akan langsung berjalan setelah Anda menekan 'Ya, Mulai'.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Mulai",
      cancelButtonText: "Batal",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    if (result.isConfirmed) {
      onStartExam();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex justify-between items-center overflow-hidden bg-linear-to-r from-white to-white-dark p-3 rounded-2xl shadow-lg w-16 h-16 ">
              {/* <BookOpen className="w-8 h-8 text-white" /> */}
              <img src="/logo1.png" alt="" className="" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold ">
                <span className="text-primary">Ruang</span>
                <span className="text-orange-500">Tryout</span>
              </h1>
              <p className="text-sm text-gray-500"></p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Content - Informasi */}
            <div className="lg:col-span-3 space-y-6">
              {/* Welcome Card */}
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-primary-dark flex items-center justify-center shrink-0 shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                      Tryout{" "}
                      <span className="text-primary">Sekolah Rakyat</span>
                    </h2>

                    <p className="mt-3 text-sm text-gray-600">
                      Selamat datang di halaman tryout berbasis{" "}
                      <strong>Computer Assisted Test (CAT)</strong>. Bacalah
                      petunjuk pengerjaan dengan saksama sebelum memulai ujian.
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      Total Soal
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">50</p>
                  <p className="text-xs text-gray-400">Soal Pilihan Ganda</p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-yellow-100 rounded-xl">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      Durasi
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">120</p>
                  <p className="text-xs text-gray-400">Menit</p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-xl">
                      <Target className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      Kelulusan
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">70%</p>
                  <p className="text-xs text-gray-400">Nilai Minimum</p>
                </div>
              </div>

              {/* Petunjuk Ujian */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Petunjuk Ujian
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {[
                    "Bacalah setiap soal dengan teliti sebelum menjawab",
                    "Pilih salah satu jawaban yang paling benar (A-E)",
                    "Anda dapat menandai soal yang diragukan dengan tombol 'Ragu-ragu'",
                    "Waktu pengerjaan adalah 2 jam dan akan berjalan otomatis setelah memulai",
                    "Pastikan koneksi internet stabil selama mengerjakan ujian",
                    "Soal yang tidak dijawab akan dianggap salah",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-2 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Start Button & Features */}
            <div className="lg:col-span-2 space-y-6">
              {/* Start Card */}
              <div className="bg-linear-to-br from-primary to-primary-dark rounded-3xl shadow-2xl p-6 md:p-8 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                <div className="relative">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Zap className="w-6 h-6 text-yellow-300 animate-pulse" />
                    <span className="text-sm font-semibold text-yellow-200">
                      SIAP UJIAN
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">Mulai Ujian</h3>
                  <p className="text-white/80 text-sm mb-6">
                    Pastikan Anda telah siap sebelum memulai ujian
                  </p>

                  <button
                    onClick={handleStartExam}
                    className="w-full py-4 bg-white text-primary hover:bg-gray-100 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3 group"
                  >
                    <PlayCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    Mulai Mengerjakan
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-xs text-white/60 mt-3">
                    Dengan mengklik "Mulai Mengerjakan", Anda menyetujui aturan
                    ujian yang berlaku
                  </p>
                </div>
              </div>

              {/* Fitur Ujian */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  Fitur Ujian
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      icon: Monitor,
                      label: "Antarmuka Responsif",
                      desc: "Akses dari berbagai perangkat",
                    },
                    {
                      icon: BarChart3,
                      label: "Penilaian Otomatis",
                      desc: "Hasil langsung setelah ujian",
                    },
                    // {
                    //   icon: Award,
                    //   label: "Sertifikat Digital",
                    //   desc: "Bukti kelulusan resmi",
                    // },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {feature.label}
                        </p>
                        <p className="text-xs text-gray-500">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Peringatan */}
              <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Perhatian!
                    </p>
                    <p className="text-xs text-yellow-700">
                      Jangan refresh atau menutup halaman selama ujian
                      berlangsung. Akan kembali semula.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-400">
              © 2026 RuangTryout CAT - Computer Assisted Test. All rights
              reserved.
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Sistem Ujian Berbasis Komputer untuk Seleksi Calon Pegawai Negeri
              Sipil
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
