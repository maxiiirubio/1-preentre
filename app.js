class ProductManager{
	constructor(){
		this.products = []
		this.error = undefined
	}

	getProducts = () => this.products

	generateId = () => (this.products.length === 0 ? 1 : this.products[this.products.length-1].id +1)

	getProductById = (id) => {
		const productId = this.products.find(prod => prod.id === id)
		if (!productId) return `El ID ingresado no coincide`
		else return productId
	}

	buscarError = (titulo, color, precio, img, codigo, stock) => {
		if (!titulo || !color || !precio || !img || !codigo || !stock){
		this.error = `${titulo}: carga incompleta`
		}else {
			const notCode = this.products.find(proCode => proCode.codigo === codigo)
			if (notCode) this.error = `${titulo}: codigo repetido`
			else this.error = undefined
		} 
	}

	addProduct = (titulo, color, precio, img, codigo, stock) => {

		this.buscarError(titulo, color, precio, img, codigo, stock)

		if (this.error === undefined)
			this.products.push({id: this.generateId(), titulo, color, precio, img, codigo, stock})
		else 
			console.log(this.error)
			
	}
}

const producto = new ProductManager()
producto.addProduct('Zapatillas Nike', 'Negro', 15000, 'foto', 29974, 10)
producto.addProduct('Zapatillas Head', 'Blanco', 12000, 'foto', 29975) //falta stock
producto.addProduct('Zapatillas Vanz', 'Rojo', 14700, 'foto', 29976, 13)
producto.addProduct('Zapatillas Puma', 'Azul', 21400, 'foto', 29976, 18) //codigo repetido
producto.addProduct('Zapatillas Salomon', 'Negro', 30000, 'foto', 29977, 23)
producto.addProduct('Zapatillas Adidas', 'Naranja', 17000, 'foto', 29978, 11)

console.log(producto.getProducts())
console.log(producto.getProductById(2))
console.log(producto.getProductById(12))
console.log(producto.getProductById(4))
console.log(producto.getProductById(5))