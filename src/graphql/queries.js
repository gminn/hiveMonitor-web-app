/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHive = /* GraphQL */ `
  query GetHive($id: ID!) {
    getHive(id: $id) {
      id
      deviceId
      temp
      humidity
      co2
      tvoc
      freq
      timeStamp
      createdAt
      updatedAt
    }
  }
`;
export const listHives = /* GraphQL */ `
  query ListHives(
    $filter: ModelhiveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHives(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        deviceId
        temp
        humidity
        co2
        tvoc
        freq
        timeStamp
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
