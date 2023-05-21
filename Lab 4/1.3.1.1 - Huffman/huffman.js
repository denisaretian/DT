class HuffmanNode {
    constructor(char, freq) {
      this.char = char;
      this.freq = freq;
      this.left = null;
      this.right = null;
    }
  }
  
  class HuffmanCompressor {
    constructor() {
      this.heap = [];
      this.codes = {};
    }
  
    createFrequencyTable(data) {
      const freqTable = {};
      for (let char of data) {
        if (!freqTable[char]) {
          freqTable[char] = 0;
        }
        freqTable[char]++;
      }
      return freqTable;
    }
  
    createHeap(freqTable) {
      for (let char in freqTable) {
        const node = new HuffmanNode(char, freqTable[char]);
        this.heap.push(node);
      }
      this.heap.sort((a, b) => a.freq - b.freq);
    }
  
    mergeNodes() {
      while (this.heap.length > 1) {
        const node1 = this.heap.shift();
        const node2 = this.heap.shift();
  
        const merged = new HuffmanNode(null, node1.freq + node2.freq);
        merged.left = node1;
        merged.right = node2;
  
        this.heap.push(merged);
        this.heap.sort((a, b) => a.freq - b.freq);
      }
    }
  
    generateCodes(root, currentCode) {
      if (!root) {
        return;
      }
  
      if (root.char !== null) {
        this.codes[root.char] = currentCode;
        return;
      }
  
      this.generateCodes(root.left, currentCode + "0");
      this.generateCodes(root.right, currentCode + "1");
    }
  
    compress(data) {
      const freqTable = this.createFrequencyTable(data);
      this.createHeap(freqTable);
      this.mergeNodes();
      const root = this.heap[0];
      this.generateCodes(root, "");
  
      let encodedData = "";
      for (let char of data) {
        encodedData += this.codes[char];
      }
  
      const padding = 8 - (encodedData.length % 8);
      encodedData += "0".repeat(padding);
      const paddedInfo = padding.toString(2).padStart(8, "0");
      encodedData = paddedInfo + encodedData;
  
      const byteLength = encodedData.length / 8;
      const byteArr = new Uint8Array(byteLength);
      for (let i = 0; i < byteLength; i++) {
        const byte = encodedData.substr(i * 8, 8);
        byteArr[i] = parseInt(byte, 2);
      }
  
      return byteArr;
    }
  
    displayCompressionTree(root) {
      const width = 800;
      const height = 400;
  
      const svg = d3
        .select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
  
      const treeLayout = d3.tree().size([width, height]);
  
      const nodes = d3.hierarchy(root);
      const treeData = treeLayout(nodes);
  
      const links = treeData.links();
      const nodesData = treeData.descendants();
  
      svg
        .selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x));
  
      const node = svg
        .selectAll(".node")
        .data(nodesData)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`);
  
      node
        .append("circle")
        .attr("r", 5)
        .attr("fill", "steelblue");
  
      node
        .append("text")
        .attr("dy", "0.35em")
        .attr("x", d => (d.children ? -10 : 10))
        .attr("text-anchor", d => (d.children ? "end" : "start"))
        .text(d => (d.data.char !== null ? d.data.char : ""));
    }
  }
  
  const compressor = new HuffmanCompressor();
  const data = "hello world";
  const compressedData = compressor.compress(data);
  console.log("Compressed data:", compressedData);
  
  const root = new HuffmanNode(null, compressedData.length);
  compressor.displayCompressionTree(root);