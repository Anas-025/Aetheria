import {
  AnalyticsOutlined,
  Book,
  BookOutlined,
  GroupsOutlined,
  LibraryBooks,
  PermIdentity,
  Schedule,
} from "@mui/icons-material";
import { AppDrawerList, AppNavList } from "types/app";

export const userNavList: AppNavList[] = [
  {
    id: 0,
    name: "All Books",
    icon: LibraryBooks ,
    link: "/app",
  },
  {
    id: 1,
    name: "My Books",
    icon: BookOutlined   ,
    link: "/app/myBooks",
  },
  {
    id: 2,
    name: "Profile",
    icon: PermIdentity ,
    link: "/app/profile",
  },
];

export const adminNavList: AppNavList[] = [
  {
    id: 3,
    name: "My Blogs",
    icon: Book ,
    link: "/app/myBlogs",
  },
]

export const userDrawerList: AppDrawerList[] = []

export const adminDrawerList: AppDrawerList[] = [
  ...userDrawerList,
  {
    name: "My Blogs",
    icon: Book ,
    link: "/app/myBlogs",
  },
  {
    name: "Analytics",
    icon: AnalyticsOutlined ,
    link: "/app/analytics",
  },
  {
    name: "Create Slots",
    icon: Schedule ,
    link: "/app/createSlots",
  },
  {
    name: "Meetings Data",
    icon: GroupsOutlined ,
    link: "/app/meetingData",
  },
];