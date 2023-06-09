const getLottoNumbers = ()=>{
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const lottoNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...lottoNumbers, bonusNumber];
};

module.exports = {getLottoNumbers};