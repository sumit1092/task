export const paths = {
    publicRoutes: {
        login : {
            path : "/",
            element : "LoginPage"
        },
    },
    privateRoutes: {
        dashboard : {
            path : "/dashboard",
            element : "Dashboard"
        },
        myteam : {
            path : "/myteam",
            element : "MyTeam"
        },
        mytask : {
            path : "/mytask",
            element : "MyTask"
        },
        billing : {
            path : "/billing",
            element : "Billing"
        },
        settings : {
            path : "/settings",
            element : "Settings"
        },
    }
}

export const sideBarMenu = [
    {label: "Dashboard", path: "/dashboard"},
    {label: "My Team", path: "/myteam"},
    {label: "My Task", path: "/mytask"},
    {label: "Billing", path: "/billing"},
    {label: "Settings", path: "/settings"},
]

