function count(newR, currentR, jobsDone){
    let newRating = (Number(jobsDone) * Number(currentR)) + Number(newR);
    newRating = (newRating) / (Number(jobsDone) + 1);
    return Number(newRating)
}

module.exports = count;