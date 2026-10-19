export async function GET(request) {

    const city = request.nextUrl.searchParams.get("city");

    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
    if (!res.ok) {
        return Response.json({ error: "failed to call cities"}, { status: 502});
    }

    const data = await res.json();

    return Response.json(data);
}