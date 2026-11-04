// StudyConnect - Core Application Logic
// Hệ thống tương tác đa chiều cho Nền tảng chia sẻ học liệu sinh viên Việt Nam

// State Management
const state = {
  activeTab: 'home', // 'home', 'discover', 'upload', 'gamification', 'workspace'
  auth: {
    isLoggedIn: false, // Mặc định ban đầu chưa đăng nhập
    mode: 'login'
  },
  user: {
    name: '',
    email: '',
    role: 'Khách (Chưa đăng nhập)',
    university: '',
    faculty: '',
    chestnuts: 0, // Số dư Hạt dẻ khi chưa đăng nhập
    dailyFreeDownloads: 3, // Giới hạn 3 lượt/ngày
    maxDailyDownloads: 3,
    level: 1,
    levelTitle: 'Khách (Chưa đăng nhập)',
    xp: 0,
    nextLevelXp: 100,
    tasks: [
      { id: 'task-1', title: 'Điểm danh hằng ngày', reward: 5, completed: false, claimed: false },
      { id: 'task-2', title: 'Tải lên 1 tài liệu có kiểm duyệt', reward: 50, completed: false, claimed: false },
      { id: 'task-3', title: 'Đánh giá 1 tài liệu đã sử dụng', reward: 15, completed: false, claimed: false },
      { id: 'task-4', title: 'Chia sẻ tài liệu cho bạn bè trong lớp', reward: 10, completed: false, claimed: false }
    ]
  },
  filter: {
    keyword: '',
    university: 'all',
    category: 'all',
    subjectCode: 'all',
    format: 'all',
    onlyVerified: false
  },
  selectedDoc: null,
  uploadStep: 1, // 1 to 7 for 7-step tracker
  isUploading: false,
  documents: [
    {
      id: 'doc-1',
      title: 'Đề thi & Lời giải chi tiết Giải tích 1 (HUST) - Kỳ 2025.1',
      university: 'Đại học Bách Khoa Hà Nội',
      uniShort: 'HUST',
      faculty: 'Viện Toán ứng dụng & Tin học',
      subjectCode: 'MI1111',
      subjectName: 'Giải tích 1',
      category: 'Đề thi & Đáp án',
      format: 'PDF',
      pages: 18,
      size: '3.4 MB',
      rating: 4.9,
      reviewsCount: 142,
      downloads: 1280,
      verified: true,
      hot: true,
      uploader: 'CLB Hỗ trợ Học tập HUST',
      uploaderRole: 'CLB Học thuật',
      uploadDate: '15/10/2026',
      description: 'Tổng hợp 10 đề thi giữa kỳ và cuối kỳ Giải tích 1 qua các năm, có lời giải chi tiết từng bước, mẹo bấm máy tính Casio và các bẫy thường gặp do ban học tập biên soạn.',
      previewPages: [
        'TRANG 1/18: Ma trận đề thi Giải tích 1 gồm 4 câu tự luận: Giới hạn dãy số, Đạo hàm vi phân, Tích phân suy rộng và Chuỗi số thực.',
        'TRANG 2/18: Câu 1: Tìm giới hạn lim (x->0) (e^(sin x) - cos x - x) / (ln(1 + x) - x). Lời giải áp dụng khai triển Maclaurin bậc 3 chi tiết.',
        'TRANG 3/18: Bảng tóm tắt các chuỗi số thường gặp và điều kiện hội tụ theo tiêu chuẩn D\'Alembert, Cauchy, Raabe và Dirichlet.'
      ],
      aiSummary: '• Đề tài trọng tâm: Khai triển Maclaurin, Tích phân suy rộng loại 1 và 2, Tiêu chuẩn hội tụ chuỗi số thực.\n• 3 Lỗi sai phổ biến: Quên xét điều kiện hàm dương khi dùng so sánh tương đương, nhầm lẫn bậc O-nhỏ (o(x^3)), thiếu kết luận biên khi xét khoảng hội tụ.\n• Điểm ăn điểm: Dạng bài tích phân suy rộng tính trực tiếp bằng phương pháp đổi biến hoặc từng phần luôn chiếm 2.5 điểm.'
    },
    {
      id: 'doc-2',
      title: 'Trọn bộ Slide & Đề cương tóm tắt Kinh tế Vi mô (NEU)',
      university: 'Đại học Kinh tế Quốc dân',
      uniShort: 'NEU',
      faculty: 'Khoa Kinh tế học',
      subjectCode: 'ECO101',
      subjectName: 'Kinh tế Vi mô',
      category: 'Đề cương & Slide',
      format: 'PDF',
      pages: 45,
      size: '6.8 MB',
      rating: 4.8,
      reviewsCount: 98,
      downloads: 940,
      verified: true,
      hot: true,
      uploader: 'Ban Chuyên môn LCĐ Kinh tế',
      uploaderRole: 'Đoàn - Hội',
      uploadDate: '28/09/2026',
      description: 'Hệ thống hóa toàn bộ lý thuyết cung cầu, độ co giãn, lý thuyết hành vi người tiêu dùng, chi phí sản xuất và các mô hình thị trường cạnh tranh.',
      previewPages: [
        'TRANG 1/45: Chương 1: Tổng quan về kinh tế vi mô và quy luật khan hiếm, chi phí cơ hội (Opportunity Cost).',
        'TRANG 2/45: Chương 2: Cung - Cầu và Sự co giãn của cầu theo giá (Ed), co giãn chéo (Exy), co giãn theo thu nhập (EI).',
        'TRANG 3/45: Bài toán tối đa hóa lợi nhuận của doanh nghiệp trong thị trường cạnh tranh hoàn hảo (P = MR = MC).'
      ],
      aiSummary: '• Cốt lõi lý thuyết: Quy luật cung cầu, tối ưu hóa giỏ hàng tiêu dùng (MUx/Px = MUy/Py) và điều kiện đóng cửa doanh nghiệp (P < AVC min).\n• Công thức sống còn: Độ co giãn theo cung/cầu (Ed = %ΔQ / %ΔP), hàm chi phí bình quân ATC = AFC + AVC.\n• Lời khuyên phòng thi: Đọc kỹ đề bài phân biệt doanh nghiệp trong ngắn hạn hay dài hạn để chọn công thức MC tương ứng.'
    },
    {
      id: 'doc-3',
      title: 'Tổng hợp 500 câu trắc nghiệm Triết học Mác - Lênin có giải thích',
      university: 'Đại học Quốc gia Hà Nội',
      uniShort: 'VNU',
      faculty: 'Trường Đại học Khoa học Xã hội & Nhân văn',
      subjectCode: 'PHI1006',
      subjectName: 'Triết học Mác - Lênin',
      category: 'Đề thi & Đáp án',
      format: 'DOCX',
      pages: 62,
      size: '2.1 MB',
      rating: 4.95,
      reviewsCount: 230,
      downloads: 2150,
      verified: true,
      hot: true,
      uploader: 'Nguyễn Thu Trang (K67)',
      uploaderRole: 'Cộng tác viên uy tín',
      uploadDate: '02/10/2026',
      description: 'Ngân hàng câu hỏi trắc nghiệm đại cương chuẩn theo khung Bộ Giáo dục & Đào tạo, phân loại theo 3 chương trọng tâm, có đối chiếu trang sách giáo trình.',
      previewPages: [
        'TRANG 1/62: Phần 1: Khái lược về Triết học và vấn đề cơ bản của Triết học (Chủ nghĩa duy vật vs Duy tâm).',
        'TRANG 2/62: Câu 14: Theo quan điểm của C.Mác, thuộc tính phổ biến nhất của vật chất là gì? -> Đáp án: Tồn tại khách quan.',
        'TRANG 3/62: Phần 2: Hai nguyên lý, ba quy luật và sáu cặp phạm trù cơ bản của phép biện chứng duy vật.'
      ],
      aiSummary: '• Trọng tâm thi: Quy luật Chuyển hóa lượng - chất, Quy luật Mâu thuẫn (Hạt nhân của phép biện chứng), Quy luật Phủ định của phủ định.\n• Bẫy trắc nghiệm: Khái niệm "Vận động" và "Phát triển" (Mọi phát triển đều là vận động, nhưng không phải mọi vận động đều là phát triển).\n• Chiến thuật: Thuộc lòng định nghĩa vật chất của Lênin và mối quan hệ giữa biện chứng khách quan và chủ quan.'
    },
    {
      id: 'doc-4',
      title: 'Kiến trúc máy tính & Vi xử lý - Bài tập lớn MIPS & Hợp ngữ',
      university: 'Đại học Bách Khoa Hà Nội',
      uniShort: 'HUST',
      faculty: 'Trường Công nghệ Thông tin & Truyền thông',
      subjectCode: 'IT3040',
      subjectName: 'Kiến trúc máy tính',
      category: 'Bài tập lớn & Code',
      format: 'PDF',
      pages: 24,
      size: '4.2 MB',
      rating: 4.7,
      reviewsCount: 64,
      downloads: 620,
      verified: true,
      hot: false,
      uploader: 'Đặng Đức Minh',
      uploaderRole: 'Sinh viên K65',
      uploadDate: '10/09/2026',
      description: 'Mẫu báo cáo bài tập lớn điểm A+, bao gồm giải thích sơ đồ luồng dữ liệu Pipeline 5 tầng, xử lý xung đột Hazard và code hợp ngữ MIPS 32-bit chạy trên phần mềm MARS.',
      previewPages: [
        'TRANG 1/24: Giới thiệu đề tài: Lập trình xử lý chuỗi ký tự hoa/thường và sắp xếp mảng số nguyên bằng thuật toán QuickSort trên kiến trúc MIPS.',
        'TRANG 2/24: Sơ đồ Pipeline 5 giai đoạn: IF (Tìm lệnh), ID (Giải mã), EX (Thực thi), MEM (Truy xuất bộ nhớ), WB (Ghi lại kết quả).',
        'TRANG 3/24: Kỹ thuật Data Forwarding và chèn lệnh NOP để giải quyết Data Hazard khi thanh ghi chưa kịp cập nhật.'
      ],
      aiSummary: '• Điểm nhấn kỹ thuật: Phân tích sâu Data Hazard, Control Hazard và Structural Hazard trong kiến trúc đường ống MIPS.\n• Đoạn code then chốt: Cơ chế bảo lưu thanh ghi `$s0-$s7` và con trỏ `$sp` trong gọi hàm đệ quy MIPS.\n• Đánh giá từ phản biện: Báo cáo có hình vẽ rõ ràng, mô phỏng trên MARS cho kết quả chu kỳ xung nhịp CPI thực tế sát lý thuyết.'
    },
    {
      id: 'doc-5',
      title: 'Pháp luật Đại cương - Đề cương tóm tắt 8 chương thi trắc nghiệm',
      university: 'Trường Đại học Ngoại thương',
      uniShort: 'FTU',
      faculty: 'Khoa Luật',
      subjectCode: 'LAW101',
      subjectName: 'Pháp luật đại cương',
      category: 'Đề cương & Slide',
      format: 'PDF',
      pages: 36,
      size: '3.1 MB',
      rating: 4.85,
      reviewsCount: 112,
      downloads: 870,
      verified: true,
      hot: false,
      uploader: 'CLB Nhà nghiên cứu Pháp luật Trẻ',
      uploaderRole: 'CLB Học thuật FTU',
      uploadDate: '12/10/2026',
      description: 'Hệ thống hóa bản chất Nhà nước và Pháp luật, hệ thống văn bản quy phạm pháp luật, vi phạm pháp luật và trách nhiệm pháp lý, tóm tắt các ngành luật cơ bản tại Việt Nam.',
      previewPages: [
        'TRANG 1/36: Chương 1: Nguồn gốc và bản chất của Nhà nước theo học thuyết Mác-Lênin.',
        'TRANG 2/36: Cấu trúc quy phạm pháp luật: Giả định - Quy định - Chế tài kèm các ví dụ thực tiễn.',
        'TRANG 3/36: Bảng so sánh 4 cấu thành vi phạm pháp luật: Mặt khách quan, Mặt chủ quan, Khách thể, Chủ thể.'
      ],
      aiSummary: '• Kiến thức trọng điểm: Nhận diện 3 bộ phận cấu thành quy phạm pháp luật, phân biệt trách nhiệm hình sự vs dân sự vs hành chính.\n• Mẹo giải tình huống: Luôn xác định năng lực hành vi dân sự của chủ thể trước khi xét tính hợp pháp của hợp đồng.'
    },
    {
      id: 'doc-6',
      title: 'Vật lý Đại cương 1 - Công thức và 100 bài toán Cơ - Nhiệt kinh điển',
      university: 'Đại học Quốc gia TP.HCM',
      uniShort: 'VNU-HCM',
      faculty: 'Trường Đại học Bách khoa',
      subjectCode: 'PHYS1001',
      subjectName: 'Vật lý 1',
      category: 'Bài tập & Bài giải',
      format: 'PDF',
      pages: 52,
      size: '5.6 MB',
      rating: 4.75,
      reviewsCount: 89,
      downloads: 740,
      verified: true,
      hot: false,
      uploader: 'Võ Hoàng Quân',
      uploaderRole: 'Thành viên BK Coder',
      uploadDate: '05/10/2026',
      description: 'Sổ tay tổng hợp toàn bộ công thức Động học, Động lực học chất điểm, Vật rắn quay quanh trục cố định, Trường tĩnh điện và Nhiệt động lực học.',
      previewPages: [
        'TRANG 1/52: Tóm tắt Động lực học hệ chất điểm: Định luật 2 Newton, Định lý biến thiên mômen động lượng L = I.omega.',
        'TRANG 2/52: Dạng bài con lắc vật lý và đĩa tròn có gia tốc góc. Lời giải mẫu có hình vẽ phân tích vector lực.',
        'TRANG 3/52: Nhiệt động học: Định luật 1 và 2, tính công và nhiệt lượng trong các quá trình đẳng áp, đẳng tích, đẳng nhiệt và đoạn nhiệt.'
      ],
      aiSummary: '• Mấu chốt tính toán: Phải luôn chọn hệ trục tọa độ phù hợp trước khi chiếu phương trình vector lực.\n• Các dạng bài thường gặp: Tính chu kỳ dao động nhỏ của vật rắn quanh trục lệch tâm, tính hiệu suất chu trình Carnot.'
    }
  ],
  reviews: [
    { name: 'Trần Minh Đức', school: 'K65 HUST', rating: 5, date: '2 ngày trước', comment: 'Đề cương rất sát với form thi của thầy cô, nhờ xem phần Maclaurin mà mình lấy trọn vẹn điểm câu 1!' },
    { name: 'Lê Hoàng Yến', school: 'K64 NEU', rating: 5, date: '4 ngày trước', comment: 'Trình xem trước trên web xem không bị lỗi font như mấy web khác. Giao diện đẹp, tải nhanh!' },
    { name: 'Phạm Tuấn Anh', school: 'K66 FTU', rating: 4, date: '1 tuần trước', comment: 'Tài liệu chuẩn chỉ, có dấu kiểm duyệt 7 bước yên tâm dùng hơn hẳn tài liệu trôi nổi trên mạng.' }
  ]
};

