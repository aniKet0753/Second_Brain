function Randomhased(len: number) {
  let hasedkey = "nnvevenveinvevneevnevoroienrinwrinpve2342vmflvkk";
  let length = hasedkey.length;
  let random = "";
  
  for (let i = 0; i < len; i++) {
    let randomIndex = Math.floor(Math.random() * length);
    random += hasedkey[randomIndex];
  }
  return random;
}


export default Randomhased;
