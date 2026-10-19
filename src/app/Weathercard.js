import Image from 'next/image'


function Weathercard({data}) {
    console.log(data)
    const temperature = data[0];
    const day = data[1];
    const rain = data[2];
    const cloudy = data[3];


    function icon() {
        if (temperature < 32) {
            return `❄️`;
        } else {

            if (rain > 0) {
                return `🌧️`;
            }
            if (cloudy > 87) {
                return `☁️`;
            }

            if (day) {
                return `☀️`;
            } else {
                return `🌑`;
            }
        }
    }

    return (
        <div className = "card">
            <h1 id = "img">{icon()}</h1>
            <h2 id = "temp">{Math.round(temperature)}°</h2>
        </div>
    )
}

export default Weathercard;