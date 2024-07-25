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
export const UpdateVideoDocument = gql`
    mutation UpdateVideo($data: VideoUpdateInput!, $videoId: String!) {
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