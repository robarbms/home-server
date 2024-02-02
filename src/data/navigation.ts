import { NavItemProps } from '../components/navigation/NavItem';
import { NavSectionProps } from '../components/navigation/NavSection';

export type SiteNavigationProps = NavSectionProps[]

const site_navigation = [
    {
        group: "",
        navItems: [
            {
                icon: "",
                title: "Dashboard",
                url: "./"
            },
            {
                icon: "",
                title: "Services",
                to: "/services"
            }
        ]
    },
    {
        group: "AI",
        navItems: [
            {
                icon: "",
                title: "Chat",
                url: "./"
            },
            {
                icon: "",
                title: "Stable Diffusion",
                url: "./"
            },
            {
                icon: "",
                title: "ComfyUI",
                url: "./"
            },
        ]
    }
]

export default site_navigation;