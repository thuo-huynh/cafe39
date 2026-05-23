export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/Rcv6SCwcpaSDT8yn9';
export const GOOGLE_MAPS_EMBED =
  'https://maps.google.com/maps?q=39+Nguy%E1%BB%85n+Thi%E1%BB%87n+K%E1%BA%BF+An+H%E1%BA%A3i+S%C6%A1n+Tr%C3%A0+%C4%90%C3%A0+N%E1%BA%B5ng&t=&z=16&ie=UTF8&iwloc=&output=embed';

export const ADDRESS_LINES = ['39 Nguyễn Thiện Kế', 'An Hải, Sơn Trà, Đà Nẵng, Vietnam'];
export const PHONE = '+84 935 556 808';
export const BRAND_NAME = 'Cafe bà Chín';
export const BRAND_SUB = 'Danang · Est. 2006';

export const CONTACT = {
  phone: '+84 935 556 808',
  phoneRaw: '+84935556808',
  zalo: '+84935556808',
  shopeeFood: 'https://shopeefood.vn/',
  grabFood: 'https://food.grab.com/vn/en',
  instagram: 'https://instagram.com/cafe39',
  facebook: 'https://facebook.com/cafe39',
};

export interface DayHours {
  open: string;
  close: string;
  label: string;
}

// 0=Sun, 6=Sat — keys are weekday indices from JS Date.getDay()
export const HOURS: Record<number, DayHours> = {
  0: { open: '07:00', close: '22:00', label: 'Sun' },
  1: { open: '06:30', close: '22:30', label: 'Mon' },
  2: { open: '06:30', close: '22:30', label: 'Tue' },
  3: { open: '06:30', close: '22:30', label: 'Wed' },
  4: { open: '06:30', close: '22:30', label: 'Thu' },
  5: { open: '06:30', close: '22:30', label: 'Fri' },
  6: { open: '07:00', close: '23:00', label: 'Sat' },
};

export interface PaymentMethod {
  id: string;
  label: string;
  sub: string;
  color: string;
}

export const PAYMENT: PaymentMethod[] = [
  { id: 'vietqr', label: 'VietQR', sub: 'Any Vietnamese bank', color: '#d52b1e' },
  { id: 'momo', label: 'MoMo', sub: 'MoMo wallet', color: '#a50064' },
  { id: 'zalopay', label: 'ZaloPay', sub: 'ZaloPay wallet', color: '#0068ff' },
];

export const STORY_LABELS = [
  'Milk Tea',
  'Morning',
  'Phin',
  'Vibe',
];
