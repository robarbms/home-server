
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
        text: "Shorecrest High School",
        link: "https://shorecrest.ssd412.org/",
        phone: "206-393-4286",
        links: [
            {
                text: "Calendar",
                link: "https://shorecrest.ssd412.org/about-us/calendar"
            }
        ]
    },
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
];
