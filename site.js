// site.js
import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const NODE_NAME = process.env.NODE_NAME || `Node_${PORT}`;


const fileName = `${NODE_NAME}_storage.json`;
// if (fs.existsSync(fileName)) {
//     fs.unlinkSync(fileName);
//     console.log(`Đã xóa file dữ liệu cũ: ${fileName}`);
// }
let localData = [];
if (fs.existsSync(fileName)) {
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    if (fileContent) {
        localData = JSON.parse(fileContent);
        console.log(`Đã load lại ${localData.length} kiện hàng cũ từ ổ cứng.`);
    }
}

app.post('/api/insert', (req, res) => {
    const data = req.body;
    localData.push(data);
    
    // Ghi ra file JSON
    fs.writeFileSync(`${NODE_NAME}_storage.json`, JSON.stringify(localData, null, 2));
    
    console.log(`[${NODE_NAME}] Đã lưu kiện hàng: ${data.ShipID} từ ${data.Origin_Country}`);
    res.status(200).json({ message: 'Thành công', node: NODE_NAME });
});

app.listen(PORT, () => {
    console.log(`${NODE_NAME} đang chạy tại http://localhost:${PORT}`);
});