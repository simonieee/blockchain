import { sha3_256 } from "js-sha3";

// 블럭 구조체 정의
class Block {
  constructor(hash, blockId, prevHash, blockData) {
    this.hash = hash;
    this.blockId = blockId;
    this.prevHash = prevHash;
    this.blockData = blockData;
  }
}

// 제네시스 블럭 생성
const createGenesisBlock = () => {
  const hash = 0x00000000000000000000;
  const blockId = 0x00000000000000000000;
  const prevHash = 0x00000000000000000000;
  const blockData = ["Genesis Block"];

  return new Block(hash, blockId, prevHash, blockData);
};

// 제네시스 블록.... 생성
const genesisBlock = createGenesisBlock();
let blocks = [genesisBlock];

// 블럭 요소 sha3_256 해시 값 반환
const createHash = (block) => {
  const { blockId, prevHash, blockData } = block;
  const blockStr = blockId + prevHash + blockData;
  const hash = sha3_256(blockStr).toString().slice(0, 20);
  return hash;
};

// 이전 블럭 가져오기
const getLastBlock = () => {
  return blocks[blocks.length - 1];
};

// 새 블럭 생성
const nextBlock = (data) => {
  const blockId = blocks.length;
  const prevHash = createHash(getLastBlock()).slice(0, 20);
  const blockData = data;
  const blockStr = blockId + prevHash + blockData;
  const hash = sha3_256(blockStr).toString().slice(0, 20);
  return new Block(hash, blockId, prevHash, blockData);
};

// 블럭 데이터 추가
const addBlock = (newBlock) => {
  blocks.push(newBlock);
};

// 귀찮으니... 블럭 100개 생성..
const block100 = () => {
  for (let i = 1; i < 100; i++) {
    setTimeout(() => {
      console.log("블록이 생성되었습니다!!");
      addBlock(nextBlock(["tx" + i]));
      console.log(blocks[i]);
    }, 1000 * i);
  }
};

block100();

// 제네시스 블록 해싱
const hash = createHash(genesisBlock).slice(0, 20);

// console.log("blocks:", blocks);
