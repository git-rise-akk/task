class BlockController {
  constructor({ containerSelector, addBtnSelector, removeBtnSelector, initialCount = 0, maxBlocks = 5 }) {
    this.container = document.querySelector(containerSelector);
    this.addButton = document.querySelector(addBtnSelector);
    this.removeButton = document.querySelector(removeBtnSelector);
    this.maxBlocks = maxBlocks;

    this.init(initialCount);
    this.addListeners();
  }

  createBlock(value) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.textContent = value;
    return block;
  }

  getBlockValue(element) {
    return element ? +element.textContent : 0;
  }

  addBlock() {
    const lastBlock = this.container.lastElementChild;
    const nextValue = this.getBlockValue(lastBlock) + 1;
    this.container.appendChild(this.createBlock(nextValue));
    this.removeOverflow();
  }

  removeBlock() {
    const lastBlock = this.container.lastElementChild;
    const firstBlock = this.container.firstElementChild;

    if (!lastBlock) return;

    if (this.getBlockValue(lastBlock) >= this.maxBlocks) {
      const newValue = this.getBlockValue(firstBlock) - 1;
      this.container.prepend(this.createBlock(newValue));
    }

    lastBlock.remove();
  }

  removeOverflow() {
    const blocks = this.container.querySelectorAll('.block');
    if (blocks.length > this.maxBlocks) {
      this.container.firstElementChild.remove();
    }
  }

  init(count) {
    for (let i = 0; i < count; i++) {
      this.container.appendChild(this.createBlock(i));
    }
  }

  addListeners() {
    this.addButton.addEventListener('click', () => this.addBlock());
    this.removeButton.addEventListener('click', () => this.removeBlock());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new BlockController({
    containerSelector: '.container',
    addBtnSelector: '.button__add',
    removeBtnSelector: '.button_remove',
    initialCount: 4,
    maxBlocks: 5
  });
});