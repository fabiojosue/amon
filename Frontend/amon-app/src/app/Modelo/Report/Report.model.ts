export interface Report {
    _id: number;
    location: {
        _id: number;
        latitude: number;
        longitude: number;
    }
    type: {
        _id: number;
        name: string;
        weight: number;
    }
    registerDate: String;

}