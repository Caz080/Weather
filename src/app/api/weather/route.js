export async function GET(request) {

    const lat = request.nextUrl.searchParams.get("lat");
    const long = request.nextUrl.searchParams.get("long");

    if (!lat || !long) {
        return Response.json({ error: "missing lat or long params"}, { status: 400});
    }

    const numLat = Number(lat);
    const numLong = Number(long);

    if (Number.isNaN(numLat) || Number.isNaN(numLong)) {
        return Response.json({ error: "invalid lat or long params"}, { status: 400});
    }
    if (numLat > 90 || numLat < -90 || numLong > 180 || numLong < -180) {
        return Response.json({ error: "invalid lat or long params"}, { status: 400});
    }

    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,rain,is_day,cloud_cover,snowfall&current=temperature_2m&timezone=auto&forecast_days=1&wind_speed_unit=ms&temperature_unit=fahrenheit&forecast_hours=12`);

    console.log("open-meteo status: ", res.status);
    if (!res.ok) {
        return Response.json({ error: "unable to call weather api"}, { status: 502});
    }

    const data = await res.json();

    return Response.json(data);
}