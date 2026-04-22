import { useState } from 'react';
import {
  BookOpen,
  User,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Download,
  ChevronRight,
  ChevronLeft,
  Award,
  Send,
  PenLine,
} from 'lucide-react';

// ===================== TYPES =====================
interface SingleQuestion {
  id: number;
  section: string;
  type: 'single';
  text: string;
  options: string[];
  answer: number;
}

interface MultipleQuestion {
  id: number;
  section: string;
  type: 'multiple';
  text: string;
  options: string[];
  answers: number[];
}

interface TFQuestion {
  id: number;
  section: string;
  type: 'tf';
  text: string;
  statements: string[];
  answers: string[];
}

interface EssayQuestion {
  id: number;
  section: string;
  type: 'essay';
  text: string;
  rubric: string;
}

type Question = SingleQuestion | MultipleQuestion | TFQuestion | EssayQuestion;

type AnswerValue = number | number[] | string[] | string | undefined;

interface Answers {
  [idx: number]: AnswerValue;
}

interface DetailItem {
  id: number;
  correct: boolean;
  type: string;
}

interface ScoreData {
  score: number;
  correct: number;
  total: number;
  essayAnswered: number;
  essayTotal: number;
  detail: DetailItem[];
}

// ===================== DATA SOAL =====================
const questionsData: Question[] = [
  // ---------- PG BIASA (1-15) ----------
  {
    id: 1,
    section: 'Kerajaan Hindu-Buddha',
    type: 'single',
    text: 'Seorang peneliti ingin mengkaji kehidupan sosial-keagamaan Kerajaan Majapahit. Ia menemukan tiga jenis sumber: (1) Kitab Negarakertagama karya Mpu Prapanca, (2) laporan perjalanan Ibnu Batutah, dan (3) temuan arkeologis berupa candi dan prasasti. Analisis yang paling tepat tentang penggunaan ketiga sumber tersebut dalam penelitian sejarah adalah ...',
    options: [
      'Kitab Negarakertagama tidak dapat dipercaya karena ditulis oleh orang dalam kerajaan yang cenderung memuji raja',
      'Laporan Ibnu Batutah lebih akurat karena merupakan sumber asing yang bersifat netral dan objektif',
      'Ketiga sumber harus digunakan secara komplementer karena masing-masing memiliki kelebihan dan keterbatasan perspektif yang saling melengkapi',
      'Sumber arkeologis adalah satu-satunya bukti yang bisa dipercaya karena bersifat fisik dan tidak dapat dimanipulasi',
      'Peneliti harus memilih satu sumber primer terbaik dan mengabaikan yang lain agar penelitiannya lebih fokus',
    ],
    answer: 2,
  },
  {
    id: 2,
    section: 'Kerajaan Hindu-Buddha',
    type: 'single',
    text: 'Kerajaan Sriwijaya (abad VII–XIII M) dikenal sebagai pusat perdagangan internasional dan pusat studi agama Buddha di Asia Tenggara. Biksu Tiongkok I-Tsing singgah di Sriwijaya selama bertahun-tahun untuk mempelajari bahasa Sansekerta sebelum melanjutkan perjalanan ke India. Berdasarkan fakta ini, keterhubungan antara kejayaan Sriwijaya dengan kondisi global masa kini yang paling relevan adalah ...',
    options: [
      'Sriwijaya membuktikan bahwa Nusantara hanya berperan sebagai jalur transit dan tidak memiliki kontribusi intelektual bagi dunia',
      'Posisi strategis Sriwijaya di Selat Malaka sebagai pusat pertukaran ilmu dan perdagangan mencerminkan konsep "hub internasional" yang masih relevan bagi posisi Indonesia di era globalisasi',
      'Kejayaan Sriwijaya tidak memiliki relevansi dengan masa kini karena kerajaan tersebut sudah lama runtuh dan tidak meninggalkan warisan nyata',
      'Sriwijaya hanya penting sebagai pusat agama Buddha dan tidak berpengaruh pada perkembangan perdagangan dunia',
      'Keterhubungan Sriwijaya dengan dunia luar semata-mata disebabkan oleh letak geografis tanpa disertai kemampuan diplomatik',
    ],
    answer: 1,
  },
  {
    id: 3,
    section: 'Kerajaan Hindu-Buddha',
    type: 'single',
    text: 'Gajah Mada, Mahapatih Majapahit, mengucapkan Sumpah Palapa yang berisi tekad untuk menyatukan seluruh Nusantara di bawah kekuasaan Majapahit. Sumpah ini menjadi salah satu inspirasi bagi para pendiri bangsa Indonesia dalam mewujudkan persatuan nasional. Evaluasi yang paling kritis terhadap keterhubungan antara Sumpah Palapa dengan semangat kebangsaan Indonesia adalah ...',
    options: [
      'Sumpah Palapa tidak relevan karena merupakan ambisi personal Gajah Mada dan bukan kehendak rakyat Nusantara saat itu',
      'Konsep persatuan Nusantara Majapahit menunjukkan bahwa gagasan tentang wilayah Indonesia sebagai satu kesatuan sudah mengakar jauh sebelum era modern, meski konteks dan motivasinya berbeda',
      'Sumpah Palapa terbukti gagal karena Majapahit akhirnya runtuh, sehingga tidak layak dijadikan inspirasi',
      'Persatuan yang dicapai Majapahit bersifat militer dan koersif sehingga tidak ada kaitannya dengan semangat kebangsaan Indonesia yang demokratis',
      'Sumpah Palapa hanyalah mitos yang diciptakan kemudian dan tidak memiliki dasar historis yang kuat',
    ],
    answer: 1,
  },
  {
    id: 4,
    section: 'Kerajaan Hindu-Buddha',
    type: 'single',
    text: 'Seorang siswa SMA ingin meneliti pengaruh Kerajaan Kutai sebagai kerajaan Hindu tertua di Nusantara terhadap perkembangan kebudayaan lokal di Kalimantan Timur hingga masa kini. Urutan langkah penelitian sejarah yang paling sistematis adalah ...',
    options: [
      'Menulis laporan → mencari sumber → merumuskan masalah → melakukan kritik sumber',
      'Merumuskan masalah/topik → heuristik (pengumpulan sumber) → verifikasi/kritik sumber → interpretasi → historiografi',
      'Interpretasi → heuristik → verifikasi → merumuskan masalah → historiografi',
      'Mencari sumber sebanyak-banyaknya → langsung menulis laporan → kemudian merumuskan masalah',
      'Verifikasi sumber → merumuskan masalah → heuristik → historiografi → interpretasi',
    ],
    answer: 1,
  },
  {
    id: 5,
    section: 'Kerajaan Hindu-Buddha',
    type: 'single',
    text: 'Prasasti Yupa dari Kerajaan Kutai (abad IV M) merupakan bukti tertulis tertua keberadaan kerajaan bercorak Hindu di Indonesia. Namun, prasasti ini hanya menyebutkan nama raja dan upacara persembahan sapi. Seorang sejarawan tidak boleh langsung menyimpulkan bahwa masyarakat Kutai seluruhnya beragama Hindu berdasarkan prasasti ini saja. Prinsip penelitian sejarah yang paling tepat menjelaskan kehati-hatian tersebut adalah ...',
    options: [
      'Sejarawan harus menolak prasasti sebagai sumber karena tulisannya sudah aus dan sulit dibaca',
      'Kritik intern diperlukan untuk menilai apakah isi prasasti dapat dipercaya dan mewakili gambaran masyarakat secara keseluruhan, bukan hanya kelompok elite',
      'Prasasti Yupa harus dikonfirmasi oleh sumber Tiongkok terlebih dahulu sebelum bisa dijadikan bukti',
      'Sumber tertulis selalu lebih dipercaya daripada sumber lisan atau arkeologis dalam penelitian sejarah',
      'Sejarawan cukup melakukan kritik ekstern (menilai keaslian fisik prasasti) tanpa perlu menganalisis isinya lebih jauh',
    ],
    answer: 1,
  },
  {
    id: 6,
    section: 'Peralihan Hindu-Buddha ke Islam',
    type: 'single',
    text: 'Islam masuk ke Nusantara melalui jalur perdagangan, pernikahan, tasawuf, dan pendidikan (pesantren). Berbeda dengan penyebaran Hindu-Buddha yang banyak didorong oleh patronase kerajaan, Islam menyebar lebih luas hingga ke lapisan masyarakat bawah. Analisis yang paling tepat tentang faktor percepatan Islamisasi di Nusantara dibanding penyebaran Hindu-Buddha adalah ...',
    options: [
      'Islam menyebar lebih cepat karena dibantu oleh kekuatan militer kerajaan-kerajaan Islam di Nusantara',
      'Islamisasi dipercepat oleh pendekatan akulturasi yang fleksibel, tidak menghapus budaya lokal secara radikal, serta peran para ulama/wali yang aktif berdakwah di semua lapisan sosial',
      'Islam lebih mudah diterima karena ajarannya lebih sederhana dan tidak memerlukan ritual yang rumit seperti Hindu-Buddha',
      'Perdagangan menjadi satu-satunya faktor penyebaran Islam, sedangkan jalur lainnya tidak signifikan',
      'Islamisasi berhasil karena kerajaan-kerajaan Hindu-Buddha di Nusantara sudah sangat lemah sehingga tidak mampu mempertahankan agamanya',
    ],
    answer: 1,
  },
  {
    id: 7,
    section: 'Kerajaan Islam',
    type: 'single',
    text: 'Kerajaan Samudra Pasai (abad XIII–XVI M) di Aceh dikenal sebagai kerajaan Islam pertama di Nusantara dan pusat perdagangan lada internasional. Para pedagang dari Arab, India, dan Tiongkok aktif berdagang di pelabuhan Pasai. Keterhubungan antara peran Samudra Pasai di masa lampau dengan realitas ekonomi Indonesia masa kini yang paling tepat adalah ...',
    options: [
      'Samudra Pasai membuktikan bahwa Nusantara selalu bergantung pada pedagang asing dan tidak mampu berdiri sendiri',
      'Keberhasilan Samudra Pasai sebagai pusat perdagangan rempah-rempah internasional mencerminkan potensi Indonesia sebagai kekuatan ekonomi maritim global yang perlu dikembangkan kembali',
      'Peran Samudra Pasai sudah berakhir dengan runtuhnya kerajaan dan tidak ada keterhubungan dengan ekonomi Indonesia modern',
      'Perdagangan lada Samudra Pasai hanya menguntungkan pedagang asing, bukan masyarakat Nusantara sendiri',
      'Samudra Pasai relevan hanya sebagai studi kasus agama dan tidak berkaitan dengan ekonomi masa kini',
    ],
    answer: 1,
  },
  {
    id: 8,
    section: 'Kerajaan Islam',
    type: 'single',
    text: 'Sunan Kalijaga menggunakan wayang kulit dan gamelan sebagai media dakwah Islam. Cerita wayang dimodifikasi dengan memasukkan nilai-nilai Islam, namun tetap mempertahankan unsur budaya Jawa. Evaluasi yang paling tepat terhadap strategi dakwah Wali Songo ini dalam konteks keterhubungannya dengan prinsip kehidupan beragama di Indonesia masa kini adalah ...',
    options: [
      'Strategi Wali Songo keliru karena mencampuradukkan budaya Hindu-Jawa dengan Islam yang seharusnya murni',
      'Pendekatan akulturasi budaya Wali Songo mencerminkan prinsip toleransi dan kearifan lokal yang menjadi fondasi Islam Nusantara, dan masih relevan sebagai model keberagaman inklusif di Indonesia masa kini',
      'Penggunaan wayang sebagai media dakwah tidak efektif karena masyarakat lebih mudah memahami teks Al-Quran langsung',
      'Strategi Wali Songo berhasil di masa lalu tetapi tidak relevan di era modern yang membutuhkan pendekatan berbasis teknologi',
      'Akulturasi yang dilakukan Wali Songo melemahkan kemurnian ajaran Islam dan menjadi sumber konflik keagamaan di Indonesia',
    ],
    answer: 1,
  },
  {
    id: 9,
    section: 'Kerajaan Islam',
    type: 'single',
    text: 'Kerajaan Demak (abad XV–XVI M) berdiri setelah runtuhnya Majapahit dan menjadi kerajaan Islam pertama di Jawa. Demak berperan penting dalam penyebaran Islam di Jawa melalui jalur politik, militer, dan kebudayaan (dukungan kepada Wali Songo). Analisis paling tepat mengenai posisi Demak dalam keterhubungan antara era Hindu-Buddha dengan era Islam di Nusantara adalah ...',
    options: [
      'Demak menghapuskan seluruh warisan Hindu-Buddha di Jawa dan memulai peradaban yang sepenuhnya baru',
      'Demak merupakan jembatan transisi kekuasaan yang tidak sekadar mengganti agama, tetapi juga mengintegrasikan unsur-unsur budaya Majapahit ke dalam kerangka Islam Jawa',
      'Berdirinya Demak merupakan bukti bahwa runtuhnya Majapahit disebabkan oleh serangan militer Demak semata',
      'Kerajaan Demak tidak memiliki hubungan budaya dengan Majapahit karena perbedaan agama yang sangat fundamental',
      'Peran Demak dalam Islamisasi Jawa bersifat sporadis dan tidak terencana karena raja-rajanya kurang memahami ajaran Islam',
    ],
    answer: 1,
  },
  {
    id: 10,
    section: 'Kerajaan Islam',
    type: 'single',
    text: 'Kerajaan Aceh Darussalam (abad XVI–XVII M) di bawah Sultan Iskandar Muda mencapai puncak kejayaannya sebagai kekuatan maritim dan pusat perdagangan lada terbesar di dunia. Aceh pernah menjalin hubungan diplomatik dengan Turki Usmani dan Inggris untuk menghadapi hegemoni Portugis di Selat Malaka. Evaluasi yang paling relevan tentang keterhubungan sejarah Aceh dengan posisi Indonesia dalam geopolitik global masa kini adalah ...',
    options: [
      'Kejayaan Aceh hanya bersifat lokal dan tidak memiliki makna bagi posisi Indonesia di kancah internasional',
      'Pengalaman Aceh dalam membangun diplomasi internasional guna menghadapi kekuatan asing menunjukkan kapasitas diplomatik bangsa ini yang perlu diteruskan dalam kebijakan luar negeri Indonesia modern',
      'Aceh relevan hanya karena konflik separatisme yang pernah terjadi, bukan karena sejarah kejayaannya',
      'Diplomasi Aceh dengan Turki Usmani adalah bukti bahwa Indonesia harus selalu bergantung pada kekuatan Islam internasional',
      'Kejayaan Aceh berakhir dengan penjajahan Belanda sehingga tidak ada warisan positif yang bisa dipetik',
    ],
    answer: 1,
  },
  {
    id: 11,
    section: 'Kerajaan Hindu-Buddha',
    type: 'single',
    text: 'Candi Borobudur dibangun pada masa Dinasti Syailendra (abad VIII–IX M) dan merupakan monumen Buddha terbesar di dunia. Hari ini, Borobudur tidak hanya menjadi situs keagamaan tetapi juga warisan budaya dunia (UNESCO) dan destinasi wisata internasional yang berdampak pada perekonomian lokal. Analisis yang paling komprehensif tentang keterhubungan Borobudur antara masa lampau, masa kini, dan masa depan adalah ...',
    options: [
      'Borobudur hanya relevan bagi umat Buddha dan tidak memiliki makna bagi masyarakat Indonesia yang mayoritas Muslim',
      'Borobudur sebagai warisan arsitektur dan spiritual masa lampau kini menjadi sumber identitas budaya nasional dan aset ekonomi; pelestariannya untuk masa depan adalah tanggung jawab kolektif lintas generasi',
      'Nilai Borobudur sepenuhnya bersifat komersial sejak dijadikan destinasi wisata sehingga nilai spiritualnya sudah hilang',
      'Borobudur harus dikembalikan fungsinya sebagai tempat ibadah eksklusif dan ditutup dari kunjungan wisata',
      'Keterhubungan Borobudur dengan masa kini hanya bersifat arkeologis dan tidak berkaitan dengan kehidupan sosial-ekonomi masyarakat sekitarnya',
    ],
    answer: 1,
  },
  {
    id: 12,
    section: 'Kerajaan Islam',
    type: 'single',
    text: 'Kerajaan Ternate dan Tidore di Maluku menjadi pusat cengkeh dan pala, rempah-rempah yang sangat berharga di pasar Eropa. Daya tarik rempah-rempah ini mendorong kedatangan Portugis, Spanyol, dan kemudian VOC Belanda ke Nusantara. Analisis paling tepat tentang keterhubungan antara kekayaan rempah-rempah Maluku di masa lampau dengan kondisi Indonesia masa kini adalah ...',
    options: [
      'Kekayaan rempah-rempah Maluku membuktikan bahwa sumber daya alam selalu membawa kemakmuran bagi rakyat daerah penghasil',
      'Kekayaan sumber daya alam Maluku justru menjadi "kutukan" yang mengundang kolonialisme; hal ini menjadi pelajaran bahwa pengelolaan SDA harus disertai kedaulatan dan kemandirian bangsa agar tidak kembali tereksploitasi',
      'Kerajaan Ternate dan Tidore tidak mampu mengelola kekayaan rempahnya sehingga wajar bila pihak asing mengambil alih',
      'Rempah-rempah Maluku tidak lagi relevan karena sudah bisa ditanam di banyak negara dan harganya anjlok',
      'Keterlibatan kekuatan asing di Maluku semata-mata disebabkan oleh kelemahan militer kerajaan lokal',
    ],
    answer: 1,
  },
  {
    id: 13,
    section: 'Peralihan Hindu-Buddha ke Islam',
    type: 'single',
    text: 'Terdapat beberapa teori tentang masuknya Islam ke Nusantara: (1) Teori Gujarat (Islam dibawa pedagang dari India), (2) Teori Mekah/Arab (Islam langsung dari Arab), dan (3) Teori Persia (Islam dibawa dari Persia/Iran). Ketiga teori ini masih diperdebatkan oleh sejarawan hingga kini. Evaluasi paling tepat tentang perbedaan teori-teori tersebut dalam konteks penelitian sejarah adalah ...',
    options: [
      'Teori Gujarat adalah satu-satunya teori yang benar karena didukung oleh bukti arkeologis berupa batu nisan bergaya Gujarat',
      'Perbedaan teori mencerminkan kompleksitas proses Islamisasi yang kemungkinan terjadi melalui berbagai jalur secara bersamaan, bukan dari satu sumber tunggal; peneliti perlu bersikap terbuka dan kritis terhadap semua teori',
      'Teori Mekah/Arab adalah yang paling benar karena Islam yang murni hanya bisa berasal langsung dari tanah Arab',
      'Perdebatan antar teori menunjukkan bahwa sejarah masuknya Islam ke Nusantara tidak mungkin diketahui dengan pasti sehingga tidak perlu diteliti lebih lanjut',
      'Sejarawan harus memilih salah satu teori dan menolak sepenuhnya teori-teori lain untuk menghasilkan kesimpulan yang tegas',
    ],
    answer: 1,
  },
  {
    id: 14,
    section: 'Kerajaan Islam',
    type: 'single',
    text: "Kerajaan Mataram Islam di bawah Sultan Agung (abad XVII M) berhasil memadukan unsur-unsur kebudayaan Islam dengan tradisi Jawa kuno, termasuk penanggalan Jawa (kalender Saka dimodifikasi menjadi kalender Jawa-Islam), dan upacara-upacara kraton yang bernuansa Islami namun tetap mempertahankan unsur Hindu-Buddha. Analisis paling tepat tentang warisan Mataram Islam dalam kehidupan masyarakat Jawa masa kini adalah ...",
    options: [
      'Warisan Mataram Islam sudah sepenuhnya tergantikan oleh budaya global dan tidak lagi ditemukan dalam kehidupan sehari-hari',
      "Sinkretisme budaya yang dikembangkan Mataram Islam menciptakan identitas budaya Jawa yang khas – perpaduan Islam, Hindu-Buddha, dan budaya lokal – yang masih hidup dalam tradisi, seni, dan upacara adat masyarakat Jawa masa kini",
      "Tradisi sinkretis Mataram Islam dianggap sebagai bentuk bid'ah yang harus dihapuskan dari kehidupan masyarakat Jawa",
      'Sultan Agung sengaja mencampuradukkan budaya untuk melemahkan ajaran Islam murni di Jawa',
      'Pengaruh Mataram Islam hanya dirasakan di lingkungan kraton dan tidak menyentuh kehidupan masyarakat biasa',
    ],
    answer: 1,
  },
  {
    id: 15,
    section: 'Kerajaan Hindu-Buddha & Islam',
    type: 'single',
    text: 'Kerajaan-kerajaan Hindu-Buddha seperti Sriwijaya dan Majapahit sukses membangun jaringan maritim dan perdagangan internasional. Kerajaan-kerajaan Islam seperti Samudra Pasai, Aceh, dan Demak berhasil membangun jaringan diplomatik dan kultural lintas bangsa. Sintesis paling tepat mengenai pelajaran dari sejarah kerajaan-kerajaan tersebut yang paling relevan untuk menyongsong Indonesia masa depan adalah ...',
    options: [
      'Indonesia harus mencontoh sistem pemerintahan kerajaan dengan pemimpin tunggal yang kuat agar bisa bersaing di panggung global',
      'Pengalaman maritim, diplomasi, dan multikulturalisme kerajaan-kerajaan Nusantara merupakan modal historis yang dapat menginspirasi Indonesia untuk kembali menjadi kekuatan maritim, diplomatik, dan budaya yang disegani di tingkat global',
      'Pelajaran dari kerajaan-kerajaan masa lalu sudah tidak relevan karena tantangan Indonesia modern sangat berbeda dengan konteks prasejarah',
      'Indonesia harus memilih antara warisan Hindu-Buddha atau Islam dan tidak bisa mengintegrasikan keduanya dalam identitas nasional',
      'Kejayaan masa lalu hanya menimbulkan nostalgia yang tidak produktif dan lebih baik Indonesia fokus pada inovasi teknologi tanpa menoleh ke belakang',
    ],
    answer: 1,
  },

  // ---------- PG KOMPLEKS BENAR/SALAH (16-20) ----------
  {
    id: 16,
    section: 'Kerajaan Hindu-Buddha',
    type: 'tf',
    text: 'Tentukan apakah setiap pernyataan berikut BENAR atau SALAH berdasarkan materi Kerajaan Hindu-Buddha!',
    statements: [
      'Kerajaan Sriwijaya berperan sebagai pusat perdagangan dan pusat studi agama Buddha yang dikunjungi oleh biksu dari Tiongkok dan India.',
      'Gajah Mada adalah raja pertama Kerajaan Majapahit yang mengucapkan Sumpah Palapa untuk menyatukan Nusantara.',
      'Prasasti Yupa merupakan bukti tertulis tertua tentang adanya kerajaan bercorak Hindu di Indonesia, berasal dari Kerajaan Kutai.',
      'Candi Borobudur dibangun oleh Dinasti Mataram Kuno sebagai monumen agama Hindu terbesar di Asia Tenggara.',
      'Kerajaan Sriwijaya memanfaatkan posisi strategis di Selat Malaka untuk menguasai jalur perdagangan internasional.',
    ],
    answers: ['Benar', 'Tidak Tepat', 'Benar', 'Tidak Tepat', 'Benar'],
  },
  {
    id: 17,
    section: 'Peralihan Hindu-Buddha ke Islam',
    type: 'tf',
    text: 'Tentukan apakah setiap pernyataan berikut BENAR atau SALAH terkait proses dan teori Islamisasi di Nusantara!',
    statements: [
      'Teori Gujarat menyatakan bahwa Islam dibawa oleh pedagang dari Gujarat, India, yang dibuktikan antara lain oleh persamaan batu nisan di Samudra Pasai dengan batu nisan di Gujarat.',
      'Wali Songo adalah sembilan ulama yang berperan dalam penyebaran Islam di Jawa melalui pendekatan dakwah kultural.',
      'Islam masuk ke Nusantara hanya melalui jalur perdagangan dan tidak melalui jalur pendidikan, pernikahan, maupun tasawuf.',
      'Kerajaan Samudra Pasai di Aceh dikenal sebagai kerajaan Islam pertama di Nusantara.',
      'Akulturasi budaya dalam proses Islamisasi berarti menghapuskan seluruh unsur budaya Hindu-Buddha dan menggantinya dengan budaya Arab secara total.',
    ],
    answers: ['Benar', 'Benar', 'Tidak Tepat', 'Benar', 'Tidak Tepat'],
  },
  {
    id: 18,
    section: 'Kerajaan Islam',
    type: 'tf',
    text: 'Tentukan apakah setiap pernyataan berikut BENAR atau SALAH tentang kerajaan-kerajaan Islam di Nusantara!',
    statements: [
      'Kerajaan Demak adalah kerajaan Islam pertama di Jawa yang berdiri setelah runtuhnya Kerajaan Majapahit.',
      'Sultan Iskandar Muda adalah penguasa Kerajaan Aceh Darussalam yang membawa kerajaan tersebut ke puncak kejayaannya sebagai kekuatan maritim dan perdagangan lada.',
      'Sultan Agung dari Mataram Islam berhasil merebut Batavia (Jakarta) dari VOC Belanda dalam penyerangan yang dilakukannya.',
      'Kerajaan Ternate dan Tidore di Maluku menjadi pusat penghasil cengkeh dan pala yang diperebutkan oleh kekuatan-kekuatan Eropa.',
      'Strategi dakwah Sunan Kalijaga menggunakan wayang kulit dan gamelan sebagai media penyebaran Islam di Jawa.',
    ],
    answers: ['Benar', 'Benar', 'Tidak Tepat', 'Benar', 'Benar'],
  },
  {
    id: 19,
    section: 'Metode & Sumber Penelitian Sejarah',
    type: 'tf',
    text: 'Tentukan apakah setiap pernyataan berikut BENAR atau SALAH tentang metode dan sumber penelitian sejarah kerajaan-kerajaan Nusantara!',
    statements: [
      'Heuristik dalam penelitian sejarah adalah tahap pengumpulan sumber-sumber sejarah yang relevan dengan topik yang diteliti.',
      'Kritik intern dalam penelitian sejarah bertujuan menilai keaslian fisik sumber (apakah dokumen/artefak tersebut asli atau palsu).',
      'Kitab Negarakertagama merupakan sumber primer tentang Kerajaan Majapahit yang ditulis oleh Mpu Prapanca.',
      'Historiografi adalah tahap terakhir dalam penelitian sejarah, yaitu penulisan hasil penelitian secara sistematis.',
      'Sumber sejarah lisan (tradisi lisan, legenda) tidak dapat digunakan sama sekali dalam penelitian sejarah karena tidak ilmiah.',
    ],
    answers: ['Benar', 'Tidak Tepat', 'Benar', 'Benar', 'Tidak Tepat'],
  },
  {
    id: 20,
    section: 'Kerajaan Hindu-Buddha & Islam',
    type: 'tf',
    text: 'Tentukan apakah setiap pernyataan berikut BENAR atau SALAH tentang keterhubungan antara sejarah kerajaan dengan kondisi Indonesia masa kini!',
    statements: [
      'Konsep Wawasan Nusantara Indonesia sebagai negara kepulauan memiliki akar historis pada kejayaan maritim Kerajaan Sriwijaya dan Majapahit.',
      'Keberagaman agama dan budaya di Indonesia masa kini tidak ada kaitannya dengan proses akulturasi yang terjadi pada masa kerajaan Hindu-Buddha dan Islam.',
      'Warisan sistem hukum adat (adat istiadat) yang masih hidup di berbagai daerah Indonesia merupakan salah satu bentuk keterhubungan antara masa kerajaan dengan masa kini.',
      'Penelitian sejarah lokal tentang kerajaan-kerajaan di daerah tidak memiliki nilai penting bagi pembangunan identitas nasional Indonesia.',
      'Candi-candi Hindu-Buddha dan masjid-masjid bersejarah peninggalan kerajaan Islam merupakan warisan budaya yang menjadi sumber identitas dan aset pariwisata Indonesia.',
    ],
    answers: ['Benar', 'Tidak Tepat', 'Benar', 'Tidak Tepat', 'Benar'],
  },

  // ---------- PG KOMPLEKS CHECKBOX (21-25) ----------
  {
    id: 21,
    section: 'Kerajaan Hindu-Buddha',
    type: 'multiple',
    text: 'Berilah tanda centang (✓) pada pernyataan yang BENAR! (Jawaban bisa lebih dari satu)\n\nManakah yang merupakan faktor pendukung kejayaan kerajaan-kerajaan maritim Hindu-Buddha seperti Sriwijaya?',
    options: [
      'Letak geografis yang strategis di jalur perdagangan internasional (Selat Malaka)',
      'Kemampuan membangun armada laut yang kuat untuk mengamankan jalur pelayaran',
      'Mengisolasi diri dari pengaruh budaya asing agar identitas lokal tetap murni',
      'Membangun hubungan diplomatik dan dagang dengan Tiongkok, India, dan kerajaan-kerajaan Asia lainnya',
      'Menjadi pusat pendidikan dan pertukaran ilmu pengetahuan yang menarik pelajar dari berbagai bangsa',
    ],
    answers: [0, 1, 3, 4],
  },
  {
    id: 22,
    section: 'Peralihan Hindu-Buddha ke Islam',
    type: 'multiple',
    text: 'Berilah tanda centang (✓) pada pernyataan yang BENAR! (Jawaban bisa lebih dari satu)\n\nManakah yang merupakan jalur atau faktor penyebaran Islam yang terbukti berperan di Nusantara?',
    options: [
      'Perdagangan, di mana pedagang Muslim dari Arab, India, dan Persia berbaur dengan masyarakat lokal',
      'Pernikahan antara pedagang Muslim dengan putri-putri bangsawan lokal yang memperkenalkan Islam ke kalangan elite',
      'Penaklukan militer besar-besaran oleh kerajaan-kerajaan Islam dari Timur Tengah',
      'Jalur pendidikan melalui pesantren dan pengajian yang menyebarkan Islam ke masyarakat luas',
      'Pendekatan tasawuf (mistisisme Islam) yang memiliki kesamaan dengan kepercayaan lokal sehingga lebih mudah diterima',
    ],
    answers: [0, 1, 3, 4],
  },
  {
    id: 23,
    section: 'Kerajaan Islam',
    type: 'multiple',
    text: 'Berilah tanda centang (✓) pada pernyataan yang BENAR! (Jawaban bisa lebih dari satu)\n\nManakah yang merupakan warisan kerajaan-kerajaan Islam Nusantara yang masih terasa dalam kehidupan Indonesia masa kini?',
    options: [
      'Tradisi seni budaya sinkretis seperti wayang, gamelan berirama Islam, dan arsitektur masjid bergaya lokal',
      'Sistem kalender Jawa-Islam yang diperkenalkan Sultan Agung dan masih digunakan dalam penanggalan tradisional Jawa',
      'Sistem pemerintahan kerajaan absolut yang masih diterapkan di seluruh wilayah Indonesia',
      'Peran pesantren sebagai lembaga pendidikan Islam yang berakar dari tradisi ulama kerajaan Islam',
      'Jaringan perdagangan rempah-rempah antarpulau yang menjadi cikal bakal perdagangan antar-daerah di Indonesia',
    ],
    answers: [0, 1, 3, 4],
  },
  {
    id: 24,
    section: 'Kerajaan Hindu-Buddha & Islam',
    type: 'multiple',
    text: 'Berilah tanda centang (✓) pada pernyataan yang BENAR! (Jawaban bisa lebih dari satu)\n\nManakah yang merupakan manfaat nyata dari melakukan penelitian sejarah lokal tentang kerajaan-kerajaan di daerah masing-masing?',
    options: [
      'Memperkuat identitas budaya dan kebanggaan daerah atas warisan sejarahnya',
      'Memberikan dasar ilmiah untuk pelestarian situs bersejarah (candi, masjid kuno, prasasti) sebagai aset budaya dan pariwisata',
      'Membuktikan bahwa satu daerah lebih unggul dan berjasa dari daerah lain dalam sejarah Nusantara',
      'Memperkaya historiografi nasional dengan perspektif lokal yang sering luput dari narasi sejarah nasional yang berpusat pada Jawa',
      'Membantu generasi muda memahami akar nilai-nilai lokal (kearifan lokal) yang relevan untuk menghadapi tantangan masa depan',
    ],
    answers: [0, 1, 3, 4],
  },
  {
    id: 25,
    section: 'Kerajaan Hindu-Buddha & Islam',
    type: 'multiple',
    text: 'Berilah tanda centang (✓) pada pernyataan yang BENAR! (Jawaban bisa lebih dari satu)\n\nManakah yang merupakan prinsip atau nilai dari sejarah kerajaan-kerajaan Nusantara (Hindu-Buddha dan Islam) yang paling relevan untuk membangun Indonesia masa depan?',
    options: [
      'Semangat kemaritiman dan keterbukaan terhadap perdagangan internasional yang telah dipraktikkan sejak era Sriwijaya',
      'Prinsip bhinneka tunggal ika — keberagaman dalam persatuan — yang tercermin dalam akulturasi budaya masa kerajaan',
      'Sistem pemerintahan monarki absolut warisan kerajaan yang harus diterapkan kembali untuk menjamin stabilitas nasional',
      'Tradisi diplomasi dan membangun jaringan antarbangsa yang telah dipraktikkan kerajaan-kerajaan seperti Aceh dan Majapahit',
      'Nilai toleransi dan dialog antaragama yang tercermin dalam keberhasilan para wali dan ulama menyebarkan Islam secara damai',
    ],
    answers: [0, 1, 3, 4],
  },

  // ---------- ESSAY (26-30) ----------
  {
    id: 26,
    section: 'Kerajaan Hindu-Buddha',
    type: 'essay',
    text: 'Bayangkan kamu adalah seorang peneliti muda yang ingin meneliti topik: "Seberapa besar pengaruh Kerajaan Sriwijaya terhadap kehidupan masyarakat di Sumatera Selatan masa kini?" Jelaskanlah: (1) jenis-jenis sumber sejarah apa saja yang akan kamu gunakan dan mengapa; (2) bagaimana kamu akan melakukan kritik sumber agar hasil penelitianmu dapat dipercaya; dan (3) tantangan apa yang kemungkinan kamu hadapi dalam penelitian ini beserta cara mengatasinya!',
    rubric:
      'Jawaban mencakup: (1) Jenis sumber: primer (prasasti, artefak arkeologis, sumber asing/Tiongkok), sekunder (buku sejarah, jurnal ilmiah), sumber lisan; alasan penggunaan tiap jenis. (2) Kritik ekstern dan kritik intern; triangulasi antar sumber. (3) Tantangan: keterbatasan sumber primer, bias sumber asing, kesulitan akses; solusi: kolaborasi dengan arkeolog, wawancara tokoh adat, studi perpustakaan dan museum.',
  },
  {
    id: 27,
    section: 'Kerajaan Hindu-Buddha & Islam',
    type: 'essay',
    text: 'Indonesia dikenal sebagai negara dengan keberagaman budaya, agama, dan tradisi yang luar biasa. Banyak kalangan menyebut keberagaman ini sebagai "kekuatan" sekaligus "tantangan" bagi persatuan bangsa. Berdasarkan proses akulturasi budaya yang berlangsung sejak masa kerajaan Hindu-Buddha hingga kerajaan Islam di Nusantara, tulislah esai yang menganalisis: (1) bagaimana proses akulturasi terjadi secara historis dengan contoh konkret; (2) nilai-nilai apa yang dapat dipetik dari proses tersebut; dan (3) bagaimana nilai-nilai ini relevan untuk menjawab tantangan keberagaman Indonesia di abad ke-21!',
    rubric:
      'Jawaban mencakup: (1) Contoh akulturasi konkret: wayang sebagai media dakwah, arsitektur masjid bergaya lokal, kalender Jawa-Islam. (2) Nilai: toleransi, adaptasi tanpa kehilangan identitas, kreativitas budaya, inklusivitas. (3) Relevansi: fondasi Islam Nusantara yang toleran, dasar Bhinneka Tunggal Ika, model pengelolaan keberagaman; solusi terhadap radikalisme.',
  },
  {
    id: 28,
    section: 'Kerajaan Islam',
    type: 'essay',
    text: 'Presiden Republik Indonesia pernah mencanangkan visi Indonesia sebagai "Poros Maritim Dunia." Visi ini sejatinya bukan tanpa akar historis. Tulislah sebuah esai argumentatif yang menjelaskan: (1) bukti-bukti historis kejayaan maritim Nusantara dari masa kerajaan Hindu-Buddha hingga kerajaan Islam; (2) bagaimana keterhubungan antara kejayaan maritim masa lampau tersebut dengan visi Indonesia sebagai Poros Maritim Dunia; dan (3) apa yang harus dilakukan Indonesia agar dapat mewujudkan visi tersebut dengan belajar dari pengalaman dan kegagalan sejarah kerajaan-kerajaan maritim Nusantara!',
    rubric:
      'Jawaban mencakup: (1) Bukti historis: Sriwijaya menguasai Selat Malaka, armada Majapahit, Aceh sebagai pusat lada, Ternate-Tidore. (2) Keterhubungan: Indonesia secara geografis dan historis adalah negara maritim. (3) Langkah ke depan: pembangunan armada laut, pengelolaan SDA kelautan, diplomasi maritim; belajar dari kegagalan.',
  },
  {
    id: 29,
    section: 'Kerajaan Hindu-Buddha & Islam',
    type: 'essay',
    text: 'Dalam buku teks sejarah nasional, kisah kerajaan-kerajaan besar seperti Majapahit dan Sriwijaya mendapat porsi besar. Namun, ratusan kerajaan kecil di berbagai pelosok Nusantara sering luput dari perhatian. Seorang sejarawan berkata: "Tanpa mengenal sejarah daerahnya sendiri, seorang warga negara tidak akan pernah benar-benar memahami identitas bangsanya." Evaluasilah pernyataan tersebut! Dalam jawaban Anda, jelaskan: (1) mengapa penelitian sejarah lokal penting bagi identitas nasional; (2) bagaimana keterhubungan antara sejarah lokal dan sejarah nasional; dan (3) apa yang bisa Anda lakukan sebagai pelajar untuk berkontribusi dalam pelestarian sejarah lokal di daerah Anda!',
    rubric:
      'Jawaban mencakup: (1) Pentingnya sejarah lokal: memperkaya narasi nasional, mencegah Jawasentrisme, menumbuhkan identitas daerah. (2) Keterhubungan: sejarah nasional adalah kumpulan sejarah lokal. (3) Kontribusi pelajar: wawancara tokoh adat, dokumentasi tradisi lisan, kunjungan situs sejarah, proyek penelitian mini, media digital.',
  },
  {
    id: 30,
    section: 'Kerajaan Hindu-Buddha & Islam',
    type: 'essay',
    text: 'Seorang filsuf berkata: "Bangsa yang melupakan sejarahnya adalah bangsa yang berjalan tanpa peta." Dengan menggunakan minimal TIGA peristiwa atau fenomena penting dari masa kerajaan Hindu-Buddha dan/atau kerajaan Islam di Nusantara, tulislah sebuah refleksi kritis yang menjawab pertanyaan: "Apa yang bisa dipelajari dari sejarah kerajaan-kerajaan Nusantara untuk mempersiapkan Indonesia menghadapi tantangan abad ke-21?" Refleksi Anda harus mencakup dimensi lokal, nasional, dan global, serta menunjukkan keterhubungan yang jelas antara masa lampau, masa kini, dan masa yang akan datang!',
    rubric:
      'Kriteria: (1) Minimal 3 peristiwa spesifik dari masa kerajaan. (2) Hubungkan tiap peristiwa dengan kondisi kini (lokal, nasional, global). (3) Proyeksi ke masa depan: toleransi, maritim, diplomasi, multikulturalisme. (4) Argumen orisinal dan berpikir kritis. (5) Penulisan runtut, koheren, didukung fakta sejarah.',
  },
];

