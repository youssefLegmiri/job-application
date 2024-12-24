const PDFDocument = require("pdfkit");
const PDFGenerator = async (data, res) => {
  const doc = new PDFDocument();

  doc.pipe(res);
  await new Promise((resolve) => setTimeout(resolve, 5000)); // delay for 5 seconds

  doc.fontSize(25).text("Here is your PDF with data:", { align: "center" });
  doc.moveDown();
  doc
    .fontSize(18)
    .text(`${data.FirstName} ${data.LastName} `, { align: "left" });
  doc.moveDown();
  doc.fontSize(18).text(`${data.email}`, { align: "left" });
  doc.moveDown();
  doc.fontSize(18).text(`message : ${data.message}`, { align: "center" });
  doc.moveDown();
  doc.end();
};
module.exports = PDFGenerator;
