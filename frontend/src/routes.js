import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
function getUserCategory() {
  return sessionStorage.getItem("category") || 'Guest'; // Default to 'Guest' if not found
}

const userCategory = getUserCategory(); // Call the function correctly

// Define routes based on user category
const routes = {
  Student: [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/user-page", element: <UserPage /> },
    { path: "/Liveclass", element: <Liveclass /> },
    { path: "/Courses", element: <Courses /> },
    { path: "/QandA", element: <QandA /> },
  ],
  admin: [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/user-page", element: <UserPage /> },
    { path: "/Icons", element: <Icons /> },
    { path: "/notifications", element: <Notifications /> },
    { path: "/ManageCoursePage", element: <ManageCoursePage /> },
    { path: "/BatchManager", element: <BatchManager /> },
    { path: "/tables", element: <TableList /> },
    { path: "/typography", element: <Typography /> },
  ],
  Faculty: [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/SolveDoubts", element: <SolveDoubts /> },
    { path: "/user-page", element: <UserPage /> },
    { path: "/UploadManager", element: <UploadManager /> },
    { path: "/ScheduleTable", element: <ScheduleTable /> },
  ],
  Guest: [
    { path: "/", element: <div>Welcome! Please log in to access features.</div> },
  ],
};

// Main App Component
const App = () => {
  const userRoutes = routes[userCategory] || routes['Guest']; // Default to Guest routes

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {userRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
