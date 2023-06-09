export interface User {
    accept_terms_of_service: boolean;
    affiliation: string;
    airline: string;
    api_id: string;
    app_downloaded: boolean;
    confirmation_sent_at: string | null;
    confirmation_token: string | null;
    confirmed_at: string;
    created_at: string;
    currency: string;
    date_of_hire: string | null;
    delete_requested: string | null;
    email: string;
    email_opt_out: string;
    employee_number: string;
    first_name: string;
    id: number;
    id90_user_id: number;
    identity_id: number;
    lang: string;
    last_name: string;
    member_type: string;
    mfa_skipped: string;
    organization_id: number;
    password_digest: string | null;
    password_updated_at: string;
    profile_image_url: string;
    review_denied: boolean;
    review_sent: boolean;
    state: string;
    state_changed_at: string | null;
    station: string | null;
    status: any;
    token: any;
    tutorial_shown: string;
    username: string;
    utm_campaign: any;
    utm_medium: any;
    utm_source: any;
    verification_email: string;
}
