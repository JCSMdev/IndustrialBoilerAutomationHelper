const API_URL = "http://127.0.0.1:8000/api";

export async function getPrices() {
    const response = await fetch(`${API_URL}/prices`, {
        headers: {
            "Authorization": "Bearer JUHASZ_CSABA_MATYAS-BOSCH-BEUGRO",
            "Accept": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
}
