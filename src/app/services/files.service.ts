import { Injectable } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';

const pako = require('pako');

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor() { }


  convertToFile(base64String: any): string {

    console.log("convert: {}", base64String );
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    console.log(blobUrl)
    return blobUrl;
    // this.patientFile = this.domSanitizer.bypassSecurityTrustResourceUrl(blobUrl);
    // this.fileToShow = this.domSanitizer.bypassSecurityTrustResourceUrl('https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf');

  }

  async convertFileToBase64(file: File):Promise<String> {

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const base64String: string | ArrayBuffer | null = reader.result;
        if (typeof base64String === 'string') {
          // Extracting base64 string from a data URL
        
          const extractedBase64 = base64String.split(',')[1];
          // console.log("compressed string:", this.compressBase64String(extractedBase64))
          console.log("extractedBase64:", extractedBase64);
        
          resolve((extractedBase64));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      // Read the file as an ArrayBuffer
      reader.readAsDataURL(file)
    });
  }

   async combinePdfFiles(base64String1: any, base64String2: any): Promise<string> {

    if(base64String1 == null)return base64String2;
    if(base64String2 == null)return base64String1;

    try {
      const pdf1Bytes = this.base64ToArrayBuffer(base64String1);
      const pdf2Bytes = this.base64ToArrayBuffer(base64String2);

      // Load PDFs
      const pdf1 = await PDFDocument.load(pdf1Bytes);
      const pdf2 = await PDFDocument.load(pdf2Bytes);

      // Create a new PDF document
      const combinedPdf = await PDFDocument.create();

      // Add pages from the first PDF
      const pdf1Pages = await combinedPdf.copyPages(pdf1, pdf1.getPageIndices());
      pdf1Pages.forEach((page) => combinedPdf.addPage(page));

      // Add pages from the second PDF
      const pdf2Pages = await combinedPdf.copyPages(pdf2, pdf2.getPageIndices());
      pdf2Pages.forEach((page) => combinedPdf.addPage(page));

      // const pdfBytes = await combinedPdf.save();

      // // Compress the Uint8Array using pako
      // const compressedBytes = pako.deflate(pdfBytes);

      // let compressedBinaryString = '';
      // for (let i = 0; i < compressedBytes.length; i++) {
      //   compressedBinaryString += String.fromCharCode(compressedBytes[i]);
      // }

      // // Encode the compressed binary string to Base64
      // const compressedBase64String = btoa(compressedBinaryString);

      // // Display the original, compressed, and Base64-encoded sizes
      // console.log('Original Size:', pdfBytes.length, 'bytes');
      // console.log('Compressed Size:', compressedBytes.length, 'bytes');
      // console.log('Base64 Encoded Size:', compressedBase64String.length, 'characters');

      // Save the combined PDF as a Base64 string
      const combinedBase64String = await combinedPdf.saveAsBase64({ dataUri: true });

      return combinedBase64String;
    } catch (e) {
      console.error('Error combining PDF files:', e);
      return "error";
    }
  }

  private base64ToArrayBuffer(base64String: string): ArrayBuffer {
    const binaryString = window.atob(base64String);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }



  compressBase64String(base64String: string): string {
    // Decode the Base64-encoded string to a binary string
    const decodedBinaryString = atob(base64String);

    // Convert the binary string to a Uint8Array
    const inputBytes = new Uint8Array(decodedBinaryString.length);
    for (let i = 0; i < decodedBinaryString.length; i++) {
      inputBytes[i] = decodedBinaryString.charCodeAt(i);
    }

    // Compress the Uint8Array using pako
    const compressedBytes = pako.deflate(inputBytes);

    // Convert the compressed Uint8Array back to a binary string
    let compressedBinaryString = '';
    for (let i = 0; i < compressedBytes.length; i++) {
      compressedBinaryString += String.fromCharCode(compressedBytes[i]);
    }

    // Encode the compressed binary string back to Base64
    const compressedBase64String = btoa(compressedBinaryString);

    return compressedBase64String;
  }


  decompressString(compressedString: string) {
    // Convert the compressed string back to a Uint8Array
    const compressedBytes = new Uint8Array([...compressedString].map(c => c.charCodeAt(0)));
  
    // Decompress the Uint8Array using pako
    const decompressedBytes = pako.inflate(compressedBytes);
  
    // Convert the decompressed Uint8Array back to a string
    const decompressedString = new TextDecoder().decode(decompressedBytes);
  
    return decompressedString;
  }

  async compressFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        // Get the file content as a Uint8Array
        const fileContent = new Uint8Array(event.target.result);

        // Compress the Uint8Array using pako
        const compressedBytes = pako.deflate(fileContent);

        // Convert the compressed Uint8Array back to a binary string
        let compressedBinaryString = '';
        for (let i = 0; i < compressedBytes.length; i++) {
          compressedBinaryString += String.fromCharCode(compressedBytes[i]);
        }

        // Encode the compressed binary string back to Base64
        const compressedBase64String = btoa(compressedBinaryString);

        resolve(compressedBase64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      // Read the file as ArrayBuffer
      reader.readAsArrayBuffer(file);
    });
  }

}
