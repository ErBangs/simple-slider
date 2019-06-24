class App {
  constructor() {
    // DOM
    this.$slider = document.querySelector('.slider');
    this.$inner = this.$slider.querySelector('.slider__inner');
    this.$slides = this.$inner.querySelectorAll('.slider__item');
    this.$nextButton = this.$slider.querySelector('.slider__controller--next');
    this.$prevButton = this.$slider.querySelector('.slider__controller--prev');
    this.$dots = document.querySelectorAll('.dot');
    this.$activeDot = document.querySelector('.dot.is-active');

    // 数値
    this.sliderWidth = Math.ceil(window.innerWidth * 0.8);
    this.lastPosition = -this.sliderWidth;
    this.lastWidth = this.$slides[0].clientWidth;
    this.defaultSlideLength = this.$slides.length;
    this.currentIndex = 1;
    this.acceleration = 0;
    this.firstTouchPoint = null;
    this.lastTouchPoint = null;

    this.bind();
    this.initialize();
  }

  /**
   * イベント設定
   */
  bind() {
    // リサイズ時にスタイルとかを更新
    window.addEventListener('resize', () => this.update());

    // 次のスライドへ
    this.$nextButton.addEventListener('click', () => this.toNext());

    // 前のスライドへ
    this.$prevButton.addEventListener('click', () => this.toPrev());

    // 指定のスライドへ
    [...this.$dots].forEach($dot => {
      $dot.addEventListener('click', () => {
        this.currentIndex = parseInt($dot.dataset.index);
        this.move();
        this.updateActiveDot();
      });
    });

    this.$slider.addEventListener('touchstart', event => {
      const PAGE_X = Math.ceil(event.changedTouches[0].pageX);
      this.firstTouchPoint = PAGE_X;
      this.lastTouchPoint = PAGE_X;
      console.log(this.firstTouchPoint);
    });

    this.$slider.addEventListener('touchmove', event => {
      const PAGE_X = Math.ceil(event.changedTouches[0].pageX);
      const POSITION = this.lastPosition + (PAGE_X - this.lastTouchPoint);
      console.log('移動量:', PAGE_X - this.lastTouchPoint);
      this.updateSlidePosition(POSITION);
      this.acceleration = this.lastTouchPoint - PAGE_X;
      this.lastTouchPoint = PAGE_X;
    });

    this.$slider.addEventListener('touchend', event => {
      const PAGE_X = Math.ceil(event.changedTouches[0].pageX);
      const MOVEMENT = PAGE_X - this.firstTouchPoint;

      console.log('加速度:', this.acceleration);
      console.log('移動量:', MOVEMENT);

      // 加速度と移動量を元にスライド動かすか判定
      if (this.acceleration >= 10 || MOVEMENT <= -(this.sliderWidth / 5)) {
        this.toNext(MOVEMENT);
      } else if (this.acceleration <= -10 || MOVEMENT >= this.sliderWidth / 5) {
        this.toPrev(MOVEMENT);
      } else {
        // 条件に当てはまらなければ値をリセットしてスライドの位置を元に戻す
        this.acceleration = 0;
        this.move();
      }
    });
  }

  /**
   * 初期化処理
   */
  initialize() {
    // 1枚目のスライドを最後尾に複製
    const $FIRST_SLIDE = this.$slides[0].cloneNode(true);
    this.$inner.appendChild($FIRST_SLIDE);

    // 最後のスライドを先頭に複製
    const $LAST_SLIDE = this.$slides[this.$slides.length - 1].cloneNode(true);
    this.$inner.insertBefore($LAST_SLIDE, this.$inner.firstChild);

    // 要素追加された状態で取得し直し
    this.$slides = this.$inner.querySelectorAll('.slider__item');

    // スライドの数に応じてスタイル調整
    const SLIDE_LENGTH = this.$slides.length;
    this.$inner.style.width = `${SLIDE_LENGTH}00%`;

    this.updateSlidePosition(-this.sliderWidth);
  }

  /**
   * 更新処理
   */
  update() {
    // スライドのサイズがどれだけ変わったか算出
    const DIFFERENCE = this.lastWidth - this.$slides[0].clientWidth;
    this.lastWidth = this.$slides[0].clientWidth;

    // 幅の取得
    this.sliderWidth = Math.ceil(window.innerWidth * 0.8);

    // スライドの位置更新
    const POSITION = Math.ceil(
      this.lastPosition + DIFFERENCE * this.currentIndex
    );
    this.updateSlidePosition(POSITION);
  }

  /**
   * スライダーの位置を指定の位置に更新する
   * @param {Number} value - スライダーの位置
   */
  updateSlidePosition(value) {
    // 実行中のアニメーションを終了させる
    velocity(this.$inner, 'stop');

    // 現在位置の情報を更新
    this.lastPosition = value;

    // 0秒で指定の位置へ
    velocity(this.$inner, { translateX: value }, { duration: 0 });
  }

  /**
   * 次のスライドへ
   * @param {Number} touchMovedValue - 指操作でスライダーが動いている量
   */
  toNext(touchMovedValue = 0) {
    // 最後のスライドから次のスライドへ行こうとした時
    if (this.currentIndex === this.defaultSlideLength) {
      // 先頭に複製されたスライドの位置へ移動
      this.updateSlidePosition(touchMovedValue);
      this.currentIndex = 1;
    } else {
      // 現在のスライド番号を更新
      this.currentIndex += 1;
    }

    this.move();
  }

  /**
   * 前のスライドへ
   * @param {Number} touchMovedValue - 指操作でスライダーが動いている量
   */
  toPrev(touchMovedValue = 0) {
    // 1枚目のスライドの状態で前のスライドへ行こうとした時
    if (this.currentIndex === 1) {
      // 最後尾に複製されたスライドの位置へ移動
      const POSITION = -this.sliderWidth * (this.defaultSlideLength + 1);
      this.updateSlidePosition(POSITION + touchMovedValue);
      this.currentIndex = this.defaultSlideLength;
    } else {
      // 現在のスライド番号を更新
      this.currentIndex -= 1;
    }

    this.move();
  }

  /**
   * スライダーを動かす
   */
  move() {
    // 実行中のアニメーションを終了させる
    velocity(this.$inner, 'finish');

    // 移動先
    const POSITION = -this.sliderWidth * this.currentIndex;

    // 前回の位置情報を更新
    this.lastPosition = POSITION;

    // アニメーション実行
    velocity(
      this.$inner,
      { translateX: POSITION },
      {
        duration: 500,
        easing: [250, 30],
        begin: () => {
          this.updateActiveDot();
        }
      }
    );
  }

  /**
   * アクティブ状態のドットを更新
   */
  updateActiveDot() {
    this.$activeDot.classList.remove('is-active');
    const $TARGET = this.$dots[this.currentIndex - 1];
    $TARGET.classList.add('is-active');
    this.$activeDot = $TARGET;
  }
}
new App();
