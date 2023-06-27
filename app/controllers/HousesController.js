import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { housesService } from "../services/HousesService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawHouses() {
  let template = ''
  let houses = AppState.houses
  houses.forEach(h => template += h.houseTemplate)
  setHTML('houseList', template)
}

export class HousesController {
  constructor() {
    console.log('This is the houses controller')
    this.getHouses()
    AppState.on('houses', _drawHouses)
    AppState.on('houses', this.drawCarForm)
    AppState.on('account', _drawHouses)
  }

  drawEditForm(houseId) {
    const foundHouse = AppState.houses.find(h => h.id == houseId)
    const houseForm = document.getElementById('house-form')
    setHTML('house-form', foundHouse.EditForm)

    bootstrap.Collapse.getOrCreateInstance('#houseCollapse').show()

    houseForm.scrollIntoView()
  }

  drawCarForm() {
    setHTML('house-form', House.houseForm)
  }
  async getHouses() {
    try {
      await housesService.getHouses()

    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async createHouse(event) {
    try {
      event.preventDefault()
      const form = event.target
      const houseData = getFormData(form)
      await housesService.createHouse(houseData)
      form.reset()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async editHouse(event, houseId) {
    try {
      event.preventDefault()
      const form = event.target
      const houseData = getFormData(form)
      await housesService.editHouse(houseData, houseId)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)

    }
  }

  async deleteHouse(houseId) {
    try {
      const wantsToDelete = await Pop.confirm('Do you want to delete this House?')
      if (!wantsToDelete) {
        return
      }
      await housesService.deleteHouse(houseId)

    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }
}