/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHive = /* GraphQL */ `
  mutation CreateHive(
    $input: CreateHiveInput!
    $condition: ModelhiveConditionInput
  ) {
    createHive(input: $input, condition: $condition) {
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
export const updateHive = /* GraphQL */ `
  mutation UpdateHive(
    $input: UpdateHiveInput!
    $condition: ModelhiveConditionInput
  ) {
    updateHive(input: $input, condition: $condition) {
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
export const deleteHive = /* GraphQL */ `
  mutation DeleteHive(
    $input: DeleteHiveInput!
    $condition: ModelhiveConditionInput
  ) {
    deleteHive(input: $input, condition: $condition) {
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
