import React, { useState, useRef, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Home, FileText, Bell, User, Plus, ChevronRight, ChevronDown, Award, Target, Briefcase, BookOpen, X, MessageCircle, Building, GraduationCap, Heart, Clock, CheckCircle, AlertCircle, Search, Settings, Download, Send, Trophy, Star, Check, TrendingUp, Share2, Copy, Link, RotateCw, Upload, Trash, CircleHelp, LogOut } from 'lucide-react';
import logoImage from 'figma:asset/a5f360b8c95401cf229a69f0c0d2de04cefbe043.png';
import Login from './Login';
import { checkAutoLogin, clearAuthTokens, AuthTokens } from './utils/auth';
import ChatModal from './components/chatbot/ChatModal';

// STAR ?†à?ù¥?çî Ï∞®Ìä∏ ?ç∞?ù¥?Ñ∞
const radarData = [
  { subject: 'S (Ï∞ΩÏùò)', myScore: 85, deptAvg: 72, totalAvg: 68, fullMark: 100 },
  { subject: 'T (?ã§Î¨?)', myScore: 78, deptAvg: 75, totalAvg: 70, fullMark: 100 },
  { subject: 'A (?ù∏?Ñ±)', myScore: 92, deptAvg: 80, totalAvg: 75, fullMark: 100 },
  { subject: 'R (?Üå?Üµ)', myScore: 70, deptAvg: 68, totalAvg: 65, fullMark: 100 },
];

// ?ïò?úÑ?ó≠?üâ(PO) ?†à?ù¥?çî Ï∞®Ìä∏ ?ç∞?ù¥?Ñ∞
const radarDataPO = [
  { subject: 'Ï∞ΩÏùò?†Å Î¨∏Ï†ú?ï¥Í≤?', myScore: 87, deptAvg: 74, totalAvg: 70, fullMark: 100 },
  { subject: '?úµÎ≥µÌï©?†Å ?Ç¨Í≥?', myScore: 83, deptAvg: 70, totalAvg: 66, fullMark: 100 },
  { subject: '?†ÑÎ¨∏Ï???ãù', myScore: 82, deptAvg: 78, totalAvg: 73, fullMark: 100 },
  { subject: 'ÎØ∏Îûò?òÅ?ã†', myScore: 75, deptAvg: 73, totalAvg: 68, fullMark: 100 },
  { subject: 'Î¶¨Îçî?ã≠', myScore: 77, deptAvg: 74, totalAvg: 69, fullMark: 100 },
  { subject: 'Í≥µÎèôÏ≤¥Ïùò?ãù', myScore: 90, deptAvg: 82, totalAvg: 77, fullMark: 100 },
  { subject: '?ûêÍ∏∞Í≥ÑÎ∞?', myScore: 94, deptAvg: 78, totalAvg: 73, fullMark: 100 },
  { subject: '?ùò?Ç¨?Üå?Üµ', myScore: 72, deptAvg: 70, totalAvg: 67, fullMark: 100 },
  { subject: 'Í∏?Î°úÏª¨ ?ãúÎØ?', myScore: 68, deptAvg: 66, totalAvg: 63, fullMark: 100 },
];

// ?ó≠?üâ ?ÉÅ?Ñ∏ ?ç∞?ù¥?Ñ∞
const starDetails = {
  S: { name: 'Ï∞ΩÏùò', score: 85, grade: '?ö∞?àò', skills: ['Í∏∞Ìöç', '?ã§?ñâ', '?ôî?ï©', '?Üµ?Ñ≠'], color: '#E94E3C' },
  T: { name: '?ã§Î¨?', score: 78, grade: 'Î≥¥ÌÜµ', skills: ['?†ÑÍ≥µÏ???ãù', '?†ÑÍ≥µÍ∏∞?à†', '?†ïÎ≥¥Ìôî', '?ã†Í∏∞Ïà†?ôú?ö©', 'Í≥µÍ∞ê', '?åê?ã®'], color: '#F7941D' },
  A: { name: '?ù∏?Ñ±', score: 92, grade: 'ÎßàÏä§?Ñ∞', skills: ['?Ç¨Î™ÖÍ∞ê', 'Ï°∞ÏßÅ?ù¥?ï¥', '?èÑ?†Ñ?Ñ±', '?ûêÍ∏∞Ìïô?äµ'], color: '#C13584' },
  R: { name: '?Üå?Üµ', score: 70, grade: 'Î≥¥ÌÜµ', skills: ['Í≤ΩÏ≤≠', '?òë?ÉÅ', '?ô∏Íµ??ñ¥', '?Ñ∏Í≥ÑÏãúÎØ?'], color: '#E94E3C' },
};

// ?ïò?úÑ?ó≠?üâ(PO) ?ÉÅ?Ñ∏ ?ç∞?ù¥?Ñ∞
const poDetails = {
  'Ï∞ΩÏùò?†Å Î¨∏Ï†ú?ï¥Í≤?': { name: 'Ï∞ΩÏùò?†Å Î¨∏Ï†ú?ï¥Í≤?', score: 87, grade: '?ö∞?àò', category: 'S', skills: ['Î¨∏Ï†úÎ∂ÑÏÑù', '?ï¥Í≤∞Î∞©?ïà ?èÑÏ∂?', 'Ï∞ΩÏùò?†Å ?†ëÍ∑?'], color: '#E94E3C' },
  '?úµÎ≥µÌï©?†Å ?Ç¨Í≥?': { name: '?úµÎ≥µÌï©?†Å ?Ç¨Í≥?', score: 83, grade: '?ö∞?àò', category: 'S', skills: ['?ã§?ïô?†ú?†Å ?†ëÍ∑?', '?Üµ?ï©?†Å ?Ç¨Í≥?', '?ãú?ÑàÏß? Ï∞ΩÏ∂ú'], color: '#E94E3C' },
  '?†ÑÎ¨∏Ï???ãù': { name: '?†ÑÎ¨∏Ï???ãù', score: 82, grade: '?ö∞?àò', category: 'T', skills: ['?†ÑÍ≥µÏù¥Î°?', '?ã§Î¨¥Ï†Å?ö©', 'Ïß??ãùÏ≤¥Í≥Ñ'], color: '#F7941D' },
  'ÎØ∏Îûò?òÅ?ã†': { name: 'ÎØ∏Îûò?òÅ?ã†', score: 75, grade: 'Î≥¥ÌÜµ', category: 'T', skills: ['?ã†Í∏∞Ïà† ?ôú?ö©', '?ä∏?†å?ìú ?åå?ïÖ', '?òÅ?ã† ÎßàÏù∏?ìú'], color: '#F7941D' },
  'Î¶¨Îçî?ã≠': { name: 'Î¶¨Îçî?ã≠', score: 77, grade: 'Î≥¥ÌÜµ', category: 'T', skills: ['??? Í¥?Î¶?', '?ùò?Ç¨Í≤∞Ï†ï', '?èôÍ∏∞Î???ó¨'], color: '#F7941D' },
  'Í≥µÎèôÏ≤¥Ïùò?ãù': { name: 'Í≥µÎèôÏ≤¥Ïùò?ãù', score: 90, grade: 'ÎßàÏä§?Ñ∞', category: 'A', skills: ['?òë?†•', 'Î∞∞Î†§', '?Ç¨?öå?†Å Ï±ÖÏûÑ'], color: '#C13584' },
  '?ûêÍ∏∞Í≥ÑÎ∞?': { name: '?ûêÍ∏∞Í≥ÑÎ∞?', score: 94, grade: 'ÎßàÏä§?Ñ∞', category: 'A', skills: ['?ûêÍ∏∞Ï£º?èÑ?ïô?äµ', 'Î™©Ìëú?Ñ§?†ï', '?Ñ±Ï∞?'], color: '#C13584' },
  '?ùò?Ç¨?Üå?Üµ': { name: '?ùò?Ç¨?Üå?Üµ', score: 72, grade: 'Î≥¥ÌÜµ', category: 'R', skills: ['Í≤ΩÏ≤≠', '?ëú?òÑ', 'Í≥µÍ∞ê'], color: '#E94E3C' },
  'Í∏?Î°úÏª¨ ?ãúÎØ?': { name: 'Í∏?Î°úÏª¨ ?ãúÎØ?', score: 68, grade: 'Î≥¥ÌÜµ', category: 'R', skills: ['?ã§Î¨∏Ìôî ?ù¥?ï¥', 'Í∏?Î°úÎ≤å ÎßàÏù∏?ìú', 'Ïß??ó≠?Ç¨?öå Ï∞∏Ïó¨'], color: '#E94E3C' },
};

// ÎØºÏõê Ïπ¥ÌÖåÍ≥†Î¶¨
const complaintCategories = [
  { id: 1, icon: Building, name: '?ãú?Ñ§ Î∞? ?ôòÍ≤?', items: ['Í∞ïÏùò?ã§', 'Í≥µÏö©?ãú?Ñ§', 'Ï≤?Í≤?', '?ïà?†Ñ'], color: '#E94E3C' },
  { id: 2, icon: GraduationCap, name: '?ïô?Éù ?û•?ïô', items: ['?û•?ïô Í∏∞Ï??', '?ã†Ï≤?', '?ã¨?Ç¨', 'Ïß?Í∏? ?ò§Î•?'], color: '#4A90E2' },
  { id: 3, icon: Heart, name: '?ïô?Éù Î≥µÏ??', items: ['?Éù?ôú ?ãú?Ñ§', '?ïô?äµÍ≥µÍ∞Ñ', 'Í±¥Í∞ï', 'ÍµêÌÜµ'], color: '#C13584' },
  { id: 4, icon: BookOpen, name: '?àò?óÖ Î∞? ?ïô?Ç¨', items: ['Í∞ïÏùò ?ö¥?òÅ', '?Ñ±?†Å', '?ú¥Î≥µÌïô', '?ãú?ä§?Öú ?ò§Î•?'], color: '#F7941D' },
];

