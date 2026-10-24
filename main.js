// Thiệp cưới — TEC-108. Mọi dữ liệu thật đều là placeholder cho tới khi PO bổ sung.
(function () {
  "use strict";

  // Đếm ngược: CHƯA có ngày cưới thật nên giữ "--". Khi có ngày thật, gán
  // WEDDING_DATE = "YYYY-MM-DDTHH:MM:SS+07:00" thì đồng hồ tự chạy.
  var WEDDING_DATE = null;
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function tick() {
    if (!WEDDING_DATE) return;
    var diff = new Date(WEDDING_DATE).getTime() - Date.now();
    if (diff < 0) diff = 0;
    var d = Math.floor(diff / 86400000);
    var h = Math.floor(diff / 3600000) % 24;
    var m = Math.floor(diff / 60000) % 60;
    var s = Math.floor(diff / 1000) % 60;
    document.getElementById("cd-days").textContent = d;
    document.getElementById("cd-hours").textContent = pad(h);
    document.getElementById("cd-mins").textContent = pad(m);
    document.getElementById("cd-secs").textContent = pad(s);
  }
  if (WEDDING_DATE) setInterval(tick, 1000);

  // Nút nổi "Xác nhận tham dự": chỉ hiện sau khi cuộn qua mục mở đầu.
  var fab = document.getElementById("fab-rsvp");
  var hero = document.getElementById("mo-dau");
  function onScroll() {
    var past = window.scrollY > hero.offsetHeight - 120;
    fab.hidden = !past;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Lightbox album: mở / đóng / chuyển ảnh / vuốt trái-phải.
  var tiles = Array.prototype.slice.call(document.querySelectorAll(".album-tile"));
  var lb = document.getElementById("lightbox");
  var lbContent = document.getElementById("lb-content");
  var lbCounter = document.getElementById("lb-counter");
  var idx = 0;
  function show(i) {
    idx = (i + tiles.length) % tiles.length;
    lbContent.textContent = tiles[idx].textContent;
    lbCounter.textContent = (idx + 1) + " / " + tiles.length;
  }
  function open(i) { show(i); lb.hidden = false; }
  function close() { lb.hidden = true; }
  tiles.forEach(function (t, i) { t.addEventListener("click", function () { open(i); }); });
  document.getElementById("lb-close").addEventListener("click", close);
  document.getElementById("lb-prev").addEventListener("click", function () { show(idx - 1); });
  document.getElementById("lb-next").addEventListener("click", function () { show(idx + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
  var touchX = null;
  lbContent.addEventListener("touchstart", function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lbContent.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (dx < -40) show(idx + 1);
    if (dx > 40) show(idx - 1);
    touchX = null;
  }, { passive: true });

  // Các nút cần dữ liệu thật: chưa có dữ liệu nên chỉ hiện ghi chú, không tạo link giả.
  document.getElementById("add-calendar").addEventListener("click", function () {
    document.getElementById("calendar-note").hidden = false;
  });
  document.getElementById("open-map").addEventListener("click", function () {
    document.getElementById("map-note").hidden = false;
  });
  document.getElementById("copy-address").addEventListener("click", function () {
    document.getElementById("copy-note").hidden = false;
  });
})();
