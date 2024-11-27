import React, { useState, useEffect } from 'react';
// Import components here...

function getUserCategory() {
  return sessionStorage.getItem("category");
}

const Routes = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const userCategory = getUserCategory();
    let updatedRoutes = [];

    if (userCategory === 'Student') {
      updatedRoutes = [
        {
          path: "/dashboard",
          name: "Dashboard",
          icon: "nc-icon nc-chart-bar-32",
          component: <Dashboard />,
          layout: "/admin",
        },
        {
          path: "/user-page",
          name: "Profile",
          icon: "nc-icon nc-bookmark-2",
          component: <UserPage />,
          layout: "/admin",
          category: "admin",
        },
        {
          path: "/Liveclass",
          name: "My Classes",
          icon: "nc-icon nc-tv-2",
          component: <Liveclass />,
          layout: "/admin",
        },
        {
          path: "/Courses",
          name: "My Courses",
          icon: "nc-icon nc-hat-3",
          component: <Courses />,
          layout: "/admin",
        },
        {
          path: "/QandA",
          name: "Question and Answer",
          icon: "nc-icon nc-bulb-63",
          component: <QandA />,
          layout: "/admin",
        },
      ];
    } else if (userCategory === 'admin') {
      updatedRoutes = [
        {
          path: "/dashboard",
          name: "Dashboard",
          icon: "nc-icon nc-chart-bar-32",
          component: <Dashboard />,
          layout: "/admin",
        },
        {
          path: "/user-page",
          name: "Profile",
          icon: "nc-icon nc-bookmark-2",
          component: <UserPage />,
          layout: "/admin",
          category: "admin",
        },
        {
          path: "/Icons",
          name: "Manage Student",
          icon: "nc-icon nc-single-02",
          component: <Icons />,
          layout: "/admin",
        },
        {
          path: "/notifications",
          name: "Manage Faculties",
          icon: "nc-icon nc-hat-3",
          component: <Notifications />,
          layout: "/admin",
        },
        {
          path: "/ManageCoursePage",
          name: "Manage Course",
          icon: "nc-icon nc-book-bookmark",
          component: <ManageCoursePage />,
          layout: "/admin",
        },
        {
          path: "/BatchManager",
          name: "Batch Manage",
          icon: "nc-icon nc-watch-time",
          component: <BatchManager />,
          layout: "/admin",
        },
        {
          path: "/tables",
          name: "Manage Schedule",
          icon: "nc-icon nc-calendar-60",
          component: <TableList />,
          layout: "/admin",
        },
        {
          path: "/typography",
          name: "Manage Exam",
          icon: "nc-icon nc-ruler-pencil",
          component: <Typography />,
          layout: "/admin",
        },
      ];
    } else if (userCategory === 'Faculty') {
      updatedRoutes = [
        {
          path: "/dashboard",
          name: "Dashboard",
          icon: "nc-icon nc-chart-bar-32",
          component: <Dashboard />,
          layout: "/admin",
        },
        {
          path: "/SolveDoubts",
          name: "Question and Answer",
          icon: "nc-icon nc-bulb-63",
          component: <SolveDoubts />,
          layout: "/admin",
        },
        {
          path: "/user-page",
          name: "Profile",
          icon: "nc-icon nc-bookmark-2",
          component: <UserPage />,
          layout: "/admin",
          category: "admin",
        },
        {
          path: "/UploadManager",
          name: "Manager upload",
          icon: "nc-icon nc-cloud-upload-94",
          component: <UploadManager />,
          layout: "/admin",
        },
        {
          path: "/ScheduleTable",
          name: "My Schedule",
          icon: "nc-icon nc-calendar-60",
          component: <ScheduleTable />,
          layout: "/admin",
        },
      ];
    }

    setRoutes(updatedRoutes);
  }, []); // Run once when the component mounts

  return routes;
};

export default Routes;
