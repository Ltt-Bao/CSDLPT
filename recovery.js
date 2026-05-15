import fs from 'fs';
import axios from 'axios';

// Kiểm tra xem có file lỗi nào không
if (!fs.existsSync('failed_queue.json')) {
    console.log("🎉 Không có dữ liệu lỗi nào cần khôi phục!");
    process.exit(0);
}

// Đọc dữ liệu từ file lỗi
const failedData = JSON.parse(fs.readFileSync('failed_queue.json', 'utf-8'));
console.log(`🔄 Bắt đầu khôi phục ${failedData.length} kiện hàng...`);

const SITES = {
    USA: 'http://localhost:3001/api/insert',
    EU: 'http://localhost:3002/api/insert',
    OTHER: 'http://localhost:3003/api/insert'
};

async function recover() {
    let successCount = 0;
    
    for (const row of failedData) {
        let targetNodeUrl = SITES.OTHER;
        if (row.Origin_Country === 'USA') targetNodeUrl = SITES.USA;
        else if (row.Origin_Country === 'EU') targetNodeUrl = SITES.EU;

        try {
            // Lấy dữ liệu gốc (bỏ đi trường Error_Time mình tự thêm vào lúc báo lỗi)
            const { Error_Time, ...originalData } = row;
            
            await axios.post(targetNodeUrl, originalData);
            successCount++;
        } catch (error) {
            console.error(`Vẫn không thể gửi ${row.ShipID}. Node chưa bật lại?`);
        }
    }

    if (successCount === failedData.length) {
        console.log("Khôi phục thành công toàn bộ dữ liệu! Đã xóa file queue.");
        // Xóa file đi vì đã khôi phục xong
        fs.unlinkSync('failed_queue.json'); 
    } else {
        console.log(`Chỉ khôi phục được ${successCount}/${failedData.length} kiện hàng. Vui lòng kiểm tra lại Node.`);
    }
}

recover();