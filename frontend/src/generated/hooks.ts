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