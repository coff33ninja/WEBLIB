import {
  FiChevronDown,
  FiChevronUp,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiX,
  FiPlus,
  FiSearch,
  FiGlobe,
  FiRefreshCw,
  FiLogIn,
  FiMenu,
  FiGithub,
  FiLoader,
  FiImage,
  FiAlertTriangle,
  FiDownload,
  FiMusic,
  FiBook,
  FiPlay,
  FiActivity,
  FiInbox,
  FiGlobe2,
  FiMonitor
} from "react-icons/fi";

export const Icons = {
  chevronDown: FiChevronDown,
  chevronUp: FiChevronUp,
  chevronLeft: FiChevronLeft,
  chevronRight: FiChevronRight,
  check: FiCheck,
  x: FiX,
  plus: FiPlus,
  search: FiSearch,
  globe: FiGlobe,
  refresh: FiRefreshCw,
  login: FiLogIn,
  menu: FiMenu,
  github: FiGithub,
  spinner: FiLoader,
  image: FiImage,
  alert: FiAlertTriangle,
  download: FiDownload,
  music: FiMusic,
  book: FiBook,
  play: FiPlay,
  activity: FiActivity,
  inbox: FiInbox,
  languages: FiGlobe2,
  tv: FiMonitor,
  close: FiX,
} as const;

export type Icon = keyof typeof Icons;