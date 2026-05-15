// coordinator.js
import fs from 'fs';
import csv from 'csv-parser';
import axios from 'axios';


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const SITES = {
    USA: 'http://localhost:3001/api/insert',
    EU: 'http://localhost:3002/api/insert',
    OTHER: 'http://localhost:3003/api/insert'
};

const shipments = [];
const failedShipments = [];

if (fs.existsSync('failed_queue.json')) fs.unlinkSync('failed_queue.json');

fs.createReadStream('dataset.csv')
    .pipe(csv())
    .on('data', (row) => {
        shipments.push(row);
    })
    .on('end', async () => {
        console.log(`Đã đọc ${shipments.length} dòng. Bắt đầu phân tán dữ liệu...`);
        
        for (const row of shipments) {
            let targetNodeUrl = SITES.OTHER;
            
            if (row.Origin_Country === 'USA') {
                targetNodeUrl = SITES.USA;
            } else if (row.Origin_Country === 'EU') {
                targetNodeUrl = SITES.EU;
            }

            try {
                await axios.post(targetNodeUrl, row);
                await sleep(50); // tạo độ trễ để kill node
            } catch (error) {
                console.error(`Lỗi khi gửi ${row.ShipID}: ${error.message}`);
                //khi có lỗi, 
                failedShipments.push({ ...row, Error_Time: new Date().toISOString() });
            }
        }
        
        console.log("Hoàn tất giả lập hệ thống cơ sở dữ liệu phân tán!");

        // Nếu có lỗi, xuất file chờ khôi phục
        if (failedShipments.length > 0) {
            fs.writeFileSync('failed_queue.json', JSON.stringify(failedShipments, null, 2));
            console.log(`Có ${failedShipments.length} kiện hàng gửi thất bại. Đã lưu vào 'failed_queue.json' để xử lý sau.`);
        }
    });