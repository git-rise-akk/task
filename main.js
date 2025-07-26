class BlockController {
  constructor({ containerSelector, addBtnSelector, removeBtnSelector, initialCount = 0, maxBlocks = 5 }) {
    this.container = document.querySelector(containerSelector);
    this.addButton = document.querySelector(addBtnSelector);
    this.removeButton = document.querySelector(removeBtnSelector);
    this.maxBlocks = maxBlocks;
    this.lastValue = initialCount > 0 ? initialCount - 1 : -1;

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
    this.lastValue += 1;
    this.container.appendChild(this.createBlock(this.lastValue));
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

    if (this.container.children.length === 0) {
      this.lastValue = -1;
    }
  }

  removeOverflow() {
    const blocks = this.container.querySelectorAll('.block');
    if (blocks.length > this.maxBlocks) {
      this.container.firstElementChild.remove();
    }
  }

  init(count) {
    let i = count > this.maxBlocks ? count - this.maxBlocks : 0;
    for (; i < count; i++) {
      this.container.appendChild(this.createBlock(i));
    }
    this.lastValue = count - 1;
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
    initialCount: 3,
    maxBlocks: 5
  });
});