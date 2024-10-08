interface GeoData {
    geo_lat: string;
    geo_lon: string;
    city_with_type: string;
    settlement_with_type?: string;
    region_with_type: string;
    area_with_type?: string;
    capital_marker?: string;
}

interface Suggestion {
    value: string;
    data: GeoData;
}

interface Location {
    name: string;
    geo: GeoData & { name: string };
}

export default async function getPossibleLocations(value: string): Promise<Location[] | undefined> {
    if (value.trim().length < 3)
        return;

    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";

    const options: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${import.meta.env.VITE_DADATA_TOKEN}`
        },
        body: JSON.stringify({
            query: value,
            count: 10,
            from_bound: { value: "city" },
            to_bound: { value: "house" }
        })
    };

    let res: Response = await fetch(url, options);

    try {
        let suggestions: Suggestion[] = JSON.parse(await res.text()).suggestions;

        return suggestions.map((s: Suggestion) => ({
            name: s.value,
            geo: {
                name: s.value,
                geo_lat: s.data.geo_lat,
                geo_lon: s.data.geo_lon,
                city_with_type: s.data.city_with_type,
                settlement_with_type: s.data.settlement_with_type,
                region_with_type: s.data.region_with_type,
                area_with_type: s.data.area_with_type,
                capital_marker: s.data.capital_marker
            }
        }));
    } catch (error) {
        console.log(error);
    }
}