// ÎØºÏõê Î™©Î°ù ?ç∞?ù¥?Ñ∞
const complaints = [
  { 
    id: 1, 
    title: '?èÑ?ÑúÍ¥? ?ÉâÎ∞? Î¨∏Ï†ú', 
    status: 'Ï≤òÎ¶¨Ï§?', 
    date: '2025.01.15', 
    category: '?ãú?Ñ§ Î∞? ?ôòÍ≤?', 
    content: 'Ï§ëÏïô?èÑ?ÑúÍ¥? 3Ï∏? ?ó¥?ûå?ã§?ùò ?ÉâÎ∞? ?ãú?ä§?Öú?ù¥ ?†ú???Î°? ?ûë?èô?ïòÏß? ?ïä?ïÑ ?ã§?Ç¥ ?ò®?èÑÍ∞? ?ÑàÎ¨? ?Üí?äµ?ãà?ã§. ?ïô?äµ?ïòÍ∏? ?ñ¥?†§?ö¥ ?ôòÍ≤ΩÏù¥?ãà Îπ†Î•∏ Ï°∞Ïπò Î∂??ÉÅ?ìúÎ¶ΩÎãà?ã§.',
    currentStep: 3, 
    department: '?ãú?Ñ§Í¥?Î¶¨Ì??', 
    assignee: 'Íπ?ÎØºÏàò', 
    isRead: true, 
    isRated: false, 
    rating: undefined 
  },
  { 
    id: 2, 
    title: '?û•?ïôÍ∏? Ïß?Í∏? ?ùº?†ï Î¨∏Ïùò', 
    status: '?ôÑÎ£?', 
    date: '2025.01.14', 
    category: '?ïô?Éù ?û•?ïô',
    content: '2025?ïô?ÖÑ?èÑ 1?ïôÍ∏? ?û•?ïôÍ∏? Ïß?Í∏? ?ùº?†ï?ù¥ Í∂ÅÍ∏à?ï©?ãà?ã§. ?†ï?ôï?ïú Ïß?Í∏âÏùºÍ≥? ?ôï?ù∏ Î∞©Î≤ï?ùÑ ?ïå?†§Ï£ºÏÑ∏?öî.',
    adminResponse: '2025?ïô?ÖÑ?èÑ 1?ïôÍ∏? ?û•?ïôÍ∏àÏ?? 2?õî 28?ùº?óê ?ùºÍ¥? Ïß?Í∏? ?òà?†ï?ûÖ?ãà?ã§. ?û•?ïôÍ∏? Ï¢ÖÎ•ò?óê ?î∞?ùº Ïß?Í∏âÏùº?ù¥ ?ã§Î•? ?àò ?ûà?úº?ãà ?ïô?Éù?è¨?Ñ∏?óê?Ñú ?ôï?ù∏?ïò?ãúÍ∏? Î∞îÎûç?ãà?ã§.',
    responseDate: '2025.01.15',
    attachments: [
      { id: 1, name: '?û•?ïôÍ∏?_Ïß?Í∏?_?ùº?†ï?ëú.pdf', size: '245KB', url: '#' },
      { id: 2, name: '2025-1?ïôÍ∏?_?û•?ïô?ïà?Ç¥.pdf', size: '1.2MB', url: '#' }
    ],
    isRead: false,
    isRated: false,
    rating: undefined
  },
  { 
    id: 3, 
    title: '?Ñ±?†Å ?†ï?†ï ?öîÏ≤?', 
    status: '?†ë?àò', 
    date: '2025.01.13', 
    category: '?àò?óÖ Î∞? ?ïô?Ç¨', 
    content: '?ç∞?ù¥?Ñ∞Íµ¨Ï°∞Î°? Í≥ºÎ™©?ùò Ï§ëÍ∞ÑÍ≥†ÏÇ¨ ?†ê?àòÍ∞? ?ã§?†ú ?†ê?àò??? ?ã§Î•¥Í≤å ?ûÖ?†•?êú Í≤? Í∞ôÏäµ?ãà?ã§. ?ôï?ù∏ ?õÑ ?†ï?†ï Î∂??ÉÅ?ìúÎ¶ΩÎãà?ã§.',
    currentStep: 1, 
    isRead: true, 
    isRated: false, 
    rating: undefined 
  },
  { 
    id: 4, 
    title: 'Í∏∞Ïàô?Ç¨ ?ãú?Ñ§ Î≥¥Ïàò', 
    status: 'Ï≤òÎ¶¨Ï§?', 
    date: '2025.01.12', 
    category: '?ïô?Éù Î≥µÏ??', 
    content: '?†ú2?Éù?ôúÍ¥? 301?ò∏ ?ôî?û•?ã§ ?É§?õåÍ∏∞Ïóê?Ñú ?ò®?àòÍ∞? ?Çò?ò§Ïß? ?ïä?äµ?ãà?ã§. Í≤®Ïö∏Ï≤†Ïù¥?ùº Îß§Ïö∞ Î∂àÌé∏?ïú ?ÉÅ?ô©?ûÖ?ãà?ã§.',
    currentStep: 2, 
    department: '?Éù?ôúÍ¥?Î¶¨Ì??', 
    assignee: '?ù¥Ïß????', 
    isRead: false, 
    isRated: false, 
    rating: undefined 
  },
  { 
    id: 5, 
    title: 'Í∞ïÏùò?ã§ ?îÑÎ°úÏ†ù?Ñ∞ Í≥†Ïû•', 
    status: '?ôÑÎ£?', 
    date: '2025.01.11', 
    category: '?ãú?Ñ§ Î∞? ?ôòÍ≤?',
    content: 'Í≥µÌïôÍ¥? 301?ò∏ Í∞ïÏùò?ã§ ?îÑÎ°úÏ†ù?Ñ∞Í∞? ÏºúÏ??Ïß? ?ïä?äµ?ãà?ã§. ?ã§?ùå Ï£? Î∞úÌëú ?àò?óÖ?ù¥ ?ûà?ñ¥ Îπ†Î•∏ ?àòÎ¶¨Í?? ?ïÑ?öî?ï©?ãà?ã§.',
    adminResponse: '301?ò∏ Í∞ïÏùò?ã§ ?îÑÎ°úÏ†ù?Ñ∞Î•? ?Éà ?†ú?íà?úºÎ°? ÍµêÏ≤¥ ?ôÑÎ£åÌïò????äµ?ãà?ã§. Ï∂îÍ??Î°? HDMI Ïº??ù¥Î∏îÍ≥º Î¶¨Î™®Ïª®ÎèÑ ?ï®Íª? ÍµêÏ≤¥?ïò????úº?ãà Î∂àÌé∏ ?óÜ?ù¥ ?Ç¨?ö©?ïò?ã§ ?àò ?ûà?äµ?ãà?ã§.',
    responseDate: '2025.01.12',
    attachments: [
      { id: 1, name: 'ÍµêÏ≤¥_?ôÑÎ£?_?Ç¨Ïß?1.jpg', size: '2.3MB', url: '#' },
      { id: 2, name: 'ÍµêÏ≤¥_?ôÑÎ£?_?Ç¨Ïß?2.jpg', size: '1.8MB', url: '#' },
      { id: 3, name: 'Ï°∞Ïπò_Î≥¥Í≥†?Ñú.pdf', size: '456KB', url: '#' }
    ],
    isRead: false,
    isRated: false,
    rating: undefined
  },
];

// ?ïåÎ¶? ?ç∞?ù¥?Ñ∞
const notifications = [
  { id: 1, title: 'ÎØºÏõê Ï≤òÎ¶¨ ?ôÑÎ£?', message: '?û•?ïôÍ∏? Ïß?Í∏? ?ùº?†ï Î¨∏ÏùòÍ∞? ?ôÑÎ£åÎêò?óà?äµ?ãà?ã§.', time: '10Î∂? ?†Ñ', read: false },
  { id: 2, title: '?Éà Í≥µÏ???Ç¨?ï≠', message: '2025?ïô?ÖÑ?èÑ 1?ïôÍ∏? ?àòÍ∞ïÏã†Ï≤? ?ïà?Ç¥', time: '1?ãúÍ∞? ?†Ñ', read: false },
  { id: 3, title: 'ÎØºÏõê ?ÉÅ?Éú Î≥?Í≤?', message: '?èÑ?ÑúÍ¥? ?ÉâÎ∞? Î¨∏Ï†úÍ∞? Ï≤òÎ¶¨Ï§ëÏúºÎ°? Î≥?Í≤ΩÎêò?óà?äµ?ãà?ã§.', time: '3?ãúÍ∞? ?†Ñ', read: true },
  { id: 4, title: '?ó≠?üâ ?èâÍ∞? ?ôÑÎ£?', message: 'S(Ï∞ΩÏùò) ?ó≠?üâ ?†ê?àòÍ∞? ?óÖ?ç∞?ù¥?ä∏?êò?óà?äµ?ãà?ã§.', time: '1?ùº ?†Ñ', read: true },
];

// FAQ ?ç∞?ù¥?Ñ∞
const faqData = [
  { id: 1, question: '?û•?ïôÍ∏? ?ã†Ï≤?Í∏∞Í∞Ñ??? ?ñ∏?†ú?ù∏Í∞??öî?', answer: 'Îß? ?ïôÍ∏? ?ãú?ûë 2Ï£? ?†ÑÎ∂??Ñ∞ 1Ï£ºÍ∞Ñ ?ã†Ï≤? Í∞??ä•?ï©?ãà?ã§.' },
  { id: 2, question: '?ú¥?ïô ?ã†Ï≤???? ?ñ¥?ñªÍ≤? ?ïò?Çò?öî?', answer: '?ïô?Éù?è¨?Ñ∏ > ?ïô?†Å > ?ú¥?ïô?ã†Ï≤??óê?Ñú Í∞??ä•?ï©?ãà?ã§.' },
  { id: 3, question: '?Ñ±?†Å ?†ï?†ï Í∏∞Í∞Ñ??? ?ñ∏?†ú?ù∏Í∞??öî?', answer: '?Ñ±?†Å Í≥µÍ∞ú ?õÑ 1Ï£ºÏùº ?ù¥?Ç¥?ûÖ?ãà?ã§.' },
  { id: 4, question: 'Í∏∞Ïàô?Ç¨ ?ã†Ï≤? Î∞©Î≤ï?ù¥ Í∂ÅÍ∏à?ï¥?öî', answer: '?ïô?Éù?è¨?Ñ∏ > ?Éù?ôú > Í∏∞Ïàô?Ç¨ ?ã†Ï≤??óê?Ñú Í∞??ä•?ï©?ãà?ã§.' },
  { id: 5, question: 'Ï¶ùÎ™Ö?Ñú Î∞úÍ∏â??? ?ñ¥?îî?Ñú ?ïò?Çò?öî?', answer: 'Î¨¥Ïù∏Î∞úÍ∏âÍ∏? ?òê?äî ?ïô?Éù?è¨?Ñ∏?óê?Ñú Í∞??ä•?ï©?ãà?ã§.' },
];

// Evidence ?ç∞?ù¥?Ñ∞
const evidenceData = [
  { course: 'Ï∞ΩÏùò?†Å Î¨∏Ï†ú?ï¥Í≤?', task: '??? ?îÑÎ°úÏ†ù?ä∏ Î∞úÌëú', score: 'A+', competency: 'S', semester: '2024-2?ïôÍ∏?', date: '2024.12.10' },
  { course: '?ç∞?ù¥?Ñ∞Î∂ÑÏÑù?ã§Î¨?', task: 'Í∏∞Îßê ?îÑÎ°úÏ†ù?ä∏', score: 'A', competency: 'T', semester: '2024-2?ïôÍ∏?', date: '2024.12.08' },
  { course: 'Î¶¨Îçî?ã≠Í≥? ?Üå?Üµ', task: '?Ü†Î°? Ï∞∏Ïó¨', score: 'A+', competency: 'R', semester: '2024-2?ïôÍ∏?', date: '2024.11.25' },
  { course: 'ÏßÅÏóÖ?ú§Î¶?', task: '?Ç¨Î°?Î∂ÑÏÑù Î≥¥Í≥†?Ñú', score: 'A', competency: 'A', semester: '2024-2?ïôÍ∏?', date: '2024.11.20' },
  { course: '?ïåÍ≥†Î¶¨Ï¶?', task: 'Ï§ëÍ∞Ñ ?îÑÎ°úÏ†ù?ä∏', score: 'A+', competency: 'T', semester: '2024-1?ïôÍ∏?', date: '2024.05.15' },
  { course: 'Ï°∞ÏßÅ?ñâ?èôÎ°?', task: '??? Í≥ºÏ†ú', score: 'B+', competency: 'A', semester: '2024-1?ïôÍ∏?', date: '2024.05.10' },
  { course: 'Ï∞ΩÏóÖÍ≥? ?òÅ?ã†', task: 'ÎπÑÏ¶à?ãà?ä§ Î™®Îç∏ Í∞úÎ∞ú', score: 'A', competency: 'S', semester: '2024-1?ïôÍ∏?', date: '2024.04.20' },
  { course: '?îÑ?†à?††?Öå?ù¥?Öò ?ä§?Ç¨', task: 'Î∞úÌëú ?èâÍ∞?', score: 'A+', competency: 'R', semester: '2024-1?ïôÍ∏?', date: '2024.04.15' },
  { course: '?îî?ûê?ù∏?îΩ?Çπ', task: '?îÑÎ°úÌÜ†????ûÖ ?†ú?ûë', score: 'A', competency: 'S', semester: '2023-2?ïôÍ∏?', date: '2023.12.05' },
  { course: '?ç∞?ù¥?Ñ∞Î≤†Ïù¥?ä§', task: '?ãú?ä§?Öú ?Ñ§Í≥?', score: 'B+', competency: 'T', semester: '2023-2?ïôÍ∏?', date: '2023.11.30' },
  { course: 'Î¥âÏÇ¨?ôú?èôÎ°?', task: 'Ïß??ó≠?Ç¨?öå Î¥âÏÇ¨', score: 'A+', competency: 'A', semester: '2023-2?ïôÍ∏?', date: '2023.11.10' },
  { course: '?òÅ?ñ¥?öå?ôî', task: '?Ü†Î°? Î∞? Î∞úÌëú', score: 'A', competency: 'R', semester: '2023-2?ïôÍ∏?', date: '2023.10.25' },
];

