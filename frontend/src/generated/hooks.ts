import * as generatedTypes from './types';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;

export const UserAndVideosDocument = gql`
    query UserAndVideos($id: String!) {
  user(where: {id: $id}) {
    createdAt
    email
    id
    name
    updatedAt
    auth0Id
  }
  videos(where: {Owner: {is: {id: {equals: $id}}}}) {
    nodes {
      createdAt
      description
      duration
      id
      isActive
      ownerId
      playCount
      thumbnailUrl
      title
      updatedAt
      uploadStatus
      url
      visibility
      Guests {
        id
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    totalCount
  }
}
    `;

/**
 * __useUserAndVideosQuery__
 *
 * To run a query within a React component, call `useUserAndVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAndVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAndVideosQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserAndVideosQuery(baseOptions: Apollo.QueryHookOptions<generatedTypes.UserAndVideosQuery, generatedTypes.UserAndVideosQueryVariables> & ({ variables: generatedTypes.UserAndVideosQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<generatedTypes.UserAndVideosQuery, generatedTypes.UserAndVideosQueryVariables>(UserAndVideosDocument, options);
      }
export function useUserAndVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<generatedTypes.UserAndVideosQuery, generatedTypes.UserAndVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<generatedTypes.UserAndVideosQuery, generatedTypes.UserAndVideosQueryVariables>(UserAndVideosDocument, options);
        }
export function useUserAndVideosSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<generatedTypes.UserAndVideosQuery, generatedTypes.UserAndVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<generatedTypes.UserAndVideosQuery, generatedTypes.UserAndVideosQueryVariables>(UserAndVideosDocument, options);
        }
export type UserAndVideosQueryHookResult = ReturnType<typeof useUserAndVideosQuery>;
export type UserAndVideosLazyQueryHookResult = ReturnType<typeof useUserAndVideosLazyQuery>;
export type UserAndVideosSuspenseQueryHookResult = ReturnType<typeof useUserAndVideosSuspenseQuery>;
export type UserAndVideosQueryResult = Apollo.QueryResult<generatedTypes.UserAndVideosQuery, generatedTypes.UserAndVideosQueryVariables>;
export const UploadVideoDocument = gql`
    mutation UploadVideo($file: Upload!) {
  uploadVideo(file: $file) {
    createdAt
    description
    duration
    id
    isActive
    ownerId
    playCount
    thumbnailUrl
    title
    updatedAt
    uploadStatus
    url
    visibility
  }
}
    `;
export type UploadVideoMutationFn = Apollo.MutationFunction<generatedTypes.UploadVideoMutation, generatedTypes.UploadVideoMutationVariables>;

/**
 * __useUploadVideoMutation__
 *
 * To run a mutation, you first call `useUploadVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadVideoMutation, { data, loading, error }] = useUploadVideoMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadVideoMutation(baseOptions?: Apollo.MutationHookOptions<generatedTypes.UploadVideoMutation, generatedTypes.UploadVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<generatedTypes.UploadVideoMutation, generatedTypes.UploadVideoMutationVariables>(UploadVideoDocument, options);
      }
export type UploadVideoMutationHookResult = ReturnType<typeof useUploadVideoMutation>;
export type UploadVideoMutationResult = Apollo.MutationResult<generatedTypes.UploadVideoMutation>;
export type UploadVideoMutationOptions = Apollo.BaseMutationOptions<generatedTypes.UploadVideoMutation, generatedTypes.UploadVideoMutationVariables>;
export const VideoDocument = gql`
    query Video($videoId: String!, $guestNumber: Int) {
  video(where: {id: $videoId}) {
    createdAt
    description
    duration
    id
    isActive
    ownerId
    playCount
    thumbnailUrl
    title
    updatedAt
    uploadStatus
    url
    visibility
    Guests(take: $guestNumber) {
      auth0Id
      createdAt
      email
      id
      isActive
      name
      updatedAt
    }
  }
}
    `;

/**
 * __useVideoQuery__
 *
 * To run a query within a React component, call `useVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoQuery({
 *   variables: {
 *      videoId: // value for 'videoId'
 *      guestNumber: // value for 'guestNumber'
 *   },
 * });
 */
export function useVideoQuery(baseOptions: Apollo.QueryHookOptions<generatedTypes.VideoQuery, generatedTypes.VideoQueryVariables> & ({ variables: generatedTypes.VideoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<generatedTypes.VideoQuery, generatedTypes.VideoQueryVariables>(VideoDocument, options);
      }
export function useVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<generatedTypes.VideoQuery, generatedTypes.VideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<generatedTypes.VideoQuery, generatedTypes.VideoQueryVariables>(VideoDocument, options);
        }
export function useVideoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<generatedTypes.VideoQuery, generatedTypes.VideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<generatedTypes.VideoQuery, generatedTypes.VideoQueryVariables>(VideoDocument, options);
        }
