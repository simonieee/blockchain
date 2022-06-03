import { sha3_256 } from "js-sha3";

// 블럭 구조체 정의
class Block {
  constructor(blockId, prevHash, blockData) {
    this.blockId = blockId;
    this.prevHash = prevHash;
    this.blockData = blockData;
  }
}

// 제네시스 블럭 생성
const createGenesisBlock = () => {
  const blockId = 0x00000000000000000000;
  const prevHash = 0x00000000000000000000;
  const blockData = "Genesis Block";

  return new Block(blockId, prevHash, blockData);
};

// 제네시스 블록.... 생성
const genesisBlock = createGenesisBlock();
let blocks = [genesisBlock];

// 블럭 요소 sha3_256 해시 값 반환
const createHash = (block) => {
  const { blockId, prevHash, blockData } = block;
  const blockStr = blockId + prevHash + blockData;
  const hash = sha3_256(blockStr).toString();
  return hash;
};

const getLastBlock = () => {
  return blocks[blocks.length - 1];
};

const nextBlock = (data) => {
  const blockId = blocks.length;
  const prevHash = createHash(getLastBlock());
  const blockData = data;
  return new Block(blockId, prevHash, blockData);
};
