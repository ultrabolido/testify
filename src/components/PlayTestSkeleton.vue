<template>
  <div class="quiz_box">
        <header>
            <div class="title">
              <span class="skeleton-box" style="width:300px;"></span>
            </div>
        </header>
        <section>
            <div class="que_text">
              <span class="skeleton-box" style="width:480px;height:90px;"></span>
            </div>
            <div class="option_list">
              <div class="option"><span class="skeleton-box" style="width:450px;"></span></div>
              <div class="option"><span class="skeleton-box" style="width:450px;"></span></div>
              <div class="option"><span class="skeleton-box" style="width:450px;"></span></div>
              <div class="option"><span class="skeleton-box" style="width:450px;"></span></div>
            </div>
        </section>
        <footer>
            <div class="total_que">
              <div class="option"><span class="skeleton-box" style="width:200px;"></span></div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.skeleton-box {
  display: inline-block;
  height: 1em;
  position: relative;
  overflow: hidden;
  background-color: #DDDBDD;
  border-radius: 5px;
}
.skeleton-box::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));
  -webkit-animation: shimmer 2s infinite;
          animation: shimmer 2s infinite;
  content: '';
}

@-webkit-keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
