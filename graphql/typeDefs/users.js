export const typeDefs = `#graphql
  type Query {
    getUsers(
      search: String
      role: String
      is_active: Boolean
      page: Int
      limit: Int
    ): UserResponse!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
  }

  enum Role {
    admin
    moderator
    user
  }

  type User {
    id: ID!
    username: String!
    email: String!
    full_name: String!
    age: Int
    role: Role!
    is_active: Boolean!
    created_at: String
  }

  type PaginationInfo {
    totalItems: Int!
    totalPages: Int!
    currentPage: Int!
    perPage: Int!
  }

  type UserResponse {
    data: [User!]!
    pagination: PaginationInfo!
  }

  input CreateUserInput {
    username: String!
    email: String!
    full_name: String!
    age: Int
    role: Role
    is_active: Boolean
  }

  input UpdateUserInput {
    username: String
    email: String
    full_name: String
    age: Int
    role: Role
    is_active: Boolean
  }

`;
