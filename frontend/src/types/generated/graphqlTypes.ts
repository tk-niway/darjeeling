import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type EnumvideoUploadStatusFieldUpdateOperationsInput = {
  set?: InputMaybe<VideoUploadStatus>;
};

export type EnumvideoUploadStatusFilter = {
  equals?: InputMaybe<VideoUploadStatus>;
  in?: InputMaybe<Array<VideoUploadStatus>>;
  not?: InputMaybe<NestedEnumvideoUploadStatusFilter>;
  notIn?: InputMaybe<Array<VideoUploadStatus>>;
};

export type EnumvideoVisibilityFieldUpdateOperationsInput = {
  set?: InputMaybe<VideoVisibility>;
};

export type EnumvideoVisibilityFilter = {
  equals?: InputMaybe<VideoVisibility>;
  in?: InputMaybe<Array<VideoVisibility>>;
  not?: InputMaybe<NestedEnumvideoVisibilityFilter>;
  notIn?: InputMaybe<Array<VideoVisibility>>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  divide?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  multiply?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a user */
  createUser: UserModel;
  /** Delete a user */
  deleteUser: UserModel;
  /** Delete a video */
  deleteVideo: Scalars['Boolean']['output'];
  signup: UserWithError;
  /** Update a user */
  updateUser: UserModel;
  /** Update a video */
  updateVideo: VideoModel;
  /** Upload a video */
  uploadVideo: VideoModel;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteVideoArgs = {
  where: VideoWhereUniqueInput;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateVideoArgs = {
  data: VideoUpdateInput;
  where: VideoWhereUniqueInput;
};


export type MutationUploadVideoArgs = {
  file: Scalars['Upload']['input'];
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedEnumvideoUploadStatusFilter = {
  equals?: InputMaybe<VideoUploadStatus>;
  in?: InputMaybe<Array<VideoUploadStatus>>;
  not?: InputMaybe<NestedEnumvideoUploadStatusFilter>;
  notIn?: InputMaybe<Array<VideoUploadStatus>>;
};

export type NestedEnumvideoVisibilityFilter = {
  equals?: InputMaybe<VideoVisibility>;
  in?: InputMaybe<Array<VideoVisibility>>;
  not?: InputMaybe<NestedEnumvideoVisibilityFilter>;
  notIn?: InputMaybe<Array<VideoVisibility>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NullableIntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  divide?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  multiply?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export enum NullsOrder {
  First = 'first',
  Last = 'last'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

export type PaginatedUser = {
  __typename?: 'PaginatedUser';
  edges?: Maybe<Array<UserModelEdge>>;
  nodes?: Maybe<Array<UserModel>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PaginatedVideo = {
  __typename?: 'PaginatedVideo';
  edges?: Maybe<Array<VideoModelEdge>>;
  nodes?: Maybe<Array<VideoModel>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  signin: UserWithError;
  /** Find a user by id or email */
  user: UserModel;
  /** Find all users */
  users: PaginatedUser;
  /** Get a video by ID */
  video: VideoModel;
  /** Get all videos */
  videos: PaginatedVideo;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryVideoArgs = {
  where: VideoWhereUniqueInput;
};


export type QueryVideosArgs = {
  cursor?: InputMaybe<VideoWhereUniqueInput>;
  distinct?: InputMaybe<Array<VideoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VideoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<VideoWhereInput>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type SortOrderInput = {
  nulls?: InputMaybe<NullsOrder>;
  sort: SortOrder;
};

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  auth0Id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  invitedVideos?: Maybe<Array<Video>>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  ownVideos?: Maybe<Array<Video>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserCount = {
  __typename?: 'UserCount';
  invitedVideos: Scalars['Int']['output'];
  ownVideos: Scalars['Int']['output'];
};

export type UserCreateInput = {
  auth0Id: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  invitedVideos?: InputMaybe<VideoCreateNestedManyWithoutGuestsInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  ownVideos?: InputMaybe<VideoCreateNestedManyWithoutOwnerInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateNestedManyWithoutInvitedVideosInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutInvitedVideosInput>>;
  create?: InputMaybe<Array<UserCreateWithoutInvitedVideosInput>>;
};

export type UserCreateNestedOneWithoutOwnVideosInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutOwnVideosInput>;
  create?: InputMaybe<UserCreateWithoutOwnVideosInput>;
};

export type UserCreateOrConnectWithoutInvitedVideosInput = {
  create: UserCreateWithoutInvitedVideosInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutOwnVideosInput = {
  create: UserCreateWithoutOwnVideosInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutInvitedVideosInput = {
  auth0Id: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  ownVideos?: InputMaybe<VideoCreateNestedManyWithoutOwnerInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateWithoutOwnVideosInput = {
  auth0Id: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  invitedVideos?: InputMaybe<VideoCreateNestedManyWithoutGuestsInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserError = {
  __typename?: 'UserError';
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type UserListRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserModel = {
  __typename?: 'UserModel';
  /** Videos where the user is a guest */
  InvitedVideos?: Maybe<Array<VideoModel>>;
  /** Videos where the user is the owner */
  OwnVideos?: Maybe<Array<VideoModel>>;
  auth0Id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type UserModelInvitedVideosArgs = {
  cursor?: InputMaybe<VideoWhereUniqueInput>;
  distinct?: InputMaybe<Array<VideoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VideoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<VideoWhereInput>;
};


export type UserModelOwnVideosArgs = {
  cursor?: InputMaybe<VideoWhereUniqueInput>;
  distinct?: InputMaybe<Array<VideoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VideoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<VideoWhereInput>;
};

export type UserModelEdge = {
  __typename?: 'UserModelEdge';
  cursor: Scalars['String']['output'];
  node: UserModel;
};

export type UserOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserOrderByWithRelationInput = {
  auth0Id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  invitedVideos?: InputMaybe<VideoOrderByRelationAggregateInput>;
  isActive?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  ownVideos?: InputMaybe<VideoOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export enum UserScalarFieldEnum {
  Auth0Id = 'auth0Id',
  CreatedAt = 'createdAt',
  Email = 'email',
  Id = 'id',
  IsActive = 'isActive',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type UserScalarWhereInput = {
  AND?: InputMaybe<Array<UserScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereInput>>;
  OR?: InputMaybe<Array<UserScalarWhereInput>>;
  auth0Id?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserUpdateInput = {
  auth0Id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  invitedVideos?: InputMaybe<VideoUpdateManyWithoutGuestsNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  ownVideos?: InputMaybe<VideoUpdateManyWithoutOwnerNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateManyMutationInput = {
  auth0Id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateManyWithWhereWithoutInvitedVideosInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithoutInvitedVideosNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutInvitedVideosInput>>;
  create?: InputMaybe<Array<UserCreateWithoutInvitedVideosInput>>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutInvitedVideosInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutInvitedVideosInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutInvitedVideosInput>>;
};

export type UserUpdateOneRequiredWithoutOwnVideosNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutOwnVideosInput>;
  create?: InputMaybe<UserCreateWithoutOwnVideosInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutOwnVideosInput>;
  upsert?: InputMaybe<UserUpsertWithoutOwnVideosInput>;
};

export type UserUpdateToOneWithWhereWithoutOwnVideosInput = {
  data: UserUpdateWithoutOwnVideosInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateWithWhereUniqueWithoutInvitedVideosInput = {
  data: UserUpdateWithoutInvitedVideosInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithoutInvitedVideosInput = {
  auth0Id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  ownVideos?: InputMaybe<VideoUpdateManyWithoutOwnerNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutOwnVideosInput = {
  auth0Id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  invitedVideos?: InputMaybe<VideoUpdateManyWithoutGuestsNestedInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserUpsertWithWhereUniqueWithoutInvitedVideosInput = {
  create: UserCreateWithoutInvitedVideosInput;
  update: UserUpdateWithoutInvitedVideosInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithoutOwnVideosInput = {
  create: UserCreateWithoutOwnVideosInput;
  update: UserUpdateWithoutOwnVideosInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  auth0Id?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  invitedVideos?: InputMaybe<VideoListRelationFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  ownVideos?: InputMaybe<VideoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  auth0Id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  invitedVideos?: InputMaybe<VideoListRelationFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  ownVideos?: InputMaybe<VideoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserWithError = {
  __typename?: 'UserWithError';
  user?: Maybe<UserModel>;
  userErrors?: Maybe<Array<UserError>>;
};

export type Video = {
  __typename?: 'Video';
  Owner: User;
  _count: VideoCount;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  guests?: Maybe<Array<User>>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  ownerId: Scalars['String']['output'];
  playCount: Scalars['Int']['output'];
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uploadStatus: VideoUploadStatus;
  url?: Maybe<Scalars['String']['output']>;
  visibility: VideoVisibility;
};

export type VideoCount = {
  __typename?: 'VideoCount';
  guests: Scalars['Int']['output'];
};

export type VideoCreateManyOwnerInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  playCount?: InputMaybe<Scalars['Int']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uploadStatus?: InputMaybe<VideoUploadStatus>;
  url?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<VideoVisibility>;
};

export type VideoCreateManyOwnerInputEnvelope = {
  data: Array<VideoCreateManyOwnerInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VideoCreateNestedManyWithoutGuestsInput = {
  connect?: InputMaybe<Array<VideoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VideoCreateOrConnectWithoutGuestsInput>>;
  create?: InputMaybe<Array<VideoCreateWithoutGuestsInput>>;
};

export type VideoCreateNestedManyWithoutOwnerInput = {
  connect?: InputMaybe<Array<VideoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VideoCreateOrConnectWithoutOwnerInput>>;
  create?: InputMaybe<Array<VideoCreateWithoutOwnerInput>>;
  createMany?: InputMaybe<VideoCreateManyOwnerInputEnvelope>;
};

export type VideoCreateOrConnectWithoutGuestsInput = {
  create: VideoCreateWithoutGuestsInput;
  where: VideoWhereUniqueInput;
};

export type VideoCreateOrConnectWithoutOwnerInput = {
  create: VideoCreateWithoutOwnerInput;
  where: VideoWhereUniqueInput;
};

export type VideoCreateWithoutGuestsInput = {
  Owner: UserCreateNestedOneWithoutOwnVideosInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  playCount?: InputMaybe<Scalars['Int']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uploadStatus?: InputMaybe<VideoUploadStatus>;
  url?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<VideoVisibility>;
};

export type VideoCreateWithoutOwnerInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  guests?: InputMaybe<UserCreateNestedManyWithoutInvitedVideosInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  playCount?: InputMaybe<Scalars['Int']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  uploadStatus?: InputMaybe<VideoUploadStatus>;
  url?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<VideoVisibility>;
};

export type VideoListRelationFilter = {
  every?: InputMaybe<VideoWhereInput>;
  none?: InputMaybe<VideoWhereInput>;
  some?: InputMaybe<VideoWhereInput>;
};

export type VideoModel = {
  __typename?: 'VideoModel';
  /** Guests of the video */
  Guests: Array<UserModel>;
  /** Owner of the video */
  Owner: UserModel;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  ownerId: Scalars['String']['output'];
  playCount: Scalars['Int']['output'];
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uploadStatus: VideoUploadStatus;
  url?: Maybe<Scalars['String']['output']>;
  visibility: VideoVisibility;
};


export type VideoModelGuestsArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};

export type VideoModelEdge = {
  __typename?: 'VideoModelEdge';
  cursor: Scalars['String']['output'];
  node: VideoModel;
};

export type VideoOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type VideoOrderByWithRelationInput = {
  Owner?: InputMaybe<UserOrderByWithRelationInput>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrderInput>;
  duration?: InputMaybe<SortOrderInput>;
  guests?: InputMaybe<UserOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  ownerId?: InputMaybe<SortOrder>;
  playCount?: InputMaybe<SortOrder>;
  thumbnailUrl?: InputMaybe<SortOrderInput>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uploadStatus?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrderInput>;
  visibility?: InputMaybe<SortOrder>;
};

export enum VideoScalarFieldEnum {
  CreatedAt = 'createdAt',
  Description = 'description',
  Duration = 'duration',
  Id = 'id',
  IsActive = 'isActive',
  OwnerId = 'ownerId',
  PlayCount = 'playCount',
  ThumbnailUrl = 'thumbnailUrl',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  UploadStatus = 'uploadStatus',
  Url = 'url',
  Visibility = 'visibility'
}

export type VideoScalarWhereInput = {
  AND?: InputMaybe<Array<VideoScalarWhereInput>>;
  NOT?: InputMaybe<Array<VideoScalarWhereInput>>;
  OR?: InputMaybe<Array<VideoScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  duration?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  ownerId?: InputMaybe<StringFilter>;
  playCount?: InputMaybe<IntFilter>;
  thumbnailUrl?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploadStatus?: InputMaybe<EnumvideoUploadStatusFilter>;
  url?: InputMaybe<StringNullableFilter>;
  visibility?: InputMaybe<EnumvideoVisibilityFilter>;
};

export type VideoUpdateInput = {
  Owner?: InputMaybe<UserUpdateOneRequiredWithoutOwnVideosNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  guests?: InputMaybe<UserUpdateManyWithoutInvitedVideosNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  playCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  thumbnailUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploadStatus?: InputMaybe<EnumvideoUploadStatusFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  visibility?: InputMaybe<EnumvideoVisibilityFieldUpdateOperationsInput>;
};

export type VideoUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  playCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  thumbnailUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploadStatus?: InputMaybe<EnumvideoUploadStatusFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  visibility?: InputMaybe<EnumvideoVisibilityFieldUpdateOperationsInput>;
};

export type VideoUpdateManyWithWhereWithoutGuestsInput = {
  data: VideoUpdateManyMutationInput;
  where: VideoScalarWhereInput;
};

export type VideoUpdateManyWithWhereWithoutOwnerInput = {
  data: VideoUpdateManyMutationInput;
  where: VideoScalarWhereInput;
};

export type VideoUpdateManyWithoutGuestsNestedInput = {
  connect?: InputMaybe<Array<VideoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VideoCreateOrConnectWithoutGuestsInput>>;
  create?: InputMaybe<Array<VideoCreateWithoutGuestsInput>>;
  delete?: InputMaybe<Array<VideoWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<VideoScalarWhereInput>>;
  disconnect?: InputMaybe<Array<VideoWhereUniqueInput>>;
  set?: InputMaybe<Array<VideoWhereUniqueInput>>;
  update?: InputMaybe<Array<VideoUpdateWithWhereUniqueWithoutGuestsInput>>;
  updateMany?: InputMaybe<Array<VideoUpdateManyWithWhereWithoutGuestsInput>>;
  upsert?: InputMaybe<Array<VideoUpsertWithWhereUniqueWithoutGuestsInput>>;
};

export type VideoUpdateManyWithoutOwnerNestedInput = {
  connect?: InputMaybe<Array<VideoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VideoCreateOrConnectWithoutOwnerInput>>;
  create?: InputMaybe<Array<VideoCreateWithoutOwnerInput>>;
  createMany?: InputMaybe<VideoCreateManyOwnerInputEnvelope>;
  delete?: InputMaybe<Array<VideoWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<VideoScalarWhereInput>>;
  disconnect?: InputMaybe<Array<VideoWhereUniqueInput>>;
  set?: InputMaybe<Array<VideoWhereUniqueInput>>;
  update?: InputMaybe<Array<VideoUpdateWithWhereUniqueWithoutOwnerInput>>;
  updateMany?: InputMaybe<Array<VideoUpdateManyWithWhereWithoutOwnerInput>>;
  upsert?: InputMaybe<Array<VideoUpsertWithWhereUniqueWithoutOwnerInput>>;
};

export type VideoUpdateWithWhereUniqueWithoutGuestsInput = {
  data: VideoUpdateWithoutGuestsInput;
  where: VideoWhereUniqueInput;
};

export type VideoUpdateWithWhereUniqueWithoutOwnerInput = {
  data: VideoUpdateWithoutOwnerInput;
  where: VideoWhereUniqueInput;
};

export type VideoUpdateWithoutGuestsInput = {
  Owner?: InputMaybe<UserUpdateOneRequiredWithoutOwnVideosNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  playCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  thumbnailUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploadStatus?: InputMaybe<EnumvideoUploadStatusFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  visibility?: InputMaybe<EnumvideoVisibilityFieldUpdateOperationsInput>;
};

export type VideoUpdateWithoutOwnerInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  duration?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  guests?: InputMaybe<UserUpdateManyWithoutInvitedVideosNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isActive?: InputMaybe<BoolFieldUpdateOperationsInput>;
  playCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  thumbnailUrl?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploadStatus?: InputMaybe<EnumvideoUploadStatusFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  visibility?: InputMaybe<EnumvideoVisibilityFieldUpdateOperationsInput>;
};

export type VideoUpsertWithWhereUniqueWithoutGuestsInput = {
  create: VideoCreateWithoutGuestsInput;
  update: VideoUpdateWithoutGuestsInput;
  where: VideoWhereUniqueInput;
};

export type VideoUpsertWithWhereUniqueWithoutOwnerInput = {
  create: VideoCreateWithoutOwnerInput;
  update: VideoUpdateWithoutOwnerInput;
  where: VideoWhereUniqueInput;
};

export type VideoWhereInput = {
  AND?: InputMaybe<Array<VideoWhereInput>>;
  NOT?: InputMaybe<Array<VideoWhereInput>>;
  OR?: InputMaybe<Array<VideoWhereInput>>;
  Owner?: InputMaybe<UserRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  duration?: InputMaybe<IntNullableFilter>;
  guests?: InputMaybe<UserListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  ownerId?: InputMaybe<StringFilter>;
  playCount?: InputMaybe<IntFilter>;
  thumbnailUrl?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploadStatus?: InputMaybe<EnumvideoUploadStatusFilter>;
  url?: InputMaybe<StringNullableFilter>;
  visibility?: InputMaybe<EnumvideoVisibilityFilter>;
};

export type VideoWhereUniqueInput = {
  AND?: InputMaybe<Array<VideoWhereInput>>;
  NOT?: InputMaybe<Array<VideoWhereInput>>;
  OR?: InputMaybe<Array<VideoWhereInput>>;
  Owner?: InputMaybe<UserRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  duration?: InputMaybe<IntNullableFilter>;
  guests?: InputMaybe<UserListRelationFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<BoolFilter>;
  ownerId?: InputMaybe<StringFilter>;
  playCount?: InputMaybe<IntFilter>;
  thumbnailUrl?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploadStatus?: InputMaybe<EnumvideoUploadStatusFilter>;
  url?: InputMaybe<StringNullableFilter>;
  visibility?: InputMaybe<EnumvideoVisibilityFilter>;
};

export enum VideoUploadStatus {
  Completed = 'completed',
  Failed = 'failed',
  Pending = 'pending',
  Processing = 'processing'
}

export enum VideoVisibility {
  Limited = 'limited',
  Private = 'private',
  Public = 'public'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BoolFieldUpdateOperationsInput: BoolFieldUpdateOperationsInput;
  BoolFilter: BoolFilter;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DateTimeFieldUpdateOperationsInput: DateTimeFieldUpdateOperationsInput;
  DateTimeFilter: DateTimeFilter;
  EnumvideoUploadStatusFieldUpdateOperationsInput: EnumvideoUploadStatusFieldUpdateOperationsInput;
  EnumvideoUploadStatusFilter: EnumvideoUploadStatusFilter;
  EnumvideoVisibilityFieldUpdateOperationsInput: EnumvideoVisibilityFieldUpdateOperationsInput;
  EnumvideoVisibilityFilter: EnumvideoVisibilityFilter;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  IntFieldUpdateOperationsInput: IntFieldUpdateOperationsInput;
  IntFilter: IntFilter;
  IntNullableFilter: IntNullableFilter;
  Mutation: ResolverTypeWrapper<{}>;
  NestedBoolFilter: NestedBoolFilter;
  NestedDateTimeFilter: NestedDateTimeFilter;
  NestedEnumvideoUploadStatusFilter: NestedEnumvideoUploadStatusFilter;
  NestedEnumvideoVisibilityFilter: NestedEnumvideoVisibilityFilter;
  NestedIntFilter: NestedIntFilter;
  NestedIntNullableFilter: NestedIntNullableFilter;
  NestedStringFilter: NestedStringFilter;
  NestedStringNullableFilter: NestedStringNullableFilter;
  NullableIntFieldUpdateOperationsInput: NullableIntFieldUpdateOperationsInput;
  NullableStringFieldUpdateOperationsInput: NullableStringFieldUpdateOperationsInput;
  NullsOrder: NullsOrder;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PaginatedUser: ResolverTypeWrapper<PaginatedUser>;
  PaginatedVideo: ResolverTypeWrapper<PaginatedVideo>;
  Query: ResolverTypeWrapper<{}>;
  SortOrder: SortOrder;
  SortOrderInput: SortOrderInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringFieldUpdateOperationsInput: StringFieldUpdateOperationsInput;
  StringFilter: StringFilter;
  StringNullableFilter: StringNullableFilter;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  UserCount: ResolverTypeWrapper<UserCount>;
  UserCreateInput: UserCreateInput;
  UserCreateNestedManyWithoutInvitedVideosInput: UserCreateNestedManyWithoutInvitedVideosInput;
  UserCreateNestedOneWithoutOwnVideosInput: UserCreateNestedOneWithoutOwnVideosInput;
  UserCreateOrConnectWithoutInvitedVideosInput: UserCreateOrConnectWithoutInvitedVideosInput;
  UserCreateOrConnectWithoutOwnVideosInput: UserCreateOrConnectWithoutOwnVideosInput;
  UserCreateWithoutInvitedVideosInput: UserCreateWithoutInvitedVideosInput;
  UserCreateWithoutOwnVideosInput: UserCreateWithoutOwnVideosInput;
  UserError: ResolverTypeWrapper<UserError>;
  UserListRelationFilter: UserListRelationFilter;
  UserModel: ResolverTypeWrapper<UserModel>;
  UserModelEdge: ResolverTypeWrapper<UserModelEdge>;
  UserOrderByRelationAggregateInput: UserOrderByRelationAggregateInput;
  UserOrderByWithRelationInput: UserOrderByWithRelationInput;
  UserRelationFilter: UserRelationFilter;
  UserScalarFieldEnum: UserScalarFieldEnum;
  UserScalarWhereInput: UserScalarWhereInput;
  UserUpdateInput: UserUpdateInput;
  UserUpdateManyMutationInput: UserUpdateManyMutationInput;
  UserUpdateManyWithWhereWithoutInvitedVideosInput: UserUpdateManyWithWhereWithoutInvitedVideosInput;
  UserUpdateManyWithoutInvitedVideosNestedInput: UserUpdateManyWithoutInvitedVideosNestedInput;
  UserUpdateOneRequiredWithoutOwnVideosNestedInput: UserUpdateOneRequiredWithoutOwnVideosNestedInput;
  UserUpdateToOneWithWhereWithoutOwnVideosInput: UserUpdateToOneWithWhereWithoutOwnVideosInput;
  UserUpdateWithWhereUniqueWithoutInvitedVideosInput: UserUpdateWithWhereUniqueWithoutInvitedVideosInput;
  UserUpdateWithoutInvitedVideosInput: UserUpdateWithoutInvitedVideosInput;
  UserUpdateWithoutOwnVideosInput: UserUpdateWithoutOwnVideosInput;
  UserUpsertWithWhereUniqueWithoutInvitedVideosInput: UserUpsertWithWhereUniqueWithoutInvitedVideosInput;
  UserUpsertWithoutOwnVideosInput: UserUpsertWithoutOwnVideosInput;
  UserWhereInput: UserWhereInput;
  UserWhereUniqueInput: UserWhereUniqueInput;
  UserWithError: ResolverTypeWrapper<UserWithError>;
  Video: ResolverTypeWrapper<Video>;
  VideoCount: ResolverTypeWrapper<VideoCount>;
  VideoCreateManyOwnerInput: VideoCreateManyOwnerInput;
  VideoCreateManyOwnerInputEnvelope: VideoCreateManyOwnerInputEnvelope;
  VideoCreateNestedManyWithoutGuestsInput: VideoCreateNestedManyWithoutGuestsInput;
  VideoCreateNestedManyWithoutOwnerInput: VideoCreateNestedManyWithoutOwnerInput;
  VideoCreateOrConnectWithoutGuestsInput: VideoCreateOrConnectWithoutGuestsInput;
  VideoCreateOrConnectWithoutOwnerInput: VideoCreateOrConnectWithoutOwnerInput;
  VideoCreateWithoutGuestsInput: VideoCreateWithoutGuestsInput;
  VideoCreateWithoutOwnerInput: VideoCreateWithoutOwnerInput;
  VideoListRelationFilter: VideoListRelationFilter;
  VideoModel: ResolverTypeWrapper<VideoModel>;
  VideoModelEdge: ResolverTypeWrapper<VideoModelEdge>;
  VideoOrderByRelationAggregateInput: VideoOrderByRelationAggregateInput;
  VideoOrderByWithRelationInput: VideoOrderByWithRelationInput;
  VideoScalarFieldEnum: VideoScalarFieldEnum;
  VideoScalarWhereInput: VideoScalarWhereInput;
  VideoUpdateInput: VideoUpdateInput;
  VideoUpdateManyMutationInput: VideoUpdateManyMutationInput;
  VideoUpdateManyWithWhereWithoutGuestsInput: VideoUpdateManyWithWhereWithoutGuestsInput;
  VideoUpdateManyWithWhereWithoutOwnerInput: VideoUpdateManyWithWhereWithoutOwnerInput;
  VideoUpdateManyWithoutGuestsNestedInput: VideoUpdateManyWithoutGuestsNestedInput;
  VideoUpdateManyWithoutOwnerNestedInput: VideoUpdateManyWithoutOwnerNestedInput;
  VideoUpdateWithWhereUniqueWithoutGuestsInput: VideoUpdateWithWhereUniqueWithoutGuestsInput;
  VideoUpdateWithWhereUniqueWithoutOwnerInput: VideoUpdateWithWhereUniqueWithoutOwnerInput;
  VideoUpdateWithoutGuestsInput: VideoUpdateWithoutGuestsInput;
  VideoUpdateWithoutOwnerInput: VideoUpdateWithoutOwnerInput;
  VideoUpsertWithWhereUniqueWithoutGuestsInput: VideoUpsertWithWhereUniqueWithoutGuestsInput;
  VideoUpsertWithWhereUniqueWithoutOwnerInput: VideoUpsertWithWhereUniqueWithoutOwnerInput;
  VideoWhereInput: VideoWhereInput;
  VideoWhereUniqueInput: VideoWhereUniqueInput;
  videoUploadStatus: VideoUploadStatus;
  videoVisibility: VideoVisibility;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BoolFieldUpdateOperationsInput: BoolFieldUpdateOperationsInput;
  BoolFilter: BoolFilter;
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  DateTimeFieldUpdateOperationsInput: DateTimeFieldUpdateOperationsInput;
  DateTimeFilter: DateTimeFilter;
  EnumvideoUploadStatusFieldUpdateOperationsInput: EnumvideoUploadStatusFieldUpdateOperationsInput;
  EnumvideoUploadStatusFilter: EnumvideoUploadStatusFilter;
  EnumvideoVisibilityFieldUpdateOperationsInput: EnumvideoVisibilityFieldUpdateOperationsInput;
  EnumvideoVisibilityFilter: EnumvideoVisibilityFilter;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  IntFieldUpdateOperationsInput: IntFieldUpdateOperationsInput;
  IntFilter: IntFilter;
  IntNullableFilter: IntNullableFilter;
  Mutation: {};
  NestedBoolFilter: NestedBoolFilter;
  NestedDateTimeFilter: NestedDateTimeFilter;
  NestedEnumvideoUploadStatusFilter: NestedEnumvideoUploadStatusFilter;
  NestedEnumvideoVisibilityFilter: NestedEnumvideoVisibilityFilter;
  NestedIntFilter: NestedIntFilter;
  NestedIntNullableFilter: NestedIntNullableFilter;
  NestedStringFilter: NestedStringFilter;
  NestedStringNullableFilter: NestedStringNullableFilter;
  NullableIntFieldUpdateOperationsInput: NullableIntFieldUpdateOperationsInput;
  NullableStringFieldUpdateOperationsInput: NullableStringFieldUpdateOperationsInput;
  PageInfo: PageInfo;
  PaginatedUser: PaginatedUser;
  PaginatedVideo: PaginatedVideo;
  Query: {};
  SortOrderInput: SortOrderInput;
  String: Scalars['String']['output'];
  StringFieldUpdateOperationsInput: StringFieldUpdateOperationsInput;
  StringFilter: StringFilter;
  StringNullableFilter: StringNullableFilter;
  Upload: Scalars['Upload']['output'];
  User: User;
  UserCount: UserCount;
  UserCreateInput: UserCreateInput;
  UserCreateNestedManyWithoutInvitedVideosInput: UserCreateNestedManyWithoutInvitedVideosInput;
  UserCreateNestedOneWithoutOwnVideosInput: UserCreateNestedOneWithoutOwnVideosInput;
  UserCreateOrConnectWithoutInvitedVideosInput: UserCreateOrConnectWithoutInvitedVideosInput;
  UserCreateOrConnectWithoutOwnVideosInput: UserCreateOrConnectWithoutOwnVideosInput;
  UserCreateWithoutInvitedVideosInput: UserCreateWithoutInvitedVideosInput;
  UserCreateWithoutOwnVideosInput: UserCreateWithoutOwnVideosInput;
  UserError: UserError;
  UserListRelationFilter: UserListRelationFilter;
  UserModel: UserModel;
  UserModelEdge: UserModelEdge;
  UserOrderByRelationAggregateInput: UserOrderByRelationAggregateInput;
  UserOrderByWithRelationInput: UserOrderByWithRelationInput;
  UserRelationFilter: UserRelationFilter;
  UserScalarWhereInput: UserScalarWhereInput;
  UserUpdateInput: UserUpdateInput;
  UserUpdateManyMutationInput: UserUpdateManyMutationInput;
  UserUpdateManyWithWhereWithoutInvitedVideosInput: UserUpdateManyWithWhereWithoutInvitedVideosInput;
  UserUpdateManyWithoutInvitedVideosNestedInput: UserUpdateManyWithoutInvitedVideosNestedInput;
  UserUpdateOneRequiredWithoutOwnVideosNestedInput: UserUpdateOneRequiredWithoutOwnVideosNestedInput;
  UserUpdateToOneWithWhereWithoutOwnVideosInput: UserUpdateToOneWithWhereWithoutOwnVideosInput;
  UserUpdateWithWhereUniqueWithoutInvitedVideosInput: UserUpdateWithWhereUniqueWithoutInvitedVideosInput;
  UserUpdateWithoutInvitedVideosInput: UserUpdateWithoutInvitedVideosInput;
  UserUpdateWithoutOwnVideosInput: UserUpdateWithoutOwnVideosInput;
  UserUpsertWithWhereUniqueWithoutInvitedVideosInput: UserUpsertWithWhereUniqueWithoutInvitedVideosInput;
  UserUpsertWithoutOwnVideosInput: UserUpsertWithoutOwnVideosInput;
  UserWhereInput: UserWhereInput;
  UserWhereUniqueInput: UserWhereUniqueInput;
  UserWithError: UserWithError;
  Video: Video;
  VideoCount: VideoCount;
  VideoCreateManyOwnerInput: VideoCreateManyOwnerInput;
  VideoCreateManyOwnerInputEnvelope: VideoCreateManyOwnerInputEnvelope;
  VideoCreateNestedManyWithoutGuestsInput: VideoCreateNestedManyWithoutGuestsInput;
  VideoCreateNestedManyWithoutOwnerInput: VideoCreateNestedManyWithoutOwnerInput;
  VideoCreateOrConnectWithoutGuestsInput: VideoCreateOrConnectWithoutGuestsInput;
  VideoCreateOrConnectWithoutOwnerInput: VideoCreateOrConnectWithoutOwnerInput;
  VideoCreateWithoutGuestsInput: VideoCreateWithoutGuestsInput;
  VideoCreateWithoutOwnerInput: VideoCreateWithoutOwnerInput;
  VideoListRelationFilter: VideoListRelationFilter;
  VideoModel: VideoModel;
  VideoModelEdge: VideoModelEdge;
  VideoOrderByRelationAggregateInput: VideoOrderByRelationAggregateInput;
  VideoOrderByWithRelationInput: VideoOrderByWithRelationInput;
  VideoScalarWhereInput: VideoScalarWhereInput;
  VideoUpdateInput: VideoUpdateInput;
  VideoUpdateManyMutationInput: VideoUpdateManyMutationInput;
  VideoUpdateManyWithWhereWithoutGuestsInput: VideoUpdateManyWithWhereWithoutGuestsInput;
  VideoUpdateManyWithWhereWithoutOwnerInput: VideoUpdateManyWithWhereWithoutOwnerInput;
  VideoUpdateManyWithoutGuestsNestedInput: VideoUpdateManyWithoutGuestsNestedInput;
  VideoUpdateManyWithoutOwnerNestedInput: VideoUpdateManyWithoutOwnerNestedInput;
  VideoUpdateWithWhereUniqueWithoutGuestsInput: VideoUpdateWithWhereUniqueWithoutGuestsInput;
  VideoUpdateWithWhereUniqueWithoutOwnerInput: VideoUpdateWithWhereUniqueWithoutOwnerInput;
  VideoUpdateWithoutGuestsInput: VideoUpdateWithoutGuestsInput;
  VideoUpdateWithoutOwnerInput: VideoUpdateWithoutOwnerInput;
  VideoUpsertWithWhereUniqueWithoutGuestsInput: VideoUpsertWithWhereUniqueWithoutGuestsInput;
  VideoUpsertWithWhereUniqueWithoutOwnerInput: VideoUpsertWithWhereUniqueWithoutOwnerInput;
  VideoWhereInput: VideoWhereInput;
  VideoWhereUniqueInput: VideoWhereUniqueInput;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<ResolversTypes['UserModel'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  deleteUser?: Resolver<ResolversTypes['UserModel'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'where'>>;
  deleteVideo?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteVideoArgs, 'where'>>;
  signup?: Resolver<ResolversTypes['UserWithError'], ParentType, ContextType>;
  updateUser?: Resolver<ResolversTypes['UserModel'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data' | 'where'>>;
  updateVideo?: Resolver<ResolversTypes['VideoModel'], ParentType, ContextType, RequireFields<MutationUpdateVideoArgs, 'data' | 'where'>>;
  uploadVideo?: Resolver<ResolversTypes['VideoModel'], ParentType, ContextType, RequireFields<MutationUploadVideoArgs, 'file'>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedUser'] = ResolversParentTypes['PaginatedUser']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['UserModelEdge']>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<ResolversTypes['UserModel']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedVideo'] = ResolversParentTypes['PaginatedVideo']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['VideoModelEdge']>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<ResolversTypes['VideoModel']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  signin?: Resolver<ResolversTypes['UserWithError'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['UserModel'], ParentType, ContextType, RequireFields<QueryUserArgs, 'where'>>;
  users?: Resolver<ResolversTypes['PaginatedUser'], ParentType, ContextType, Partial<QueryUsersArgs>>;
  video?: Resolver<ResolversTypes['VideoModel'], ParentType, ContextType, RequireFields<QueryVideoArgs, 'where'>>;
  videos?: Resolver<ResolversTypes['PaginatedVideo'], ParentType, ContextType, Partial<QueryVideosArgs>>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _count?: Resolver<ResolversTypes['UserCount'], ParentType, ContextType>;
  auth0Id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invitedVideos?: Resolver<Maybe<Array<ResolversTypes['Video']>>, ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownVideos?: Resolver<Maybe<Array<ResolversTypes['Video']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserCount'] = ResolversParentTypes['UserCount']> = {
  invitedVideos?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ownVideos?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserError'] = ResolversParentTypes['UserError']> = {
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserModel'] = ResolversParentTypes['UserModel']> = {
  InvitedVideos?: Resolver<Maybe<Array<ResolversTypes['VideoModel']>>, ParentType, ContextType, Partial<UserModelInvitedVideosArgs>>;
  OwnVideos?: Resolver<Maybe<Array<ResolversTypes['VideoModel']>>, ParentType, ContextType, Partial<UserModelOwnVideosArgs>>;
  auth0Id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserModelEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserModelEdge'] = ResolversParentTypes['UserModelEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['UserModel'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserWithErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserWithError'] = ResolversParentTypes['UserWithError']> = {
  user?: Resolver<Maybe<ResolversTypes['UserModel']>, ParentType, ContextType>;
  userErrors?: Resolver<Maybe<Array<ResolversTypes['UserError']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Video'] = ResolversParentTypes['Video']> = {
  Owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  _count?: Resolver<ResolversTypes['VideoCount'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  guests?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  playCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  thumbnailUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  uploadStatus?: Resolver<ResolversTypes['videoUploadStatus'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['videoVisibility'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoCount'] = ResolversParentTypes['VideoCount']> = {
  guests?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoModel'] = ResolversParentTypes['VideoModel']> = {
  Guests?: Resolver<Array<ResolversTypes['UserModel']>, ParentType, ContextType, Partial<VideoModelGuestsArgs>>;
  Owner?: Resolver<ResolversTypes['UserModel'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  playCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  thumbnailUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  uploadStatus?: Resolver<ResolversTypes['videoUploadStatus'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['videoVisibility'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoModelEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoModelEdge'] = ResolversParentTypes['VideoModelEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['VideoModel'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PaginatedUser?: PaginatedUserResolvers<ContextType>;
  PaginatedVideo?: PaginatedVideoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserCount?: UserCountResolvers<ContextType>;
  UserError?: UserErrorResolvers<ContextType>;
  UserModel?: UserModelResolvers<ContextType>;
  UserModelEdge?: UserModelEdgeResolvers<ContextType>;
  UserWithError?: UserWithErrorResolvers<ContextType>;
  Video?: VideoResolvers<ContextType>;
  VideoCount?: VideoCountResolvers<ContextType>;
  VideoModel?: VideoModelResolvers<ContextType>;
  VideoModelEdge?: VideoModelEdgeResolvers<ContextType>;
};

