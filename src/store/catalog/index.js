import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      count: 0
    }
  }

  async load({ page = this.getState().currentPage } = {}) {
    const limit = 10;
    const skip = (page - 1) * limit;

    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    const count = Math.ceil(json.result.count / limit); // пересчет количества страниц
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count,
      currentPage: page
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
