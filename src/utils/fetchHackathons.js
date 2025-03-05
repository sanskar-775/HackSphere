// utils/fetchHackathons.js

export const fetchHackathons = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        // 🛠️ Format Data Based on API Source
        if (url.includes("unstop")) {
            return data.data.data.map((h) => ({
                id: h.id,
                name: h.title,
                website:"https://unstop.com/" + h.public_url,
                start: h.start_date,
                end: h.end_date,
                location: h.location || "Online",
                banner: h.banner_mobile.image_url,
                source: "unstop",
            }));
        } else {
            return data.map((h) => ({
                id: h.id,
                name: h.name,
                website: h.website,
                start: h.start,
                end: h.end,
                location: h.location || "Online",
                banner: h.banner,
                source: "hackclub",
            }));
        }
    } catch (error) {
        console.error("Error fetching hackathons:", error);
        return [];
    }
};