export default function StudentDashboard() {
  // ?ù∏Ï¶? ?ÉÅ?Éú Í¥?Î¶?
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // ?ûê?èô Î°úÍ∑∏?ù∏ Ï≤¥ÌÅ¨
  useEffect(() => {
    const tokens = checkAutoLogin();
    setAuthTokens(tokens);
    setIsCheckingAuth(false);
  }, []);

  // Î°úÍ∑∏?ù∏ ?ï∏?ì§?ü¨
  const handleLoginSuccess = (tokens: AuthTokens) => {
    setAuthTokens(tokens);
  };

  // Î°úÍ∑∏?ïÑ?õÉ ?ï∏?ì§?ü¨
  const handleLogout = () => {
    clearAuthTokens();
    setAuthTokens(null);
  };

  const [activeTab, setActiveTab] = useState('home');
  const [radarToggle, setRadarToggle] = useState<'core' | 'po'>('core'); // ?†à?ù¥?çî ?Ü†Í∏?: ?ïµ?ã¨?ó≠?üâ vs ?ïò?úÑ?ó≠?üâ
  const [selectedStar, setSelectedStar] = useState<string | null>(null);
  const [selectedPO, setSelectedPO] = useState<string | null>(null);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [evidenceFilter, setEvidenceFilter] = useState<string>('?†ÑÏ≤?');
  const [evidenceSort, setEvidenceSort] = useState<string>('ÏµúÏã†?àú');
  const [showComplaintListModal, setShowComplaintListModal] = useState(false);
  const [complaintStatusFilter, setComplaintStatusFilter] = useState<string>('?†ÑÏ≤?');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotificationSettingsModal, setShowNotificationSettingsModal] = useState(false);
  const [showLoginInfoModal, setShowLoginInfoModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successType, setSuccessType] = useState<'complete' | 'submit'>('complete');
  const [notificationChannels, setNotificationChannels] = useState({
    pwa: true,
    kakao: false,
    email: true,
  });
  const [complaintReadStatus, setComplaintReadStatus] = useState<{[key: number]: boolean}>({});
  const [complaintRatedStatus, setComplaintRatedStatus] = useState<{[key: number]: boolean}>({});
  const [complaintRatings, setComplaintRatings] = useState<{[key: number]: number}>({});
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingComplaintId, setRatingComplaintId] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [ratingComment, setRatingComment] = useState('');
  const [complaintDetailModal, setComplaintDetailModal] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [periodFilter, setPeriodFilter] = useState('?†ÑÏ≤?');
  const filterScrollRef = useRef<HTMLDivElement>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadPeriod, setDownloadPeriod] = useState('?†ÑÏ≤?');
  const [downloadFormat, setDownloadFormat] = useState('PDF');
  
  // ÎØºÏõê ?ûë?Ñ± ?èº state
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintContent, setComplaintContent] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<Array<{
    id: string;
    file: File;
    preview: string;
    rotation: number;
  }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Ï±ÑÌåÖ Î™®Îã¨ state
  const [showChatModal, setShowChatModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>(''); // ?òÑ?û¨ Ï±ÑÌåÖ Ïπ¥ÌÖåÍ≥†Î¶¨ Ï∂îÏ†Å

  // ?ûë?Ñ± ?òµ?Öò state
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);
  const [agreeNotification, setAgreeNotification] = useState(false);

  // ?ûê?èô ????û• (30Ï¥àÎßà?ã§)
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (complaintTitle || complaintContent) {
        localStorage.setItem('complaint_draft', JSON.stringify({
          title: complaintTitle,
          content: complaintContent,
          timestamp: new Date().toISOString()
        }));
        console.log('?úÖ ?ûê?èô ????û• ?ôÑÎ£?');
      }
    }, 30000); // 30Ï¥?

    return () => clearInterval(autoSaveInterval);
  }, [complaintTitle, complaintContent]);

  // ?åå?ùº ?Ñ†?Éù Ï≤òÎ¶¨
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 5 - attachedFiles.length);
    
    newFiles.forEach(file => {
      // ?åå?ùº ?Å¨Í∏? Ï≤¥ÌÅ¨ (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name}???(?äî) 10MBÎ•? Ï¥àÍ≥º?ï©?ãà?ã§.`);
        return;
      }

      // ?åå?ùº ?òï?ãù Ï≤¥ÌÅ¨
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert(`${file.name}???(?äî) Ïß??õê?ïòÏß? ?ïä?äî ?òï?ãù?ûÖ?ãà?ã§.`);
        return;
      }

      // ÎØ∏Î¶¨Î≥¥Í∏∞ ?Éù?Ñ±
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedFiles(prev => [...prev, {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: event.target?.result as string,
          rotation: 0
        }]);
      };
      reader.readAsDataURL(file);
    });

    // input Ï¥àÍ∏∞?ôî
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // ?åå?ùº ?Ç≠?†ú
  const removeFile = (id: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== id));
  };

  // ?ù¥ÎØ∏Ï?? ?öå?†Ñ
  const rotateImage = (id: string) => {
    setAttachedFiles(prev => prev.map(f => 
      f.id === id ? { ...f, rotation: (f.rotation + 90) % 360 } : f
    ));
  };

  // ?ÉÅ?ÉúÎ≥? ?Éâ?ÉÅ
  const statusColor: Record<string, string> = {
    '?†ë?àò': 'bg-blue-100 text-blue-600',
    'Ï≤òÎ¶¨Ï§?': 'bg-orange-100 text-orange-600',
    '?ôÑÎ£?': 'bg-green-100 text-green-600',
    'Î∞òÎ†§': 'bg-red-100 text-red-600',
  };

  // ?ì±Í∏âÎ≥Ñ Î∞∞Ï??
  const gradeBadge: Record<string, { bg: string; icon: JSX.Element }> = {
    'ÎßàÏä§?Ñ∞': { bg: 'bg-[#FAAF40]', icon: <Trophy className="w-3 h-3" /> },
    '?ö∞?àò': { bg: 'bg-[#EE3E42]', icon: <Star className="w-3 h-3" /> },
    'Î≥¥ÌÜµ': { bg: 'bg-[#e2e8f0]', icon: <Check className="w-3 h-3" /> },
    '?Ö∏?†•?öîÎß?': { bg: 'bg-[#C5006F]', icon: <TrendingUp className="w-3 h-3" /> },
  };

  // ÎØºÏõê ?ÜµÍ≥?
  const complaintStats = {
    ?†ë?àò: complaints.filter(c => c.status === '?†ë?àò').length,
    Ï≤òÎ¶¨Ï§?: complaints.filter(c => c.status === 'Ï≤òÎ¶¨Ï§?').length,
    ?ôÑÎ£?: complaints.filter(c => c.status === '?ôÑÎ£?').length,
  };
  const completionRate = Math.round((complaintStats.?ôÑÎ£? / complaints.length) * 100);

  // ÎØºÏõê ?ïÑ?Ñ∞Îß?
  const getFilteredComplaints = () => {
    let filtered = complaints;

    // 1. ?ÉÅ?Éú ?ïÑ?Ñ∞Îß?
    if (complaintStatusFilter !== '?†ÑÏ≤?') {
      filtered = filtered.filter(c => c.status === complaintStatusFilter);
    }

    // 2. Í∏∞Í∞Ñ ?ïÑ?Ñ∞Îß?
    if (periodFilter !== '?†ÑÏ≤?') {
      const now = new Date();
      const monthsAgo = periodFilter === '1Í∞úÏõî' ? 1 : periodFilter === '3Í∞úÏõî' ? 3 : 6;
      const filterDate = new Date(now.setMonth(now.getMonth() - monthsAgo));
      
      filtered = filtered.filter(c => {
        const complaintDate = new Date(c.date.replace(/\./g, '-'));
        return complaintDate >= filterDate;
      });
    }

    // 3. ?Ç§?õå?ìú ?ïÑ?Ñ∞Îß?
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(keyword) || 
        c.content.toLowerCase().includes(keyword)
      );
    }

    return filtered;
  };

  // ÎØºÏõê Î™©Î°ù Î™®Îã¨ ?ã´Í∏? (XÎ≤ÑÌäº)
  const handleCloseComplaintListModal = () => {
    setShowComplaintListModal(false);
    setSearchKeyword('');
    setPeriodFilter('?†ÑÏ≤?');
  };

  // "?èâÍ∞??ïòÍ∏?" Î≤ÑÌäº ?Å¥Î¶?
  const handleRateComplaint = (complaintId: number) => {
    setRatingComplaintId(complaintId);
    setShowRatingModal(true);
  };

  // ÎßåÏ°±?èÑ ?èâÍ∞? ?†úÏ∂?
  const handleRatingSubmit = () => {
    if (ratingComplaintId && selectedRating > 0) {
      setComplaintRatedStatus({...complaintRatedStatus, [ratingComplaintId]: true});
      setComplaintRatings({...complaintRatings, [ratingComplaintId]: selectedRating});
      setShowRatingModal(false);
      setShowComplaintListModal(false);
      setRatingComplaintId(null);
      setSelectedRating(0);
      setRatingComment('');
      alert('?èâÍ∞??ï¥ Ï£ºÏÖî?Ñú Í∞êÏÇ¨?ï©?ãà?ã§!');
    }
  };

  // ?ôà ?ôîÎ©?
  const HomeScreen = () => (
    <div className="pb-4">
      {/* ?ó§?çî */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4 rounded-[0px]">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            <img src={logoImage} alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowShareModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Share2 className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setShowSearchModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* ?ù∏?Ç¨Îß? + Ï¢ÖÌï© ?†ê?àò Ïπ¥Îìú */}
        <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mt-2">
          <div className="flex items-center justify-between gap-4">
            {/* Ï¢åÏ∏°: ?ù∏?Ç¨Îß? */}
            <div>
              <p className="text-sm opacity-90">?ïà?Öï?ïò?Ñ∏?öî</p>
              <p className="font-bold text-lg text-[24px]">Íπ??àò?Ñ± ?ãò</p>
            </div>
            
            {/* ?ö∞Ï∏?: Ï¢ÖÌï© ?ó≠?üâ ?†ê?àò */}
            <div className="text-right">
              <p className="text-sm opacity-90 mb-1">Ï¢ÖÌï© ?ó≠?üâ ?†ê?àò</p>
              <div className="flex items-end gap-2 justify-end">
                <span className="text-4xl font-bold text-[32px]">81.3</span>
                <span className="text-lg mb-1 text-[16px]">/ 100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STAR ?†à?ù¥?çî Ï∞®Ìä∏ */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">Ï¢ÖÌï© ?òÑ?ô© ?†à?ù¥?çî</h3>
        </div>

        {/* ?Ü†Í∏? Î≤ÑÌäº */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setRadarToggle('core')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              radarToggle === 'core'
                ? 'bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            S¬∑T¬∑A¬∑R ?ïµ?ã¨?ó≠?üâ
          </button>
          <button
            onClick={() => setRadarToggle('po')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              radarToggle === 'po'
                ? 'bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ?ïò?úÑ?ó≠?üâ(PO)
          </button>
        </div>

        <div style={{ width: '100%', height: '280px' }}>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarToggle === 'core' ? radarData : radarDataPO}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: radarToggle === 'po' ? 10 : 12, fill: '#374151' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} axisLine={false} />
              {/* Î®ºÏ?? Ï±ÑÏÉâ ?òÅ?ó≠ ?†å?çîÎß? (?í§?óê Î∞∞Ïπò) */}
              <Radar name="?Ç¥ ?†ê?àò" dataKey="myScore" stroke="#FFA500" fill="#FFA500" fillOpacity={0.15} strokeWidth={2} />
              {/* Í∑? ?ã§?ùå ?ùº?ù∏?ì§ ?†å?çîÎß? (?úÑ?óê Î∞∞Ïπò) */}
              <Radar name="?ïôÍ≥? ?èâÍ∑?" dataKey="deptAvg" stroke="#FF6B35" fill="none" strokeWidth={2} />
              <Radar name="?†ÑÏ≤? ?èâÍ∑?" dataKey="totalAvg" stroke="#C13584" fill="none" strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Ïª§Ïä§??? Î≤îÎ?? */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFA500]"></div>
            <span className="text-xs text-gray-600">?Ç¥ ?†ê?àò</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]"></div>
            <span className="text-xs text-gray-600">?ïôÍ≥? ?èâÍ∑?</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C13584]"></div>
            <span className="text-xs text-gray-600">?†ÑÏ≤? ?èâÍ∑?</span>
          </div>
        </div>
      </div>

      {/* ?ó≠?üâ ?ì±Í∏? Badge */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3">?ó≠?üâ ?ì±Í∏?</h3>
        
        {radarToggle === 'core' ? (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(starDetails).map(([key, value]) => (
              <div 
                key={key}
                onClick={() => setSelectedStar(key)}
                className="bg-gray-50 rounded-2xl shadow p-4 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center gap-6">
                  {/* ?ôºÏ™? ?îÑ?†à?ûÑ: S + Ï∞ΩÏùò */}
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div className="w-10 h-10 flex items-center justify-center font-bold text-2xl"
                         style={{ color: '#0f172a' }}>
                      {key}
                    </div>
                    <p className="text-sm text-gray-600">{value.name}</p>
                  </div>
                  
                  {/* ?ò§Î•∏Ï™Ω ?îÑ?†à?ûÑ: 85?†ê + ?ö∞?àò */}
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-2xl font-bold" style={{ color: '#0f172a' }}>{value.score}?†ê</p>
                    <div className={`${gradeBadge[value.grade].bg} ${value.grade === 'Î≥¥ÌÜµ' ? 'text-[#0f172a]' : 'text-white'} text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 whitespace-nowrap`}>
                      <span>{gradeBadge[value.grade].icon}</span>
                      <span className="text-[12px]">{value.grade}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(poDetails).map(([key, value]) => (
              <div 
                key={key}
                onClick={() => setSelectedPO(key)}
                className="bg-gray-50 rounded-xl shadow p-3 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                         style={{ backgroundColor: `${value.color}20`, color: value.color }}>
                      {value.category}
                    </div>
                    <p className="text-sm font-medium text-gray-800">{value.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-bold text-gray-800">{value.score}?†ê</p>
                    <div className={`${gradeBadge[value.grade].bg} ${value.grade === 'Î≥¥ÌÜµ' ? 'text-[#0f172a]' : 'text-white'} text-[10px] px-2 py-1.5 rounded-full inline-flex items-center justify-center gap-1 whitespace-nowrap min-w-[60px]`}>
                      <span>{gradeBadge[value.grade].icon}</span>
                      <span className="text-[11px]">{value.grade}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ?ëúÏ§?ÏßÅÎ¨¥ ?†Å?ï©?èÑ */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3">?ëúÏ§?ÏßÅÎ¨¥ ?†Å?ï©?èÑ</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">?ïôÍ≥? Ï∑®ÏóÖ?ûê ?èâÍ∑? ???Îπ?</span>
          <span className="text-2xl font-bold text-orange-500">78%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full" style={{ width: '78%' }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-2 mb-4">??? ?Çò?ùò ?ù¥?àò ?ó≠?üâÍ≥? ?ïôÍ≥? Ï°∏ÏóÖ?Éù(Ï∑®ÏóÖ?ûê) ?èâÍ∑? ?ó≠?üâ ?ùºÏπòÎèÑ</p>
        
        {/* Ï∂îÏ≤ú ÏßÅÎ¨¥ ?†Å?ï©?èÑ */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-bold text-gray-800 mb-3">Ï∂îÏ≤ú ÏßÅÎ¨¥</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="text-sm text-gray-600 mb-1">?Üå?îÑ?ä∏?õ®?ñ¥ Í∞úÎ∞ú?ûê</div>
                <div className="text-2xl font-bold text-gray-600">92%</div>
              </div>
              <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">?†Å?ï©</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200/20">
              <div>
                <div className="text-sm text-gray-600 mb-1">?ç∞?ù¥?Ñ∞ Î∂ÑÏÑùÍ∞?</div>
                <div className="text-2xl font-bold text-gray-500">85%</div>
              </div>
              <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">?†Å?ï©</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200/20">
              <div>
                <div className="text-sm text-gray-600 mb-1">IT Ïª®ÏÑ§?Ñ¥?ä∏</div>
                <div className="text-2xl font-bold text-gray-500">78%</div>
              </div>
              <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">Î≥¥ÌÜµ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence ?ä∏?ûò?Çπ */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">Evidence ?ä∏?ûò?Çπ</h3>
          <button 
            onClick={() => setShowEvidenceModal(true)}
            className="text-sm text-pink-500 font-medium"
          >
            ?†ÑÏ≤? Î≥¥Í∏∞
          </button>
        </div>
        <div className="space-y-2">
          {evidenceData.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                     style={{ backgroundColor: starDetails[item.competency as keyof typeof starDetails].color }}>
                  {item.competency}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{item.course}</p>
                  <p className="text-xs text-gray-500">{item.task}</p>
                </div>
              </div>
              <span className="font-bold text-green-600">{item.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ?ñâ?èôÏß??ëú Î™®Îã¨ (?ïµ?ã¨?ó≠?üâ) */}
      {selectedStar && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                     style={{ backgroundColor: starDetails[selectedStar as keyof typeof starDetails].color }}>
                  {selectedStar}
                </div>
                <div>
                  <h3 className="font-bold text-xl">{starDetails[selectedStar as keyof typeof starDetails].name} ?ó≠?üâ</h3>
                  <p className="text-gray-500">?ñâ?èôÏß??ëú ?ã¨?Ñ±?èÑ</p>
                </div>
              </div>
              <button onClick={() => setSelectedStar(null)} className="p-2">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-3">
              {starDetails[selectedStar as keyof typeof starDetails].skills.map((skill, idx) => {
                const progress = Math.floor(Math.random() * 40) + 60;
                return (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{skill}</span>
                      <span className="font-bold" style={{ color: starDetails[selectedStar as keyof typeof starDetails].color }}>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" 
                           style={{ width: `${progress}%`, backgroundColor: starDetails[selectedStar as keyof typeof starDetails].color }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ?ñâ?èôÏß??ëú Î™®Îã¨ (?ïò?úÑ?ó≠?üâ PO) */}
      {selectedPO && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                     style={{ backgroundColor: `${poDetails[selectedPO as keyof typeof poDetails].color}20`, color: poDetails[selectedPO as keyof typeof poDetails].color }}>
                  {poDetails[selectedPO as keyof typeof poDetails].category}
                </div>
                <div>
                  <h3 className="font-bold text-xl">{poDetails[selectedPO as keyof typeof poDetails].name}</h3>
                  <p className="text-gray-500">?ñâ?èôÏß??ëú ?ã¨?Ñ±?èÑ</p>
                </div>
              </div>
              <button onClick={() => setSelectedPO(null)} className="p-2">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-3">
              {poDetails[selectedPO as keyof typeof poDetails].skills.map((skill, idx) => {
                const progress = Math.floor(Math.random() * 40) + 60;
                return (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{skill}</span>
                      <span className="font-bold" style={{ color: poDetails[selectedPO as keyof typeof poDetails].color }}>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" 
                           style={{ width: `${progress}%`, backgroundColor: poDetails[selectedPO as keyof typeof poDetails].color }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ÎØºÏõê ?ôîÎ©?
  const ComplaintScreen = () => (
    <div className="pb-4">
      {/* ?ó§?çî */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            <img src={logoImage} alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowShareModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Share2 className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setShowSearchModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
        <h2 className="font-bold text-xl">ÎØºÏõê ?Ñº?Ñ∞</h2>
        <p className="text-sm opacity-90 mb-3">Î¨∏Ïùò?Ç¨?ï≠?ùÑ ?é∏Î¶¨ÌïòÍ≤? ?†ë?àò?ïò?Ñ∏?öî</p>
        
        {/* Ï≤òÎ¶¨?ú® Ïπ¥Îìú - ?ó§?çî ?Ç¥Î∂? */}
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-white font-medium whitespace-nowrap">Ï≤òÎ¶¨?ú®</span>
            <div className="flex-1 bg-white/30 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" 
                   style={{ width: `${completionRate}%` }}></div>
            </div>
            <span className="font-bold text-white whitespace-nowrap">{completionRate}%</span>
          </div>
        </div>
      </div>

      {/* ÎØºÏõê ?òÑ?ô©?åê */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">?Ç¥ ÎØºÏõê ?òÑ?ô©</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => {
              setComplaintStatusFilter('?†ë?àò');
              setShowComplaintListModal(true);
            }}
            className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
          >
            <p className="text-2xl font-bold text-blue-600">{complaintStats.?†ë?àò}</p>
            <p className="text-xs text-gray-600">?†ë?àò</p>
          </button>
          <button 
            onClick={() => {
              setComplaintStatusFilter('Ï≤òÎ¶¨Ï§?');
              setShowComplaintListModal(true);
            }}
            className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
          >
            <p className="text-2xl font-bold text-orange-600">{complaintStats.Ï≤òÎ¶¨Ï§?}</p>
            <p className="text-xs text-gray-600">Ï≤òÎ¶¨Ï§?</p>
          </button>
          <button 
            onClick={() => {
              setComplaintStatusFilter('?ôÑÎ£?');
              setShowComplaintListModal(true);
            }}
            className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
          >
            <p className="text-2xl font-bold text-green-600">{complaintStats.?ôÑÎ£?}</p>
            <p className="text-xs text-gray-600">?ôÑÎ£?</p>
          </button>
        </div>
      </div>

      {/* ÎØºÏõê Ïπ¥ÌÖåÍ≥†Î¶¨ */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3">ÎØºÏõê Ïπ¥ÌÖåÍ≥†Î¶¨</h3>
        <div className="grid grid-cols-2 gap-3">
          {complaintCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentCategory(cat.name);
                // Î™®Îì† Ïπ¥ÌÖåÍ≥†Î¶¨Î•? Ï±ÑÌåÖ Î™®Îã¨Î°? Ï≤òÎ¶¨
                setShowChatModal(true);
                setChatStep(0);
                setChatAnswers({});
                
                // Ïπ¥ÌÖåÍ≥†Î¶¨Î≥? Ï¥àÍ∏∞ Î©îÏãúÏß?
                if (cat.name === '?ãú?Ñ§ Î∞? ?ôòÍ≤?') {
                  setChatHistory([
                    { type: 'bot', message: '?ïà?Öï?ïò?Ñ∏?öî! ?ãú?Ñ§ Î∞? ?ôòÍ≤? Í¥??†® Î¨∏ÏùòÎ•? ?èÑ????ìúÎ¶¨Í≤†?äµ?ãà?ã§. ?üò?' },
                    { type: 'bot', message: '?ñ¥?ñ§ ?ãú?Ñ§?óê Î¨∏Ï†úÍ∞? ?ûà?Çò?öî?' }
                  ]);
                } else if (cat.name === '?ïô?Éù ?û•?ïô') {
                  setChatHistory([
                    { type: 'bot', message: '?ïà?Öï?ïò?Ñ∏?öî! ?ïô?Éù ?û•?ïô Í¥??†® Î¨∏ÏùòÎ•? ?èÑ????ìúÎ¶¨Í≤†?äµ?ãà?ã§. ?üí?' },
                    { type: 'bot', message: '?ñ¥?ñ§ ?û•?ïôÍ∏àÏóê ????ï¥ Î¨∏Ïùò?ïò?ãú?Çò?öî?' }
                  ]);
                } else if (cat.name === '?ïô?Éù Î≥µÏ??') {
                  setChatHistory([
                    { type: 'bot', message: '?ïà?Öï?ïò?Ñ∏?öî! ?ïô?Éù Î≥µÏ?? Í¥??†® Î¨∏ÏùòÎ•? ?èÑ????ìúÎ¶¨Í≤†?äµ?ãà?ã§. ?üè?' },
                    { type: 'bot', message: '?ñ¥?ñ§ Î≥µÏ?? ?ãú?Ñ§?óê ????ï¥ Î¨∏Ïùò?ïò?ãú?Çò?öî?' }
                  ]);
                } else if (cat.name === '?àò?óÖ Î∞? ?ïô?Ç¨') {
                  setChatHistory([
                    { type: 'bot', message: '?ïà?Öï?ïò?Ñ∏?öî! ?àò?óÖ Î∞? ?ïô?Ç¨ Í¥??†® Î¨∏ÏùòÎ•? ?èÑ????ìúÎ¶¨Í≤†?äµ?ãà?ã§. ?üì?' },
                    { type: 'bot', message: '?ñ¥?ñ§ ?Ç¥?ö©?óê ????ï¥ Î¨∏Ïùò?ïò?ãú?Çò?öî?' }
                  ]);
                }
              }}
              className="bg-gray-50 rounded-2xl shadow p-5 text-left hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <cat.icon className="w-6 h-6 text-gray-500" />
              </div>
              <p className="font-bold text-gray-800 mb-1">{cat.name}</p>
              <p className="text-xs text-gray-500">{cat.items.length}Í∞? ?Ñ∏Î∂??ï≠Î™?</p>
            </button>
          ))}
        </div>
      </div>

      {/* ÎØºÏõê ?†ë?àò Î™®Îã¨ */}
      {showComplaintModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[90vh] flex flex-col animate-slide-up">
            {/* Í≥†Ï†ï ?ÉÅ?ã® ?òÅ?ó≠ */}
            <div className="p-6 pb-4 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: `${selectedCategory.color}20` }}>
                    <selectedCategory.icon className="w-5 h-5" style={{ color: selectedCategory.color }} />
                  </div>
                  <h3 className="font-bold text-lg">{selectedCategory.name}</h3>
                </div>
                <button onClick={() => { 
                  setShowComplaintModal(false); 
                  setSelectedCategory(null);
                  setComplaintTitle('');
                  setComplaintContent('');
                  setAttachedFiles([]);
                  setSelectedSubCategory(null);
                }}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* ?ÉÅ?Ñ∏ Ïπ¥ÌÖåÍ≥†Î¶¨ ?Ñ†?Éù */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">?Ñ∏Î∂? Ïπ¥ÌÖåÍ≥†Î¶¨ ?Ñ†?Éù</label>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory.items.map((item: string, idx: number) => (
                    <button 
                      key={idx} 
                      onClick={() => setSelectedSubCategory(item)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedSubCategory === item
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ?ä§?Å¨Î°? Í∞??ä•?ïú Ï§ëÍ∞Ñ ?òÅ?ó≠ */}
            <div className="flex-1 overflow-y-auto px-6">
              <div className="space-y-4 pb-4">
                {/* ?†úÎ™? ?ûÖ?†• */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 font-bold">?†úÎ™?</label>
                    <span className="text-sm font-medium text-gray-500 text-[12px]">
                      {complaintTitle.length}/50
                    </span>
                  </div>
                  <input 
                    type="text"
                    placeholder="?†úÎ™©ÏùÑ ?ûÖ?†•?ïò?Ñ∏?öî (ÏµúÎ?? 50?ûê)"
                    maxLength={50}
                    value={complaintTitle}
                    onChange={(e) => setComplaintTitle(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-[6px] focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>

                {/* Î¨∏Ïùò ?Ç¥?ö© */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 text-[14px] font-bold">?Ç¥?ö©</label>
                    <span className="text-sm font-medium text-gray-500 text-[12px]">
                      {complaintContent.length}/100
                    </span>
                  </div>
                  <textarea 
                    placeholder="Î¨∏Ïùò?ïò?ã§ ?Ç¥?ö©?ùÑ ?ûë?Ñ±?ï¥ Ï£ºÏÑ∏?öî (ÏµúÎ?? 100?ûê)"
                    rows={6}
                    maxLength={100}
                    value={complaintContent}
                    onChange={(e) => setComplaintContent(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-[6px] focus:outline-none focus:border-blue-500 resize-none text-sm"
                  />
                </div>

                {/* ?åå?ùº Ï≤®Î?? */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <label className="text-sm font-medium text-gray-700 font-bold">?åå?ùº Ï≤®Î??</label>
                      <button
                        onClick={() => setShowFileInfo(!showFileInfo)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        type="button"
                      >
                        <CircleHelp className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-sm font-medium text-blue-600 text-[12px]">
                      {attachedFiles.length}/5
                    </span>
                  </div>
                  
                  {/* ?åå?ùº ?ïà?Ç¥ ?à¥?åÅ */}
                  {showFileInfo && (
                    <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Upload className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <div className="text-xs text-blue-900 space-y-1">
                          <p className="font-medium">?üì? ?åå?ùº Ï≤®Î?? ?ïà?Ç¥</p>
                          <ul className="space-y-0.5 ml-1">
                            <li>??? ÏµúÎ?? 5Í∞? ?åå?ùº</li>
                            <li>??? Í∞úÎãπ 10MB ?ù¥?ïò</li>
                            <li>??? JPG, PNG, PDF, DOCX</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-[6px] p-4 text-center">
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      multiple 
                      accept=".jpg,.jpeg,.png,.pdf,.docx"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={attachedFiles.length >= 5}
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={attachedFiles.length >= 5}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Upload className="w-4 h-4" />
                      <span className="text-sm font-medium">?åå?ùº ?Ñ†?Éù</span>
                    </button>
                  </div>

                  {/* ?åå?ùº ÎØ∏Î¶¨Î≥¥Í∏∞ */}
                  {attachedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {attachedFiles.map((fileItem) => (
                        <div key={fileItem.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          {/* ?ç∏?Ñ§?ùº */}
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
                            {fileItem.file.type.startsWith('image/') ? (
                              <img 
                                src={fileItem.preview} 
                                alt={fileItem.file.name}
                                style={{ transform: `rotate(${fileItem.rotation}deg)` }}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FileText className="w-8 h-8 text-gray-400" />
                            )}
                          </div>

                          {/* ?åå?ùº ?†ïÎ≥? */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {fileItem.file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(fileItem.file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>

                          {/* ?ï°?Öò Î≤ÑÌäº */}
                          <div className="flex items-center gap-1 shrink-0">
                            {fileItem.file.type.startsWith('image/') && (
                              <button 
                                onClick={() => rotateImage(fileItem.id)}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-all"
                                title="?öå?†Ñ"
                              >
                                <RotateCw className="w-4 h-4 text-gray-600" />
                              </button>
                            )}
                            <button 
                              onClick={() => removeFile(fileItem.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-all"
                              title="?Ç≠?†ú"
                            >
                              <Trash className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ?ûë?Ñ± ?òµ?Öò */}
                {/* ?ûë?Ñ± ?òµ?Öò */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">?ûë?Ñ±?òµ?Öò</h3>
                  
                  {/* ?ùµÎ™? ?òµ?Öò */}
                  <label className="flex items-start gap-3 mb-4 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-5 h-5 accent-blue-500 mt-0.5 shrink-0" 
                    />
                    <span className="text-gray-700">
                      <span className="font-medium text-[14px]">?ùµÎ™ÖÏúºÎ°? ?ûë?Ñ±</span><br/>
                      <span className="text-xs text-gray-500">?ûë?Ñ±?ûêÎ™? ?à®Íπ? (Í¥?Î¶¨Ïûê?äî ?ãùÎ≥? Í∞??ä•)</span>
                    </span>
                  </label>
                  
                  {/* ?ïåÎ¶? ?èô?ùò */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={agreeNotification}
                      onChange={(e) => setAgreeNotification(e.target.checked)}
                      className="w-5 h-5 accent-blue-500 mt-0.5 shrink-0" 
                    />
                    <span className="text-gray-700">
                      <span className="font-medium text-[14px]">Ï≤òÎ¶¨ Í≤∞Í≥º ?ïåÎ¶? ?àò?ã† ?èô?ùò</span><br/>
                      <span className="text-xs text-gray-500">Push, EmailÎ°? Í≤∞Í≥ºÎ•? Î∞õÏúº?ãú?†§Î©? ?èô?ùò?ï¥Ï£ºÏÑ∏?öî</span>
                    </span>
                  </label>
                </div>

                {/* Í≥µÍ∞ú ?Ñ§?†ï */}
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-800 font-medium text-sm block mb-0.5">?ÇòÎß? Î≥¥Í∏∞</span>
                      <span className="text-xs text-gray-500">?ã§Î•? ?ïô?Éù?óêÍ≤åÎäî ÎπÑÍ≥µÍ∞? Ï≤òÎ¶¨ (Í∏∞Î≥∏Í∞?: ÎπÑÍ≥µÍ∞?)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsPrivate(!isPrivate)}
                      className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
                        isPrivate ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          isPrivate ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Í≥†Ï†ï ?ïò?ã® ?òÅ?ó≠ */}
            <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
              <button 
                onClick={() => {
                  alert(`ÎØºÏõê?ù¥ ?†ë?àò?êò?óà?äµ?ãà?ã§!\n\nÏπ¥ÌÖåÍ≥†Î¶¨: ${selectedCategory.name}\n?†úÎ™?: ${complaintTitle}\n?Ç¥?ö©: ${complaintContent}\nÏ≤®Î???åå?ùº: ${attachedFiles.length}Í∞?`);
                  setShowComplaintModal(false);
                  setSelectedCategory(null);
                  setComplaintTitle('');
                  setComplaintContent('');
                  setAttachedFiles([]);
                  setSelectedSubCategory(null);
                  localStorage.removeItem('complaint_draft');
                }}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                ?†úÏ∂úÌïòÍ∏?
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ?îåÎ°úÌåÖ Î≤ÑÌäº */}
      <button 
        onClick={() => {
          setSelectedCategory(complaintCategories[0]);
          setShowComplaintModal(true);
        }}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg flex items-center justify-center text-white z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* FAQ Î™®Îã¨ */}
      {showFAQ && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">?ûêÏ£? Ï∞æÎäî ÏßàÎ¨∏</h3>
              <button onClick={() => setShowFAQ(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-2">
              {faqData.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedFAQ === faq.id ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-4 pb-4 text-gray-600 text-sm bg-gray-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-orange-50 rounded-2xl">
              <p className="text-sm text-orange-700">?õê?ïò?äî ?ãµÎ≥??ùÑ Ï∞æÏ?? Î™ªÌïò?Ö®?Çò?öî?</p>
              <button 
                onClick={() => { setShowFAQ(false); setShowComplaintModal(true); }}
                className="mt-2 text-orange-600 font-medium text-sm"
              >
                ÏßÅÏ†ë Î¨∏Ïùò?ïòÍ∏? ?Üí
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ?ïåÎ¶? ?ôîÎ©?
  const NotificationScreen = () => (
    <div className="pb-4">
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            <img src={logoImage} alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowShareModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Share2 className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setShowSearchModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
        <h2 className="font-bold text-xl">?ïåÎ¶?</h2>
        <p className="text-sm opacity-90">?ÉàÎ°úÏö¥ ?Üå?ãù?ùÑ ?ôï?ù∏?ïò?Ñ∏?öî</p>
      </div>

      <div className="mx-4 mt-4 space-y-3">
        {notifications.map((notif) => (
          <div key={notif.id} className={`bg-white rounded-2xl shadow p-4 ${!notif.read ? 'border-l-4 border-pink-500' : ''}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!notif.read ? 'bg-pink-100' : 'bg-gray-100'}`}>
                  <Bell className={`w-5 h-5 ${!notif.read ? 'text-pink-500' : 'text-gray-400'}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{notif.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                </div>
              </div>
              {!notif.read && <div className="w-2 h-2 bg-pink-500 rounded-full"></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ÎßàÏù¥?éò?ù¥Ïß? ?ôîÎ©?
  const MyPageScreen = () => (
    <div className="pb-4">
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-4 pb-16">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
            <img src={logoImage} alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowShareModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Share2 className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setShowSearchModal(true)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-all">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>
        <h2 className="font-bold text-xl">ÎßàÏù¥?éò?ù¥Ïß?</h2>
      </div>

      {/* ?îÑÎ°úÌïÑ Ïπ¥Îìú */}
      <div className="mx-4 -mt-10 bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {authTokens?.userName?.[0] || '?ïô'}
          </div>
          <div>
            <p className="font-bold text-lg">{authTokens?.userName || '?Ç¨?ö©?ûê'}</p>
            <p className="text-gray-500 text-sm">
              {authTokens?.userType === 'student' ? 'Ïª¥Ìì®?Ñ∞Í≥µÌïôÍ≥? 3?ïô?ÖÑ' : 'Ïª¥Ìì®?Ñ∞Í≥µÌïôÍ≥? ÍµêÏàò'}
            </p>
            <p className="text-gray-400 text-xs">{authTokens?.userId || '202012345'}</p>
          </div>
        </div>
      </div>

      {/* Î©îÎâ¥ */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        <button 
          onClick={() => setShowNotificationSettingsModal(true)}
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-gray-400" />
            <span>?ïåÎ¶? ?Ñ§?†ï</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button 
          onClick={() => setShowDownloadModal(true)}
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-gray-400" />
            <span>ÎØºÏõê ?ù¥?†• ?ã§?ö¥Î°úÎìú</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button 
          onClick={() => {
            setComplaintStatusFilter('?†ÑÏ≤?');
            setShowComplaintListModal(true);
          }}
          className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-gray-400" />
            <span>?Ç¥Í∞? ?ì¥ ÎØºÏõê ?†ÑÏ≤¥Î≥¥Í∏?</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button 
          onClick={() => setShowLoginInfoModal(true)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all"
        >
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400" />
            <span>Î°úÍ∑∏?ù∏ ?†ïÎ≥? (SSO)</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <button 
        onClick={handleLogout}
        className="mx-4 mt-4 w-[calc(100%-2rem)] py-3 text-red-500 hover:text-red-600 transition-all flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        Î°úÍ∑∏?ïÑ?õÉ
      </button>
    </div>
  );

  // Evidence ?ïÑ?Ñ∞Îß? Î∞? ?†ï?†¨
  const getFilteredEvidence = () => {
    let filtered = evidenceData;
    
    // ?ïÑ?Ñ∞Îß?
    if (evidenceFilter !== '?†ÑÏ≤?') {
      filtered = filtered.filter(item => item.competency === evidenceFilter);
    }
    
    // ?†ï?†¨
    if (evidenceSort === 'ÏµúÏã†?àú') {
      filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (evidenceSort === '?†ê?àò?àú') {
      const scoreValue: Record<string, number> = { 'A+': 4.5, 'A': 4.0, 'B+': 3.5, 'B': 3.0 };
      filtered = [...filtered].sort((a, b) => (scoreValue[b.score] || 0) - (scoreValue[a.score] || 0));
    }
    
    return filtered;
  };

  // ?ïôÍ∏∞Î≥Ñ Í∑∏Î£π?ïë
  const groupBySemester = (data: typeof evidenceData) => {
    const grouped: Record<string, typeof evidenceData> = {};
    data.forEach(item => {
      if (!grouped[item.semester]) {
        grouped[item.semester] = [];
      }
      grouped[item.semester].push(item);
    });
    return grouped;
  };

  // Î°úÎî© Ï§ëÏùº ?ïå
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Î°úÎî© Ï§?...</p>
        </div>
      </div>
    );
  }

  // Î°úÍ∑∏?ù∏?ïòÏß? ?ïä??? Í≤ΩÏö∞
  if (!authTokens) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 max-w-md mx-auto relative overflow-hidden">
      {/* Î©îÏù∏ Ïª®ÌÖêÏ∏? */}
      <div className="pb-20">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'complaint' && <ComplaintScreen />}
        {activeTab === 'notification' && <NotificationScreen />}
        {activeTab === 'mypage' && <MyPageScreen />}
      </div>

      {/* Ï±ÑÌåÖ Î™®Îã¨ */}
      <ChatModal
        isOpen={showChatModal}
        onClose={() => {
          setShowChatModal(false);
          setCurrentCategory('');
        }}
        category={currentCategory}
        onSuccess={(message, type) => {
          setSuccessMessage(message);
          setSuccessType(type);
          setShowSuccessModal(true);
        }}
      />

      {/* ÎØºÏõê Î¶¨Ïä§?ä∏ Î™®Îã¨ */}
      {showComplaintListModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl h-[85vh] flex flex-col">
            {/* Í≥†Ï†ï ?ÉÅ?ã® ?òÅ?ó≠ */}
            <div className="shrink-0">
              {/* ?ó§?çî */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <h3 className="font-bold text-xl">?Ç¥ ÎØºÏõê ?Ç¥?ó≠</h3>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-500">Ï¥? {getFilteredComplaints().length}Í±?</p>
                  <button onClick={handleCloseComplaintListModal}>
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* ?ÉÅ?Éú ?ïÑ?Ñ∞ ?É≠ (?ñ∏?çî?ùº?ù∏ ?ä§????ùº) */}
              <div className="flex border-b border-gray-200 px-6">
                {['?†ÑÏ≤?', '?†ë?àò', 'Ï≤òÎ¶¨Ï§?', '?ôÑÎ£?'].map((status) => {
                  const count = status === '?†ÑÏ≤?' 
                    ? complaints.length 
                    : complaints.filter(c => c.status === status).length;
                  
                  return (
                    <button
                      key={status}
                      onClick={() => setComplaintStatusFilter(status)}
                      className={`relative px-4 py-3 font-medium transition-all ${
                        complaintStatusFilter === status
                          ? 'text-gray-900'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {status}
                        <span className={`text-xs ${
                          complaintStatusFilter === status
                            ? 'text-red-500'
                            : 'text-gray-400'
                        }`}>
                          {count}
                        </span>
                      </span>
                      {complaintStatusFilter === status && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Í≤??ÉâÏ∞? + Í∏∞Í∞Ñ ?ïÑ?Ñ∞ */}
              <div className="px-6 pt-4 pb-3">
                {/* Í≤??ÉâÎ∞? */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="ÎØºÏõê ?†úÎ™? ?òê?äî ?Ç¥?ö© Í≤??Éâ..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                  {searchKeyword && (
                    <button
                      onClick={() => setSearchKeyword('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>

                {/* Í∏∞Í∞Ñ ?ïÑ?Ñ∞ */}
                <div className="flex gap-2">
                  {['?†ÑÏ≤?', '1Í∞úÏõî', '3Í∞úÏõî', '6Í∞úÏõî'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setPeriodFilter(period)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        periodFilter === period
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ?ä§?Å¨Î°? Í∞??ä•?ïú Ï§ëÍ∞Ñ ?òÅ?ó≠ */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <div className="space-y-3 pb-4">
                {getFilteredComplaints().length > 0 ? (
                  getFilteredComplaints().map((complaint) => (
                  <div 
                    key={complaint.id} 
                    className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setComplaintDetailModal(complaint);
                      setShowComplaintListModal(false);
                      if (!complaint.isRead && !complaintReadStatus[complaint.id]) {
                        setComplaintReadStatus(prev => ({ ...prev, [complaint.id]: true }));
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-2 flex-1">
                        <h4 className="font-bold text-gray-800">{complaint.title}</h4>
                        {!complaint.isRead && !complaintReadStatus[complaint.id] && (
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {/* ?ôÑÎ£? ?ÉÅ?Éú?ùº ?ïå?äî Î≥ÑÏ†ê/?èâÍ∞??ïòÍ∏? ?ëú?ãú, Í∑? ?ô∏?óê?äî ?ÉÅ?Éú ?ÉúÍ∑? ?ëú?ãú */}
                        {complaint.status === '?ôÑÎ£?' ? (
                          <>
                            {complaintRatings[complaint.id] ? (
                              <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-full">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs font-medium text-yellow-600">{complaintRatings[complaint.id]}.0</span>
                              </div>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRateComplaint(complaint.id);
                                }}
                                className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium hover:bg-yellow-100 transition-colors"
                              >
                                ?èâÍ∞??ïòÍ∏?
                              </button>
                            )}
                          </>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[complaint.status]}`}>
                            {complaint.status}
                          </span>
                        )}
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                      <span>{complaint.category}</span>
                      <span>{complaint.date}</span>
                    </div>
                  </div>
                ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Search className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium mb-1">Í≤??Éâ Í≤∞Í≥ºÍ∞? ?óÜ?äµ?ãà?ã§</p>
                    <p className="text-sm text-gray-400">?ã§Î•? Í≤??Éâ?ñ¥?Çò ?ïÑ?Ñ∞Î•? ?ãú?èÑ?ï¥Î≥¥ÏÑ∏?öî</p>
                  </div>
                )}
              </div>
            </div>

            {/* Í≥†Ï†ï ?ïò?ã® ?òÅ?ó≠ */}
            <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
              <button className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                ÎØºÏõê ?Ç¥?ó≠ ?ã§?ö¥Î°úÎìú
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Evidence ?†ÑÏ≤¥Î≥¥Í∏? Î™®Îã¨ */}
      {showEvidenceModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[85vh] flex flex-col">
            {/* Í≥†Ï†ï ?ÉÅ?ã® ?òÅ?ó≠ */}
            <div className="p-6 pb-0 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-xl">Evidence ?†ÑÏ≤? ?Ç¥?ó≠</h3>
                  <p className="text-sm text-gray-500">Ï¥? {evidenceData.length}Í±?</p>
                </div>
                <button onClick={() => setShowEvidenceModal(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* ?ïÑ?Ñ∞ ?É≠ */}
              <div className="flex items-center justify-between gap-3 mb-4">
                {/* ?ù¥?†Ñ Î≤ÑÌäº */}
                <button
                  onClick={() => {
                    if (filterScrollRef.current) {
                      filterScrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
                    }
                  }}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all shrink-0"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
                </button>

                {/* Ïπ¥ÌÖåÍ≥†Î¶¨ ?ä§?Å¨Î°? ?òÅ?ó≠ */}
                <div 
                  ref={filterScrollRef}
                  className="flex-1 overflow-x-auto scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="flex gap-2">
                    {['?†ÑÏ≤?', 'S', 'T', 'A', 'R'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setEvidenceFilter(filter)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                          evidenceFilter === filter
                            ? 'text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                        style={
                          evidenceFilter === filter && filter !== '?†ÑÏ≤?'
                            ? { backgroundColor: starDetails[filter as keyof typeof starDetails].color }
                            : evidenceFilter === filter
                            ? { background: 'linear-gradient(to right, #E94E3C, #F7941D)' }
                            : {}
                        }
                      >
                        {filter === '?†ÑÏ≤?' ? '?†ÑÏ≤?' : `${filter} (${starDetails[filter as keyof typeof starDetails].name})`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ?ã§?ùå Î≤ÑÌäº */}
                <button
                  onClick={() => {
                    if (filterScrollRef.current) {
                      filterScrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
                    }
                  }}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all shrink-0"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* ?†ï?†¨ ?òµ?Öò */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  {['ÏµúÏã†?àú', '?ïôÍ∏∞Î≥Ñ', '?†ê?àò?àú'].map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setEvidenceSort(sort)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        evidenceSort === sort
                          ? 'bg-pink-100 text-pink-600 font-medium'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ?ä§?Å¨Î°? Í∞??ä•?ïú Ï§ëÍ∞Ñ ?òÅ?ó≠ */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {/* ?ïôÍ∏∞Î≥Ñ Í∑∏Î£π */}
              {evidenceSort === '?ïôÍ∏∞Î≥Ñ' ? (
                <div className="space-y-4">
                  {Object.entries(groupBySemester(getFilteredEvidence())).map(([semester, items]) => (
                    <div key={semester}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                        <h4 className="font-bold text-gray-800">{semester}</h4>
                        <span className="text-xs text-gray-500">({items.length}Í±?)</span>
                      </div>
                      <div className="space-y-2">
                        {items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                                style={{ backgroundColor: starDetails[item.competency as keyof typeof starDetails].color }}
                              >
                                {item.competency}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 text-sm">{item.course}</p>
                                <p className="text-xs text-gray-500">{item.task}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                              </div>
                            </div>
                            <span className="font-bold text-green-600">{item.score}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {getFilteredEvidence().map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: starDetails[item.competency as keyof typeof starDetails].color }}
                        >
                          {item.competency}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{item.course}</p>
                          <p className="text-xs text-gray-500">{item.task}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{item.semester} ¬∑ {item.date}</p>
                        </div>
                      </div>
                      <span className="font-bold text-green-600">{item.score}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Í≥†Ï†ï ?ïò?ã® ?òÅ?ó≠ */}
            <div className="p-6 pt-4 shrink-0">
              <button className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                PDFÎ°? ?ã§?ö¥Î°úÎìú
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ?Ñ±Í≥? Î™®Îã¨ */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 animate-scale-up shadow-2xl">
            <div className="flex flex-col items-center text-center">
              {/* ?ïÑ?ù¥ÏΩ? */}
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
                {successType === 'complete' ? (
                  <CheckCircle className="w-10 h-10 text-white" />
                ) : (
                  <Send className="w-10 h-10 text-white" />
                )}
              </div>
              
              {/* Î©îÏãúÏß? */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {successType === 'complete' ? '?ôÑÎ£åÎêò?óà?äµ?ãà?ã§!' : '?†ë?àò ?ôÑÎ£?!'}
              </h3>
              <p className="text-gray-600 whitespace-pre-line mb-6">
                {successMessage}
              </p>
              
              {/* ?ôï?ù∏ Î≤ÑÌäº */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white rounded-xl font-bold hover:shadow-lg transition-all"
              >
                ?ôï?ù∏
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ?ïò?ã® ?Ñ§ÎπÑÍ≤å?ù¥?Öò */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {[
            { id: 'home', icon: Home, label: '?ôà' },
            { id: 'complaint', icon: FileText, label: 'ÎØºÏõê' },
            { id: 'notification', icon: Bell, label: '?ïåÎ¶?', badge: 2 },
            { id: 'mypage', icon: User, label: 'MY' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-2 px-4 relative ${
                activeTab === tab.id ? 'text-pink-500' : 'text-gray-400'
              }`}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{tab.label}</span>
              {tab.badge && (
                <div className="absolute -top-1 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">{tab.badge}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Í≥µÏú† Î™®Îã¨ */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">?Ç¥ ?ó≠?üâ Î¶¨Ìè¨?ä∏ Í≥µÏú†</h3>
              <button onClick={() => setShowShareModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">?ó≠?üâ ?†ê?àò??? Î¶¨Ìè¨?ä∏Î•? Í≥µÏú†?ïò?Ñ∏?öî</p>

            <div className="space-y-3">
              <button className="w-full py-4 bg-yellow-400 text-gray-800 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-yellow-500 transition-all">
                <MessageCircle className="w-5 h-5" />
                Ïπ¥Ïπ¥?ò§?Ü°?úºÎ°? Í≥µÏú†
              </button>

              <button 
                onClick={() => {
                  navigator.clipboard.writeText('https://student-dashboard.example.com/report/Íπ??àò?Ñ±');
                  alert('ÎßÅÌÅ¨Í∞? Î≥µÏÇ¨?êò?óà?äµ?ãà?ã§!');
                }}
                className="w-full py-4 bg-blue-50 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-100 transition-all"
              >
                <Copy className="w-5 h-5" />
                ÎßÅÌÅ¨ Î≥µÏÇ¨
              </button>

              <button className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all">
                <Download className="w-5 h-5" />
                PDFÎ°? ?ã§?ö¥Î°úÎìú
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500">
                ?üí? Í≥µÏú†?êú Î¶¨Ìè¨?ä∏?äî 7?ùºÍ∞? ?ú†?ö®?ï©?ãà?ã§
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Í≤??Éâ Î™®Îã¨ */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl h-[85vh] flex flex-col">
            {/* Í≥†Ï†ï ?ÉÅ?ã® ?òÅ?ó≠ */}
            <div className="p-6 pb-4 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl">?Üµ?ï© Í≤??Éâ</h3>
                <button onClick={() => setShowSearchModal(false)}>
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Í≤??ÉâÏ∞? */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Evidence, ÎØºÏõê, ?ïåÎ¶? Í≤??Éâ..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  autoFocus
                />
              </div>

              {/* ?ïÑ?Ñ∞ ?É≠ */}
              <div className="flex gap-2 mt-4">
                {['?†ÑÏ≤?', 'Evidence', 'ÎØºÏõê', '?ïåÎ¶?'].map((filter) => (
                  <button
                    key={filter}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-pink-100 hover:text-pink-600 transition-all"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* ?ä§?Å¨Î°? Í∞??ä•?ïú Ï§ëÍ∞Ñ ?òÅ?ó≠ */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <div className="space-y-4">
                {/* ÏµúÍ∑º Í≤??Éâ?ñ¥ */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">ÏµúÍ∑º Í≤??Éâ?ñ¥</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Ï∞ΩÏùò?†Å Î¨∏Ï†ú?ï¥Í≤?', '?û•?ïôÍ∏?', '?èÑ?ÑúÍ¥? ?ÉâÎ∞?', 'S?ó≠?üâ'].map((term, idx) => (
                      <button 
                        key={idx}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ?ù∏Í∏? Í≤??Éâ?ñ¥ */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">?ù∏Í∏? Í≤??Éâ?ñ¥</h4>
                  <div className="space-y-2">
                    {['?àòÍ∞ïÏã†Ï≤?', '?Ñ±?†Å ?†ï?†ï', '?ó≠?üâ ?†ê?àò', 'ÎØºÏõê ?†úÏ∂?'].map((term, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
                        <span className="text-pink-500 font-bold text-sm">{idx + 1}</span>
                        <span className="text-gray-800">{term}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ï∂îÏ≤ú */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Ï∂îÏ≤ú</h4>
                  <div className="space-y-2">
                    <div className="p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <Trophy className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-bold text-gray-800">S Ï∞ΩÏùò ?ó≠?üâ</span>
                      </div>
                      <p className="text-xs text-gray-600">ÏµúÍ∑º ?óÖ?ç∞?ù¥?ä∏?êú ?ó≠?üâ ?†ê?àòÎ•? ?ôï?ù∏?ïò?Ñ∏?öî</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Í≥†Ï†ï ?ïò?ã® ?òÅ?ó≠ */}
            <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
              <button className="w-full py-3 text-gray-500 text-sm">
                Í≤??Éâ Í∏∞Î°ù ?†ÑÏ≤? ?Ç≠?†ú
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ?ïåÎ¶? ?Ñ§?†ï Î™®Îã¨ */}
      {showNotificationSettingsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">?ïåÎ¶? ?Ñ§?†ï</h3>
              <button onClick={() => setShowNotificationSettingsModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">Î∞õÍ≥† ?ã∂??? ?ïåÎ¶? Ï±ÑÎÑê?ùÑ ?Ñ†?Éù?ïò?Ñ∏?öî</p>

            <div className="space-y-4">
              {/* PWA ?ë∏?ãú */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bell className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">PWA ?ë∏?ãú</p>
                      <p className="text-xs text-gray-500">Î∏åÎùº?ö∞??? ?ïåÎ¶?</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationChannels({...notificationChannels, pwa: !notificationChannels.pwa})}
                    className={`w-12 h-6 rounded-full relative transition-all ${
                      notificationChannels.pwa ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notificationChannels.pwa ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">?ã§?ãúÍ∞ÑÏúºÎ°? Ï§ëÏöî?ïú ?ïåÎ¶ºÏùÑ Î∞õÏùÑ ?àò ?ûà?äµ?ãà?ã§</p>
              </div>

              {/* Ïπ¥Ïπ¥?ò§?Ü° */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Ïπ¥Ïπ¥?ò§?Ü°</p>
                      <p className="text-xs text-gray-500">Ïπ¥Ïπ¥?ò§ ?ïåÎ¶ºÌÜ°</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationChannels({...notificationChannels, kakao: !notificationChannels.kakao})}
                    className={`w-12 h-6 rounded-full relative transition-all ${
                      notificationChannels.kakao ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notificationChannels.kakao ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">Ïπ¥Ïπ¥?ò§?Ü°?úºÎ°? ?ïåÎ¶ºÏùÑ Î∞õÏùÑ ?àò ?ûà?äµ?ãà?ã§</p>
              </div>

              {/* ?ù¥Î©îÏùº */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <Send className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">?ù¥Î©îÏùº</p>
                      <p className="text-xs text-gray-500">school@example.com</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationChannels({...notificationChannels, email: !notificationChannels.email})}
                    className={`w-12 h-6 rounded-full relative transition-all ${
                      notificationChannels.email ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notificationChannels.email ? 'right-1' : 'left-1'
                    }`}></div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">?ù¥Î©îÏùºÎ°? ?ÉÅ?Ñ∏?ïú ?ïåÎ¶ºÏùÑ Î∞õÏùÑ ?àò ?ûà?äµ?ãà?ã§</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-700">
                ?üí? ?ïåÎ¶? Ï±ÑÎÑê??? ?ñ∏?†ú?ì†Ïß? Î≥?Í≤ΩÌï† ?àò ?ûà?äµ?ãà?ã§
              </p>
            </div>

            <button
              onClick={() => {
                setShowNotificationSettingsModal(false);
                alert('?ïåÎ¶? ?Ñ§?†ï?ù¥ ????û•?êò?óà?äµ?ãà?ã§!');
              }}
              className="w-full mt-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold"
            >
              ????û•?ïòÍ∏?
            </button>
          </div>
        </div>
      )}

      {/* Î°úÍ∑∏?ù∏ ?†ïÎ≥? Î™®Îã¨ */}
      {showLoginInfoModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl">Î°úÍ∑∏?ù∏ ?†ïÎ≥?</h3>
              <button onClick={() => setShowLoginInfoModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* SSO ?ó∞?èô ?ÉÅ?Éú */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">SSO ?ó∞?èô ?ôÑÎ£?</p>
                    <p className="text-xs text-gray-500">?Üµ?ï© ?ù∏Ï¶? ?ãú?ä§?Öú</p>
                  </div>
                </div>
              </div>

              {/* Í≥ÑÏ†ï ?†ïÎ≥? */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">Í≥ÑÏ†ï ?†ïÎ≥?</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {authTokens?.userType === 'student' ? '?ïôÎ≤?' : 'ÍµêÎ≤à'}
                    </span>
                    <span className="font-medium">{authTokens?.userId || '202012345'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">?ù¥Î¶?</span>
                    <span className="font-medium">{authTokens?.userName || '?Ç¨?ö©?ûê'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">?Ç¨?ö©?ûê ?ú†?òï</span>
                    <span className="font-medium">
                      {authTokens?.userType === 'student' ? '?ïô?Éù' : 'ÍµêÏàò'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">?ûê?èô Î°úÍ∑∏?ù∏</span>
                    <span className="font-medium">
                      {authTokens?.rememberMe ? '?Ç¨?ö©' : 'ÎØ∏ÏÇ¨?ö©'}
                    </span>
                  </div>
                </div>
              </div>

              {/* ?ïô?†Å ?†ïÎ≥? */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">?ïô?†Å ?†ïÎ≥?</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">?ïôÍ≥?</span>
                    <span className="font-medium text-gray-800">Ïª¥Ìì®?Ñ∞Í≥µÌïôÍ≥?</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">?ïô?ÖÑ</span>
                    <span className="font-medium text-gray-800">
                      {authTokens?.userType === 'student' ? '3?ïô?ÖÑ' : '-'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">?ù¥Î©îÏùº</span>
                    <span className="font-medium text-gray-800">school@example.com</span>
                  </div>
                </div>
              </div>

              {/* Î°úÍ∑∏?ù∏ ?ù¥?†• */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">ÏµúÍ∑º Î°úÍ∑∏?ù∏ ?ù¥?†•</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">2025.01.20 14:32</span>
                    </div>
                    <span className="text-gray-500">Chrome (Windows)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">2025.01.19 09:15</span>
                    </div>
                    <span className="text-gray-500">Safari (iPhone)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">2025.01.18 18:42</span>
                    </div>
                    <span className="text-gray-500">Chrome (Android)</span>
                  </div>
                </div>
              </div>

              {/* Î≥¥Ïïà ?Ñ§?†ï */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">Î≥¥Ïïà ?Ñ§?†ï</h4>
                <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all">
                  ÎπÑÎ??Î≤àÌò∏ Î≥?Í≤?
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-xl">
              <p className="text-xs text-orange-700">
                ?ö†Ô∏? ?ùò?ã¨?ä§?ü¨?ö¥ Î°úÍ∑∏?ù∏ ?ôú?èô?ù¥ ?ûà?ã§Î©? Ï¶âÏãú ÎπÑÎ??Î≤àÌò∏Î•? Î≥?Í≤ΩÌïò?Ñ∏?öî
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ÎßåÏ°±?èÑ ?èâÍ∞? Î™®Îã¨ */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">ÎØºÏõê Ï≤òÎ¶¨Í∞? ?ôÑÎ£åÎêò?óà?äµ?ãà?ã§</h3>
              <p className="text-sm text-gray-500">Ï≤òÎ¶¨ Í≤∞Í≥º?óê ????ï¥ ?èâÍ∞??ï¥Ï£ºÏÑ∏?öî</p>
            </div>

            {/* Î≥ÑÏ†ê */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3 text-center">ÎßåÏ°±?èÑÎ•? ?Ñ†?Éù?ï¥Ï£ºÏÑ∏?öî</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        rating <= selectedRating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="text-center mt-2">
                <span className="text-sm text-gray-500">
                  {selectedRating === 0 && '?Ñ†?Éù?ï¥Ï£ºÏÑ∏?öî'}
                  {selectedRating === 1 && 'Îß§Ïö∞ Î∂àÎßåÏ°?'}
                  {selectedRating === 2 && 'Î∂àÎßåÏ°?'}
                  {selectedRating === 3 && 'Î≥¥ÌÜµ'}
                  {selectedRating === 4 && 'ÎßåÏ°±'}
                  {selectedRating === 5 && 'Îß§Ïö∞ ÎßåÏ°±'}
                </span>
              </div>
            </div>

            {/* Ï∂îÔøΩÔøΩÔøΩ ?ùòÍ≤? */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Ï∂îÍ?? ?ùòÍ≤? (?Ñ†?Éù)</label>
              <textarea
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                placeholder="?çî Ï¢ãÏ?? ?ÑúÎπÑÏä§Î•? ?úÑ?ïú ?ùòÍ≤¨ÏùÑ ?Ç®Í≤®Ï£º?Ñ∏?öî"
                className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            {/* Î≤ÑÌäº */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRatingModal(false);
                  setRatingComplaintId(null);
                  setSelectedRating(0);
                  setRatingComment('');
                  setShowComplaintListModal(false);
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
              >
                ?ÇòÏ§ëÏóê
              </button>
              <button
                onClick={handleRatingSubmit}
                disabled={selectedRating === 0}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  selectedRating === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg'
                }`}
              >
                ?èâÍ∞? ?†úÏ∂?
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ÎØºÏõê ?ÉÅ?Ñ∏Î≥¥Í∏∞ Î™®Îã¨ */}
      {complaintDetailModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md h-[85vh] rounded-t-3xl flex flex-col">
            {/* ?ó§?çî */}
            <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white p-6 rounded-t-3xl shrink-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-xl">ÎØºÏõê ?ÉÅ?Ñ∏Î≥¥Í∏∞</h3>
                <button
                  onClick={() => {
                    setComplaintDetailModal(null);
                    setShowComplaintListModal(true);
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <span>{complaintDetailModal.category}</span>
                <span>???</span>
                <span>{complaintDetailModal.date}</span>
              </div>
            </div>

            {/* ?Ç¥?ö© */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* ?†úÎ™? */}
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-800 mb-2">{complaintDetailModal.title}</h4>
                <div className="flex items-center gap-2">
                  {complaintDetailModal.status === '?ôÑÎ£?' ? (
                    <>
                      {complaintRatings[complaintDetailModal.id] ? (
                        <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-full">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs font-medium text-yellow-600">{complaintRatings[complaintDetailModal.id]}.0</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRateComplaint(complaintDetailModal.id)}
                          className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium hover:bg-yellow-100 transition-colors"
                        >
                          ?èâÍ∞??ïòÍ∏?
                        </button>
                      )}
                    </>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      complaintDetailModal.status === '?†ë?àò' ? 'bg-blue-100 text-blue-700' :
                      complaintDetailModal.status === 'Ï≤òÎ¶¨Ï§?' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {complaintDetailModal.status}
                    </span>
                  )}
                </div>
              </div>

              {/* ?Ç¥Í∞? ?ûë?Ñ±?ïú ÎØºÏõê ?Ç¥?ö© */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                  <h5 className="font-bold text-gray-800">Î¨∏Ïùò ?Ç¥?ö©</h5>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {complaintDetailModal.content}
                  </p>
                </div>
              </div>

              {/* ?†ë?àò ?ÉÅ?Éú: ?Ç¥?ö©Îß? Î≥¥Ïó¨Ï§? (?úÑ?óê ?ù¥ÎØ? ?ëú?ãú?ê®) */}

              {/* Ï≤òÎ¶¨Ï§? ?ÉÅ?Éú: ????ûÑ?ùº?ù∏ + ?ã¥?ãπ?ûê ?†ïÎ≥? */}
              {complaintDetailModal.status === 'Ï≤òÎ¶¨Ï§?' && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h5 className="font-bold text-gray-800">Ï≤òÎ¶¨ ?òÑ?ô©</h5>
                  </div>
                  
                  {/* ????ûÑ?ùº?ù∏ UI */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      {['?†ë?àò ?ôï?ù∏', '?ã¥?ãπ?ûê Î∞∞Ï†ï', 'Ï≤òÎ¶¨Ï§?'].map((step, index) => (
                        <div key={`${complaintDetailModal.id}-${step}`} className="flex items-center flex-1">
                          <div className="flex flex-col items-center w-full">
                            <div className="relative flex items-center justify-center w-full">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 z-10 ${
                                index < complaintDetailModal.currentStep 
                                  ? 'bg-blue-500 text-white' 
                                  : index === complaintDetailModal.currentStep 
                                  ? 'bg-blue-500 text-white animate-pulse' 
                                  : 'bg-gray-300 text-gray-500'
                              }`}>
                                {index < complaintDetailModal.currentStep ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <span className="text-xs font-bold">{index + 1}</span>
                                )}
                              </div>
                              {index < 2 && (
                                <div className={`absolute left-1/2 w-full h-0.5 ${
                                  index < complaintDetailModal.currentStep ? 'bg-blue-500' : 'bg-gray-300'
                                }`} style={{ top: '50%', transform: 'translateY(-50%)' }} />
                              )}
                            </div>
                            <span className={`text-xs text-center whitespace-nowrap mt-1 ${
                              index <= complaintDetailModal.currentStep ? 'text-gray-800 font-medium' : 'text-gray-400'
                            }`}>
                              {step}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ?ã¥?ãπ ?†ïÎ≥? */}
                  {complaintDetailModal.department && complaintDetailModal.assignee && (
                    <div className="bg-white border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-600 shrink-0" />
                        <div className="text-sm text-gray-800">
                          <span className="font-medium">Î∂??Ñú:</span> {complaintDetailModal.department}
                          <span className="mx-2">|</span>
                          <span className="font-medium">?ã¥?ãπ:</span> {complaintDetailModal.assignee}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ?ôÑÎ£? ?ÉÅ?Éú: Í¥?Î¶¨Ïûê ?ãµÎ≥? + Ï≤®Î???åå?ùº */}
              {complaintDetailModal.status === '?ôÑÎ£?' && complaintDetailModal.adminResponse && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h5 className="font-bold text-gray-800">Í¥?Î¶¨Ïûê ?ãµÎ≥?</h5>
                  </div>
                  
                  {/* Í¥?Î¶¨Ïûê ?ãµÎ≥? */}
                  <div className="bg-green-50 rounded-lg p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-green-900">?ãµÎ≥? ?Ç¥?ö©</span>
                      <span className="text-xs text-green-700">{complaintDetailModal.responseDate}</span>
                    </div>
                    <p className="text-sm text-green-900 leading-relaxed whitespace-pre-wrap">
                      {complaintDetailModal.adminResponse}
                    </p>
                  </div>

                  {/* Ï≤®Î???åå?ùº */}
                  {complaintDetailModal.attachments && complaintDetailModal.attachments.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <h5 className="font-bold text-gray-800">Ï≤®Î???åå?ùº ({complaintDetailModal.attachments.length})</h5>
                      </div>
                      <div className="space-y-2">
                        {complaintDetailModal.attachments.map((file: any) => (
                          <div key={file.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size}</p>
                              </div>
                            </div>
                            <a 
                              href={file.url} 
                              download 
                              className="ml-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors shrink-0"
                            >
                              ?ã§?ö¥Î°úÎìú
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ?ïò?ã® Î≤ÑÌäº */}
            <div className="p-6 pt-4 shrink-0 border-t border-gray-100">
              <button
                onClick={() => {
                  setComplaintDetailModal(null);
                  setShowComplaintListModal(true);
                }}
                className="w-full py-3 bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                ?ã´Í∏?
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ÎØºÏõê ?ù¥?†• ?ã§?ö¥Î°úÎìú Î™®Îã¨ */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up">
            {/* ?ó§?çî */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl">ÎØºÏõê ?ù¥?†• ?ã§?ö¥Î°úÎìú</h3>
              <button onClick={() => setShowDownloadModal(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* ?ã§?ö¥Î°úÎìú ?òµ?Öò */}
            <div className="space-y-6">
              {/* Í∏∞Í∞Ñ ?Ñ†?Éù */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  ?ã§?ö¥Î°úÎìú Í∏∞Í∞Ñ
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['ÏµúÍ∑º 1Í∞úÏõî', 'ÏµúÍ∑º 3Í∞úÏõî', 'ÏµúÍ∑º 6Í∞úÏõî', '?†ÑÏ≤?'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setDownloadPeriod(period)}
                      className={`p-3 rounded-xl border-2 font-medium transition-all ${
                        downloadPeriod === period
                          ? 'border-red-500 bg-red-50 text-red-600'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              {/* ?åå?ùº ?òï?ãù ?Ñ†?Éù */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  ?åå?ùº ?òï?ãù
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['PDF', 'Excel'].map((format) => (
                    <button
                      key={format}
                      onClick={() => setDownloadFormat(format)}
                      className={`p-3 rounded-xl border-2 font-medium transition-all ${
                        downloadFormat === format
                          ? 'border-red-500 bg-red-50 text-red-600'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        {format}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ?ã§?ö¥Î°úÎìú ?Ç¥?ö© ÎØ∏Î¶¨Î≥¥Í∏∞ */}
              <div className="bg-gradient-to-r from-red-50 via-pink-50 to-orange-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-red-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 mb-1">?è¨?ï® ?Ç¥?ö©</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>??? ÎØºÏõê ?†úÎ™? Î∞? ?Ç¥?ö©</li>
                      <li>??? Ï≤òÎ¶¨ ?ÉÅ?Éú Î∞? ?ã¥?ãπ?ûê</li>
                      <li>??? ?ãµÎ≥? ?Ç¥?ö© (?ôÑÎ£åÎêú Í≤ΩÏö∞)</li>
                      <li>??? Ï≤òÎ¶¨ ?ùº?ûê Î∞? ?ù¥?†•</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ?ïà?Ç¥ Î©îÏãúÏß? */}
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-xs text-blue-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    ?ã§?ö¥Î°úÎìú?êú ?åå?ùº?óê?äî Í∞úÏù∏?†ïÎ≥¥Í?? ?è¨?ï®?êò?ñ¥ ?ûà?úº?ãà 
                    Î≥¥Ïïà?óê ?ú†?ùò?ï¥Ï£ºÏãúÍ∏? Î∞îÎûç?ãà?ã§.
                  </span>
                </p>
              </div>
            </div>

            {/* Î≤ÑÌäº */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
              >
                Ï∑®ÏÜå
              </button>
              <button
                onClick={() => {
                  // ?ã§?†úÎ°úÎäî ?åå?ùº ?Éù?Ñ± Î°úÏßÅ
                  alert(`${downloadPeriod} ÎØºÏõê ?ù¥?†•?ùÑ ${downloadFormat} ?òï?ãù?úºÎ°? ?ã§?ö¥Î°úÎìú?ï©?ãà?ã§.`);
                  setShowDownloadModal(false);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                ?ã§?ö¥Î°úÎìú
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}