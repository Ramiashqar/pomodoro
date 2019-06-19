class Keypress {
  constructor(m1, m2, m3, mt, mBtn1, mBtn2, mBtn3, mBtnT, mo, bD,sBtn,bBtn,sbBtn) {
    document.addEventListener("keydown", e => {
      if (e.key === "Enter" && m1.classList.contains("u-show")) {
        mBtn1.click();
      } else if (e.key === "Enter" && m2.classList.contains("u-show")) {
        mBtn2.click();
      } else if (e.key === "Enter" && m3.classList.contains("u-show")) {
        mBtn3.click();
      } else if (e.key === "Enter" && mt.classList.contains("u-show")) {
        mBtnT.click();
      } else if (e.key === "Escape" && m1.classList.contains("u-show")) {
        mo.click();
      } else if (e.key === "Escape" && m2.classList.contains("u-show")) {
        mo.click();
      } else if (e.key === "Escape" && m3.classList.contains("u-show")) {
        mo.click();
      } else if (e.key === "Escape" && mt.classList.contains("u-show")) {
        mo.click();
      } else if (
        e.key === "Enter" &&
        !m1.classList.contains("u-show") &&
        !bD.classList.contains("u-show")
      ) {
        sBtn.click();
      }
      if (
        e.key === "Escape" &&
        !m1.classList.contains("u-show") &&
        sBtn.classList.contains("stop")
      ) {
        sBtn.click();
      }
      if (bD.classList.contains("u-show")) {
        if (
          e.key === "Enter" &&
          !sbBtn.classList.contains("u-force-hide")
        ) {
          sbBtn.click();
        } else if (
          e.key === "Enter" &&
          sbBtn.classList.contains("u-force-hide")
        ) {
          bBtn.click();
        } else if (e.key === "Escape") {
          bBtn.click();
        }
      }
    });
  }
}
export default Keypress;
