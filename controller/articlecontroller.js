

const Article = require("../model/Article.model")

const cloundinary = require("cloudinary");
const ApiFeatures = require("../utils/Apifeaturs");

// Create Article 


//  for admin   add product 

exports.createArticle = async (req, res, next) => {

    // images save in a cloundinary 

    const myCloud = await cloundinary.v2.uploader.upload(req.body.images, {
        folder: "images",
        width: 550,
        crop: "scale",
    });

    const { Title, Paragraph, Content, Source } = req.body;


    const article =await Article.create({

        Title,
        Paragraph,
        Content,
        Source,
        images: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

    res.status(200).json({
        success: true,
        article



    })
}


// // get data by using  only id 

exports.findOne = (req, res) => {

    const userId = req.params.id
    console.log(userId);

    Article.findOne({ '_id': userId })
        .then(data => {
            res.send(data)
        })
}






exports.getAllarticle = async (req, res, next) => {

    const apifFeatures = new ApiFeatures(Article.find(), req.query).search();
    // const articles = await Article.find();

   const articles = await apifFeatures.query;

    res.status(200).json({
        success: true,
        articles
    })


};


//   update product

exports.updateArticle = async (req, res, next) => {

    let article = await Article.findById(req.params.id);
    if (!article) {

        return res.status(500).json({
            success: false,
            message: "Article not found"
        })
    }

    article = await Article.findByIdAndUpdate(req.params.id, req.body, {

        new: true,
        runValidators: true,
        useFindAndModify: false,


    })


    res.status(200).json({
        success: true,
        article
    })


}


// delete Article


exports.deleteArticle = async (req, res, next) => {


    const article = await Article.findById(req.params.id);


    if (!article) {
        return res.status(500).json({
            success: false,
            message: "article not found"
        })
    }

    await article.remove()

    res.status(200).json({
        success: true,
        message: "Article deleted succcessully"
    })
}