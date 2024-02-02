
export type Link = {
    text: string,
    link: string,
    phone?: string,
    email?: string,
    hours?: string,
    links?: Link[],
}

export const links: Link[] = [
    {
        text: "Puget Sound Electric (PSE)",
        link: "https://www.pse.com/",
        phone: "1-888-225-5773",
        email: "customercare@pse.com",
        hours: "Mon-Fri 7:30am-6:30pm",
        links: [
            {
                text: "Outage Map",
                link: "https://www.pse.com/en/outage/outage-map"
            },
            {
                text: "Bill Pay",
                link: "https://www.pse.com/en/account-and-billing/pay-my-bill"
            }
        ]
    },
    {
        text: "Republic Services",
        link: "https://www.republicservices.com/municipality/lake-forest-park-wa",
        phone: "206-682-9730",
        email: "",
        hours: "Mon-Fri, 7am-7pm; Sat 8am-12pm",
        links: [
            {
                text: "Schedule",
                link: "",
            },
        ]
    },
    {
        text: "Shoreline Transfer Station",
        link: "https://kingcounty.gov/en/dept/dnrp/waste-services/garbage-recycling-compost/solid-waste-facilities/shoreline",
        phone: "1-206-477-4466",
        hours: "Mon-Fri, 7:30am-5pm; Sat&Sun 8:30am-5:30pm",
        links: [
            {
                text: "Fact Sheet",
                link: "https://cdn.kingcounty.gov/-/media/king-county/depts/dnrp/waste-services/garbage-recycling-compost/solid-waste-facilities/documents/factsheet-shoreline.pdf?rev=8d6f18f514d5494cb0fa66763a565e00&hash=5DC6EE0FE000B82703E59BD85D63F03A"
            }
        ]
    },
    {
        text: "Lake Forest Park Town Center",
        link: "https://www.towncenteratlakeforest.com/",
        hours: "Sun-Sat 9am-9pm",
        links: [
            {
                text: "Events",
                link: "https://www.towncenteratlakeforest.com/events/"
            }
        ]
    },
    {
        text: "Third Place Commons",
        link: "https://www.thirdplacecommons.org/",
        phone: "206-366-3302",
        email: "programs@thirdplacecommons.org",
        hours: "Mon-Thu 7am-9pm; Fri-Sat 7am-10pm; Sun 7am-8pm",
        links: [
            {
                text: "Events",
                link: "https://www.thirdplacecommons.org/events/"
            },
            {
                text: "Calendar",
                link: "https://www.thirdplacecommons.org/calendar/"
            }
        ]
    }
];
