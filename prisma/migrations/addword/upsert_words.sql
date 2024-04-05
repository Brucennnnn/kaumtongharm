INSERT INTO KaumTongHarm (word) VALUES
('กระ'),
('กลอง'),
('กลิ่น'),
('กำ'),
('กีฬา'),
('เกลือ'),
('เกาะ'),
('แก้ว'),
('ไก่'),
('แกง'),
('เข่า'),
('ข้า'),
('ขอ'),
('เขื่อน'),
('ไข้'),
('ขำ'),
('ขิต'),
('ครู'),
('คลอง'),
('คลื่น'),
('คอ'),
('ควาย'),
('เคร'),
('งา'),
('งู'),
('เงิน'),
('งง'),
('โง่'),
('ไง'),
('งับ'),
('จมูก'),
('จาน'),
('จักร'),
('จัง'),
('จีน'),
('จบ'),
('จอ'),
('จน'),
('ช่าง'),
('ซอ'),
('ซวย'),
('หญิง'),
('ดวง'),
('ดอก'),
('ดัก'),
('ดาว'),
('ด่า'),
('ดิน'),
('เดือน'),
('ดี'),
('ต้น'),
('ตับ'),
('ตอบ'),
('ตำ'),
('ตึก'),
('ตู้'),
('เต้น'),
('เต่า'),
('ตี'),
('ตาย'),
('เต็ม'),
('ถ้า'),
('ถุง'),
('ถุย'),
('ทะเล'),
('ทอง'),
('ท่อ'),
('ทับ'),
('ทา'),
('ทำ'),
('ทุ่ง'),
('เท'),
('ไทย'),
('ธง'),
('นก'),
('นิยาย'),
('นา'),
('น้ำ'),
('เนื้อ'),
('น้อย'),
('น้อง'),
('เนี่ย'),
('นั่น'),
('บอล'),
('บัตร'),
('บัน'),
('บิน'),
('บิด'),
('ใบ'),
('ประ'),
('ปลา'),
('ป่า'),
('ปืน'),
('ปู'),
('ปุ๋ย'),
('ปี'),
('ปลอม'),
('ผม'),
('ผล'),
('ผ้า'),
('ผัก'),
('ผี'),
('เสื้อ'),
('เสือ'),
('สี'),
('สม'),
('แผน'),
('ฝน'),
('ฝา'),
('พ่อ'),
('พระ'),
('พลัง'),
('พา'),
('พื้น'),
('เพลง'),
('เพื่อน'),
('ฟัน'),
('ฟัค'),
('ฟ้า'),
('ฟู'),
('ไฟ'),
('แฟน'),
('ภาษา'),
('เมะ'),
('มด'),
('ม้า'),
('มัน'),
('มวย'),
('แม่'),
('แมว'),
('ไม้'),
('ยา'),
('ยุง'),
('เรือ'),
('รถ'),
('รส'),
('รอ'),
('ระบบ'),
('รา'),
('รู'),
('แรง'),
('โรค'),
('โรง'),
('รัก'),
('ไร'),
('รำ'),
('ฤดู'),
('ลม'),
('ลิง'),
('ล้อ'),
('ละคร'),
('ลา'),
('ลำ'),
('ลิง'),
('ลิ้น'),
('ลูก'),
('เลข'),
('โลก'),
('และ'),
('แล้ว'),
('วง'),
('แหวน'),
('วัว'),
('วัน'),
('วดฟ'),
('วิทยุ'),
('เวลา'),
('แว่น'),
('ไว'),
('เสื้อ'),
('สถิติ'),
('สนาม'),
('ส้ม'),
('สัตว์'),
('สัส'),
('สาม'),
('สาร'),
('สิง'),
('สี่'),
('สื่อ'),
('สุข'),
('สูตร'),
('เส้น'),
('เสียง'),
('แสง'),
('หนวด'),
('หีบ'),
('หนู'),
('หน้า'),
('หมอก'),
('หมา'),
('หมี'),
('หมึก'),
('หลอด'),
('หลุม'),
('หอ'),
('หา'),
('โห'),
('หัว'),
('หิน'),
('หิมะ'),
('หู'),
('ห่า'),
('เหอะ'),
('เห้ย'),
('ห้ะ'),
('เหล็ก'),
('อา'),
('อ่าว'),
('ไอ'),
('โอ'),
('อมก'),
('อห'),
('ป่าว'),
('ค้าบ'),
('หือ')
ON CONFLICT(word) DO UPDATE SET word=excluded.word;
