import {
  Archive,
  Building2,
  ChartBarBig,
  Database,
  KeyRound,
  LandPlot,
  UserRound,
  UserRoundCog,
} from 'lucide-react';

interface WithChildren {
  label: string;
  pathname?: string;
  children?: OverViewItem_2[];
  icon: any;
  permission_module: string;
}

interface WithoutChildren {
  label: string;
  pathname?: string;
  children: OverViewItem_2[];
  icon: any;
  permission_module?: string;
}

export type OverViewItem = WithChildren | WithoutChildren;

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface OverViewItem_2 {
  label: string;
  pathname: string;
  isHome?: boolean;
  permission_module: string;
}

export interface NavItem {
  title: string;
  items: OverViewItem[];
}

const OVERVIEW_ITEMS: OverViewItem[] = [
  {
    label: 'Analytics',
    pathname: '/dashboard/home',
    icon: ChartBarBig,
    permission_module: 'dashboard',
  },
];

const USERMANAGEMENT_ITEMS: OverViewItem[] = [
  {
    label: 'User',
    pathname: '/dashboard/user',
    icon: UserRound,
    permission_module: 'user',
  },
  {
    label: 'Role',
    pathname: '/dashboard/role',
    icon: KeyRound,
    permission_module: 'role',
  },
];

const MANAGEMENT_ITEMS: OverViewItem[] = [
  {
    label: 'Master Data',
    icon: Database,
    pathname: '/dashboard/master-data',
    children: [],
  },
];

const NAV_ITEMS: NavItem[] = [
  {
    title: 'Overview',
    items: OVERVIEW_ITEMS,
  },
  {
    title: 'User Management',
    items: USERMANAGEMENT_ITEMS,
  },
  {
    title: 'Management',
    items: MANAGEMENT_ITEMS,
  },
];

export default NAV_ITEMS;
