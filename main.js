"use strict";

let box = document.getElementById("gun-div");
let boxBoundingRect = box.getBoundingClientRect();
let boxCenter = {
  x: boxBoundingRect.left + boxBoundingRect.width / 2,
  y: boxBoundingRect.top + boxBoundingRect.height / 2,
};

document.addEventListener("mousemove", (e) => {
  let angle =
    Math.atan2(e.pageX - boxCenter.x, -(e.pageY - boxCenter.y)) *
    (180 / Math.PI);
  box.style.transform = `rotate(${angle}deg)`;
});

document.addEventListener("click", (e) => {
    let bullet = document.getElementById("bullet");
    bullet.style.display = "block";
    let bulletBoundingRect = bullet.getBoundingClientRect();
    let bulletCenter = {
        x: bulletBoundingRect.left + bulletBoundingRect.width / 2,
        y: bulletBoundingRect.top + bulletBoundingRect.height / 2,
    };
    
    let angle =
        Math.atan2(e.pageX - boxCenter.x, -(e.pageY - boxCenter.y)) *
        (180 / Math.PI);
    bullet.style.transform = `rotate(${angle}deg)`;
    
    let bulletSpeed = 100;
    let bulletX = bulletCenter.x;
    let bulletY = bulletCenter.y;
    let bulletInterval = setInterval(() => {
        bulletX += bulletSpeed * Math.cos(angle * Math.PI / 180);
        bulletY += bulletSpeed * Math.sin(angle * Math.PI / 180);
        bullet.style.left = `${bulletX}px`;
        bullet.style.top = `${bulletY}px`;
    
        let bulletBoundingRect = bullet.getBoundingClientRect();
        let boxBoundingRect = box.getBoundingClientRect();
        if (
        bulletBoundingRect.left < boxBoundingRect.left ||
        bulletBoundingRect.top < boxBoundingRect.top ||
        bulletBoundingRect.right > boxBoundingRect.right ||
        bulletBoundingRect.bottom > boxBoundingRect.bottom
        ) {
        clearInterval(bulletInterval);
        document.body.removeChild(bullet);
        }
    }, 10);

});