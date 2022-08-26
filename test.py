const testCases= []

var merge = function (intervals) {
  //edge case could be and empty array of intervals
  const sortedIntervals = intervals.sort(([aStart, aEnd], [bStart, bEnd]) => {
    return aStart !== bStart ? aStart - bStart : aEnd - bEnd
  })
  //holds the "previous" interval aka the one that you just looked at
  //and and are using to merge your intervals into
  let prev = intervals[0]
  //init your result vairbale with prev so that you have something to compare
  //on the first iteration
  let res = [prev]
  for (let i = 0; i < sortedIntervals.length; i++) {
    //case where you need to merge because the first value in your "next" interval is within your
    //previous interval
    if (intervals[i][0] <= prev[1]) {
      prev[1] = Math.max(prev[1], intervals[i][1]) //set end value to higher of two intervals. this will update res
    } else {
      //case where nothing overlaps so just push your interval.

      res.push(intervals[i])
      prev = intervals[i] //now you need to update your prev to be the new interval that was not overlapping
    }
  }
  return res
}

merge([[1,4],[2,6],[8,10],[15,51]])