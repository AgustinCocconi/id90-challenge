export interface GetHotelsParams {
    guests: number[];
    checkin: string;
    checkout: string;
    destination: string;
    keyword: string;
    rooms: number;
    longitude?: number;
    latitude?: number;
    sort_criteria: string;
    sort_order: string;
    per_page: number;
    page: number;
    currency: string;
    price_low?: number;
    price_high?: number;
}
