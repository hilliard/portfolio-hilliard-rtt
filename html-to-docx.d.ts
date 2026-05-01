declare module 'html-to-docx' {
  const HTMLToDOCX: (htmlString: string, headerHTML?: string | null, documentOptions?: any, footerHTML?: string | null) => Promise<Buffer | Blob | ArrayBuffer>;
  export default HTMLToDOCX;
}
