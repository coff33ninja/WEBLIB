import { IconType } from "react-icons";
import { IconDictionary, IconName } from './icons/IconDictionary';
import { 
  RiCommandLine,
  RiFileTextLine,
  RiGithubLine,
  RiQuestionLine,
  RiImageLine,
  RiComputerLine,
  RiLoader2Line,
  RiMoonLine,
  RiMoreLine,
  RiRestaurantLine,
  RiAddLine,
  RiSettings2Line,
  RiSunLine,
  RiTwitterLine,
  RiCheckLine,
  RiCircleLine,
  RiArrowRightLine,
  RiRefreshLine,
  RiGlobalLine,
  RiMenuLine,
  RiAlertLine,
  RiDownloadLine,
  RiMusicLine,
  RiBookOpenLine,
  RiSearchLine,
  RiPlayCircleLine,
  RiHeartPulseLine,
  RiInboxLine,
  RiTranslate2,
  RiTvLine,
  RiCloseLine,
  RiArrowLeftLine,
  RiArrowDownLine,
  RiFolderLine
} from 'react-icons/ri';

export type Icon = IconType;

export const Icons = {
  chevronDown: IconDictionary.ChevronDown,
  chevronUp: IconDictionary.ChevronUp,
  check: IconDictionary.Check,
  search: IconDictionary.Search,
  plus: IconDictionary.Plus,
  menu: IconDictionary.Menu,
  logo: RiCommandLine,
  close: RiCloseLine,
  spinner: RiLoader2Line,
  chevronLeft: RiArrowLeftLine,
  chevronRight: RiArrowRightLine,
  chevronsUpDown: RiArrowDownLine,
  trash: RiCloseLine,
  settings: RiSettings2Line,
  user: RiCircleLine,
  moon: RiMoonLine,
  sun: RiSunLine,
  help: RiQuestionLine,
  pizza: RiRestaurantLine,
  twitter: RiTwitterLine,
  circle: RiCircleLine,
  file: RiFileTextLine,
  fileText: RiFileTextLine,
  image: RiImageLine,
  laptop: RiComputerLine,
  moreVertical: RiMoreLine,
  arrowRight: RiArrowRightLine,
  refresh: RiRefreshLine,
  globe: RiGlobalLine,
  alert: RiAlertLine,
  github: RiGithubLine,
  download: RiDownloadLine,
  music: RiMusicLine,
  book: RiBookOpenLine,
  play: RiPlayCircleLine,
  activity: RiHeartPulseLine,
  inbox: RiInboxLine,
  languages: RiTranslate2,
  tv: RiTvLine,
  folder: RiFolderLine
};