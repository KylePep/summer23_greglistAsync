import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { api } from "./AxiosService.js"

class HousesService {


  async getHouses() {
    const res = await api.get('api/houses')
    console.log('got houses', res.data)
    let newHouses = res.data.map(pojo => new House(pojo))
    AppState.houses = newHouses
    AppState.emit('houses')
    console.log(AppState.houses);
  }

  async createHouse(houseData) {
    const res = await api.post('api/houses', houseData)
    const builtHouse = new House(res.data)
    AppState.houses.push(builtHouse)
    AppState.emit('houses')
  }

  async editHouse(houseData, houseId) {
    const res = await api.put(`api/houses/${houseId}`, houseData)
    const updatedHouse = new House(res.data)

    const oldHouseIndex = AppState.houses.findIndex(h => h.id == houseId)
    if (oldHouseIndex == -1) {
      throw new Error(`No house index foud with the id of ${houseId}`)
    }

    AppState.houses.splice(oldHouseIndex, 1, updatedHouse)

    AppState.emit('houses')

  }

  async deleteHouse(houseId) {
    const res = await api.delete(`api/houses/${houseId}`)
    let houses = AppState.houses
    let deleteHouse = houses.findIndex(h => h.id == houseId)
    if (deleteHouse == -1) {
      throw new Error(`No house Index found with the id of ${houseId}`)
    }
    houses.splice(deleteHouse, 1)
    AppState.emit('houses')
  }

}

export const housesService = new HousesService()