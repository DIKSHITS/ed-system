import React, { lazy } from 'react';

// Lazy load components
const Dashboard = lazy(() => import("views/Dashboard.js"));
const Notifications = lazy(() => import("views/Notifications.js"));
const Icons = lazy(() => import("views/Icons.js"));
const Typography = lazy(() => import("views/Typography.js"));
const TableList = lazy(() => import("views/Tables.js"));
const UserPage = lazy(() => import("views/User.js"));
const ManageCoursePage = lazy(() => import("views/ManageCoursePage.js"));
const BatchManager = lazy(() => import("views/BatchManager.js"));
const Courses = lazy(() => import("views/Courses"));
const Liveclass = lazy(() => import("views/Liveclass"));
const QandA = lazy(() => import("views/QandA"));
const UploadManager = lazy(() => import("views/UploadManager.js"));
const ScheduleTable = lazy(() => import("views/ScheduleTable.js"));
const SolveDoubts = lazy(() => import("views/SolveDoubts.js"));

// Function to get user's category from session
function getUser Category() {
  return sessionStorage.getItem("category") || 'Guest'; // Default to 'Guest' if not found
}

const userCategory = getUser Category();

// Define routes based on user category
const routes = {
  Student: [
    { path: "/dashboard", name: "Dashboard", icon: "nc-icon nc-chart-bar-32", component: Dashboard },
    { path: "/user-page", name: "Profile", icon: "nc-icon nc-bookmark-2", component: UserPage },
    { path: "/Liveclass", name: "My Classes", icon: "nc-icon nc-tv-2", component: Liveclass },
    { path: "/Courses", name: "My Courses", icon: "nc-icon nc-hat-3", component: Courses },
    { path: "/QandA", name: "Question and Answer", icon: "nc-icon nc-bulb-63", component: QandA },
  ],
  admin: [
    { path: "/dashboard", name: "Dashboard", icon: "nc-icon nc-chart-bar-32", component: Dashboard },
    { path: "/user-page", name: "Profile", icon: "nc-icon nc-bookmark-2", component: UserPage },
    { path: "/Icons", name: "Manage Student", icon: "nc-icon nc-single-02", component: Icons },
    { path: "/notifications", name: "Manage Faculties", icon: "nc-icon nc-hat-3", component: Notifications },
    { path: "/ManageCoursePage", name: "Manage Course", icon: "nc-icon nc-book-bookmark", component: ManageCoursePage },
    { path: "/BatchManager", name: "Batch Manage", icon: "nc-icon nc-watch-time", component: BatchManager },
    { path: "/tables", name: "Manage Schedule", icon: "nc-icon nc-calendar-60", component: TableList },
    { path: "/typography", name: "Manage Exam", icon: "nc-icon nc-ruler-pencil", component: Typography },
  ],
  Faculty: [
    { path: "/dashboard", name: "Dashboard", icon: "nc-icon nc-chart-bar-32", component: Dashboard },
    { path: "/SolveDoubts", name: "Question and Answer", icon: "nc-icon nc-bulb-63", component: SolveDoubts },
    { path: "/user-page", name: "Profile", icon: "nc-icon nc-bookmark-2", component: UserPage },
    { path: "/UploadManager", name: "Manager Upload", icon: "nc-icon nc-cloud-upload-94", component: UploadManager },
    { path: "/ScheduleTable", name: "My Schedule", icon: "nc-icon nc-calendar-60", component: ScheduleTable },
  ],
};

// Export the routes based on the user category
export default routes[userCategory] || [];