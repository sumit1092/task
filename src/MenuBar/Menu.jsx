import dashboardLogo from "../assets/images/dashboardLogo.svg";
import myTeamLogo from "../assets/images/teamLogo.svg";
import myTaskLogo from "../assets/images/taskLogo.svg";
import billingLogo from "../assets/images/dollar.svg";
import settingsLogo from "../assets/images/settingLogo.svg";

export const menuData = [
  {
    id: 1,
    sidebar: "home",
    submenu: [
      { id: 1, name: "Dashboard", link: "/dashboard", Icon: dashboardLogo },
      { id: 2, name: "My Team", link: "/myteam", Icon: myTeamLogo },
      { id: 3, name: "My Task", link: "/mytask", Icon: myTaskLogo },
      { id: 4, name: "Billing", link: "/billing", Icon: billingLogo },
      { id: 5, name: "Settings", link: "/settings", Icon: settingsLogo },
    ],
  },
];
