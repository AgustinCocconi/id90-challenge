export interface Location {
    city: string;
    country: string;
    state: string | null;
    region: string | null;
    latitude: number;
    longitude: number;
    description: string | null;
}

export interface Promotion {
    key: string;
    type: string;
    name: string;
    message: string;
    discountPromotion: boolean;
}

export interface Feature {
    booking_count: number;
    latest_booking_date: string;
    viewing_count: number;
    latest_viewing_date: string;
    conversion_score: number;
    ranking_score: number;
    revenue_score: number;
    geography_score: number;
    position_score_adjustment: number;
}

export interface PropertyRating {
    type: string;
    value: number;
    provider: string;
}

export interface GuestRating {
    count: number;
    overall: number;
    overallCategory: string;
    provider: string;
}

export interface Ratings {
    property: {
        overallRating: PropertyRating;
        ratings: PropertyRating[];
    };
    guest: {
        overallRating: GuestRating;
        ratings: GuestRating[];
    };
}

export interface AccommodationType {
    id: number;
    type: string;
}

export interface OtherSitesPrices {
    EPS: number;
    PCN: number;
}

export interface Hotel {
    id: string;
    name: string;
    location: Location;
    chain: string;
    subtotal: number | null;
    checkin: string;
    checkout: string;
    promotions: Promotion[];
    feature: Feature;
    amenities: number[];
    nights: number;
    position: number;
    id90: string;
    displayable_id: string;
    ratings: Ratings;
    star_rating: number;
    review_rating: number;
    display_rate: number;
    display_rate_with_promo: number | null;
    total: number;
    image: string;
    images: string[];
    description: string | null;
    location_description: string | null;
    discount_promotion: string | null;
    accommodation_type: AccommodationType;
    neighborhood_ids: number[];
    retail_rate: number;
    savings_amount: number;
    savings_percent: number;
    other_sites_prices: OtherSitesPrices;
    distance: number;
    distance_to_airport: number | null;
    distance_to_airports: {
        [key: string]: number | null;
    };
}
