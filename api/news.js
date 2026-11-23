module.exports = async function handler(req, res) {
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        return res.status(405).json({ error: "Method not allowed" });
    }

    const apiKey = process.env.GNEWS_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "News API is not configured" });
    }

    const query = new URLSearchParams({
        category: "general",
        lang: "pt",
        country: "br",
        max: "5",
        apikey: apiKey,
    });

    try {
        const response = await fetch(
            `https://gnews.io/api/v4/top-headlines?${query}`,
        );
        const data = await response.json();

        if (!response.ok) {
            return res.status(502).json({ error: "News provider request failed" });
        }

        return res.status(200).json(data);
    } catch {
        return res.status(502).json({ error: "Unable to retrieve news" });
    }
};
