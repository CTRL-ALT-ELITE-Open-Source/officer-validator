"use server";
import { getSignedUrl } from "aws-cloudfront-sign";

export async function returnSignedUrl(src: string): Promise<string> {
    const signingParams = {
        keypairId: process.env.CLOUDFRONT_KEYPAIR_ID || '',
        privateKeyString: process.env.CLOUDFRONT_PRIVATE_KEY || '',
        expireTime: Math.floor(Date.now() + 100000),
    }
    try {
        console.log([getSignedUrl(src, signingParams), signingParams])
        return getSignedUrl(src, signingParams);
    } catch (err) {
        console.error(err)
        console.log(signingParams)
        throw new Error('Error in CloudFront URL Signer');
    };
};