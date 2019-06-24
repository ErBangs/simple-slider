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

    this.bind();
    this.initialize();
  }

  /**
   * イベント設定
   */
  bind() {
    // リサイズ時にスタイルとかを更新
    window.addEventListener('resize', () => this.update());

    // 次へ
    this.$nextButton.addEventListener('click', () => this.toNext());

    // 前へ
    this.$prevButton.addEventListener('click', () => this.toPrev());

    // 指定のスライドへ
    [...this.$dots].forEach($dot => {
      $dot.addEventListener('click', () => {
        this.currentIndex = parseInt($dot.dataset.index);
        this.toSpecified();
        this.updateActiveDot();
      });
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
    this.lastPosition = Math.ceil(
      this.lastPosition + DIFFERENCE * this.currentIndex
    );
    this.updateSlidePosition(this.lastPosition);
  }

  /**
   * スライダーの位置を指定の位置に更新する
   * @param {Number} value - スライダーの位置
   */
  updateSlidePosition(value) {
    // 実行中のアニメーションを終了させる
    velocity(this.$inner, 'finish');
    velocity(this.$inner, { translateX: value }, { duration: 0 });
  }

  /**
   * 次のスライドへ
   */
  toNext() {
    // 最後のスライドから次のスライドへ行こうとした時
    if (this.currentIndex === this.defaultSlideLength) {
      // 先頭に複製されたスライドの位置へ移動
      this.updateSlidePosition(0);
      this.lastPosition = 0;
      this.currentIndex = 1;
    } else {
      // 現在のスライド番号を更新
      this.currentIndex += 1;
    }

    // 移動量の算出（前回の位置からスライド1枚分マイナス）
    let afterPosition = this.lastPosition - this.sliderWidth;

    this.move(afterPosition);
  }

  /**
   * 前のスライドへ
   */
  toPrev() {
    // 1枚目のスライドの状態で前のスライドへ行こうとした時
    if (this.currentIndex === 1) {
      // 最後尾に複製されたスライドの位置へ移動
      const POSITION = -this.sliderWidth * (this.defaultSlideLength + 1);
      this.updateSlidePosition(POSITION);
      this.lastPosition = POSITION;
      this.currentIndex = this.defaultSlideLength;
    } else {
      // 現在のスライド番号を更新
      this.currentIndex -= 1;
    }

    // 移動量の算出（前回の位置からスライド1枚分プラス）
    let afterPosition = this.lastPosition + this.sliderWidth;

    this.move(afterPosition);
  }

  /**
   * 指定のスライドへ
   */
  toSpecified() {
    // 移動量の算出
    let afterPosition = -this.sliderWidth * this.currentIndex;
    this.move(afterPosition);
  }

  /**
   * スライダーを動かす
   * @param {Number} value - 動かす量
   */
  move(value) {
    // 実行中のアニメーションを終了させる
    velocity(this.$inner, 'finish');

    // 前回の位置情報を更新
    this.lastPosition = value;
    velocity(
      this.$inner,
      { translateX: value },
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
