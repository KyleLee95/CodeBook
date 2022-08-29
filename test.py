var eraseOverlapIntervals = function (intervals) {
  intervals.sort((a, b) => {
    return a[0] - b[0]
  })

  let counter = 0
  let prevEnd = intervals[0][1]

  for (let i = 1; i < intervals.length; i++) {
    const currInterval = intervals[i]
    //updating the end value here to use in the next iteration
    if (currInterval[0] >= prevEnd) {
      prevEnd = currInterval[1]
    } else {
    //updating counter and checking to see which interval to "erase"
      counter += 1
      prevEnd = Math.min(prevEnd, currInterval[1])
    }
  }
  return counter
}

eraseOverlapIntervals([[1,3],[1,2],[1,2]])