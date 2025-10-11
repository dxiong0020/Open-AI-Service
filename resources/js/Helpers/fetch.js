export async function fetchData(url, method = "POST", data = {}) {
    try {
        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
        };
        if (method === "POST") {
            options.body = JSON.stringify(data);
        }
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log("error: ", error);
    }
}
