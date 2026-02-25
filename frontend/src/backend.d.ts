import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface TransportSuggestion {
    to: string;
    from: string;
    mode: string;
    costEstimate: string;
    estimatedTime: string;
}
export interface RestaurantSuggestion {
    name: string;
    description: string;
    location: string;
    mealTime: string;
}
export interface Itinerary {
    id: string;
    days: Array<ItineraryDay>;
    request: ItineraryRequest;
    transport: Array<TransportSuggestion>;
    restaurants: Array<RestaurantSuggestion>;
    sharedLink?: string;
}
export interface ItineraryRequest {
    id: string;
    destination: string;
    interests: Array<string>;
    createdBy: Principal;
    travelDates: {
        end: string;
        start: string;
    };
    budgetTier: string;
}
export interface EmailCapture {
    interests: Array<string>;
    email: string;
    requestedDate: string;
}
export interface ItineraryDay {
    morning: Array<Activity>;
    evening: Array<Activity>;
    afternoon: Array<Activity>;
}
export interface Activity {
    name: string;
    type: string;
    description: string;
    location: string;
}
export interface UserReview {
    associatedItem: string;
    user: Principal;
    author: Principal;
    comment: string;
    rating?: bigint;
}
export interface TravelGuide {
    id: string;
    title: string;
    exampleItineraries: Array<Itinerary>;
    description: string;
    season?: string;
}
export interface UserProfile {
    name: string;
    subscriptionTier: string;
    email?: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addReview(review: UserReview): Promise<void>;
    addTravelGuide(guide: TravelGuide): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    captureEmail(email: EmailCapture): Promise<void>;
    exportItineraryAsPdf(id: string): Promise<ExternalBlob | null>;
    generateShareableLink(id: string): Promise<string>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getEmailCaptures(): Promise<Array<EmailCapture>>;
    getItinerariesByDestination(destination: string): Promise<Array<Itinerary>>;
    getItinerary(id: string): Promise<Itinerary | null>;
    getReviews(item: string): Promise<Array<UserReview>>;
    getTravelGuides(): Promise<Array<TravelGuide>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitItineraryRequest(request: ItineraryRequest): Promise<string>;
}
