import { createUrl } from "../queries/insert.js";
import { getUrlbyShortcode } from "../queries/select.js";
import { generateShortCode } from "../utils/generateShortCode.js";
import { isValidUrl } from "../utils/validUrl.js";


export async function postUrl(req:any,res:any){
    const userId = req.user.id

    const { url } = req.body;

    if(!isValidUrl){
        return res.status(409).json({
            message: "Invalid URL"
        })
    }

    const shortcode = generateShortCode();

    await createUrl({
        short_code:shortcode,
        original_url:url,
        userId: userId
    })

    res.json({
        shorturl: `https://mi-ny.onrender.com/${shortcode}`
    })
}

export async function getUrl(req:any,res:any){
    const {shortcode} = req.params;

    const url = await getUrlbyShortcode(shortcode);

    if(!url){
        res.status(404).json({
            message: "Invalid short code"
        })
    }
    else{
        res.redirect(url.original_url);
    }
}