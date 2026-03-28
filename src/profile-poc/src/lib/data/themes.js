// src/lib/data/themes.js
// 4종 그래픽 테마 — CSS 변수 기반으로 전체 화면 스타일 교체

export const THEMES = [
  {
    id: 'dark-neo',
    label: 'Dark Neo',
    preview: '#1a1a2e',
    description: '강렬한 흑백 대비',
    cssVars: {
      '--bg-base':             '#0a0a0a',
      '--panel-unfocused-bg':  '#111111',
      '--panel-overlay':       'rgba(0,0,0,0.55)',
      '--unfocused-filter':    'grayscale(100%) brightness(35%)',
      '--text-primary':        '#ffffff',
      '--text-secondary':      'rgba(255,255,255,0.55)',
      '--text-hint':           'rgba(255,255,255,0.35)',
      '--panel-flex-focused':  '4',
      '--panel-transition':    '500ms cubic-bezier(0.34,1.56,0.64,1)',
      '--border-radius-panel': '0px',
      '--name-shadow':         '0 2px 20px rgba(0,0,0,0.8)',
      '--header-bg':           'rgba(0,0,0,0.0)',
      '--control-bg':          'rgba(15,15,25,0.92)',
      '--control-border':      'rgba(255,255,255,0.12)',
    }
  },
  {
    id: 'warm',
    label: 'Warm',
    preview: '#3d1a00',
    description: '붉은 계열 따뜻한 톤',
    cssVars: {
      '--bg-base':             '#120800',
      '--panel-unfocused-bg':  '#1e0e00',
      '--panel-overlay':       'rgba(60,20,0,0.55)',
      '--unfocused-filter':    'grayscale(80%) brightness(35%) sepia(40%)',
      '--text-primary':        '#ffe8c8',
      '--text-secondary':      'rgba(255,232,200,0.55)',
      '--text-hint':           'rgba(255,232,200,0.35)',
      '--panel-flex-focused':  '4',
      '--panel-transition':    '600ms cubic-bezier(0.25,1,0.5,1)',
      '--border-radius-panel': '0px',
      '--name-shadow':         '0 2px 20px rgba(100,30,0,0.8)',
      '--header-bg':           'rgba(18,8,0,0.3)',
      '--control-bg':          'rgba(30,14,0,0.92)',
      '--control-border':      'rgba(255,180,80,0.15)',
    }
  },
  {
    id: 'pastel',
    label: 'Pastel',
    preview: '#e8daf8',
    description: '밝고 부드러운 라벤더',
    cssVars: {
      '--bg-base':             '#f0eaf8',
      '--panel-unfocused-bg':  '#e0d8f0',
      '--panel-overlay':       'rgba(180,160,220,0.35)',
      '--unfocused-filter':    'grayscale(60%) brightness(68%) saturate(40%)',
      '--text-primary':        '#2a1040',
      '--text-secondary':      'rgba(42,16,64,0.6)',
      '--text-hint':           'rgba(42,16,64,0.35)',
      '--panel-flex-focused':  '4',
      '--panel-transition':    '450ms ease-in-out',
      '--border-radius-panel': '20px',
      '--name-shadow':         '0 2px 16px rgba(100,60,160,0.25)',
      '--header-bg':           'rgba(240,234,248,0.6)',
      '--control-bg':          'rgba(255,252,255,0.92)',
      '--control-border':      'rgba(160,120,220,0.2)',
    }
  },
  {
    id: 'midnight',
    label: 'Midnight',
    preview: '#0a0a28',
    description: '딥 블루 사이버 무드',
    cssVars: {
      '--bg-base':             '#050510',
      '--panel-unfocused-bg':  '#0a0a20',
      '--panel-overlay':       'rgba(0,0,40,0.65)',
      '--unfocused-filter':    'grayscale(100%) brightness(25%) hue-rotate(200deg)',
      '--text-primary':        '#c8d8ff',
      '--text-secondary':      'rgba(200,216,255,0.55)',
      '--text-hint':           'rgba(200,216,255,0.3)',
      '--panel-flex-focused':  '4',
      '--panel-transition':    '550ms cubic-bezier(0.16,1,0.3,1)',
      '--border-radius-panel': '0px',
      '--name-shadow':         '0 0 24px rgba(100,140,255,0.5)',
      '--header-bg':           'rgba(5,5,16,0.2)',
      '--control-bg':          'rgba(10,10,32,0.95)',
      '--control-border':      'rgba(100,140,255,0.2)',
    }
  }
];
