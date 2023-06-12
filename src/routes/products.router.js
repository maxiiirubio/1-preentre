import { Router } from "express";
import { productManager } from "../controllers/ProductManager.js";

const router = Router();

const products = await productManager.getProducts();

router.get("/", (req, res) => {
  // Obtener el valor del parámetro "limit" de la consulta
  const limit = req.query.limit;

  if (limit) {
    // Si se proporciona un límite, obtenemos todos los productos y limitamos la cantidad a mostrar
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } else {
    // Si no se proporciona un límite, obtenemos todos los productos
    res.json({ products: products });
  }
});

router.get("/:pid", async (req, res) => {
  // Obtenemos el ID del producto de req.params
  const productId = parseInt(req.params.pid);

  // Obtenemos el producto por ID
  const product = await productManager.getProductsById(productId);

  // Enviamos un mensaje de error si no se encuentra el producto
  if (!product) {
    return res.status(404).json({
      error: `El producto con el id ${productId} no se ha encontrado`,
    });
  }
  // Enviamos el producto como respuesta si se encuentra
  res.json({ product: product });
});

router.post("/", async (req, res) => {
  try {
    // Obtenemos los datos del producto del cuerpo de la solicitud
    let {
      title,
      description,
      price,
      code,
      category,
      stock,
      status,
    } = req.body;

    // Validar que todos los campos obligatorios estén presentes
    if (!title || !description || !code || !price || !stock || !category) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Agregamos el producto nuevo al archivo
    const addProduct = await productManager.addProduct(
      title,
      description,
      price,
      code,
      category,
      stock,
      (status = true)
    );

    if (addProduct) {
      return res.status(201).json({
        message: "Producto agregado exitosamente",
        product: addProduct,
      });
    }
    return res.status(404).json({ error: "Error al agregar el producto" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error en el servidor" });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    // Obtenemos el ID del producto de req.params
    const productId = parseInt(req.params.pid);

    // Comprobamos si el ID del producto en el cuerpo de la solicitud es igual al ID en los parámetros de la ruta
    if (req.body.id !== productId && req.body.id !== undefined) {
      return res
        .status(404)
        .json({ error: "No se puede modificar el id del producto" });
    }

    const updated = req.body;

    // Buscamos el producto por su ID en la lista de productos
    const productFind = await products.find((prod) => prod.id === productId);

    // Enviamos un mensaje de error si no se encuentra el producto
    if (!productFind) {
      return res
        .status(404)
        .json({ error: `No existe el producto con el id: ${productId}` });
    }

    // Actualizamos el producto
    await productManager.updateProduct(productId, updated);

    res.json({ message: `Actualizando el producto con el id: ${productId}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    // Obtenemos el ID del producto de req.params
    const productId = parseInt(req.params.pid);

    // Buscamos el producto por su ID en la lista de productos
    const productFind = await products.find((prod) => prod.id === productId);

    // Enviamos un mensaje de error si no se encuentra el producto
    if (!productFind) {
      return res
        .status(404)
        .json({ error: `No existe el producto con el id: ${productId}` });
    }

    // Eliminamos el producto
    const deleteProduct = await productManager.deleteProduct(productId);
    console.log(deleteProduct);

    res.json({
      message: `Producto con el id ${productId} eliminado con exito`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

export default router;
