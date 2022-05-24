import { mobiles } from "../data/mobiles"

export const getMobileById = ( id = '') => {
  return mobiles.find(mobile => mobile.id === id)
}