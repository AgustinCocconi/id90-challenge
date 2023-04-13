export interface Airline {
    airline_blog_uri: string;
    allowed_origins: string[];
    code: string;
    contact_email: string | null;
    contact_phone: string | null;
    currency: string;
    display_name: string;
    email_domains: string[];
    employee_number_required: boolean;
    id: number;
    is_commercial: boolean;
    lang: string;
    name: string;
    partner: boolean;
    sign_in_available: boolean;
    sign_up_available: boolean;
    white_label_url: string;
}