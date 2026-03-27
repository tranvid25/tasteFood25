# React SPA truyền thống là 1 client khổng lồ

Khi lần đầu vào 1 trang web

1 Trình duyệt request đến server và trả về file index.html cơ bản hầu như không chúa html gì nhiều
2.Trình duyệt nhận thấy trong file html có link dến file js ,css nên là request lần nữa đến serve để lấy file js,css
3.Trình duyệt tiến hành chạy code js để render ra html và gắn sự kiện vào html đó
4. người dùng thấy và tương tác được với trang web

trong quá trình này,web sẽ trắn xóa cho đến khi bước thư 3 được hoàn thành

vậy nên mới nói lần đầu tiên khi truy cập vào các SPA truyền thống khá lâu nhưng sau đó thì thao tác hay chuyển trang sẽ raasty nhanh vì js hundle cả app đã có ở clieent rồi nếu cần data thì sẽ request đến server
