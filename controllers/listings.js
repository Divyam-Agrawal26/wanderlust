const Listing = require("../models/listing.js")

const axios = require("axios");
module.exports.index = async (req,res)=>{
    const listing = await Listing.find({});
    res.render("./listings/index.ejs",{listing});
}

module.exports.renderNewForm = (req,res)=>{
    res.render("./listings/new.ejs");

}
module.exports.showListing = async (req,res)=>{
    const id = req.params.id;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{
        path:"author",
    },}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested does not exist");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{listing});
}
module.exports.createListing = async (req,res,next)=>{
   
        const { location } = req.body.Listing;   // user input location
        const key = process.env.MAP_TOKEN;

        // 1️⃣ Geocoding API call
        const geoRes = await axios.get(
            `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${key}`
        );

        let coords = [0, 0];
       console.log(geoRes.features);
        if (geoRes.data.features && geoRes.data.features.length > 0) {
            coords = geoRes.data.features[0].center;   // [lng, lat]
        }

        console.log("🔍 LOCATION ENTERED:", location);
        console.log("📍 LONGITUDE:", coords[0]);
        console.log("📍 LATITUDE:", coords[1]);
    

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.Listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
     newListing.geometry = {
            type: "Point",
            coordinates: coords,
        };
    let saved = await newListing.save();
    console.log(saved);
    req.flash("success","New Listing Created")
    res.redirect("/listings");
   
}
module.exports.renderEditForm = async (req,res)=>{
    const id = req.params.id;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist")
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300,w_250")
    res.render("./listings/edit.ejs",{listing,originalImageUrl});
}
module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.Listing});

    if(typeof req.file !== "undefined"){
       let url = req.file.path;
       let filename = req.file.filename;
       listing.image = {url,filename};
       await listing.save();
    }
    req.flash("success","Listing Updated!")
    res.redirect(`/listings/${id}`);
}
module.exports.destroyListing = async(req,res)=>{
    const id = req.params.id;
    await Listing.findByIdAndDelete(id,{});
    req.flash("success","Listing Deleted!")
    res.redirect("/listings");
}