export type VideoQueryHookResult = ReturnType<typeof useVideoQuery>;
export type VideoLazyQueryHookResult = ReturnType<typeof useVideoLazyQuery>;
export type VideoSuspenseQueryHookResult = ReturnType<typeof useVideoSuspenseQuery>;
export type VideoQueryResult = Apollo.QueryResult<generatedTypes.VideoQuery, generatedTypes.VideoQueryVariables>;
export const PublicVideosDocument = gql`
    query publicVideos($cursor: VideoWhereUniqueInput, $take: Int, $skip: Int, $where: VideoWhereInput) {
  videos(cursor: $cursor, skip: $skip, take: $take, where: $where) {
    totalCount
    nodes {
      createdAt
      description
      duration
      id
      isActive
      ownerId
      playCount
      thumbnailUrl
      title
      updatedAt
      uploadStatus
      url
      visibility
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      cursor
      node {
        createdAt
        description
        duration
        id
        isActive
        ownerId
        playCount
        thumbnailUrl
        title
        updatedAt
        uploadStatus
        url
        visibility
      }
    }
  }
}
    `;

/**
 * __usePublicVideosQuery__
 *
 * To run a query within a React component, call `usePublicVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicVideosQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *   },
 * });
 */
export function usePublicVideosQuery(baseOptions?: Apollo.QueryHookOptions<generatedTypes.PublicVideosQuery, generatedTypes.PublicVideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<generatedTypes.PublicVideosQuery, generatedTypes.PublicVideosQueryVariables>(PublicVideosDocument, options);
      }
export function usePublicVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<generatedTypes.PublicVideosQuery, generatedTypes.PublicVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<generatedTypes.PublicVideosQuery, generatedTypes.PublicVideosQueryVariables>(PublicVideosDocument, options);
        }
export function usePublicVideosSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<generatedTypes.PublicVideosQuery, generatedTypes.PublicVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<generatedTypes.PublicVideosQuery, generatedTypes.PublicVideosQueryVariables>(PublicVideosDocument, options);
        }
export type PublicVideosQueryHookResult = ReturnType<typeof usePublicVideosQuery>;
export type PublicVideosLazyQueryHookResult = ReturnType<typeof usePublicVideosLazyQuery>;
export type PublicVideosSuspenseQueryHookResult = ReturnType<typeof usePublicVideosSuspenseQuery>;
export type PublicVideosQueryResult = Apollo.QueryResult<generatedTypes.PublicVideosQuery, generatedTypes.PublicVideosQueryVariables>;
export const UpdateVideoDocument = gql`
    mutation UpdateVideo($data: VideoUpdateInput!, $videoId: String!, $guestNumber: Int) {
  updateVideo(data: $data, where: {id: $videoId}) {
    createdAt
    description
    duration
    id
    isActive
    ownerId
    playCount
    thumbnailUrl
    title
    updatedAt
    uploadStatus
    url
    visibility
    Guests(take: $guestNumber) {
      auth0Id
      createdAt
      email
      id
      isActive
      name
      updatedAt
    }
  }
}
    `;
export type UpdateVideoMutationFn = Apollo.MutationFunction<generatedTypes.UpdateVideoMutation, generatedTypes.UpdateVideoMutationVariables>;

/**
 * __useUpdateVideoMutation__
 *
 * To run a mutation, you first call `useUpdateVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVideoMutation, { data, loading, error }] = useUpdateVideoMutation({
 *   variables: {
 *      data: // value for 'data'
 *      videoId: // value for 'videoId'
 *      guestNumber: // value for 'guestNumber'
 *   },
 * });
 */
export function useUpdateVideoMutation(baseOptions?: Apollo.MutationHookOptions<generatedTypes.UpdateVideoMutation, generatedTypes.UpdateVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<generatedTypes.UpdateVideoMutation, generatedTypes.UpdateVideoMutationVariables>(UpdateVideoDocument, options);
      }
export type UpdateVideoMutationHookResult = ReturnType<typeof useUpdateVideoMutation>;
export type UpdateVideoMutationResult = Apollo.MutationResult<generatedTypes.UpdateVideoMutation>;
export type UpdateVideoMutationOptions = Apollo.BaseMutationOptions<generatedTypes.UpdateVideoMutation, generatedTypes.UpdateVideoMutationVariables>;
export const DeleteVideoDocument = gql`
    mutation DeleteVideo($videoId: String!) {
  deleteVideo(where: {id: $videoId}) {
    description
    duration
    createdAt
    id
    playCount
    thumbnailUrl
    title
    updatedAt
    uploadStatus
    url
    visibility
  }
}
    `;
export type DeleteVideoMutationFn = Apollo.MutationFunction<generatedTypes.DeleteVideoMutation, generatedTypes.DeleteVideoMutationVariables>;

/**
 * __useDeleteVideoMutation__
 *
 * To run a mutation, you first call `useDeleteVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVideoMutation, { data, loading, error }] = useDeleteVideoMutation({
 *   variables: {
 *      videoId: // value for 'videoId'
 *   },
 * });
 */
export function useDeleteVideoMutation(baseOptions?: Apollo.MutationHookOptions<generatedTypes.DeleteVideoMutation, generatedTypes.DeleteVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<generatedTypes.DeleteVideoMutation, generatedTypes.DeleteVideoMutationVariables>(DeleteVideoDocument, options);
      }
export type DeleteVideoMutationHookResult = ReturnType<typeof useDeleteVideoMutation>;
export type DeleteVideoMutationResult = Apollo.MutationResult<generatedTypes.DeleteVideoMutation>;
export type DeleteVideoMutationOptions = Apollo.BaseMutationOptions<generatedTypes.DeleteVideoMutation, generatedTypes.DeleteVideoMutationVariables>;