// Application Initialization
document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  setupNavigation();
  setupFilters();
  renderDocuments();
  renderGamification();
  setupUploadSimulator();
  setupModals();
  renderHeaderUser();
  setupAuth();
  setupDailyResetNotice();
});

// Helper: Refresh Lucide Icons
function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Toast Notification
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bgClass = type === 'success' ? 'bg-emerald-600' : type === 'warning' ? 'bg-amber-600' : 'bg-blue-600';
  const icon = type === 'success' ? 'check-circle' : type === 'warning' ? 'alert-triangle' : 'info';

  toast.className = `${bgClass} text-white px-4 py-3 rounded-xl shadow-lg flex items-center space-x-3 text-sm transform transition-all duration-300 translate-y-2 opacity-0`;
  toast.innerHTML = `
    <i data-lucide="${icon}" class="w-5 h-5 flex-shrink-0"></i>
    <span class="font-medium">${message}</span>
  `;

  container.appendChild(toast);
  initIcons();

  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 50);

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Navigation Handling
function setupNavigation() {
  const navBtns = document.querySelectorAll('[data-nav-target]');
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-nav-target');
      switchTab(target);
    });
  });
}

function switchTab(tabName) {
  state.activeTab = tabName;

  // Toggle View Containers
  const views = ['home', 'discover', 'upload', 'gamification', 'workspace'];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) {
      if (v === tabName) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }
  });

  // Update Nav links styling
  document.querySelectorAll('[data-nav-target]').forEach(btn => {
    const target = btn.getAttribute('data-nav-target');
    if (target === tabName) {
      btn.classList.add('text-blue-600', 'font-semibold');
      btn.classList.remove('text-slate-600');
    } else {
      btn.classList.remove('text-blue-600', 'font-semibold');
      btn.classList.add('text-slate-600');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  initIcons();
}

// Search and Filter Handling
function setupFilters() {
  const searchInput = document.getElementById('search-input');
  const heroSearchInput = document.getElementById('hero-search-input');
  const uniFilter = document.getElementById('filter-university');
  const catFilter = document.getElementById('filter-category');
  const verifiedOnly = document.getElementById('filter-verified-only');

  const updateSearch = (val) => {
    state.filter.keyword = val.toLowerCase().trim();
    if (searchInput) searchInput.value = val;
    if (heroSearchInput) heroSearchInput.value = val;
    renderDocuments();
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => updateSearch(e.target.value));
  }

  if (heroSearchInput) {
    heroSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        updateSearch(e.target.value);
        switchTab('discover');
      }
    });
  }

  const heroSearchBtn = document.getElementById('hero-search-btn');
  if (heroSearchBtn && heroSearchInput) {
    heroSearchBtn.addEventListener('click', () => {
      updateSearch(heroSearchInput.value);
      switchTab('discover');
    });
  }

  if (uniFilter) {
    uniFilter.addEventListener('change', (e) => {
      state.filter.university = e.target.value;
      renderDocuments();
    });
  }

  if (catFilter) {
    catFilter.addEventListener('change', (e) => {
      state.filter.category = e.target.value;
      renderDocuments();
    });
  }

  if (verifiedOnly) {
    verifiedOnly.addEventListener('change', (e) => {
      state.filter.onlyVerified = e.target.checked;
      renderDocuments();
    });
  }

  // Quick subject tags in Hero
  document.querySelectorAll('[data-quick-tag]').forEach(tagBtn => {
    tagBtn.addEventListener('click', () => {
      const tag = tagBtn.getAttribute('data-quick-tag');
      updateSearch(tag);
      switchTab('discover');
    });
  });
}

