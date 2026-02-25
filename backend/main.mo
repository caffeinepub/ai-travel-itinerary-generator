import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import List "mo:core/List";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type UserProfile = {
    name : Text;
    email : ?Text;
    subscriptionTier : Text; // "free", "premium"
  };

  public type ItineraryRequest = {
    id : Text;
    destination : Text;
    travelDates : {
      start : Text;
      end : Text;
    };
    interests : [Text];
    budgetTier : Text;
    createdBy : Principal;
  };

  public type ItineraryDay = {
    morning : [Activity];
    afternoon : [Activity];
    evening : [Activity];
  };

  public type Activity = {
    name : Text;
    description : Text;
    location : Text;
    type_ : Text;
  };

  public type RestaurantSuggestion = {
    name : Text;
    description : Text;
    mealTime : Text;
    location : Text;
  };

  public type TransportSuggestion = {
    from : Text;
    to : Text;
    mode : Text;
    estimatedTime : Text;
    costEstimate : Text;
  };

  public type Itinerary = {
    id : Text;
    request : ItineraryRequest;
    days : [ItineraryDay];
    restaurants : [RestaurantSuggestion];
    transport : [TransportSuggestion];
    sharedLink : ?Text;
  };

  public type UserReview = {
    user : Principal;
    author : Principal;
    comment : Text;
    rating : ?Nat;
    associatedItem : Text;
  };

  public type TravelGuide = {
    id : Text;
    title : Text;
    season : ?Text;
    description : Text;
    exampleItineraries : [Itinerary];
  };

  public type EmailCapture = {
    email : Text;
    interests : [Text];
    requestedDate : Text;
  };

  module ItineraryRequest {
    public func compare(a : ItineraryRequest, b : ItineraryRequest) : Order.Order {
      Text.compare(a.destination, b.destination);
    };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let itineraries = Map.empty<Text, Itinerary>();
  let reviews = Map.empty<Text, UserReview>();
  let travelGuides = Map.empty<Text, TravelGuide>();
  var emailCaptures = List.empty<EmailCapture>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Itinerary Management
  public shared ({ caller }) func submitItineraryRequest(request : ItineraryRequest) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can submit itinerary requests");
    };

    // Verify the caller is the creator
    if (request.createdBy != caller) {
      Runtime.trap("Unauthorized: Cannot create itinerary for another user");
    };

    itineraries.add(request.id, {
      id = request.id;
      request;
      days = [];
      restaurants = [];
      transport = [];
      sharedLink = null;
    });
    request.id;
  };

  public query ({ caller }) func getItinerary(id : Text) : async ?Itinerary {
    switch (itineraries.get(id)) {
      case (null) { null };
      case (?itinerary) {
        // Allow access if: owner, admin, or itinerary is shared
        let isOwner = itinerary.request.createdBy == caller;
        let isAdmin = AccessControl.isAdmin(accessControlState, caller);
        let isShared = switch (itinerary.sharedLink) {
          case (null) { false };
          case (?_) { true };
        };

        if (isOwner or isAdmin or isShared) {
          ?itinerary;
        } else {
          Runtime.trap("Unauthorized: Cannot access this itinerary");
        };
      };
    };
  };

  public query ({ caller }) func getItinerariesByDestination(destination : Text) : async [Itinerary] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can search itineraries");
    };

    let isAdmin = AccessControl.isAdmin(accessControlState, caller);

    // Filter to only show caller's own itineraries or shared ones (unless admin)
    let filtered = itineraries.values().filter(
      func(i) {
        i.request.destination == destination and (
          i.request.createdBy == caller or
          isAdmin or
          (switch (i.sharedLink) { case (null) { false }; case (?_) { true } })
        )
      }
    );
    filtered.toArray();
  };

  public shared ({ caller }) func generateShareableLink(id : Text) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can generate shareable links");
    };

    switch (itineraries.get(id)) {
      case (null) { Runtime.trap("Itinerary not found") };
      case (?existingItinerary) {
        // Verify ownership
        if (existingItinerary.request.createdBy != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only share your own itineraries");
        };

        let link = id.concat("-xd37");
        let updatedItinerary : Itinerary = {
          existingItinerary with sharedLink = ?link
        };
        itineraries.add(id, updatedItinerary);
        link;
      };
    };
  };

  public shared ({ caller }) func exportItineraryAsPdf(id : Text) : async ?Storage.ExternalBlob {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can export itineraries");
    };

    // Check premium subscription
    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?profile) {
        if (profile.subscriptionTier != "premium" and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Premium subscription required for PDF export");
        };
      };
    };

    switch (itineraries.get(id)) {
      case (null) { Runtime.trap("Itinerary not found") };
      case (?itinerary) {
        // Verify ownership
        if (itinerary.request.createdBy != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only export your own itineraries");
        };

        Runtime.trap("PDF export functionality not implemented");
      };
    };
  };

  // Reviews
  public shared ({ caller }) func addReview(review : UserReview) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can add reviews");
    };

    // Verify the caller is the author
    if (review.author != caller) {
      Runtime.trap("Unauthorized: Cannot create review for another user");
    };

    let reviewId = review.associatedItem.concat(caller.toText());
    reviews.add(reviewId, review);
  };

  public query ({ caller }) func getReviews(item : Text) : async [UserReview] {
    // Public access - anyone can read reviews
    let filtered = reviews.values().filter(
      func(r) { r.associatedItem == item }
    );
    filtered.toArray();
  };

  // Travel Guides
  public shared ({ caller }) func addTravelGuide(guide : TravelGuide) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add travel guides");
    };
    travelGuides.add(guide.id, guide);
  };

  public query ({ caller }) func getTravelGuides() : async [TravelGuide] {
    // Public access - showcased on homepage
    travelGuides.values().toArray();
  };

  // Email Capture
  public shared ({ caller }) func captureEmail(email : EmailCapture) : async () {
    // Allow guests to capture emails (no auth check)
    // Basic validation
    if (email.email.size() == 0) {
      Runtime.trap("Invalid email address");
    };
    emailCaptures.add(email);
  };

  public query ({ caller }) func getEmailCaptures() : async [EmailCapture] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view email captures");
    };
    emailCaptures.toArray();
  };
};
