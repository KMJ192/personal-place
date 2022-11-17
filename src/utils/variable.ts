function deepClone(value: any) {
  if (typeof value === 'object') {
    return JSON.parse(JSON.stringify(value));
  }
  return value;
}

function objParser() {
  let result = {};

  function makeOneDepth(
    obj: { [key: string]: any } | string,
    curString: string,
    splitStr: string,
  ) {
    if (typeof obj === 'string') {
      result = {
        ...result,
        [curString]: obj,
      };
      return;
    }
    const next = Object.keys(obj);
    for (let i = 0; i < next.length; i++) {
      if (curString === '') {
        makeOneDepth(obj[next[i]], `${next[i]}`, splitStr);
      } else {
        makeOneDepth(
          obj[next[i]],
          `${curString}${splitStr}${next[i]}`,
          splitStr,
        );
      }
    }

    return result;
  }

  return {
    makeOneDepth,
  };
}

export { objParser, deepClone };
