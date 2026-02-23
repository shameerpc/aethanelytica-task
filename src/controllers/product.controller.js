import Product from "../models/Product.js";


export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, image, category, warhouse } = req.body;

    const product = await Product.create({ name, description, price, stock, image, category, warhouse });

    res.status(201).json({ message: "Product created", product });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }
}


  export const getAllProducts = async (req, res) => {

    try {

        let filters = { ...req.query }
        
        if (req.query.pricerange) {
            const [min, max] = req.query.pricerange.split("-");
            filters.price = { $gte: parseFloat(min), $lte: parseFloat(max) };
            delete filters.pricerange;
        }

        if (req.query.availability) {
            filters.stock = req.query.availability === "in-stock" ? { $gt: 0 } : 0;
            delete filters.availability;
        }

        if (req.query.category) {
            filters.category = req.query.category;
            delete filters.category;
        } 

      
    
        const products = await Product.aggregate([
            { $match: filters },
            {
                $lookup: {
                    from: "warhouses",
                    localField: "warhouse",
                    foreignField: "_id",
                    as: "warhouseDetails"
                }
            },
            { $unwind: "$warhouseDetails" },
            {
                $project: {
                    name: 1,
                    description: 1,
                    price: 1,
                    stock: 1,
                    image: 1,
                    category: 1,
                    warhouse: "$warhouseDetails.name"
                }
            }
        ]);

      res.json(products);
      
         } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
};

  export const getProductById = async (req, res) => {
  
    try {
      
 
  const product = await Product.findById(req.params.id);
      res.status(200).json({status: "success",result: product });

         } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
};


  export const deleteProduct = async (req, res) => {
  
    try {
  await Product.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "Product deleted" });

          } catch (error) {

      res.status(500).json({ message: "Server error" });

    }
};


  export const updateProduct = async (req, res) => {

    try {
  const { name, description, price } = req.body;

  const product = await Product.findByIdAndUpdate(

    req.params.id,

    { name, description, price },

    { new: true }
      );
      
      res.status(200).json({ message: "Product updated", product });

          } catch (error) {

      res.status(500).json({ message: "Server error" });

    }

};