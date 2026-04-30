/* ============================================
   DATA.JS — Single source of truth for content
   ============================================ */

export const screenshotData = [
  { file: 'fb1.jpg', caption: 'AI Baby Generation' },
  { file: 'fb2.jpg', caption: 'Parent Photo Upload' },
  { file: 'fb3.jpg', caption: 'AI Prediction Process' },
  { file: 'fb4.jpg', caption: 'Baby Face Result' },
  { file: 'fb5.jpg', caption: 'Aging Feature' },
  { file: 'fb6.jpg', caption: 'Similarity Score' },
  { file: 'fb7.jpg', caption: 'Custom Prompt Generation' }
];

export const sudokuScreenshots = [
  { file: 'su1.jpg', caption: 'Daily Challenge' },
  { file: 'su2.jpg', caption: 'Killer Sudoku Mode' },
  { file: 'su3.jpg', caption: 'Live Leaderboard' },
  { file: 'su4.jpg', caption: 'Trophy Cabinet' },
  { file: 'su5.jpg', caption: 'Player Statistics' },
  { file: 'su6.jpg', caption: 'Difficulty Picker' },
  { file: 'su7.jpg', caption: 'Game Board' }
];

export const aiTutorScreenshots = [
  { file: 'ai1.jpg', caption: 'Math Solver Chat' },
  { file: 'ai2.jpg', caption: 'Camera Equation Scan' },
  { file: 'ai3.jpg', caption: 'Step-by-Step Solution' },
  { file: 'ai4.jpg', caption: 'AI Tutor Conversation' },
  { file: 'ai5.jpg', caption: 'Subject Library' },
  { file: 'ai6.jpg', caption: 'Premium Plans' }
];

export const dualSpaceScreenshots = [
  { file: 'ds1.jpg', caption: 'Universal Downloader' },
  { file: 'ds2.jpg', caption: 'YouTube Downloads' },
  { file: 'ds3.jpg', caption: 'Instagram Reels' },
  { file: 'ds4.jpg', caption: 'Google Drive Sync' },
  { file: 'ds5.jpg', caption: 'Sandbox Browser' },
  { file: 'ds6.jpg', caption: 'Download Manager' }
];

export const showcases = [
  {
    id: 'fbGallery',
    app: 'futurebaby',
    icon: 'fas fa-baby-carriage',
    iconRight: 'fas fa-robot',
    title: 'FutureBaby AI',
    subtitle: 'AI baby prediction · aging · similarity score',
    pill: { text: 'Live on App Store', color: 'orange' },
    accent: 'orange',
    screenshots: 'screenshotData'
  },
  {
    id: 'sudokuGallery',
    app: 'sudoku',
    icon: 'fas fa-puzzle-piece',
    iconRight: 'fas fa-trophy',
    title: 'Sudoku & Killer',
    subtitle: 'Daily challenges · leaderboard · trophies · statistics',
    pill: { text: 'Flutter · Riverpod', color: 'white' },
    accent: 'white',
    screenshots: 'sudokuScreenshots'
  },
  {
    id: 'aiGallery',
    app: 'aitutor',
    icon: 'fas fa-brain',
    iconRight: 'fas fa-graduation-cap',
    title: 'Tutor AI',
    subtitle: 'Math solver chatbot · camera scan · step-by-step solutions',
    pill: { text: 'Kotlin · ML Kit · IAP', color: 'white' },
    accent: 'white',
    screenshots: 'aiTutorScreenshots'
  },
  {
    id: 'dualSpaceGallery',
    app: 'dualspace',
    icon: 'fas fa-cloud-arrow-down',
    iconRight: 'fab fa-youtube',
    title: 'Dual Space',
    subtitle: 'Universal downloader · YouTube, Instagram, Drive & more · sandbox browser',
    pill: { text: 'Multi-platform · Sandbox', color: 'orange' },
    accent: 'orange',
    screenshots: 'dualSpaceScreenshots'
  }
];

export const typewriterPhrases = [
  'Kotlin Native Android',
  'Flutter Cross-Platform',
  'Kotlin Multiplatform (KMP)',
  'AI-powered Mobile Apps',
  'Firebase & Cloud Integrations'
];

export const skills = [
  { name: 'Flutter & Dart', icon: 'fab fa-flutter' },
  { name: 'Kotlin', icon: 'fab fa-kotlin' },
  { name: 'Jetpack Compose', icon: 'fab fa-android' },
  { name: 'Kotlin Multiplatform', icon: 'fas fa-layer-group' },
  { name: 'Firebase', icon: 'fas fa-fire' },
  { name: 'REST APIs', icon: 'fas fa-cloud' },
  { name: 'GetX / Riverpod', icon: 'fas fa-water' },
  { name: 'AI / ML Kit', icon: 'fas fa-brain' },
  { name: 'In-app Purchases', icon: 'fas fa-coins' },
  { name: 'RevenueCat', icon: 'fas fa-cash-register' },
  { name: 'Git / GitHub', icon: 'fab fa-github' },
  { name: 'Material 3', icon: 'fas fa-palette' }
];

