import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  ItineraryRequest,
  Itinerary,
  UserProfile,
  UserReview,
  TravelGuide,
  EmailCapture,
  UserRole,
} from '../backend';
import type { Principal } from '@dfinity/principal';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useGetUserProfile(user: Principal) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserProfile | null>({
    queryKey: ['userProfile', user.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getUserProfile(user);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserRole>({
    queryKey: ['currentUserRole'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Itinerary Queries
export function useSubmitItineraryRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: ItineraryRequest) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitItineraryRequest(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['itineraries'] });
    },
  });
}

export function useGetItinerary(id: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Itinerary | null>({
    queryKey: ['itinerary', id],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getItinerary(id);
    },
    enabled: !!actor && !actorFetching && !!id,
  });
}

export function useGenerateShareableLink() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itineraryId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.generateShareableLink(itineraryId);
    },
    onSuccess: (_, itineraryId) => {
      queryClient.invalidateQueries({ queryKey: ['itinerary', itineraryId] });
    },
  });
}

export function useExportItineraryPdf() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (itineraryId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.exportItineraryAsPdf(itineraryId);
    },
  });
}

// Review Queries
export function useGetReviews(itemId: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserReview[]>({
    queryKey: ['reviews', itemId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getReviews(itemId);
    },
    enabled: !!actor && !actorFetching && !!itemId,
  });
}

export function useAddReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (review: UserReview) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addReview(review);
    },
    onSuccess: (_, review) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', review.associatedItem] });
    },
  });
}

// Travel Guide Queries
export function useGetTravelGuides() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TravelGuide[]>({
    queryKey: ['travelGuides'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getTravelGuides();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAddTravelGuide() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (guide: TravelGuide) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addTravelGuide(guide);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travelGuides'] });
    },
  });
}

// Email Capture
export function useCaptureEmail() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (email: EmailCapture) => {
      if (!actor) throw new Error('Actor not available');
      return actor.captureEmail(email);
    },
  });
}
