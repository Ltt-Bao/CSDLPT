import fs from 'fs';

const filesToDelete = [
    'USA_Node_storage.json',
    'EU_Node_storage.json',
    'Global_Node_storage.json', // Thay bằng tên file thực tế của Node 3 nếu mày đặt tên khác
    'failed_queue.json'
];

filesToDelete.forEach(file => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`Đã dọn dẹp file: ${file}`);
    }
});

console.log("Môi trường đã sạch sẽ! Sẵn sàng test lại từ đầu.");