// ===================== COMPONENT =====================
export default function App() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [student, setStudent] = useState({ name: '', nis: '', kelas: 'X MIPA 1' });
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const GOOGLE_SHEET_URL =
    'https://script.google.com/macros/s/AKfycbw4BsaRGEKDhLitVhXWxH05KSPMJRQAegRvMm363pRWGwwq6oP-VhvPa_lIy-GC7Kr97A/exec';

  const getLabel = (idx: number) => String.fromCharCode(65 + idx);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (student.name && student.nis) {
      setErrorMsg('');
      const pgBiasa = questionsData.filter((q) => q.type === 'single');
      const pgTF = questionsData.filter((q) => q.type === 'tf');
      const pgCheckbox = questionsData.filter((q) => q.type === 'multiple');
      const essay = questionsData.filter((q) => q.type === 'essay');
      const randomSoal = [
        ...shuffleArray(pgBiasa),
        ...shuffleArray(pgTF),
        ...shuffleArray(pgCheckbox),
        ...essay,
      ];
      setActiveQuestions(randomSoal);
      setStep('quiz');
      window.scrollTo(0, 0);
    } else {
      setErrorMsg('Mohon isi Nama dan NIS terlebih dahulu.');
    }
  };

  const handleAnswerSingle = (optIdx: number) => {
    setAnswers({ ...answers, [currentIdx]: optIdx });
  };

  const handleAnswerMultiple = (optIdx: number) => {
    const currentAns = (answers[currentIdx] as number[]) || [];
    let newAns: number[];
    if (currentAns.includes(optIdx)) {
      newAns = currentAns.filter((i) => i !== optIdx);
    } else {
      newAns = [...currentAns, optIdx].sort((a, b) => a - b);
    }
    setAnswers({ ...answers, [currentIdx]: newAns });
  };

  const handleAnswerTF = (statementIdx: number, value: string) => {
    const currentAns = (answers[currentIdx] as string[]) || [];
    const newAns = [...currentAns];
    newAns[statementIdx] = value;
    setAnswers({ ...answers, [currentIdx]: newAns });
  };

  const handleAnswerEssay = (text: string) => {
    setAnswers({ ...answers, [currentIdx]: text });
  };

  const calculateScore = () => {
    let correctCount = 0;
    let essayCount = 0;
    const detail: DetailItem[] = [];

    activeQuestions.forEach((q, idx) => {
      const userAns = answers[idx];

      if (q.type === 'essay') {
        essayCount++;
        const isDone = typeof userAns === 'string' && userAns.trim().length > 0;
        detail.push({ id: q.id, correct: isDone, type: 'essay' });
        return;
      }

      let isCorrect = false;
      if (userAns !== undefined) {
        if (q.type === 'single') {
          isCorrect = userAns === q.answer;
        } else if (q.type === 'multiple') {
          const ua = userAns as number[];
          if (Array.isArray(ua) && ua.length === q.answers.length) {
            isCorrect = q.answers.every((a) => ua.includes(a));
          }
        } else if (q.type === 'tf') {
          const ua = userAns as string[];
          if (Array.isArray(ua)) {
            isCorrect = q.answers.every((a, i) => ua[i] === a);
          }
        }
      }

      if (isCorrect) correctCount++;
      detail.push({ id: q.id, correct: isCorrect, type: q.type });
    });

    const objectiveTotal = activeQuestions.length - essayCount;
    const finalScore =
      objectiveTotal > 0 ? Math.round((correctCount / objectiveTotal) * 100) : 0;
    const essayAnswered = detail.filter((d) => d.type === 'essay' && d.correct).length;

    setScoreData({
      score: finalScore,
      correct: correctCount,
      total: objectiveTotal,
      essayAnswered,
      essayTotal: essayCount,
      detail,
    });
    setStep('result');
    window.scrollTo(0, 0);
  };

  const submitToSpreadsheet = async () => {
    if (!scoreData) return;
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('nama', student.name);
    formData.append('nis', student.nis);
    formData.append('kelas', student.kelas);
    formData.append('skor', String(scoreData.score));
    formData.append('benar', String(scoreData.correct));
    formData.append('salah', String(scoreData.total - scoreData.correct));
    formData.append('essay_dijawab', String(scoreData.essayAnswered));
    try {
      await fetch(GOOGLE_SHEET_URL, { method: 'POST', mode: 'no-cors', body: formData });
      setSubmitSuccess(true);
    } catch (error) {
      alert('Terjadi kesalahan saat mengirim. Silakan unduh CSV sebagai cadangan.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateCSV = () => {
    if (!scoreData) return;
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'SEKOLAH,SMA N 8 DUMAI\n';
    csvContent += 'MATA PELAJARAN,SEJARAH KELAS X (Hindu-Buddha & Islam)\n';
    csvContent += 'TANGGAL,' + new Date().toLocaleDateString('id-ID') + '\n\n';
    csvContent += 'NAMA SISWA,NIS,KELAS,SKOR OBJEKTIF,BENAR,SALAH,ESSAY DIJAWAB\n';
    csvContent += `"${student.name}","${student.nis}","${student.kelas}",${scoreData.score},${scoreData.correct},${scoreData.total - scoreData.correct},${scoreData.essayAnswered}/${scoreData.essayTotal}\n\n`;
    csvContent += 'NO SOAL (ID),TIPE,STATUS\n';
    scoreData.detail.forEach((item) => {
      const tipe =
        item.type === 'essay' ? 'Essay' : item.type === 'tf' ? 'B/S' : item.type === 'multiple' ? 'Checkbox' : 'PG';
      const status =
        item.type === 'essay' ? (item.correct ? 'Dijawab' : 'Kosong') : item.correct ? 'Benar' : 'Salah';
      csvContent += `${item.id},${tipe},${status}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Nilai_Sejarah_X_${student.kelas.replace(/ /g, '_')}_${student.name.replace(/ /g, '_')}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTypeBadge = (type: string): { label: string; color: string } => {
    const map: Record<string, { label: string; color: string }> = {
      single: { label: 'PG Biasa', color: 'bg-blue-100 text-blue-700' },
      tf: { label: 'Benar / Salah', color: 'bg-amber-100 text-amber-700' },
      multiple: { label: 'Checkbox', color: 'bg-purple-100 text-purple-700' },
      essay: { label: 'Essay', color: 'bg-rose-100 text-rose-700' },
    };
    return map[type] ?? { label: type, color: 'bg-slate-100 text-slate-700' };
  };

  // ---- INTRO ----
  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-green-600 p-6 text-center flex flex-col items-center">
            <img
              src="logo-kuning.png"
              alt="Logo SMAN 8 Dumai"
              className="w-24 h-24 object-contain mb-3 drop-shadow-md bg-white rounded-full p-2"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = 'none';
                const sib = t.nextSibling as HTMLElement | null;
                if (sib) sib.style.display = 'block';
              }}
            />
            <BookOpen className="w-12 h-12 text-white mx-auto mb-3 hidden" />
            <h1 className="text-2xl font-bold text-white">Kuis Sejarah Kelas X</h1>
            <p className="text-green-100 mt-1">Kerajaan Hindu-Buddha & Islam</p>
          </div>

          <div className="p-6">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-slate-800">SMA N 8 DUMAI</h2>
              <div className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                Tahun Ajaran 2025/2026
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-5 text-xs text-center">
              {[
                { label: '15 PG Biasa', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                { label: '5 Benar/Salah', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                { label: '5 Checkbox', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                { label: '5 Essay', color: 'bg-rose-50 text-rose-700 border-rose-200' },
              ].map((item) => (
                <div key={item.label} className={`border rounded-lg py-2 px-1 font-semibold ${item.color}`}>
                  {item.label}
                </div>
              ))}
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm font-medium text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleStart} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    className="pl-10 w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    placeholder="Masukkan nama Anda"
                    value={student.name}
                    onChange={(e) => setStudent({ ...student, name: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">NIS (Nomor Induk Siswa)</label>
                <div className="relative">
                  <GraduationCap className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    required
                    className="pl-10 w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    placeholder="Contoh: 2100123"
                    value={student.nis}
                    onChange={(e) => setStudent({ ...student, nis: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kelas</label>
                <select
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
                  value={student.kelas}
                  onChange={(e) => setStudent({ ...student, kelas: e.target.value })}
                >
                    <option>X 1</option>
                    <option>X 2</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2"
              >
                Mulai Kuis <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ---- QUIZ ----
  if (step === 'quiz') {
    const q = activeQuestions[currentIdx];
    const isLast = currentIdx === activeQuestions.length - 1;
    const typeBadge = getTypeBadge(q.type);

    return (
      <div className="min-h-screen bg-slate-50 font-sans pb-20">
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                SMA N 8 DUMAI • {student.kelas}
              </div>
              <div className="font-bold text-slate-800">{student.name}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-green-600">
                Soal {currentIdx + 1} / {activeQuestions.length}
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-1.5">
            <div
              className="bg-green-600 h-1.5 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / activeQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex gap-2 flex-wrap mb-2">
              <span className="text-sm font-bold text-green-600 bg-green-50 inline-block px-3 py-1 rounded-md">
                {q.section}
              </span>
              <span className={`text-sm font-bold inline-block px-3 py-1 rounded-md ${typeBadge.color}`}>
                {typeBadge.label}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-slate-800 mt-3 mb-6 leading-relaxed whitespace-pre-line">
              {currentIdx + 1}. {q.text}
            </h3>

            <div className="space-y-3">
              {/* PG BIASA */}
              {q.type === 'single' &&
                q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswerSingle(i)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all flex gap-3 ${
                      answers[currentIdx] === i
                        ? 'border-green-500 bg-green-50'
                        : 'border-slate-200 hover:border-green-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`font-bold shrink-0 ${answers[currentIdx] === i ? 'text-green-600' : 'text-slate-500'}`}>
                      {getLabel(i)}.
                    </span>
                    <span className="text-slate-700">{opt}</span>
                  </button>
                ))}

              {/* CHECKBOX */}
              {q.type === 'multiple' && (
                <>
                  <div className="text-sm text-purple-700 font-medium mb-2 flex items-center gap-1 bg-purple-50 px-3 py-2 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <i>Centang semua jawaban yang benar (bisa lebih dari satu).</i>
                  </div>
                  {q.options.map((opt, i) => {
                    const checked = ((answers[currentIdx] as number[]) || []).includes(i);
                    return (
                      <label
                        key={i}
                        className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          checked
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                            checked={checked}
                            onChange={() => handleAnswerMultiple(i)}
                          />
                        </div>
                        <span className="text-slate-700 leading-tight">
                          <span className="font-bold text-slate-500 mr-1">{getLabel(i)}.</span>
                          {opt}
                        </span>
                      </label>
                    );
                  })}
                </>
              )}

              {/* BENAR/SALAH */}
              {q.type === 'tf' && (
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-3 font-semibold text-slate-700 w-3/5">Pernyataan</th>
                        <th className="p-3 font-semibold text-slate-700 text-center w-1/5">Benar</th>
                        <th className="p-3 font-semibold text-slate-700 text-center w-1/5">Salah</th>
                      </tr>
                    </thead>
                    <tbody>
                      {q.statements.map((stmt, i) => (
                        <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                          <td className="p-3 text-slate-700">
                            <span className="font-semibold text-slate-500 mr-1">{i + 1}.</span>
                            {stmt}
                          </td>
                          <td className="p-3 text-center">
                            <input
                              type="radio"
                              name={`q${currentIdx}_s${i}`}
                              className="w-5 h-5 text-green-600 focus:ring-green-500"
                              checked={((answers[currentIdx] as string[]) || [])[i] === 'Benar'}
                              onChange={() => handleAnswerTF(i, 'Benar')}
                            />
                          </td>
                          <td className="p-3 text-center">
                            <input
                              type="radio"
                              name={`q${currentIdx}_s${i}`}
                              className="w-5 h-5 text-red-500 focus:ring-red-500"
                              checked={((answers[currentIdx] as string[]) || [])[i] === 'Tidak Tepat'}
                              onChange={() => handleAnswerTF(i, 'Tidak Tepat')}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ESSAY */}
              {q.type === 'essay' && (
                <>
                  <div className="text-sm text-rose-700 font-medium mb-2 flex items-center gap-1 bg-rose-50 px-3 py-2 rounded-lg">
                    <PenLine className="w-4 h-4 shrink-0" />
                    <i>Tulis jawaban Anda secara lengkap dan terstruktur di bawah ini.</i>
                  </div>
                  <textarea
                    className="w-full min-h-[200px] p-4 border-2 border-slate-200 rounded-lg focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all text-slate-700 leading-relaxed resize-y"
                    placeholder="Tuliskan jawaban esai Anda di sini..."
                    value={(answers[currentIdx] as string) || ''}
                    onChange={(e) => handleAnswerEssay(e.target.value)}
                  />
                  <div className="text-xs text-slate-400 text-right mt-1">
                    {((answers[currentIdx] as string) || '').length} karakter
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Navigasi */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => { setCurrentIdx(Math.max(0, currentIdx - 1)); window.scrollTo(0, 0); }}
              disabled={currentIdx === 0}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-colors ${
                currentIdx === 0
                  ? 'text-slate-400 bg-slate-200 cursor-not-allowed'
                  : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'
              }`}
            >
              <ChevronLeft className="w-5 h-5" /> Sebelumnya
            </button>

            {isLast ? (
              <button
                onClick={() => setShowConfirm(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 shadow-md transition-colors"
              >
                Cek Jawaban <CheckCircle2 className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => { setCurrentIdx(Math.min(activeQuestions.length - 1, currentIdx + 1)); window.scrollTo(0, 0); }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 shadow-md transition-colors"
              >
                Selanjutnya <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Modal Konfirmasi */}
        {showConfirm && (
          <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
              <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Selesaikan Kuis?</h3>
              <p className="text-slate-600 mb-6 text-sm">
                Apakah Anda yakin ingin menyelesaikan kuis ini? Pastikan semua soal telah terjawab, termasuk soal essay.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-3 rounded-lg font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => { setShowConfirm(false); calculateScore(); }}
                  className="flex-1 py-3 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                  Ya, Selesai
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---- RESULT ----
  if (step === 'result' && scoreData) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 py-10 font-sans">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 mb-8 text-center">
            <div className="bg-green-600 p-8 text-white relative">
              <Award className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h1 className="text-3xl font-bold mb-2">Kuis Selesai!</h1>
              <p className="text-green-100 text-lg">Berikut adalah hasil pekerjaan Anda.</p>
              <svg className="absolute -bottom-1 left-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#ffffff" fillOpacity="1" d="M0,128L48,138.7C96,149,192,171,288,170.7C384,171,480,149,576,144C672,139,768,149,864,170.7C960,192,1056,224,1152,224C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
              </svg>
            </div>

            <div className="p-8 pt-4">
              <div className="grid grid-cols-2 gap-4 mb-8 text-left">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-sm text-slate-500 font-medium">Siswa</div>
                  <div className="font-bold text-slate-800">{student.name}</div>
                  <div className="text-sm text-slate-600">{student.nis}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-sm text-slate-500 font-medium">Kelas</div>
                  <div className="font-bold text-slate-800">{student.kelas}</div>
                  <div className="text-sm text-slate-600">SMA N 8 Dumai</div>
                </div>
              </div>

              <div className="flex justify-center items-center gap-12 mb-6">
                <div className="text-center">
                  <div className="text-6xl font-black text-green-600">{scoreData.score}</div>
                  <div className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Skor Objektif</div>
                </div>
                <div className="h-16 w-px bg-slate-200" />
                <div className="text-left space-y-2">
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <CheckCircle2 className="w-5 h-5" /> {scoreData.correct} Benar
                  </div>
                  <div className="flex items-center gap-2 text-red-500 font-medium">
                    <XCircle className="w-5 h-5" /> {scoreData.total - scoreData.correct} Salah
                  </div>
                </div>
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <PenLine className="w-6 h-6 text-rose-500 shrink-0" />
                <div className="text-left text-sm text-rose-800">
                  <span className="font-bold">Essay:</span> {scoreData.essayAnswered} dari {scoreData.essayTotal} soal dijawab. Nilai essay akan dinilai oleh guru secara terpisah.
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 text-left flex gap-4 mb-6">
                <Send className="w-8 h-8 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-blue-900 text-sm">Kirim Nilai Otomatis</h4>
                  <p className="text-blue-800 text-sm mt-1 mb-3">
                    Klik tombol di bawah ini untuk mengirim hasil Anda langsung ke database Bapak/Ibu Guru.
                  </p>
                  {submitSuccess ? (
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-md text-sm font-bold border border-green-300">
                      <CheckCircle2 className="w-4 h-4" /> Nilai Berhasil Terkirim!
                    </div>
                  ) : (
                    <button
                      onClick={submitToSpreadsheet}
                      disabled={isSubmitting}
                      className={`inline-flex justify-center items-center gap-2 font-bold py-2 px-4 rounded-md transition-colors text-sm ${
                        isSubmitting
                          ? 'bg-blue-300 text-blue-800 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      }`}
                    >
                      {isSubmitting ? 'Mengirim Data...' : 'Kirim Nilai ke Guru Sekarang'}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={generateCSV}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm border border-slate-300"
                >
                  <Download className="w-4 h-4" /> Unduh CSV Cadangan
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg transition-colors border border-red-200 text-sm"
                >
                  Ulangi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}