export const projects = [
  {
    icon: 'fas fa-baby',
    title: 'FutureBaby AI',
    description: 'AI-powered baby face prediction. Parents upload photos, AI generates a future child face, aging feature & similarity score. Live on App Store.',
    tech: ['Flutter', 'AI', 'RevenueCat', 'iOS'],
    live: true
  },
  {
    icon: 'fas fa-bell',
    title: 'Office Boy',
    description: 'Login/signup with office boy/employee roles, realtime chat + push notification with unique bell ringtone. Firebase storage.',
    tech: ['Kotlin', 'XML', 'FCM']
  },
  {
    icon: 'fas fa-gamepad',
    title: 'War Card Game',
    description: 'Computer vs User card battle. Points system (10 start) + spring wheel to regain points.',
    tech: ['Kotlin', 'Android']
  },
  {
    icon: 'fas fa-robot',
    title: 'Tutor AI',
    description: 'Math solver chatbot + camera scan to solve equations. In-app purchases & localization.',
    tech: ['Kotlin', 'ML Kit', 'IAP']
  },
  {
    icon: 'fas fa-print',
    title: 'Smart Printer',
    description: 'Print images with filters, crop, brightness, PDF documents, scan, drawing canvas, web content.',
    tech: ['Kotlin', 'Compose']
  },
  {
    icon: 'fas fa-calendar-check',
    title: 'Subscription Manager',
    description: 'Manage Netflix/Prime subscriptions, API integration, push notifications before renewal.',
    tech: ['Kotlin', 'Retrofit']
  },
  {
    icon: 'fas fa-layer-group',
    title: 'KMP Subscription',
    description: 'Cross-platform rewrite using Kotlin Multiplatform + Compose Multiplatform (iOS & Android).',
    tech: ['KMP', 'Compose MP']
  },
  {
    icon: 'fas fa-globe',
    title: 'Nitro Browser',
    description: 'YouTube video downloader, tab manager, cookies, desktop mode, full Chrome features.',
    tech: ['Compose', 'WebView']
  },
  {
    icon: 'fas fa-users',
    title: 'Arvoa (Campus Social)',
    description: 'University social: posts, friend requests, chat, map location of posts, Firebase notifications.',
    tech: ['Flutter', 'Firebase', 'Maps']
  },
  {
    icon: 'fas fa-puzzle-piece',
    title: 'Sudoku & Killer',
    description: 'Daily challenges, leaderboard, trophies, statistics & killer sudoku mode.',
    tech: ['Flutter', 'Riverpod']
  },
  {
    icon: 'fas fa-tshirt',
    title: 'Laundry AI',
    description: 'Capture bag image → AI predicts cloth weight, schedule wash & delivery tracking.',
    tech: ['Flutter', 'Vision AI']
  },
  {
    icon: 'fas fa-cloud-arrow-down',
    title: 'Dual Space',
    description: 'Universal video downloader. Built-in sandbox browser to grab videos from YouTube, Instagram, Google Drive, TikTok, Facebook & more — with download manager and offline playback.',
    tech: ['Kotlin', 'Sandbox WebView', 'Media3']
  }
];

export const experience = [
  {
    icon: 'fab fa-android',
    title: 'Kotlin & Native Android',
    tag: '3+ years',
    description: 'July 2022 - Present: Deep native Android development, Firebase integrations, AI-powered features, subscription systems, KMP exploration.'
  },
  {
    icon: 'fab fa-google',
    title: 'Flutter & Cross-Platform',
    tag: '1.3 years',
    description: '2025 - Present: Built Arvoa, FutureBaby (live on App Store), Sudoku suite, Laundry AI. Full cross-platform expertise.'
  },
  {
    icon: 'fas fa-trophy',
    title: 'Achievements & Credentials',
    tag: 'Live & shipping',
    description: 'Google Play & Apple Developer accounts • FutureBaby live on App Store • 60+ WPM typing • BS Computer Science.'
  }
];

export const stats = [
  { num: 4, suffix: '+', label: 'Years Experience' },
  { num: 11, suffix: '+', label: 'Apps Built' },
  { num: 1, suffix: '', label: 'Live on App Store' },
  { num: 60, suffix: '+', label: 'WPM Typing' }
];
