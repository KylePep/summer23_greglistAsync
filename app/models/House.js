import { AppState } from "../AppState.js"

export class House {
  constructor(data) {
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description
    this.creatorId = data.creatorId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.id = data.id
  }
  get houseTemplate() {
    return `
              <div class="col-3 card  mb-3 p-3">
            <img
              src="${this.imgUrl}"
              class="card-img-top img-fluid" alt="...">
            <div class="card-body">
              <p>Price: $${this.price}</p>
              <p>Bedrooms: ${this.bedrooms} | Bathrooms: ${this.bathrooms} | Levels: ${this.levels}</p>
              <p>Year: ${this.year}</p>
              <p class="card-text">Description: ${this.description}</p>
              <p>Created at: ${this.createdAt.toLocaleString()}</p>
              <p>Updated at: ${this.updatedAt.toLocaleString()}</p>
              ${this.computeDelete} | ${this.computeEdit}
            </div>
          </div>
    `
  }
  get computeDelete() {
    if (!AppState.account || AppState.account.id != this.creatorId) {
      return ''
    }
    return `
    <button onclick= "app.HousesController.deleteHouse('${this.id}')" class="btn btn-danger">Delete</button> 
    `
  }

  get computeEdit() {
    if (!AppState.account || AppState.account.id != this.creatorId) {
      return ''
    }
    return `
    <button onclick = "app.HousesController.drawEditForm('${this.id}')" class="btn btn-warning">Edit</button> 
    `
  }

  get EditForm() {
    return `


      <div class="collapse" id="houseCollapse">
        <div class="card card-body" id="house-form">
          <form onsubmit="app.HousesController.editHouse(event,'${this.id}')">

            <div>
              <label for="houseImg">Image URL</label>
              <input type="url" id="houseImg" maxlength="300" required name="imgUrl" required value="${this.imgUrl}">
            </div>

            <div>
              <label for="housePrice">Price</label>
              <input type="number" id="housePrice" minlength="0" maxlength="999999999" required name="price" value="${this.price}">
            </div>
            <div>
              <label for="houseYear">Year</label>
              <input type="number" id="houseYear" minlength="0" maxlength="999999999" required name="year" value="${this.year}">
            </div>
            <div class="d-flex ">
              <div>
                <label for="houseBedrooms">Bedrooms</label>
                <input type="number" id="houseBedrooms" minlength="1" maxlength="100" required name="bedrooms" value="${this.bedrooms}">
              </div>

              <div>
                <label for="houseBathrooms" class="ms-5">Bathrooms</label>
                <input id="houseBathrooms" class="ms-5" type="number" min="1" max="100" required name="bathrooms" value="${this.bathrooms}">
              </div>


              <div>
                <label for="houseLevels" class="ms-5">Levels</label>
                <input type="number" class="ms-5" id="houseLevels" name="levels" min="1" max="100"value="${this.levels}">
              </div>
            </div>

            <div>
              <label for="houseDescription">Description</label>
              <textarea id="houseDescription" name="description" rows="10" class="w-50">
              ${this.description}
          </textarea>
            </div>

            <button type="submit" class="btn btn-success">Edit</button>
          </form>

        </div>
      </div>

  
    `
  }

  static get houseForm() {
    return `
      <div class="collapse" id="houseCollapse">
        <div class="card card-body" id="house-form">
          <form onsubmit="app.HousesController.createHouse(event)">

            <div>
              <label for="houseImg">Image URL</label>
              <input type="url" id="houseImg" maxlength="300" required name="imgUrl">
            </div>

            <div>
              <label for="housePrice">Price</label>
              <input type="number" id="housePrice" minlength="0" maxlength="999999999" required name="price">
            </div>
            <div>
              <label for="houseYear">Year</label>
              <input type="number" id="houseYear" minlength="0" maxlength="999999999" required name="year">
            </div>
            <div class="d-flex ">
              <div>
                <label for="houseBedrooms">Bedrooms</label>
                <input type="number" id="houseBedrooms" minlength="1" maxlength="100" required name="bedrooms">
              </div>

              <div>
                <label for="houseBathrooms" class="ms-5">Bathrooms</label>
                <input id="houseBathrooms" class="ms-5" type="number" min="1" max="100" required name="bathrooms">
              </div>


              <div>
                <label for="houseLevels" class="ms-5">Levels</label>
                <input type="number" class="ms-5" id="houseLevels" name="levels" min="1" max="100">
              </div>
            </div>

            <div>
              <label for="houseDescription">Description</label>
              <textarea id="houseDescription" name="description" rows="10" class="w-50">
          </textarea>
            </div>

            <button type="submit" class="btn btn-success">Submit</button>
          </form>

        </div>
      </div>

    `
  }

}