// Render Document Cards
function renderDocuments() {
  const container = document.getElementById('documents-grid');
  const featuredContainer = document.getElementById('featured-documents-grid');
  const countEl = document.getElementById('results-count');

  if (!container && !featuredContainer) return;

  const filtered = state.documents.filter(doc => {
    const matchesKeyword = !state.filter.keyword || 
      doc.title.toLowerCase().includes(state.filter.keyword) ||
      doc.subjectCode.toLowerCase().includes(state.filter.keyword) ||
      doc.subjectName.toLowerCase().includes(state.filter.keyword) ||
      doc.uniShort.toLowerCase().includes(state.filter.keyword) ||
      doc.university.toLowerCase().includes(state.filter.keyword);

    const matchesUni = state.filter.university === 'all' || doc.uniShort === state.filter.university;
    const matchesCat = state.filter.category === 'all' || doc.category === state.filter.category;
    const matchesVerified = !state.filter.onlyVerified || doc.verified;

    return matchesKeyword && matchesUni && matchesCat && matchesVerified;
  });

  if (countEl) {
    countEl.textContent = `${filtered.length} tài liệu phù hợp`;
  }

  const renderCardHtml = (doc) => `
    <div class="doc-card bg-white rounded-xl p-5 flex flex-col justify-between relative cursor-pointer" onclick="openDocPreview('${doc.id}')">
      <div>
        <!-- Badges & Format -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-1.5 flex-wrap gap-y-1">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              ${doc.uniShort}
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
              ${doc.subjectCode}
            </span>
            ${doc.hot ? '<span class="badge-hot px-2 py-0.5 rounded-full text-xs font-bold flex items-center"><i data-lucide="flame" class="w-3 h-3 mr-0.5 text-amber-500"></i> Hot</span>' : ''}
          </div>
          <span class="text-xs font-semibold uppercase px-2 py-0.5 rounded ${doc.format === 'PDF' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-blue-50 text-blue-600 border border-blue-200'}">
            ${doc.format}
          </span>
        </div>

        <!-- Title -->
        <h3 class="font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-blue-600 transition-colors mb-2">
          ${doc.title}
        </h3>

        <!-- Description -->
        <p class="text-slate-500 text-xs line-clamp-2 mb-4">
          ${doc.description}
        </p>

        <!-- Meta info -->
        <div class="space-y-1.5 text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div class="flex items-center justify-between">
            <span class="text-slate-400">Trường:</span>
            <span class="font-medium text-slate-700 text-right truncate max-w-[180px]">${doc.university}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-400">Người chia sẻ:</span>
            <span class="font-medium text-slate-700">${doc.uploader}</span>
          </div>
        </div>
      </div>

      <!-- Footer Info & Actions -->
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div class="flex items-center space-x-3 text-xs text-slate-500">
          <span class="flex items-center text-amber-600 font-semibold">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-500 mr-1"></i>
            ${doc.rating}
          </span>
          <span class="flex items-center">
            <i data-lucide="download" class="w-3.5 h-3.5 mr-1 text-slate-400"></i>
            ${doc.downloads}
          </span>
          <span>${doc.pages} trang</span>
        </div>

        <div class="flex items-center">
          ${doc.verified ? `
            <span class="flex items-center text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-100" title="Đã qua quy trình kiểm duyệt 7 bước">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-blue-600 mr-1"></i> Đã duyệt
            </span>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  if (container) {
    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center">
          <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <i data-lucide="file-question" class="w-8 h-8"></i>
          </div>
          <h4 class="font-bold text-slate-800 text-base mb-1">Không tìm thấy tài liệu phù hợp</h4>
          <p class="text-slate-500 text-sm max-w-md mx-auto">Thử tìm kiếm với mã môn học (như MAT, ECO, MI) hoặc bỏ chọn các bộ lọc hiện tại.</p>
        </div>
      `;
    } else {
      container.innerHTML = filtered.map(renderCardHtml).join('');
    }
  }

  // Also render top 3 to featured container on homepage
  if (featuredContainer) {
    const featured = state.documents.slice(0, 3);
    featuredContainer.innerHTML = featured.map(renderCardHtml).join('');
  }

  initIcons();
}

// Open Document Preview Modal
window.openDocPreview = function(docId) {
  const doc = state.documents.find(d => d.id === docId);
  if (!doc) return;

  state.selectedDoc = doc;
  const modal = document.getElementById('preview-modal');
  if (!modal) return;

  // Populate data
  document.getElementById('modal-doc-title').textContent = doc.title;
  document.getElementById('modal-doc-meta').innerHTML = `
    <span class="font-semibold text-blue-600">${doc.uniShort}</span> • 
    <span>${doc.faculty}</span> • 
    <span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-xs">${doc.subjectCode}</span> • 
    <span>Đăng bởi: <strong>${doc.uploader}</strong> (${doc.uploaderRole})</span>
  `;

  document.getElementById('modal-doc-stats').innerHTML = `
    <span class="flex items-center text-amber-600 font-bold mr-3"><i data-lucide="star" class="w-4 h-4 fill-amber-400 mr-1"></i> ${doc.rating} (${doc.reviewsCount} đánh giá)</span>
    <span class="flex items-center mr-3"><i data-lucide="download" class="w-4 h-4 mr-1 text-slate-400"></i> ${doc.downloads} lượt tải</span>
    <span class="flex items-center"><i data-lucide="file-text" class="w-4 h-4 mr-1 text-slate-400"></i> ${doc.pages} trang (${doc.size})</span>
  `;

  // Render preview sample pages (Fix font & reader)
  const previewBody = document.getElementById('modal-preview-content');
  previewBody.innerHTML = doc.previewPages.map((pageText, idx) => `
    <div class="p-5 bg-white border border-slate-200 rounded-xl shadow-sm mb-4">
      <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-2 mb-3">
        <span class="font-semibold text-slate-700">Trang đọc thử ${idx + 1} / 3</span>
        <span class="text-emerald-600 flex items-center"><i data-lucide="check" class="w-3.5 h-3.5 mr-1"></i> Đã tối ưu hiển thị phông chữ tiếng Việt</span>
      </div>
      <p class="text-slate-800 text-sm leading-relaxed font-sans">${pageText}</p>
    </div>
  `).join('');

  // AI Summary box reset
  const aiBox = document.getElementById('modal-ai-summary-content');
  const aiBtn = document.getElementById('btn-trigger-ai-summary');
  aiBox.classList.add('hidden');
  aiBtn.classList.remove('hidden');

  // Download button text & remaining quotas
  updateDownloadModalButton();

  // Show modal
  modal.classList.remove('hidden');
  initIcons();
};

function updateDownloadModalButton() {
  const btn = document.getElementById('btn-modal-download');
  const quotaText = document.getElementById('modal-download-quota');
  if (!btn || !quotaText) return;

  if (!state.auth.isLoggedIn) {
    btn.innerHTML = `<i data-lucide="log-in" class="w-4 h-4 mr-1.5"></i> Đăng nhập để tải`;
    quotaText.innerHTML = `Đăng nhập email <strong class="text-blue-600">.edu.vn</strong> để kích hoạt 3 lượt tải miễn phí mỗi ngày!`;
  } else if (state.user.dailyFreeDownloads > 0) {
    btn.innerHTML = `<i data-lucide="download" class="w-4 h-4 mr-1.5"></i> Tải ngay (Miễn phí)`;
    quotaText.innerHTML = `Bạn còn <span class="font-bold text-blue-600">${state.user.dailyFreeDownloads}/${state.user.maxDailyDownloads}</span> lượt tải miễn phí hôm nay`;
  } else {
    btn.innerHTML = `<i data-lucide="download" class="w-4 h-4 mr-1.5"></i> Tải bằng 10 Hạt dẻ 🌰`;
    quotaText.innerHTML = `Đã hết lượt tải miễn phí. Dùng 10 Hạt dẻ (Số dư hiện tại: <span class="font-bold text-amber-600">${state.user.chestnuts} 🌰</span>)`;
  }
  initIcons();
}

// Download Handler
function handleDownloadAction() {
  if (!state.selectedDoc) return;

  if (!state.auth.isLoggedIn) {
    showToast('Vui lòng đăng nhập email trường (.edu.vn) để tải tài liệu!', 'warning');
    openAuthModal('login');
    return;
  }

  if (state.user.dailyFreeDownloads > 0) {
    state.user.dailyFreeDownloads -= 1;
    showToast(`Đã bắt đầu tải "${state.selectedDoc.title}". Bạn còn ${state.user.dailyFreeDownloads} lượt tải miễn phí hôm nay!`, 'success');
  } else {
    if (state.user.chestnuts >= 10) {
      state.user.chestnuts -= 10;
      showToast(`Đã trừ 10 Hạt dẻ và bắt đầu tải tài liệu! Số dư còn lại: ${state.user.chestnuts} Hạt dẻ.`, 'success');
    } else {
      showToast('Bạn đã hết lượt tải miễn phí và không đủ 10 Hạt dẻ! Hãy làm nhiệm vụ hoặc nâng cấp gói Premium.', 'warning');
      return;
    }
  }

  updateDownloadModalButton();
  renderGamification();
}

// Trigger AI NotebookLM Summary
function triggerAiSummary() {
  const doc = state.selectedDoc;
  if (!doc) return;

  const aiBox = document.getElementById('modal-ai-summary-content');
  const aiBtn = document.getElementById('btn-trigger-ai-summary');
  const aiText = document.getElementById('ai-summary-text');

  aiBtn.classList.add('hidden');
  aiBox.classList.remove('hidden');
  aiText.innerHTML = '<span class="text-blue-600 flex items-center"><i data-lucide="loader" class="w-4 h-4 mr-2 animate-spin"></i> AI đang phân tích nội dung theo phong cách NotebookLM...</span>';
  initIcons();

  setTimeout(() => {
    aiText.innerHTML = `
      <div class="prose prose-sm text-slate-800 space-y-2 whitespace-pre-line leading-relaxed">
        ${doc.aiSummary}
      </div>
      <div class="mt-3 pt-2 border-t border-blue-200 flex items-center justify-between text-xs text-blue-700">
        <span>Tóm tắt bởi StudyConnect AI Assistant v2.4</span>
        <button class="font-semibold underline hover:text-blue-900" onclick="copyAiSummary()">Sao chép tóm tắt</button>
      </div>
    `;
    initIcons();
  }, 1200);
}

window.copyAiSummary = function() {
  if (state.selectedDoc) {
    navigator.clipboard?.writeText(state.selectedDoc.aiSummary);
    showToast('Đã sao chép tóm tắt AI vào clipboard!', 'success');
  }
};

// Gamification View & Chestnut Wallet
function renderGamification() {
  // Update header wallet pill
  const headerWallet = document.getElementById('header-chestnut-count');
  if (headerWallet) {
    headerWallet.textContent = `${state.user.chestnuts} 🌰`;
  }

  // Update Gamification Hub Elements
  const balanceEl = document.getElementById('hub-chestnut-balance');
  const freeDlEl = document.getElementById('hub-free-downloads');
  const levelEl = document.getElementById('hub-user-level');
  const xpBar = document.getElementById('hub-xp-bar');
  const xpText = document.getElementById('hub-xp-text');

  if (balanceEl) balanceEl.textContent = state.user.chestnuts;
  if (freeDlEl) freeDlEl.textContent = `${state.user.dailyFreeDownloads}/${state.user.maxDailyDownloads}`;
  if (levelEl) {
    levelEl.textContent = state.auth.isLoggedIn ? state.user.levelTitle : 'Khách (Chưa đăng nhập)';
  }
  if (xpBar) {
    const pct = state.auth.isLoggedIn ? Math.min(100, Math.round((state.user.xp / state.user.nextLevelXp) * 100)) : 0;
    xpBar.style.width = `${pct}%`;
  }
  if (xpText) {
    xpText.textContent = state.auth.isLoggedIn 
      ? `${state.user.xp} / ${state.user.nextLevelXp} XP (còn ${state.user.nextLevelXp - state.user.xp} XP để lên cấp)`
      : 'Đăng nhập tài khoản .edu.vn để kích hoạt điểm XP';
  }

  // Render Daily Tasks
  const taskListEl = document.getElementById('daily-tasks-list');
  if (taskListEl) {
    taskListEl.innerHTML = state.user.tasks.map(task => `
      <div class="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-amber-300 transition-colors">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center ${task.claimed ? 'bg-emerald-100 text-emerald-600' : task.completed ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}">
            <i data-lucide="${task.claimed ? 'check-check' : 'gift'}" class="w-5 h-5"></i>
          </div>
          <div>
            <h4 class="font-semibold text-slate-900 text-sm">${task.title}</h4>
            <span class="text-xs font-bold text-amber-600 flex items-center mt-0.5">
              +${task.reward} Hạt dẻ 🌰
            </span>
          </div>
        </div>

        <div>
          ${task.claimed ? `
            <span class="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg flex items-center">
              Đã nhận
            </span>
          ` : task.completed ? `
            <button onclick="claimReward('${task.id}')" class="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg text-xs font-bold shadow-md hover:shadow transition-all">
              Nhận ngay
            </button>
          ` : `
            <button onclick="performTask('${task.id}')" class="px-4 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-semibold border border-blue-200 transition-all">
              Thực hiện
            </button>
          `}
        </div>
      </div>
    `).join('');
  }

  initIcons();
}

window.claimReward = function(taskId) {
  if (!state.auth.isLoggedIn) {
    showToast('Vui lòng đăng nhập email trường (.edu.vn) để nhận Hạt dẻ vào ví!', 'warning');
    openAuthModal('login');
    return;
  }

  const task = state.user.tasks.find(t => t.id === taskId);
  if (!task || task.claimed) return;

  task.claimed = true;
  state.user.chestnuts += task.reward;
  state.user.xp += task.reward * 2;

  showToast(`Chúc mừng! Bạn đã nhận +${task.reward} Hạt dẻ vào ví! 🌰`, 'success');
  renderGamification();
};

window.performTask = function(taskId) {
  if (!state.auth.isLoggedIn) {
    showToast('Vui lòng đăng nhập tài khoản .edu.vn để tham gia làm nhiệm vụ!', 'info');
    openAuthModal('login');
    return;
  }

  const task = state.user.tasks.find(t => t.id === taskId);
  if (!task) return;

  if (taskId === 'task-1') {
    task.completed = true;
    showToast('Điểm danh thành công! Hãy bấm "Nhận ngay" để thu hoạch Hạt dẻ.', 'success');
  } else if (taskId === 'task-3') {
    switchTab('discover');
    showToast('Chọn một tài liệu và bấm đánh giá 5 sao để hoàn thành nhiệm vụ!', 'info');
  } else if (taskId === 'task-4') {
    navigator.clipboard?.writeText(window.location.href);
    task.completed = true;
    showToast('Đã sao chép link StudyConnect! Bạn có thể nhận thưởng ngay.', 'success');
  }
  renderGamification();
};

// Shop Exchange
window.redeemReward = function(rewardType, cost) {
  if (!state.auth.isLoggedIn) {
    showToast('Vui lòng đăng nhập tài khoản .edu.vn để đổi thưởng!', 'warning');
    openAuthModal('login');
    return;
  }

  if (state.user.chestnuts < cost) {
    showToast(`Bạn không đủ Hạt dẻ (cần ${cost} 🌰, bạn có ${state.user.chestnuts} 🌰). Hãy tải lên tài liệu để kiếm thêm!`, 'warning');
    return;
  }

  state.user.chestnuts -= cost;

  if (rewardType === 'extra-download') {
    state.user.dailyFreeDownloads += 1;
    showToast(`Đổi thưởng thành công! Đã cộng thêm 1 lượt tải hôm nay (Hiện có: ${state.user.dailyFreeDownloads} lượt).`, 'success');
  } else if (rewardType === 'bundle-downloads') {
    state.user.dailyFreeDownloads += 5;
    showToast(`Đổi thưởng thành công! Đã cộng thêm 5 lượt tải bổ sung vào tài khoản!`, 'success');
  } else if (rewardType === 'premium-trial') {
    showToast(`Kích hoạt thành công 7 ngày trải nghiệm gói StudyConnect Premium! 🎉`, 'success');
  }

  renderGamification();
};

// 7-Step Inspection Flow & Upload Simulator
function setupUploadSimulator() {
  const fileInput = document.getElementById('upload-file-input');
  const uploadForm = document.getElementById('doc-upload-form');
  const dropZone = document.getElementById('upload-drop-zone');

  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('border-blue-500', 'bg-blue-50');
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('border-blue-500', 'bg-blue-50');
    });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('border-blue-500', 'bg-blue-50');
      if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        handleFileSelected(fileInput.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) {
        handleFileSelected(fileInput.files[0]);
      }
    });
  }

  if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      startSevenStepInspection();
    });
  }
}

function handleFileSelected(file) {
  const label = document.getElementById('selected-file-label');
  if (label) {
    label.innerHTML = `
      <div class="flex items-center text-sm font-semibold text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
        <i data-lucide="file-check" class="w-5 h-5 mr-2 text-blue-600"></i>
        <span>Đã chọn: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
      </div>
    `;
    initIcons();
  }
}

function startSevenStepInspection() {
  if (!state.auth.isLoggedIn) {
    showToast('Vui lòng đăng nhập bằng email trường (.edu.vn) trước khi chia sẻ tài liệu!', 'warning');
    openAuthModal('login');
    return;
  }

  const title = document.getElementById('upload-title')?.value || 'Đề cương Ôn tập Môn học 2026';
  const school = document.getElementById('upload-university')?.value || 'HUST';
  const subject = document.getElementById('upload-subject')?.value || 'IT001';

  const trackerContainer = document.getElementById('inspection-tracker-container');
  const formContainer = document.getElementById('upload-form-container');
  const stepStatusText = document.getElementById('inspection-current-status');

  if (!trackerContainer || !formContainer) return;

  formContainer.classList.add('hidden');
  trackerContainer.classList.remove('hidden');

  const steps = [
    { num: 1, title: 'Tiếp nhận tài liệu', desc: 'Hệ thống đã nhận tệp tin và xác thực định dạng PDF/DOCX hợp lệ.' },
    { num: 2, title: 'AI quét kiểm tra bản quyền', desc: 'Trí tuệ nhân tạo đang quét đối chiếu cơ sở dữ liệu để đảm bảo không vi phạm DMCA và quyền sở hữu tác giả.' },
    { num: 3, title: 'AI kiểm tra nội dung & trùng lặp', desc: 'Thuật toán đối sánh nội dung, phát hiện trùng lặp đạt 0% và nội dung có giá trị học thuật cao.' },
    { num: 4, title: 'Thẩm định chuyên môn', desc: 'Ban kiểm duyệt chuyên môn (Moderators) xác nhận độ chuẩn xác của lời giải và sơ đồ kiến thức.' },
    { num: 5, title: 'Phân loại dữ liệu đa tầng', desc: 'Gắn thẻ trường học, khoa viện, mã môn học vào cây phân loại cấu trúc giáo dục Việt Nam.' },
    { num: 6, title: 'Đăng tải chính thức', desc: 'Tài liệu được mã hóa, tạo bản xem trước không lỗi font và xuất bản lên kho tài liệu công khai!' },
    { num: 7, title: 'Đánh giá lại từ cộng đồng', desc: 'Kích hoạt cơ chế đánh giá 5 sao và thưởng ngay +50 Hạt dẻ vào ví của người đóng góp.' }
  ];

  let current = 0;

  function updateStepsUI() {
    steps.forEach((s, idx) => {
      const node = document.getElementById(`step-node-${s.num}`);
      const line = document.getElementById(`step-line-${s.num}`);
      if (node) {
        if (idx < current) {
          node.className = 'step-node completed w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2';
          node.innerHTML = '<i data-lucide="check" class="w-5 h-5 text-emerald-600"></i>';
        } else if (idx === current) {
          node.className = 'step-node active w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2';
          node.innerHTML = `<span class="animate-pulse">${s.num}</span>`;
        } else {
          node.className = 'step-node pending w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2';
          node.textContent = s.num;
        }
      }
      if (line && idx < current) {
        line.classList.add('bg-emerald-500');
        line.classList.remove('bg-slate-200');
      }
    });

    if (stepStatusText && steps[current]) {
      stepStatusText.innerHTML = `
        <div class="p-4 bg-blue-50 border border-blue-200 rounded-xl text-left">
          <div class="flex items-center text-blue-800 font-bold text-sm mb-1">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-600 mr-2 animate-ping"></span>
            Bước ${steps[current].num}/7: ${steps[current].title}
          </div>
          <p class="text-xs text-blue-700 leading-relaxed">${steps[current].desc}</p>
        </div>
      `;
    }
    initIcons();
  }

  updateStepsUI();

  const interval = setInterval(() => {
    current++;
    if (current < steps.length) {
      updateStepsUI();
    } else {
      clearInterval(interval);
      // All 7 steps complete!
      steps.forEach(s => {
        const node = document.getElementById(`step-node-${s.num}`);
        if (node) {
          node.className = 'step-node completed w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2';
          node.innerHTML = '<i data-lucide="check" class="w-5 h-5 text-emerald-600"></i>';
        }
      });

      // Add uploaded doc to list
      const newDoc = {
        id: `doc-${Date.now()}`,
        title: title,
        university: school === 'HUST' ? 'Đại học Bách Khoa Hà Nội' : school === 'NEU' ? 'Đại học Kinh tế Quốc dân' : 'Trường Đại học Ngoại thương',
        uniShort: school,
        faculty: 'Khoa Công nghệ / Kinh tế',
        subjectCode: subject,
        subjectName: 'Tài liệu vừa tải lên',
        category: 'Đề cương & Bài giảng',
        format: 'PDF',
        pages: 12,
        size: '2.8 MB',
        rating: 5.0,
        reviewsCount: 1,
        downloads: 0,
        verified: true,
        hot: true,
        uploader: state.user.name,
        uploaderRole: state.user.role,
        uploadDate: 'Hôm nay',
        description: 'Tài liệu đã được phê duyệt qua quy trình kiểm định 7 bước độc quyền của StudyConnect.',
        previewPages: [
          'TRANG 1/12: Nội dung tài liệu vừa được người dùng tải lên và thông qua quy trình kiểm định bản quyền.',
          'TRANG 2/12: Bảng tra cứu công thức và các điểm lưu ý thực tế.',
          'TRANG 3/12: Bài tập vận dụng và hướng dẫn phương pháp giải.'
        ],
        aiSummary: '• Tài liệu đóng góp mới nhất, đã được chuẩn hóa cấu trúc và gắn nhãn theo khung môn học đại học Việt Nam.'
      };

      state.documents.unshift(newDoc);
      state.user.chestnuts += 50;
      state.user.xp += 100;

      if (stepStatusText) {
        stepStatusText.innerHTML = `
          <div class="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
            <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <i data-lucide="check-circle" class="w-6 h-6"></i>
            </div>
            <h4 class="font-bold text-emerald-900 text-base mb-1">Kiểm duyệt 7 bước Hoàn tất & Xuất bản thành công!</h4>
            <p class="text-xs text-emerald-700 mb-3">Tài liệu đã được gắn huy hiệu Đã duyệt và đưa lên trang Khám phá. Bạn nhận được <strong>+50 Hạt dẻ</strong> vào ví!</p>
            <div class="flex items-center justify-center space-x-3">
              <button onclick="resetUploadView()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow">
                Tải lên tài liệu khác
              </button>
              <button onclick="switchTab('discover')" class="px-4 py-2 bg-white text-emerald-700 border border-emerald-300 font-semibold text-xs rounded-lg">
                Xem trong kho học liệu
              </button>
            </div>
          </div>
        `;
      }

      showToast('Chúc mừng! Tài liệu đã qua 7 bước kiểm duyệt và bạn nhận được +50 Hạt dẻ! 🎉', 'success');
      renderDocuments();
      renderGamification();
      initIcons();
    }
  }, 1000);
}

window.resetUploadView = function() {
  const trackerContainer = document.getElementById('inspection-tracker-container');
  const formContainer = document.getElementById('upload-form-container');
  const form = document.getElementById('doc-upload-form');
  const label = document.getElementById('selected-file-label');

  if (trackerContainer) trackerContainer.classList.add('hidden');
  if (formContainer) formContainer.classList.remove('hidden');
  if (form) form.reset();
  if (label) label.innerHTML = '';
};

// Setup Modals
function setupModals() {
  // Modal preview close
  const previewModal = document.getElementById('preview-modal');
  const closePreviewBtns = document.querySelectorAll('[data-close-preview]');
  closePreviewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (previewModal) previewModal.classList.add('hidden');
    });
  });

  // Download Action
  const dlBtn = document.getElementById('btn-modal-download');
  if (dlBtn) {
    dlBtn.addEventListener('click', handleDownloadAction);
  }

  // Trigger AI summary
  const aiBtn = document.getElementById('btn-trigger-ai-summary');
  if (aiBtn) {
    aiBtn.addEventListener('click', triggerAiSummary);
  }

  // Pricing / Premium Modal
  const pricingModal = document.getElementById('pricing-modal');
  const openPricingBtns = document.querySelectorAll('[data-open-pricing]');
  const closePricingBtns = document.querySelectorAll('[data-close-pricing]');

  openPricingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (pricingModal) pricingModal.classList.remove('hidden');
    });
  });

  closePricingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (pricingModal) pricingModal.classList.add('hidden');
    });
  });

  // Report Modal
  const reportModal = document.getElementById('report-modal');
  const openReportBtn = document.getElementById('btn-open-report');
  const closeReportBtns = document.querySelectorAll('[data-close-report]');
  const submitReportBtn = document.getElementById('btn-submit-report');

  if (openReportBtn && reportModal) {
    openReportBtn.addEventListener('click', () => reportModal.classList.remove('hidden'));
  }

  closeReportBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (reportModal) reportModal.classList.add('hidden');
    });
  });

  if (submitReportBtn && reportModal) {
    submitReportBtn.addEventListener('click', () => {
      reportModal.classList.add('hidden');
      showToast('Cảm ơn bạn! Báo cáo vi phạm đã được gửi tới Ban Quản trị kiểm tra trong 24h.', 'info');
    });
  }

  // Close modals on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (previewModal && !previewModal.classList.contains('hidden')) previewModal.classList.add('hidden');
      if (pricingModal && !pricingModal.classList.contains('hidden')) pricingModal.classList.add('hidden');
      if (reportModal && !reportModal.classList.contains('hidden')) reportModal.classList.add('hidden');
      const authModal = document.getElementById('auth-modal');
      if (authModal && !authModal.classList.contains('hidden')) authModal.classList.add('hidden');
    }
  });
}

// ==================== AUTHENTICATION & EDU.VN VALIDATION ====================
function setupAuth() {
  const emailInput = document.getElementById('auth-email-input');
  const feedback = document.getElementById('auth-email-feedback');

  if (emailInput && feedback) {
    emailInput.addEventListener('input', (e) => {
      const email = e.target.value.trim().toLowerCase();
      if (!email || !email.includes('@')) {
        feedback.classList.add('hidden');
        feedback.innerHTML = '';
        return;
      }

      feedback.classList.remove('hidden');
      if (email.endsWith('.edu.vn')) {
        const uni = detectUniversityFromEmail(email);
        feedback.innerHTML = `
          <div class="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 flex items-center">
            <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-600 mr-1.5 flex-shrink-0"></i>
            <span><strong>Email hợp lệ!</strong> Tự động nhận diện: <strong>${uni.name}</strong></span>
          </div>
        `;
      } else if (email.includes('@gmail.') || email.includes('@yahoo.') || email.includes('@hotmail.')) {
        feedback.innerHTML = `
          <div class="p-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 flex items-start">
            <i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0"></i>
            <span>StudyConnect yêu cầu email đuôi <strong>.edu.vn</strong> do trường đại học cấp (ví dụ: an.nv@ussh.edu.vn) để xác thực học thuật.</span>
          </div>
        `;
      } else {
        feedback.innerHTML = `
          <div class="p-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-600 flex items-center">
            <i data-lucide="info" class="w-3.5 h-3.5 text-blue-500 mr-1.5 flex-shrink-0"></i>
            <span>Vui lòng hoàn tất địa chỉ email có đuôi <strong>.edu.vn</strong></span>
          </div>
        `;
      }
      initIcons();
    });
  }

  // Modal close buttons
  document.querySelectorAll('[data-close-auth]').forEach(btn => {
    btn.addEventListener('click', closeAuthModal);
  });
}

function detectUniversityFromEmail(email) {
  const lower = (email || '').toLowerCase();
  if (lower.includes('ussh.edu.vn') || lower.includes('ussh.vnu.edu.vn')) {
    return { name: 'Trường ĐH Khoa học Xã hội & Nhân văn (USSH - ĐHQGHN)', short: 'USSH', role: 'Sinh viên USSH' };
  } else if (lower.includes('sis.hust.edu.vn') || lower.includes('hust.edu.vn')) {
    return { name: 'Đại học Bách Khoa Hà Nội (HUST)', short: 'HUST', role: 'Sinh viên HUST' };
  } else if (lower.includes('neu.edu.vn')) {
    return { name: 'Đại học Kinh tế Quốc dân (NEU)', short: 'NEU', role: 'Sinh viên NEU' };
  } else if (lower.includes('ftu.edu.vn')) {
    return { name: 'Trường Đại học Ngoại thương (FTU)', short: 'FTU', role: 'Sinh viên FTU' };
  } else if (lower.includes('vnu.edu.vn')) {
    return { name: 'Đại học Quốc gia Hà Nội (VNU)', short: 'VNU', role: 'Sinh viên VNU' };
  } else if (lower.includes('hcmut.edu.vn') || lower.includes('vnuhcm.edu.vn')) {
    return { name: 'Đại học Bách Khoa TP.HCM (HCMUT)', short: 'VNU-HCM', role: 'Sinh viên Bách Khoa' };
  } else if (lower.includes('ueh.edu.vn')) {
    return { name: 'Đại học Kinh tế TP.HCM (UEH)', short: 'UEH', role: 'Sinh viên UEH' };
  }
  return { name: 'Cơ sở Giáo dục Đại học Việt Nam (.edu.vn)', short: 'EDU.VN', role: 'Sinh viên Đại học' };
}

window.openAuthModal = function(mode = 'login') {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  switchAuthTab(mode);
  initIcons();
};

window.closeAuthModal = function() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.add('hidden');
};

window.switchAuthTab = function(mode) {
  state.auth.mode = mode;
  const loginTabBtn = document.getElementById('auth-tab-login');
  const regTabBtn = document.getElementById('auth-tab-register');
  const nameGroup = document.getElementById('auth-name-group');
  const roleGroup = document.getElementById('auth-role-group');
  const submitLabel = document.getElementById('auth-submit-label');

  if (!loginTabBtn || !regTabBtn) return;

  if (mode === 'login') {
    loginTabBtn.className = 'flex-1 py-2 rounded-lg bg-white text-blue-600 shadow-xs transition-all font-bold';
    regTabBtn.className = 'flex-1 py-2 rounded-lg text-slate-600 hover:text-slate-900 transition-all font-medium';
    if (nameGroup) nameGroup.classList.add('hidden');
    if (roleGroup) roleGroup.classList.add('hidden');
    if (submitLabel) submitLabel.textContent = 'Đăng Nhập';
  } else {
    regTabBtn.className = 'flex-1 py-2 rounded-lg bg-white text-blue-600 shadow-xs transition-all font-bold';
    loginTabBtn.className = 'flex-1 py-2 rounded-lg text-slate-600 hover:text-slate-900 transition-all font-medium';
    if (nameGroup) nameGroup.classList.remove('hidden');
    if (roleGroup) roleGroup.classList.remove('hidden');
    if (submitLabel) submitLabel.textContent = 'Tạo Tài Khoản Sinh Viên .edu.vn';
  }
  initIcons();
};

window.handleAuthSubmit = function(e) {
  e.preventDefault();
  const emailInput = document.getElementById('auth-email-input');
  const nameInput = document.getElementById('auth-name-input');
  const roleInput = document.getElementById('auth-role-input');
  const email = emailInput.value.trim().toLowerCase();

  if (!email.endsWith('.edu.vn')) {
    showToast('Lỗi: Địa chỉ email bắt buộc phải có đuôi .edu.vn được cấp bởi trường Đại học!', 'warning');
    return;
  }

  const detectedUni = detectUniversityFromEmail(email);

  state.auth.isLoggedIn = true;
  state.user.email = email;
  state.user.university = detectedUni.name;

  if (state.auth.mode === 'register') {
    state.user.name = (nameInput && nameInput.value.trim()) || ('Sinh viên ' + detectedUni.short);
    const roleLabels = {
      student: 'Sinh viên / Học sinh',
      club: 'Đại diện CLB học thuật / Đoàn - Hội',
      lecturer: 'Giảng viên / Chuyên gia',
      library: 'Cán bộ Thư viện trường'
    };
    state.user.role = roleLabels[roleInput?.value] || 'Sinh viên';
    state.user.chestnuts += 50; // Welcome reward
    showToast(`Đăng ký thành công tài khoản ${detectedUni.short} (.edu.vn)! Nhận ngay +50 Hạt dẻ chào mừng.`, 'success');
  } else {
    const rawPrefix = email.split('@')[0].replace(/[._0-9]/g, ' ').trim();
    const formattedName = rawPrefix ? rawPrefix.replace(/\b\w/g, l => l.toUpperCase()) : ('Sinh viên ' + detectedUni.short);
    state.user.name = (nameInput && nameInput.value.trim()) || formattedName;
    state.user.role = 'Sinh viên ' + detectedUni.short;
    state.user.chestnuts = 165;
    state.user.levelTitle = 'Sóc Chăm Học (Bạc)';
    showToast(`Đăng nhập thành công với tài khoản ${email}!`, 'success');
  }

  closeAuthModal();
  renderHeaderUser();
  renderGamification();
  updateDownloadModalButton();
};

window.handleGoogleEduLogin = function() {
  state.auth.isLoggedIn = true;
  state.user.name = 'Lê Phương Anh';
  state.user.email = 'phuonganh.le@ussh.edu.vn';
  state.user.university = 'Trường ĐH Khoa học Xã hội & Nhân văn (USSH - ĐHQGHN)';
  state.user.role = 'Sinh viên USSH';
  state.user.chestnuts = 165;
  state.user.levelTitle = 'Sóc Chăm Học (Bạc)';
  closeAuthModal();
  renderHeaderUser();
  renderGamification();
  updateDownloadModalButton();
  showToast('Đăng nhập thành công qua Google Workspace for Education (USSH VNU)!', 'success');
};

window.handleLogout = function() {
  state.auth.isLoggedIn = false;
  state.user.name = '';
  state.user.email = '';
  state.user.role = 'Khách (Chưa đăng nhập)';
  state.user.university = '';
  state.user.chestnuts = 0;
  state.user.levelTitle = 'Khách (Chưa đăng nhập)';
  renderHeaderUser();
  renderGamification();
  updateDownloadModalButton();
  showToast('Bạn đã đăng xuất khỏi tài khoản sinh viên.', 'info');
};

function renderHeaderUser() {
  const container = document.getElementById('header-user-section');
  if (!container) return;

  if (state.auth.isLoggedIn) {
    const uni = detectUniversityFromEmail(state.user.email);
    const initials = state.user.name ? state.user.name.split(' ').map(n=>n[0]).slice(-2).join('') : 'SV';
    container.innerHTML = `
      <div class="relative group">
        <button class="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 py-1 px-2.5 rounded-full transition-all cursor-pointer">
          <div class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            ${initials}
          </div>
          <div class="hidden sm:flex flex-col text-left">
            <div class="flex items-center space-x-1">
              <span class="text-xs font-bold text-slate-800 leading-tight truncate max-w-[100px]">${state.user.name}</span>
              <i data-lucide="badge-check" class="w-3.5 h-3.5 text-emerald-600"></i>
            </div>
            <span class="text-[9px] text-blue-600 font-bold leading-none">${uni.short} (.edu.vn)</span>
          </div>
        </button>

        <!-- Profile Dropdown Menu -->
        <div class="hidden group-hover:block absolute right-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-scale-in">
          <div class="border-b border-slate-100 pb-2 mb-2">
            <div class="text-xs font-bold text-slate-900">${state.user.name}</div>
            <div class="text-[11px] text-slate-500 font-mono truncate">${state.user.email}</div>
            <div class="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-1">
              <i data-lucide="shield-check" class="w-3 h-3 mr-1 text-emerald-600"></i>
              Đã xác thực .edu.vn
            </div>
          </div>

          <div class="space-y-1 text-xs">
            <div class="text-[11px] text-slate-500 py-1">
              <span>Trường:</span> <strong class="text-slate-800">${uni.name}</strong>
            </div>
            <div class="text-[11px] text-slate-500 py-1">
              <span>Vai trò:</span> <strong class="text-slate-800">${state.user.role}</strong>
            </div>
            <button onclick="openAuthModal('register')" class="w-full text-left py-1.5 px-2 hover:bg-slate-50 rounded-lg text-slate-700 font-medium flex items-center space-x-2">
              <i data-lucide="user-plus" class="w-3.5 h-3.5 text-blue-600"></i>
              <span>Đăng ký tài khoản .edu.vn khác</span>
            </button>
            <button onclick="handleLogout()" class="w-full text-left py-1.5 px-2 hover:bg-red-50 rounded-lg text-red-600 font-medium flex items-center space-x-2">
              <i data-lucide="log-out" class="w-3.5 h-3.5 text-red-500"></i>
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="flex items-center space-x-1.5">
        <button onclick="openAuthModal('login')" class="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm transition-all">
          <i data-lucide="log-in" class="w-3.5 h-3.5"></i>
          <span>Đăng nhập</span>
        </button>
        <button onclick="openAuthModal('register')" class="hidden sm:flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full transition-all">
          <span>Đăng ký</span>
        </button>
      </div>
    `;
  }
  initIcons();
}

function setupDailyResetNotice() {
  console.log('StudyConnect System Initialized. Cam kết duy trì tối thiểu 75% học liệu hoàn toàn miễn phí.');
}
