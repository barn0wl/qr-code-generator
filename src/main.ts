
import QRCode, { QRCodeErrorCorrectionLevel, QRCodeMaskPattern, QRCodeToDataURLOptions } from 'qrcode'

type QRParams = {
    version?: number,
    errorCorrectionLevel?: QRCodeErrorCorrectionLevel,
    maskPattern?: QRCodeMaskPattern,
}

type renderOptions = {
    margin?: number,
    scale?: number,
    width?: number,
}

export type requestParams = {
    text: string,
    qrParams: QRParams,
    renderOptions : renderOptions
}

export const generateCode = async (reqParams: requestParams): Promise<string> => {

    const options: QRCodeToDataURLOptions = {
        version : reqParams.qrParams?.version,
        errorCorrectionLevel: reqParams.qrParams?.errorCorrectionLevel,
        maskPattern: reqParams.qrParams?.maskPattern,
        margin: reqParams.renderOptions?.margin,
        scale: reqParams.renderOptions?.scale,
        width: reqParams.renderOptions?.width,
    }
    
    try {
        const generatedCodeUrl: string = await new Promise((resolve, reject) => {
            QRCode.toDataURL(reqParams.text, options, (err, url: string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(url);
                }
            });
        });
        return generatedCodeUrl;

    } catch (error) {
        throw new Error(`Error generating QR code: ${(error as Error).message}`);
    }
}
